const { MongoClient } = require('mongodb');

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = 'procut-portfolio';
const COLLECTION_NAME = 'portfolio';

// Fallback data for when MongoDB is not available
const fallbackPortfolioData = [
  {
    id: 1,
    title: "Luxury Real Estate Drone Footage",
    description: "Professional aerial cinematography for high-end real estate showcasing. Capturing stunning landscapes and property features with cinematic angles.",
    category: "Real Estate",
    order: 1,
    visible: true,
    media: [{ type: "video", url: "https://youtu.be/DKrIVfpWAqE?si=JTui1srQWV2ny400" }],
    thumbnailUrl: "",
    createdAt: "2025-12-26T10:00:00.000Z",
    updatedAt: "2025-12-26T10:00:00.000Z",
    ownerId: ""
  },
  {
    id: 2,
    title: "Corporate Interview Reel",
    description: "Professional interview production for corporate clients. High-quality lighting, sound, and editing for executive presentations.",
    category: "Interviews",
    order: 2,
    visible: true,
    media: [{ type: "video", url: "https://youtu.be/GzHI1R4KIsk?si=vPA8-eKFIfw202Bm" }],
    thumbnailUrl: "",
    createdAt: "2025-12-26T10:00:00.000Z",
    updatedAt: "2025-12-26T10:00:00.000Z",
    ownerId: ""
  },
  {
    id: 3,
    title: "Viral Social Media Reel",
    description: "Engaging short-form content optimized for Instagram and TikTok. Fast-paced editing with trending music and effects.",
    category: "Reels",
    order: 3,
    visible: true,
    media: [{ type: "video", url: "https://youtu.be/UmuvFYXHAFA?si=uDrIUBTB0_hAx4X-" }],
    thumbnailUrl: "",
    createdAt: "2025-12-26T10:00:00.000Z",
    updatedAt: "2025-12-26T10:00:00.000Z",
    ownerId: ""
  }
];

async function getPortfolioCollection() {
  if (!MONGODB_URI) {
    console.log('MongoDB URI not set, using fallback data');
    return { collection: null, client: null, useFallback: true };
  }

  try {
    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    const db = client.db(DB_NAME);
    return { collection: db.collection(COLLECTION_NAME), client, useFallback: false };
  } catch (error) {
    console.error('MongoDB connection failed, using fallback:', error.message);
    return { collection: null, client: null, useFallback: true };
  }
}

exports.handler = async (event, context) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  try {
    console.log('MongoDB URI exists:', !!process.env.MONGODB_URI);
    console.log('Request method:', event.httpMethod);
    console.log('Request path:', event.path);
    const pathParts = event.path.split('/');
    const isIdRoute = pathParts.length > 2 && pathParts[pathParts.length - 2] === 'portfolio';

    if (isIdRoute) {
      // Handle /api/portfolio/[id] routes
      const id = pathParts[pathParts.length - 1];

      if (event.httpMethod === 'GET') {
        const { collection, client } = await getPortfolioCollection();
        const item = await collection.findOne({ id: parseInt(id) });
        await client.close();

        if (!item) {
          return {
            statusCode: 404,
            headers,
            body: JSON.stringify({ message: 'Portfolio item not found' })
          };
        }

        return {
          statusCode: 200,
          headers,
          body: JSON.stringify(item)
        };
      }

      if (event.httpMethod === 'PUT') {
        const { collection, client } = await getPortfolioCollection();
        const updateData = JSON.parse(event.body);

        // Add updatedAt timestamp
        updateData.updatedAt = new Date().toISOString();

        const result = await collection.updateOne(
          { id: parseInt(id) },
          { $set: updateData }
        );

        if (result.matchedCount === 0) {
          await client.close();
          return {
            statusCode: 404,
            headers,
            body: JSON.stringify({ message: 'Portfolio item not found' })
          };
        }

        await client.close();
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({ message: 'Portfolio item updated successfully' })
        };
      }

      if (event.httpMethod === 'DELETE') {
        const { collection, client } = await getPortfolioCollection();

        const result = await collection.deleteOne({ id: parseInt(id) });

        if (result.deletedCount === 0) {
          await client.close();
          return {
            statusCode: 404,
            headers,
            body: JSON.stringify({ message: 'Portfolio item not found' })
          };
        }

        await client.close();
        return {
          statusCode: 204,
          headers,
          body: ''
        };
      }
    } else {
      // Handle /api/portfolio routes
      if (event.httpMethod === 'GET') {
        const { collection, client, useFallback } = await getPortfolioCollection();

        let portfolioItems;
        if (useFallback) {
          portfolioItems = fallbackPortfolioData.filter(item => item.visible);
        } else {
          portfolioItems = await collection
            .find({ visible: true })
            .sort({ order: 1 })
            .toArray();

          // Transform MongoDB documents to match frontend interface
          portfolioItems = portfolioItems.map((item) => ({
            ...item,
            id: item.id || item._id.toString(),
            _id: undefined // Remove MongoDB _id from response
          }));

          await client.close();
        }

        return {
          statusCode: 200,
          headers,
          body: JSON.stringify(portfolioItems)
        };
      }

      if (event.httpMethod === 'POST') {
        const { collection, client } = await getPortfolioCollection();
        const newItem = JSON.parse(event.body);

        // Generate new ID
        const existingItems = await collection.find({}).toArray();
        const maxId = existingItems.length > 0 ? Math.max(...existingItems.map(item => item.id || 0)) : 0;
        newItem.id = maxId + 1;
        newItem.createdAt = new Date().toISOString();
        newItem.updatedAt = new Date().toISOString();

        await collection.insertOne(newItem);
        await client.close();

        return {
          statusCode: 201,
          headers,
          body: JSON.stringify(newItem)
        };
      }
    }

    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ message: 'Method not allowed' })
    };

  } catch (error) {
    console.error('API Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Internal server error',
        message: error.message
      })
    };
  }
};