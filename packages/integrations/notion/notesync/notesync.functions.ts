import z from 'zod';
import { ListNotesSchema, type ListNotesResponse, type Note } from './notesync.schema';

// Mock database
const NOTES_DB: Note[] = [
  {
    id: 'note_001',
    title: 'Project Kickoff',
    content: 'Goals and timelines',
    lastEdited: new Date(),
    isArchived: false
  },
  {
    id: 'note_002',
    title: 'Project',
    content: 'finish it today',
    lastEdited: new Date(),
    isArchived: false
  },
  {
    id: 'note_003',
    title: 'Meeting Notes',
    content: 'Client meeting. Discussed new features for version 2.0. Need to prioritize based on user feedback. Follow-up on action items by Friday.',
    lastEdited: new Date('2025-05-22T14:30:00Z'),
    isArchived: false
  },
  {
    id: 'note_004',
    title: 'Research Ideas',
    content: 'Exploring new AI models for content generation. Looking into GPT-4o capabilities and integration. Potential for new product line.',
    lastEdited: new Date('2025-05-23T09:15:00Z'),
    isArchived: true // Archived note
  },
  {
    id: 'note_005',
    title: 'Marketing Plan',
    content: 'Drafted Q4 marketing strategy. Focus on social media campaigns and influencer partnerships. Budget allocation finalized next week.',
    lastEdited: new Date('2025-05-24T16:00:00Z'),
    isArchived: false
  },
  {
    id: 'note_006',
    title: 'Bug Fixes',
    content: 'Resolved critical bug in payment gateway. Deployed hotfix to production. Monitoring system shows stable performance.',
    lastEdited: new Date('2025-05-25T10:30:00Z'),
    isArchived: false
  },
  {
    id: 'note_007',
    title: 'Backend Refactor',
    content: 'Started refactoring user authentication module. Aiming for cleaner code and better security practices. Expected completion by end of month.',
    lastEdited: new Date('2025-05-26T13:00:00Z'),
    isArchived: false
  },
  {
    id: 'note_008',
    title: 'Team Building',
    content: 'Planned team outing for next month. Suggestions include escape room or bowling. Will send out a poll for preferences.',
    lastEdited: new Date('2025-05-27T09:00:00Z'),
    isArchived: false
  },
  {
    id: 'note_009',
    title: 'Documentation Update',
    content: 'Updated API documentation for version 1.2. Added new endpoints and clarified existing ones. Published to internal wiki.',
    lastEdited: new Date('2025-05-28T11:45:00Z'),
    isArchived: true // Archived note
  },
  {
    id: 'note_010',
    title: 'Deployment Checklist',
    content: 'Final checks before next release. Database migrations, environment variables, feature flags. All green.',
    lastEdited: new Date('2025-05-29T15:00:00Z'),
    isArchived: false
  },
  {
    id: 'note_011',
    title: 'New Feature Brainstorm',
    content: 'Ideas for next quarter. Integrations with third-party services. Enhanced user personalization. Initial thoughts are promising.',
    lastEdited: new Date('2025-05-30T10:00:00Z'),
    isArchived: false
  },
  {
    id: 'note_012',
    title: 'Follow-up Email',
    content: 'Sent follow-up email to potential client. Included proposal and case studies. Awaiting response by end of week.',
    lastEdited: new Date('2025-05-31T09:00:00Z'),
    isArchived: false
  }
  // ...more notes
];

export async function listNotes(
  params: z.infer<typeof ListNotesSchema>
): Promise<ListNotesResponse> {
  const { maxResults, query, includeArchived, cursor } = params;

  // Filtering
  let results = NOTES_DB.filter(note => 
    includeArchived ? true : !note.isArchived
  );

  // Search
  if (query) {
    results = results.filter(note => 
      `${note.title} ${note.content}`
        .toLowerCase()
        .includes(query.toLowerCase())
    );
  }

  // Pagination
  const startIdx = cursor ? parseInt(atob(cursor)) : 0;
  const paginated = results.slice(startIdx, startIdx + maxResults);

  return {
    data: paginated,
    hasMore: startIdx + maxResults < results.length,
    nextCursor: paginated.length 
      ? btoa(String(startIdx + maxResults))
      : undefined
  };
}