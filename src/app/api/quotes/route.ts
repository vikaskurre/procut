import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import nodemailer from 'nodemailer';

const dbPath = path.join(process.cwd(), 'db.json');

async function readDb() {
    const data = await fs.readFile(dbPath, 'utf-8');
    return JSON.parse(data);
}

async function writeDb(data: any) {
  await fs.writeFile(dbPath, JSON.stringify(data, null, 2), 'utf-8');
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

        // Send notification email
        sendNotificationEmail(quoteWithId);

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

export async function PUT(request: Request) {
  try {
    const { id, status } = await request.json();

    if (!id || !status) {
      return NextResponse.json({ message: 'Missing id or status' }, { status: 400 });
    }

    const db = await readDb();
    if (!db.quotes) {
      return NextResponse.json({ message: 'No quotes found' }, { status: 404 });
    }

    const quoteIndex = db.quotes.findIndex((quote: any) => quote.id === id);
    if (quoteIndex === -1) {
      return NextResponse.json({ message: 'Quote not found' }, { status: 404 });
    }

    db.quotes[quoteIndex].status = status;
    await writeDb(db);

    return NextResponse.json(db.quotes[quoteIndex]);
  } catch (error) {
    console.error('Error updating quote:', error);
    return NextResponse.json({ message: 'Error updating quote' }, { status: 500 });
  }
}