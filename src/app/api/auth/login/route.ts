import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const dbPath = path.join(process.cwd(), 'db.json');

async function readDb() {
    const data = await fs.readFile(dbPath, 'utf-8');
    return JSON.parse(data);
}

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    const db = await readDb();

    const user = db.users.find((u: any) => u.email === email && u.password === password);

    if (user) {
      // In a real app, you'd issue a token (e.g., JWT)
      // and you would not send the password back
      const { password, ...userWithoutPassword } = user;
      return NextResponse.json({ success: true, user: userWithoutPassword });
    } else {
      return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ success: false, message: 'An error occurred' }, { status: 500 });
  }
}
