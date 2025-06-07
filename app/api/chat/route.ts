// app/api/chat/route.ts
// This file defines a Next.js API route that handles chat requests.

import { streamText } from 'ai'; // Import streamText for streaming AI responses.
import { createGoogleGenerativeAI } from '@ai-sdk/google'; // Import the Google Generative AI provider from AI SDK.

// Initialize the Google Generative AI model.
// The API key is typically loaded from environment variables for security.
// Ensure process.env.GOOGLE_API_KEY is set in your .env.local file.
const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY || "", // Access API key from environment variables.
});

// Optional: Set a maximum duration for the serverless function execution.
// This is important for preventing timeouts on long AI responses.
export const maxDuration = 300; // 300 seconds (5 minutes) - adjust as needed.

// Define the POST handler for the API route.
// This function will be called when the frontend sends a POST request to /api/chat.
export async function POST(req: Request) {
  try {
    // Parse the request body to get the chat messages from the frontend.
    // The 'messages' array typically contains objects with 'role' (e.g., 'user', 'assistant') and 'content'.
    const { messages } = await req.json();

    // Call the Gemini model using the AI SDK's streamText function.
    // - model: Specifies the AI model to use (here, 'gemini-2.0-flash' from Google).
    // - messages: Passes the conversation history to the AI model.
    const result = await streamText({
      model: google('gemini-2.0-flash'), // Using Google's Gemini 2.0 Flash model for chat.
      messages, // The array of messages to send to the AI for a response.
    });

    // Return the AI's response as a streaming DataStreamResponse.
    // This allows the frontend to display the response as it's generated (typewriter effect).
    return result.toDataStreamResponse();
  } catch (error) {
    // Log any errors that occur during the API call or response processing.
    console.error('Error in chat API route:', error);

    // Return an error response to the frontend.
    return new Response(JSON.stringify({ error: 'Failed to process chat request' }), {
      status: 500, // HTTP 500 Internal Server Error.
      headers: {
        'Content-Type': 'application/json', // Specify content type as JSON.
      },
    });
  }
}
