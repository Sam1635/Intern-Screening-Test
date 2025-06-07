import { NextResponse } from 'next/server';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

let todos: Todo[] = [
  { id: 1, title: 'Learn Next.js', completed: false },
  { id: 2, title: 'Build an API', completed: true },
];

// GET all todos
export async function GET() {
  return NextResponse.json(todos);
}

// POST new todo
export async function POST(request: Request) {
  const body = await request.json();
  const newTodo: Todo = {
    id: Date.now(), // unique ID
    title: body.title,
    completed: body.completed ?? false,
  };
  todos.push(newTodo);
  return NextResponse.json(newTodo, { status: 201 });
}

// PATCH toggle completed
export async function PATCH(request: Request) {
  const update = await request.json();
  const index = todos.findIndex((t) => t.id === update.id);
  if (index === -1) {
    return NextResponse.json({ error: 'Todo not found' }, { status: 404 });
  }
  todos[index].completed = update.completed;
  return NextResponse.json(todos[index]);
}

// DELETE a todo
export async function DELETE(request: Request) {
  const url = new URL(request.url);
  const idParam = url.searchParams.get('id');
  if (!idParam) {
    return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
  }

  const id = Number(idParam);
  todos = todos.filter((todo) => todo.id !== id);
  return NextResponse.json({ message: 'Deleted successfully' });
}
