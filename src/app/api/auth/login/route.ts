import { NextResponse } from 'next/server';

// Hardcoded user credentials for Netlify compatibility
const users = [
  {
    id: 'user-1-owner',
    email: 'vikaskurre80@gmail.com',
    password: 'procut1000cr',
    name: 'Vikas Kurre',
    role: 'Owner'
  }
];

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const user = users.find((u: any) => u.email === email && u.password === password);

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
