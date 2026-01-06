import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';
import nodemailer from 'nodemailer';

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = 'procut-portfolio';
const COLLECTION_NAME = 'quotes';

async function getQuotesCollection() {
  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI environment variable is not set');
  }

  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  const db = client.db(DB_NAME);
  return { collection: db.collection(COLLECTION_NAME), client };
}

async function sendNotificationEmail(quote: any) {
  try {
    // Configure transporter with environment variables
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const emailContent = `
New Quote Request Received!

Name: ${quote.name}
Email/WhatsApp: ${quote.emailWhatsApp}
Project Details: ${quote.projectDetails}
Reference Style: ${quote.referenceStyle || 'Not provided'}
Raw Footage Link: ${quote.rawFootageLink || 'Not provided'}
Submitted At: ${quote.createdAt}

Please review and respond to this quote request.
    `;

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.NOTIFICATION_EMAIL || process.env.SMTP_USER, // Send to yourself or specified email
      subject: 'New Quote Request - ProCut Portfolio',
      text: emailContent,
    };

    await transporter.sendMail(mailOptions);
    console.log('Notification email sent successfully');
  } catch (error) {
    console.error('Error sending notification email:', error);
    // Don't throw error - we don't want email failure to break the API
  }
}

export async function POST(request: Request) {
    try {
        const { collection, client } = await getQuotesCollection();
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

        await collection.insertOne(quoteWithId);
        await client.close();

        // Send notification email
        sendNotificationEmail(quoteWithId);

        return NextResponse.json(quoteWithId, { status: 201 });
    } catch (error) {
        console.error('Error creating quote:', error);
        // Fallback: if MongoDB fails, still send email but don't save to DB
        try {
            const newQuote = await request.json();
            const quoteWithId = {
                ...newQuote,
                id: crypto.randomUUID(),
                createdAt: new Date().toISOString(),
                status: 'pending'
            };
            sendNotificationEmail(quoteWithId);
            return NextResponse.json({ ...quoteWithId, note: 'Quote received but not saved due to database error' }, { status: 201 });
        } catch (fallbackError) {
            console.error('Fallback also failed:', fallbackError);
            return NextResponse.json({ message: 'Error creating quote' }, { status: 500 });
        }
    }
}

export async function GET() {
  try {
    const { collection, client } = await getQuotesCollection();

    const quotes = await collection
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    await client.close();

    return NextResponse.json(quotes);
  } catch (error) {
    console.error('Error fetching quotes:', error);
    // Fallback: return empty array if MongoDB fails
    return NextResponse.json([]);
  }
}

export async function PUT(request: Request) {
  try {
    const { id, status } = await request.json();

    if (!id || !status) {
      return NextResponse.json({ message: 'Missing id or status' }, { status: 400 });
    }

    const { collection, client } = await getQuotesCollection();

    const result = await collection.updateOne(
      { id: id },
      { $set: { status: status } }
    );

    if (result.matchedCount === 0) {
      await client.close();
      return NextResponse.json({ message: 'Quote not found' }, { status: 404 });
    }

    // Fetch updated quote
    const updatedQuote = await collection.findOne({ id: id });
    await client.close();

    return NextResponse.json(updatedQuote);
  } catch (error) {
    console.error('Error updating quote:', error);
    return NextResponse.json({ message: 'Error updating quote' }, { status: 500 });
  }
}