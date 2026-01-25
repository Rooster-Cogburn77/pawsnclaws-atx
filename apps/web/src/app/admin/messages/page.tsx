"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  reason: string;
  message: string;
  status: "new" | "read" | "responded" | "archived";
  created_at: string;
}

// Demo data
const demoMessages: ContactMessage[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    reason: "volunteer",
    message: "Hi! I'm interested in volunteering with colony care on weekends. I have experience with cats and my own car. Let me know how I can help!",
    status: "new",
    created_at: "2025-01-24T10:30:00Z",
  },
  {
    id: "2",
    name: "Mike Thompson",
    email: "mike@example.com",
    reason: "general",
    message: "I found your organization through a friend and wanted to learn more about what you do. Do you have any informational materials I could share with my neighborhood group?",
    status: "read",
    created_at: "2025-01-23T14:15:00Z",
  },
  {
    id: "3",
    name: "Local Business Owner",
    email: "owner@localbiz.com",
    reason: "partnership",
    message: "We're a local pet store and would love to discuss partnership opportunities. Could we host a donation bin or promote your events?",
    status: "responded",
    created_at: "2025-01-22T09:00:00Z",
  },
];

const statusColors: Record<string, string> = {
  new: "bg-red-100 text-red-700",
  read: "bg-blue-100 text-blue-700",
  responded: "bg-green-100 text-green-700",
  archived: "bg-gray-100 text-gray-600",
};

const reasonLabels: Record<string, string> = {
  general: "General Inquiry",
  volunteer: "Volunteering",
  donation: "Donation Question",
  partnership: "Partnership",
  media: "Media/Press",
  other: "Other",
};

export default function AdminMessagesPage() {
  const [isAuthed, setIsAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [messages, setMessages] = useState<ContactMessage[]>(demoMessages);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [filter, setFilter] = useState<"all" | "new" | "read" | "responded">("all");

  const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "admin2024";

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthed(true);
      sessionStorage.setItem("admin_auth", "true");
    } else {
      alert("Invalid password");
    }
  };

  useEffect(() => {
    if (sessionStorage.getItem("admin_auth") === "true") {
      setIsAuthed(true);
    }
  }, []);

  const filteredMessages = messages.filter((m) => {
    if (filter === "all") return m.status !== "archived";
    return m.status === filter;
  });

  const updateStatus = (id: string, status: ContactMessage["status"]) => {
    setMessages(messages.map((m) => (m.id === id ? { ...m, status } : m)));
    if (selectedMessage?.id === id) {
      setSelectedMessage({ ...selectedMessage, status });
    }
  };

  if (!isAuthed) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Admin Access</h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter admin password"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4"
          />
          <button type="submit" className="w-full px-4 py-3 bg-amber-500 text-white font-medium rounded-lg hover:bg-amber-600">
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <Link href="/admin" className="text-amber-600 hover:underline text-sm mb-2 inline-block">
              &larr; Back to Dashboard
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Contact Messages</h1>
          </div>
          <div className="flex gap-2">
            {(["all", "new", "read", "responded"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  filter === f ? "bg-amber-500 text-white" : "bg-white text-gray-700"
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
                {f === "new" && (
                  <span className="ml-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                    {messages.filter((m) => m.status === "new").length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Messages List */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          {filteredMessages.length === 0 ? (
            <div className="p-8 text-center text-gray-500">No messages found</div>
          ) : (
            <div className="divide-y">
              {filteredMessages.map((message) => (
                <div
                  key={message.id}
                  onClick={() => {
                    setSelectedMessage(message);
                    if (message.status === "new") {
                      updateStatus(message.id, "read");
                    }
                  }}
                  className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                    message.status === "new" ? "bg-amber-50" : ""
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900">{message.name}</span>
                      <span className={`px-2 py-0.5 text-xs rounded-full ${statusColors[message.status]}`}>
                        {message.status}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">
                      {new Date(message.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mb-1">{message.email}</p>
                  <p className="text-sm text-gray-700 line-clamp-2">{message.message}</p>
                  <span className="text-xs text-amber-600 mt-2 inline-block">
                    {reasonLabels[message.reason] || message.reason}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Message Detail Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
            <div className="p-6 border-b flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-xl font-bold text-gray-900">{selectedMessage.name}</h2>
                  <span className={`px-2 py-0.5 text-xs rounded-full ${statusColors[selectedMessage.status]}`}>
                    {selectedMessage.status}
                  </span>
                </div>
                <p className="text-sm text-gray-500">{selectedMessage.email}</p>
                <span className="text-xs text-amber-600">
                  {reasonLabels[selectedMessage.reason] || selectedMessage.reason}
                </span>
              </div>
              <button onClick={() => setSelectedMessage(null)} className="text-gray-400 hover:text-gray-600">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <p className="text-gray-700 whitespace-pre-wrap">{selectedMessage.message}</p>
              <p className="text-xs text-gray-400 mt-4">
                Received: {new Date(selectedMessage.created_at).toLocaleString()}
              </p>
            </div>
            <div className="p-6 border-t bg-gray-50 flex gap-2">
              <a
                href={`mailto:${selectedMessage.email}?subject=Re: Your message to PawsNClaws ATX`}
                onClick={() => updateStatus(selectedMessage.id, "responded")}
                className="flex-1 px-4 py-2 bg-amber-500 text-white text-center font-medium rounded-lg hover:bg-amber-600"
              >
                Reply via Email
              </a>
              <button
                onClick={() => {
                  updateStatus(selectedMessage.id, "archived");
                  setSelectedMessage(null);
                }}
                className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-100"
              >
                Archive
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
