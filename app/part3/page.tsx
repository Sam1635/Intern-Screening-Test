'use client';
import React from 'react';

export default function Part3Page() {
  return (
    <main style={styles.container}>
      <h2 style={styles.heading}>Part 3: AI Integration</h2>
      <iframe
        src="\AI INTEGRATION (CURIOSITY + OPTIONAL CODE).pdf"
        style={styles.iframe}
        title="AI INTEGRATION (CURIOSITY + OPTIONAL CODE) PDF"
      ></iframe>
    </main>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: '2rem',
    height: '100vh',
    backgroundColor: '#f9fafc',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  heading: {
    marginBottom: '1rem',
    fontSize: '1.8rem',
    fontWeight: 'bold',
    color: '#333',
  },
  iframe: {
    width: '100%',
    maxWidth: '960px',
    height: '80vh',
    border: '1px solid #ccc',
    borderRadius: '8px',
  },
};

