/**
 * Input Sanitization Utilities
 *
 * Protect against XSS and other injection attacks by sanitizing user input
 * before embedding in HTML, emails, or other outputs.
 */

/**
 * Escape HTML special characters to prevent XSS
 * Use this when embedding user input in HTML templates
 */
export function escapeHtml(unsafe: string): string {
  if (!unsafe) return "";
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Sanitize user input for safe HTML embedding
 * Escapes HTML and optionally converts newlines to <br>
 */
export function sanitizeForHtml(input: string, options?: { preserveNewlines?: boolean }): string {
  let sanitized = escapeHtml(input);

  if (options?.preserveNewlines) {
    sanitized = sanitized.replace(/\n/g, "<br>");
  }

  return sanitized;
}

/**
 * Sanitize an entire object's string values
 * Useful for sanitizing form data before embedding in emails
 */
export function sanitizeObject<T extends Record<string, unknown>>(
  obj: T,
  options?: { preserveNewlines?: boolean }
): T {
  const sanitized = {} as T;

  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === "string") {
      sanitized[key as keyof T] = sanitizeForHtml(value, options) as T[keyof T];
    } else if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      sanitized[key as keyof T] = sanitizeObject(
        value as Record<string, unknown>,
        options
      ) as T[keyof T];
    } else {
      sanitized[key as keyof T] = value as T[keyof T];
    }
  }

  return sanitized;
}

/**
 * Strip all HTML tags from a string
 * Use when you need plain text only
 */
export function stripHtml(html: string): string {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, "");
}

/**
 * Sanitize a URL to prevent javascript: and data: schemes
 */
export function sanitizeUrl(url: string): string {
  if (!url) return "";

  const trimmed = url.trim().toLowerCase();

  // Block dangerous URL schemes
  if (
    trimmed.startsWith("javascript:") ||
    trimmed.startsWith("data:") ||
    trimmed.startsWith("vbscript:")
  ) {
    return "";
  }

  return url;
}

/**
 * Sanitize email address
 * Returns empty string if invalid
 */
export function sanitizeEmail(email: string): string {
  if (!email) return "";

  const trimmed = email.trim().toLowerCase();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(trimmed)) {
    return "";
  }

  return trimmed;
}

/**
 * Sanitize phone number - keep only digits, +, and spaces
 */
export function sanitizePhone(phone: string): string {
  if (!phone) return "";
  return phone.replace(/[^\d\s\+\-\(\)]/g, "").trim();
}

/**
 * Truncate text to a maximum length with ellipsis
 */
export function truncate(text: string, maxLength: number): string {
  if (!text || text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + "...";
}

/**
 * Create a safe email template string
 * Automatically sanitizes all interpolated values
 */
export function safeEmailTemplate(
  strings: TemplateStringsArray,
  ...values: unknown[]
): string {
  let result = strings[0];

  for (let i = 0; i < values.length; i++) {
    const value = values[i];
    const sanitized =
      typeof value === "string" ? escapeHtml(value) : String(value ?? "");
    result += sanitized + strings[i + 1];
  }

  return result;
}
