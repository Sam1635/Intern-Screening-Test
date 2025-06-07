'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  return (
    <main style={styles.container}>
      <h1 style={styles.heading}>Internship Project Parts</h1>
      <div style={styles.buttonGroup}>
        <button
          style={styles.button}
          onClick={() => router.push('/part3')}
          aria-label="Go to Part 3"
        >
          Part 3: AI Integration
        </button>

        <button
          style={styles.button}
          onClick={() => router.push('/part4')}
          aria-label="Go to Part 4"
        >
          Part 4: Developer Mindset
        </button>
      </div>
    </main>
  );
}

// Inline styles as plain JavaScript object
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f0f4ff',
    fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    padding: '1rem',
  },
  heading: {
    fontSize: '2.2rem',
    fontWeight: 'bold',
    color: '#334e8c',
    marginBottom: '2rem',
  },
  buttonGroup: {
    display: 'flex',
    gap: '1.5rem',
  },
  button: {
    padding: '1rem 2rem',
    fontSize: '1.05rem',
    fontWeight: 600,
    backgroundColor: '#5563f7',
    color: '#ffffff',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 6px 15px rgba(85, 99, 247, 0.4)',
  },
};
