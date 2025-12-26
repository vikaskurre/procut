import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const dbPath = path.join(process.cwd(), 'db.json');

async function readDb() {
    const data = await fs.readFile(dbPath, 'utf-8');
    return JSON.parse(data);
}

async function writeDb(data: any) {
  await fs.writeFile(dbPath, JSON.stringify(data, null, 2), 'utf-8');
}

export async function POST(request: Request) {
    try {
        const db = await readDb();
        const newQuote = await request.json();

        // Basic validation
        if (!newQuote.name || !newQuote.emailWhatsApp || !newQuote.projectDetails) {
            return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
        }

        const quoteWithId = {
            ...newQuote,
            id: crypto.randomUUID(),
            createdAt: new Date().toISOString(),
            status: 'pending' // pending, contacted, completed, etc.
        };

        if (!db.quotes) {
            db.quotes = [];
        }

        db.quotes.push(quoteWithId);
        await writeDb(db);

        return NextResponse.json(quoteWithId, { status: 201 });
    } catch (error) {
        console.error('Error creating quote:', error);
        return NextResponse.json({ message: 'Error creating quote' }, { status: 500 });
    }
}

export async function GET() {
  try {
    const db = await readDb();
    return NextResponse.json(db.quotes || []);
  } catch (error) {
    console.error('Error reading quotes:', error);
    return NextResponse.json({ message: 'Error reading database' }, { status: 500 });
  }
}