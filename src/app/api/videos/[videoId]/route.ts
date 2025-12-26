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

export async function GET(
  request: Request,
  { params }: { params: { videoId: string } }
) {
  try {
    const db = await readDb();
    const video = db.videos.find((v: any) => v.id === params.videoId);

    if (!video) {
      return NextResponse.json({ message: 'Video not found' }, { status: 404 });
    }

    return NextResponse.json(video);
  } catch (error) {
    return NextResponse.json({ message: 'Error reading video' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { videoId: string } }
) {
  try {
    const db = await readDb();
    const videoId = params.videoId;
    const videoIndex = db.videos.findIndex((v: any) => v.id === videoId);

    if (videoIndex === -1) {
      return NextResponse.json({ message: 'Video not found' }, { status: 404 });
    }

    const updatedVideoData = await request.json();
    
    const updatedVideo = { 
      ...db.videos[videoIndex], 
      ...updatedVideoData,
      updatedAt: new Date().toISOString(),
    };

    db.videos[videoIndex] = updatedVideo;
    await writeDb(db);

    return NextResponse.json(updatedVideo);
  } catch (error) {
    return NextResponse.json({ message: 'Error updating video' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { videoId: string } }
) {
  try {
    const db = await readDb();
    const videoId = params.videoId;

    const videoIndex = db.videos.findIndex((v: any) => v.id === videoId);

    if (videoIndex === -1) {
      return NextResponse.json({ message: 'Video not found' }, { status: 404 });
    }

    db.videos.splice(videoIndex, 1);
    await writeDb(db);

    return new NextResponse(null, { status: 204 }); // No Content
  } catch (error) {
    return NextResponse.json({ message: 'Error deleting video' }, { status: 500 });
  }
}
