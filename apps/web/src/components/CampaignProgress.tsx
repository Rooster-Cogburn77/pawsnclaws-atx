"use client";

interface CampaignProgressProps {
  title: string;
  description?: string;
  currentAmount: number; // in cents
  goalAmount: number; // in cents
  donorCount?: number;
  daysLeft?: number;
  size?: "sm" | "md" | "lg";
  showDonate?: boolean;
  donateHref?: string;
}

export function CampaignProgress({
  title,
  description,
  currentAmount,
  goalAmount,
  donorCount,
  daysLeft,
  size = "md",
  showDonate = true,
  donateHref = "/donate",
}: CampaignProgressProps) {
  const percentage = Math.min(Math.round((currentAmount / goalAmount) * 100), 100);
  const currentFormatted = (currentAmount / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  const goalFormatted = (goalAmount / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  const sizeClasses = {
    sm: {
      container: "p-4",
      title: "text-base",
      amounts: "text-lg",
      bar: "h-2",
    },
    md: {
      container: "p-6",
      title: "text-lg",
      amounts: "text-2xl",
      bar: "h-3",
    },
    lg: {
      container: "p-8",
      title: "text-xl",
      amounts: "text-3xl",
      bar: "h-4",
    },
  };

  const classes = sizeClasses[size];

  return (
    <div className={`bg-white rounded-xl shadow-lg ${classes.container}`}>
      <h3 className={`font-bold text-gray-900 mb-2 ${classes.title}`}>
        {title}
      </h3>
      {description && (
        <p className="text-gray-600 text-sm mb-4">{description}</p>
      )}

      {/* Progress Bar */}
      <div className={`bg-gray-200 rounded-full ${classes.bar} mb-3 overflow-hidden`}>
        <div
          className={`bg-gradient-to-r from-amber-400 to-amber-500 ${classes.bar} rounded-full transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Amounts */}
      <div className="flex justify-between items-baseline mb-4">
        <div>
          <span className={`font-bold text-amber-600 ${classes.amounts}`}>
            {currentFormatted}
          </span>
          <span className="text-gray-500 text-sm ml-2">
            raised of {goalFormatted}
          </span>
        </div>
        <span className="text-sm font-medium text-gray-700">{percentage}%</span>
      </div>

      {/* Stats */}
      {(donorCount !== undefined || daysLeft !== undefined) && (
        <div className="flex gap-4 text-sm text-gray-600 mb-4">
          {donorCount !== undefined && (
            <span>
              <strong className="text-gray-900">{donorCount}</strong> donors
            </span>
          )}
          {daysLeft !== undefined && (
            <span>
              <strong className="text-gray-900">{daysLeft}</strong> days left
            </span>
          )}
        </div>
      )}

      {/* Donate Button */}
      {showDonate && (
        <a
          href={donateHref}
          className="block w-full py-3 bg-amber-500 text-white text-center font-bold rounded-lg hover:bg-amber-600 transition-colors"
        >
          Donate Now
        </a>
      )}
    </div>
  );
}

// Compact version for sidebars or lists
export function CampaignProgressCompact({
  title,
  currentAmount,
  goalAmount,
  donateHref = "/donate",
}: {
  title: string;
  currentAmount: number;
  goalAmount: number;
  donateHref?: string;
}) {
  const percentage = Math.min(Math.round((currentAmount / goalAmount) * 100), 100);
  const currentFormatted = (currentAmount / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-medium text-gray-900 text-sm">{title}</h4>
        <span className="text-xs text-amber-600 font-medium">{percentage}%</span>
      </div>
      <div className="bg-gray-200 rounded-full h-2 mb-2 overflow-hidden">
        <div
          className="bg-amber-500 h-2 rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-600">{currentFormatted} raised</span>
        <a
          href={donateHref}
          className="text-xs text-amber-600 hover:text-amber-700 font-medium"
        >
          Donate &rarr;
        </a>
      </div>
    </div>
  );
}
