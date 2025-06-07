"use client";

import React, { useRef, useEffect, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { motion, AnimatePresence } from "framer-motion";
import { FaUserCircle, FaRobot, FaPaperPlane, FaSpinner } from "react-icons/fa";
import "./ChatBot.css";

const LoadingDots = () => (
  <div className="loading-dots">
    {[0, 0.2, 0.4].map((delay, idx) => (
      <motion.span
        key={idx}
        className="dot"
        animate={{ y: ["0%", "-50%", "0%"] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut", delay }}
      />
    ))}
  </div>
);

// Client-only timestamp component to avoid hydration mismatch
function Timestamp() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const now = new Date();
    setTime(now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
  }, []);

  if (!time) return null;
  return <div className="timestamp">{time}</div>;
}

export default function ChatBot() {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat({ api: "/api/chat" });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    
    <div className="chat-wrapper">
      <h1></h1>
      <div className="chat-container">
        <div className="chat-header">AI CHATBOT</div>

        <div className="chat-messages custom-scrollbar">
          <AnimatePresence>
            {messages.length === 0 && !isLoading && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="chat-empty"
              >
                <p>👋 Hello! How can I help you today?</p>
                <p>Type your message below to start our conversation.</p>
              </motion.div>
            )}

            {messages.map((m) => {
              const isUser = m.role === "user";
              return (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className={`chat-message ${isUser ? "user" : "bot"}`}
                >
                  {!isUser && <FaRobot className="avatar bot-avatar" />}

                  <div className={`message-bubble ${isUser ? "user-bubble" : "bot-bubble"}`}>
                    {m.content}
                    <Timestamp />
                  </div>

                  {isUser && <FaUserCircle className="avatar user-avatar" />}
                </motion.div>
              );
            })}

            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="chat-message bot"
              >
                <div className="message-bubble bot-bubble">
                  <LoadingDots />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {error && <div className="error">Error: {error.message}. Please try again.</div>}

          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} className="chat-form">
          <input
            type="text"
            placeholder={isLoading ? "AI is thinking..." : "Type your message..."}
            value={input}
            onChange={handleInputChange}
            disabled={isLoading}
            className="chat-input"
            aria-label="Type your message"
          />
          <button
            type="submit"
            disabled={isLoading || input.trim() === ""}
            className="send-btn"
            aria-label="Send message"
          >
            {isLoading ? <FaSpinner className="icon spin" /> : <FaPaperPlane className="icon" />}
          </button>
        </form>
      </div>
      <h6>© Chatbot Powerd by Gemini Ai By Sam</h6>
    </div>
  );
}
