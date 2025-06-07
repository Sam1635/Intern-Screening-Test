import React from 'react';

export default function ChatLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="layout">
      <div className="chat-box">
        {children}
      </div>
    </div>
  );
}
