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
        const newVideo = await request.json();

        // Basic validation
        if (!newVideo.title || !newVideo.category || !newVideo.versions?.[0]?.videoUrl) {
            return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
        }

        const videoWithId = { 
            ...newVideo, 
            id: crypto.randomUUID(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        db.videos.push(videoWithId);
        await writeDb(db);

        return NextResponse.json(videoWithId, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: 'Error creating video' }, { status: 500 });
    }
}

export async function GET() {
  try {
    const db = await readDb();
    return NextResponse.json(db.videos);
  } catch (error) {
    return NextResponse.json({ message: 'Error reading database' }, { status: 500 });
  }
}

