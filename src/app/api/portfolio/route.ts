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

export async function GET() {
  try {
    const { collection, client } = await getPortfolioCollection();

    const portfolioItems = await collection
      .find({ visible: true })
      .sort({ order: 1 })
      .toArray();

    await client.close();

    // Transform MongoDB documents to match frontend interface
    const transformedItems = portfolioItems.map((item: any) => ({
      ...item,
      id: item.id || item._id.toString(), // Use existing id or convert _id to string
      _id: undefined // Remove MongoDB _id from response
    }));

    return NextResponse.json(transformedItems);
  } catch (error) {
    console.error('Error fetching portfolio:', error);
    // Fallback to hardcoded data if MongoDB fails
    const portfolioData = [
      {
        "id": 1,
        "title": "Luxury Real Estate Drone Footage",
        "description": "Professional aerial cinematography for high-end real estate showcasing. Capturing stunning landscapes and property features with cinematic angles.",
        "category": "Real Estate",
        "order": 1,
        "visible": true,
        "media": [
          {
            "type": "video",
            "url": "https://youtu.be/DKrIVfpWAqE?si=JTui1srQWV2ny400"
          }
        ],
        "thumbnailUrl": "",
        "createdAt": "2025-12-26T10:00:00.000Z",
        "updatedAt": "2025-12-26T10:00:00.000Z",
        "ownerId": ""
      },
      {
        "id": 2,
        "title": "Corporate Interview Reel",
        "description": "Professional interview production for corporate clients. High-quality lighting, sound, and editing for executive presentations.",
        "category": "Interviews",
        "order": 2,
        "visible": true,
        "media": [
          {
            "type": "video",
            "url": "https://youtu.be/GzHI1R4KIsk?si=vPA8-eKFIfw202Bm"
          }
        ],
        "thumbnailUrl": "",
        "createdAt": "2025-12-26T10:00:00.000Z",
        "updatedAt": "2025-12-26T10:00:00.000Z",
        "ownerId": ""
      },
      {
        "id": 3,
        "title": "Viral Social Media Reel",
        "description": "Engaging short-form content optimized for Instagram and TikTok. Fast-paced editing with trending music and effects.",
        "category": "Reels",
        "order": 3,
        "visible": true,
        "media": [
          {
            "type": "video",
            "url": "https://youtu.be/UmuvFYXHAFA?si=uDrIUBTB0_hAx4X-"
          }
        ],
        "thumbnailUrl": "",
        "createdAt": "2025-12-26T10:00:00.000Z",
        "updatedAt": "2025-12-26T10:00:00.000Z",
        "ownerId": ""
      },
      {
        "id": 4,
        "title": "Brand Commercial Campaign",
        "description": "Complete brand storytelling through visual narrative. From concept to final delivery with professional post-production.",
        "category": "Ads",
        "order": 4,
        "visible": true,
        "media": [
          {
            "type": "video",
            "url": "https://youtu.be/miBDRJuQ6Cs?si=mqcJHwOublgVU3qf"
          }
        ],
        "thumbnailUrl": "",
        "createdAt": "2025-12-26T10:00:00.000Z",
        "updatedAt": "2025-12-26T10:00:00.000Z",
        "ownerId": ""
      },
      {
        "id": 5,
        "title": "Cinematic Wedding Film",
        "description": "Emotional storytelling through cinematic wedding photography. Artistic composition and professional editing for memorable moments.",
        "category": "Cinematic",
        "order": 5,
        "visible": true,
        "media": [
          {
            "type": "video",
            "url": "https://youtu.be/4rpSmRU-Yi8?si=71Q_8W9UcdYoOg7q"
          }
        ],
        "thumbnailUrl": "",
        "createdAt": "2025-12-26T10:00:00.000Z",
        "updatedAt": "2025-12-26T10:00:00.000Z",
        "ownerId": ""
      }
    ];

    return NextResponse.json(portfolioData);
  }
}

export async function POST(request: Request) {
  try {
    const { collection, client } = await getPortfolioCollection();
    const newItem = await request.json();

    // Generate new ID
    const existingItems = await collection.find({}).toArray();
    const maxId = existingItems.length > 0 ? Math.max(...existingItems.map(item => item.id || 0)) : 0;
    newItem.id = maxId + 1;
    newItem.createdAt = new Date().toISOString();
    newItem.updatedAt = new Date().toISOString();

    await collection.insertOne(newItem);
    await client.close();

    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    console.error('Error creating portfolio item:', error);
    return NextResponse.json({ error: 'Failed to create portfolio item' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.pathname.split('/').pop();

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const { collection, client } = await getPortfolioCollection();
    const updateData = await request.json();

    // Remove id from update data since it shouldn't be updated
    delete updateData.id;

    // Add updatedAt timestamp
    updateData.updatedAt = new Date().toISOString();

    const result = await collection.updateOne(
      { id: parseInt(id) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      await client.close();
      return NextResponse.json({ error: 'Portfolio item not found' }, { status: 404 });
    }

    await client.close();

    return NextResponse.json({ message: 'Portfolio item updated successfully' });
  } catch (error) {
    console.error('Error updating portfolio item:', error);
    return NextResponse.json({ error: 'Failed to update portfolio item' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.pathname.split('/').pop();

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const { collection, client } = await getPortfolioCollection();

    const result = await collection.deleteOne({ id: parseInt(id) });

    if (result.deletedCount === 0) {
      await client.close();
      return NextResponse.json({ error: 'Portfolio item not found' }, { status: 404 });
    }

    await client.close();

    return NextResponse.json({ message: 'Portfolio item deleted successfully' });
  } catch (error) {
    console.error('Error deleting portfolio item:', error);
    return NextResponse.json({ error: 'Failed to delete portfolio item' }, { status: 500 });
  }
}
