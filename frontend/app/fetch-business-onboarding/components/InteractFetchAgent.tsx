"use client";

import { useState } from "react";
import { RippleButton } from "./ui/ripple-button";

interface Message {
  id: string;
  role: "user" | "agent";
  content: string;
  timestamp: Date;
}

export default function InteractFetchAgent() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInteractWithAgent = async () => {
    setIsLoading(true);

    try {
      // TODO: Replace with actual backend endpoint when ready
      const response = await fetch("/api/agent/interact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: "Hello from frontend",
          previousMessages: messages,
        }),
      });

      if (response.ok) {
        const data = await response.json();

        // Add user message
        const userMessage: Message = {
          id: crypto.randomUUID(),
          role: "user",
          content: "Interaction initiated",
          timestamp: new Date(),
        };

        // Add agent response
        const agentMessage: Message = {
          id: crypto.randomUUID(),
          role: "agent",
          content: data.message || "Connected to agent",
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage, agentMessage]);
        setIsConnected(true);
      }
    } catch (error) {
      console.error("Failed to connect to agent:", error);

      // For now, show a mock connection since backend isn't ready
      const mockMessage: Message = {
        id: crypto.randomUUID(),
        role: "agent",
        content: "Agent interaction initiated (mock mode)",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, mockMessage]);
      setIsConnected(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <RippleButton
        onClick={handleInteractWithAgent}
        disabled={isLoading}
        className="min-w-[200px]"
      >
        {isLoading ? "Connecting..." : "Interact with Agent"}
      </RippleButton>

      {messages.length > 0 && (
        <div className="mt-4 w-full max-w-md space-y-2">
          <h3 className="text-sm font-medium text-zinc-600">
            Conversation History
          </h3>
          <div className="space-y-2 rounded-lg border border-zinc-200 bg-zinc-50 p-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`text-sm ${
                  msg.role === "agent"
                    ? "text-blue-600 font-medium"
                    : "text-zinc-700"
                }`}
              >
                <span className="font-semibold">
                  {msg.role === "agent" ? "Agent" : "You"}:
                </span>{" "}
                {msg.content}
              </div>
            ))}
          </div>
        </div>
      )}

      {isConnected && (
        <p className="text-xs text-zinc-500">
          Status: Connected to Fetch Agent
        </p>
      )}
    </div>
  );
}
