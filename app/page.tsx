'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { FaLaptopCode, FaRobot, FaClipboardCheck, FaArrowRight ,FaPencilAlt} from 'react-icons/fa';
import './Home.css'; // Importing the custom CSS

export default function Home() {
  const router = useRouter();

  const projects = [
    { name: 'Todo List', link: '/todos', icon: <FaLaptopCode /> },
    { name: 'NoteSync', link: '/notes', icon: <FaPencilAlt /> },
    { name: 'AI Chatbot', link: '/chat', icon: <FaRobot /> },
    { name: 'Documents', link: '/doc', icon: <FaClipboardCheck /> }
  ];

  return (
    <main className="main-container">
      <div className="card">
        <h1 className="title">Sam Jebaraj</h1>
        <h2 className="subtitle">
          Explore a collection of my internship projects, of the intership drive.
        </h2>

        <div className="button-group">
          {projects.map((project) => (
            <button key={project.name} className="project-button" onClick={() => router.push(project.link)}>
              <div className="button-content">
                <span className="icon">{project.icon}</span>
                <span className="text">{project.name}</span>
              </div>
              <FaArrowRight className="arrow" />
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
