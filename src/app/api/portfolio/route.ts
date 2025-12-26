
import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

const dbPath = path.join(process.cwd(), 'db.json');

async function readDb() {
  try {
    const data = await fs.readFile(dbPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    // If the file doesn't exist, return a default structure
    if ((error as any).code === 'ENOENT') {
      return { videos: [] };
    }
    throw error;
  }
}

export async function GET() {
  const db = await readDb();
  return NextResponse.json(db.portfolio || []);
}

export async function POST(request: Request) {
  const db = await readDb();
  const newPortfolioItem = await request.json();

  // Generate a new ID
  const newId = db.videos.length > 0 ? Math.max(...db.videos.map((item: { id: number }) => item.id)) + 1 : 1;
  newPortfolioItem.id = newId;

  db.videos.push(newPortfolioItem);

  await fs.writeFile(dbPath, JSON.stringify(db, null, 2));

  return NextResponse.json(newPortfolioItem, { status: 201 });
}
