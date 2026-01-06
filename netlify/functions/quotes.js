const fs = require('fs').promises;
const path = require('path');
const nodemailer = require('nodemailer');

const dbPath = path.join(process.cwd(), 'db.json');

async function readDb() {
  try {
    const data = await fs.readFile(dbPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return { quotes: [] };
    }
    throw error;
  }
}

async function writeDb(data) {
  await fs.writeFile(dbPath, JSON.stringify(data, null, 2));
}

async function sendNotificationEmail(quote) {
  try {
    // Configure transporter with environment variables
    const transporter = nodemailer.createTransporter({
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

exports.handler = async (event, context) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
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
    if (event.httpMethod === 'GET') {
      const db = await readDb();
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(db.quotes || [])
      };
    }

    if (event.httpMethod === 'POST') {
      const db = await readDb();
      const newQuote = JSON.parse(event.body);

      // Basic validation
      if (!newQuote.name || !newQuote.emailWhatsApp || !newQuote.projectDetails) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ message: 'Missing required fields' })
        };
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

      return {
        statusCode: 201,
        headers,
        body: JSON.stringify(quoteWithId)
      };
    }

    if (event.httpMethod === 'PUT') {
      const { id, status } = JSON.parse(event.body);

      if (!id || !status) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ message: 'Missing id or status' })
        };
      }

      const db = await readDb();
      if (!db.quotes) {
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({ message: 'No quotes found' })
        };
      }

      const quoteIndex = db.quotes.findIndex((quote) => quote.id === id);
      if (quoteIndex === -1) {
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({ message: 'Quote not found' })
        };
      }

      db.quotes[quoteIndex].status = status;
      await writeDb(db);

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(db.quotes[quoteIndex])
      };
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