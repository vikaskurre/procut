import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

const dbPath = path.join(process.cwd(), 'db.json');

async function readDb() {
  try {
    const data = await fs.readFile(dbPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return { portfolio: [] };
    }
    throw error;
  }
}

async function writeDb(data) {
  await fs.writeFile(dbPath, JSON.stringify(data, null, 2));
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const db = await readDb();
  const item = db.portfolio.find(p => p.id === parseInt(params.id));

  if (!item) {
    return NextResponse.json({ message: 'Portfolio item not found' }, { status: 404 });
  }

  return NextResponse.json(item);
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const db = await readDb();
  const index = db.portfolio.findIndex(p => p.id === parseInt(params.id));

  if (index === -1) {
    return NextResponse.json({ message: 'Portfolio item not found' }, { status: 404 });
  }

  const updatedItem = await request.json();
  // Ensure the ID is not changed
  updatedItem.id = parseInt(params.id);
  db.portfolio[index] = updatedItem;

  await writeDb(db);

  return NextResponse.json(updatedItem);
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const db = await readDb();
  const initialLength = db.portfolio.length;
  db.portfolio = db.portfolio.filter(p => p.id !== parseInt(params.id));

  if (db.portfolio.length === initialLength) {
    return NextResponse.json({ message: 'Portfolio item not found' }, { status: 404 });
  }

  await writeDb(db);

  return new NextResponse(null, { status: 204 }); // No Content
}