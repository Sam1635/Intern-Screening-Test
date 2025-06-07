'use client';

import React, { useEffect, useState } from 'react';
import { FaSearch, FaFileAlt } from 'react-icons/fa';
import './NotesSync.css';
import { listNotes } from '@notesync/functions';
import { Note } from '@notesync/schema';
export default function NotesSyncPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchNotes = async (search: string) => {
    setLoading(true);
    const result = await listNotes({
      query: search,
      includeArchived: false,
      maxResults: 20,
      cursor: undefined,
    });
    setNotes(result.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchNotes('');
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    fetchNotes(value);
  };

  return (
    <div className="page-wrapper">
      <div className="notes-box">
        <div className="notes-header">
          <h1 className="notes-title">
            <FaFileAlt className="icon" /> NoteSync
          </h1>
          <div className="search-container">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search notes..."
              value={query}
              onChange={handleSearchChange}
              className="search-input"
            />
          </div>
        </div>

        <div className="notes-content">
          {loading ? (
            <p>Loading notes...</p>
          ) : notes.length === 0 ? (
            <p>No notes found.</p>
          ) : (
            notes.map((note) => (
              <div key={note.id} className="note-card">
                <h3 className="note-title">{note.title}</h3>
                <p className="note-preview">{note.content}</p>
                <p className="note-time">
                  Last edited: {new Date(note.lastEdited).toLocaleString()}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
