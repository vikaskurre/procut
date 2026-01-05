import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = 'procut-portfolio';
const COLLECTION_NAME = 'portfolio';

async function getPortfolioCollection() {
  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI environment variable is not set');
  }

  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  const db = client.db(DB_NAME);
  return { collection: db.collection(COLLECTION_NAME), client };
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { collection, client } = await getPortfolioCollection();

    const item = await collection.findOne({ id: parseInt(params.id) });

    await client.close();

    if (!item) {
      return NextResponse.json({ message: 'Portfolio item not found' }, { status: 404 });
    }

    return NextResponse.json(item);
  } catch (error) {
    console.error('Error fetching portfolio item:', error);
    return NextResponse.json({ error: 'Failed to fetch portfolio item' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { collection, client } = await getPortfolioCollection();
    const updateData = await request.json();

    // Add updatedAt timestamp
    updateData.updatedAt = new Date().toISOString();

    const result = await collection.updateOne(
      { id: parseInt(params.id) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      await client.close();
      return NextResponse.json({ message: 'Portfolio item not found' }, { status: 404 });
    }

    await client.close();

    return NextResponse.json({ message: 'Portfolio item updated successfully' });
  } catch (error) {
    console.error('Error updating portfolio item:', error);
    return NextResponse.json({ error: 'Failed to update portfolio item' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const { collection, client } = await getPortfolioCollection();

    const result = await collection.deleteOne({ id: parseInt(params.id) });

    if (result.deletedCount === 0) {
      await client.close();
      return NextResponse.json({ message: 'Portfolio item not found' }, { status: 404 });
    }

    await client.close();

    return new NextResponse(null, { status: 204 }); // No Content
  } catch (error) {
    console.error('Error deleting portfolio item:', error);
    return NextResponse.json({ error: 'Failed to delete portfolio item' }, { status: 500 });
  }
}