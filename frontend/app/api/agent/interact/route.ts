import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";

// Agent URL (Fetch.ai uagent running on port 8001)
const AGENT_URL = process.env.AGENT_URL || "http://localhost:8001";

export async function POST(request: NextRequest) {
  console.log("=== NEXT.JS API ROUTE ===");
  console.log("Received request at:", new Date().toISOString());
  console.log("Agent URL:", AGENT_URL);

  try {
    const body = await request.json();
    console.log("Request body:", body);

    // Create uagents envelope format
    const envelope = {
      version: 1,
      sender: "frontend-user",
      target: "california-coffee-shop",
      session: randomUUID(),
      schema_digest: "chat_message",
      payload: {
        timestamp: new Date().toISOString(),
        msg_id: randomUUID(),
        content: [
          {
            type: "text",
            text: body.message || "Hello from frontend!",
          },
        ],
      },
    };

    console.log("Sending envelope to agent:", envelope);

    // Forward the request to the agent's /submit endpoint
    const response = await fetch(`${AGENT_URL}/submit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(envelope),
    });

    console.log("Agent response status:", response.status);
    console.log("Agent response ok:", response.ok);

    const responseText = await response.text();
    console.log("Agent response:", responseText);

    if (!response.ok) {
      console.error("Agent error response:", responseText);

      return NextResponse.json(
        {
          error: "Agent request failed",
          details: responseText,
          status: response.status,
        },
        { status: response.status }
      );
    }

    // Try to parse as JSON, fallback to text
    let data;
    try {
      data = JSON.parse(responseText);
    } catch {
      data = { message: responseText, status: "sent" };
    }

    console.log("Agent response data:", data);

    return NextResponse.json({
      message: "Message sent to agent successfully",
      agent: "california-coffee-shop",
      agentResponse: data,
    });
  } catch (error) {
    console.error("=== API ROUTE ERROR ===");
    console.error(
      "Error type:",
      error instanceof Error ? error.constructor.name : typeof error
    );
    console.error(
      "Error message:",
      error instanceof Error ? error.message : String(error)
    );
    console.error("Full error:", error);

    return NextResponse.json(
      {
        error: "Failed to connect to agent",
        message: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
