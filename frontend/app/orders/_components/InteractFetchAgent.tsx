"use client";

import { useState, useEffect } from "react";
import { RippleButton } from "./ui/ripple-button";

interface Message {
  id: string;
  role: "user" | "agent" | "error" | "debug";
  content: string;
  timestamp: Date;
}

export default function InteractFetchAgent() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log("=== COMPONENT MOUNTED ===");
    console.log("InteractFetchAgent component loaded successfully");
  }, []);

  const handleInteractWithAgent = async () => {
    console.log("=== BUTTON CLICKED ===");
    console.log("handleInteractWithAgent called at:", new Date().toISOString());

    setIsLoading(true);

    // Use Next.js API route which proxies to the agent on port 8001
    const apiEndpoint = "/api/agent/interact";
    const debugMessage: Message = {
      id: crypto.randomUUID(),
      role: "debug",
      content: `Sending message to agent (california-coffee-shop on port 8001)`,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, debugMessage]);

    console.log("=== FRONTEND DEBUG ===");
    console.log("Timestamp:", new Date().toISOString());
    console.log("API Endpoint:", apiEndpoint);

    try {
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: "Hello from frontend!",
        }),
      });

      console.log("Response status:", response.status);
      console.log("Response ok:", response.ok);

      const data = await response.json();
      console.log("Response data:", data);

      // Add status debug message
      const statusMessage: Message = {
        id: crypto.randomUUID(),
        role: "debug",
        content: `Response Status: ${response.status} ${response.statusText}`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, statusMessage]);

      if (response.ok) {
        // Add user message
        const userMessage: Message = {
          id: crypto.randomUUID(),
          role: "user",
          content: "Hello from frontend!",
          timestamp: new Date(),
        };

        // Add agent response
        const agentMessage: Message = {
          id: crypto.randomUUID(),
          role: "agent",
          content: data.message || "Connected to california-coffee-shop agent",
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage, agentMessage]);
        setIsConnected(true);
      } else {
        // Handle non-ok responses
        const errorMessage: Message = {
          id: crypto.randomUUID(),
          role: "error",
          content: `Connection failed: ${response.status} ${
            response.statusText
          }. ${data.details || data.message || ""}`,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, errorMessage]);
      }
    } catch (error) {
      console.error("=== FETCH ERROR ===");
      console.error(
        "Error type:",
        error instanceof Error ? error.constructor.name : typeof error
      );
      console.error(
        "Error message:",
        error instanceof Error ? error.message : String(error)
      );
      console.error("Full error:", error);

      // Show detailed error in UI
      const errorMessage: Message = {
        id: crypto.randomUUID(),
        role: "error",
        content: `Network error: ${
          error instanceof Error ? error.message : String(error)
        }. Make sure the agent is running: cd agent && python agent.py`,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
      setIsConnected(false);
    } finally {
      console.log("=== REQUEST COMPLETE ===");
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
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-medium text-zinc-600">
              Conversation History ({messages.length} messages)
            </h3>
            <button
              type="button"
              onClick={() => setMessages([])}
              className="text-xs text-zinc-500 hover:text-zinc-700 underline"
            >
              Clear
            </button>
          </div>
          <div className="space-y-2 rounded-lg border border-zinc-200 bg-zinc-50 p-4 max-h-96 overflow-y-auto">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`text-sm p-2 rounded ${
                  msg.role === "agent"
                    ? "text-blue-600 font-medium bg-blue-50"
                    : msg.role === "error"
                    ? "text-red-600 font-medium bg-red-50 border border-red-200"
                    : msg.role === "debug"
                    ? "text-orange-600 font-mono text-xs bg-orange-50"
                    : "text-zinc-700 bg-white"
                }`}
              >
                <span className="font-semibold">
                  {msg.role === "agent"
                    ? "Agent"
                    : msg.role === "error"
                    ? "Error"
                    : msg.role === "debug"
                    ? "Debug"
                    : "You"}
                  :
                </span>{" "}
                {msg.content}
                <div className="text-xs text-zinc-400 mt-1">
                  {msg.timestamp.toLocaleTimeString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center gap-2 text-xs">
        <div
          className={`w-2 h-2 rounded-full ${
            isConnected ? "bg-green-500" : "bg-gray-400"
          }`}
        />
        <p className="text-zinc-500">
          {isConnected
            ? "Status: Connected to Fetch Agent"
            : "Status: Not connected"}
        </p>
      </div>
    </div>
  );
}
