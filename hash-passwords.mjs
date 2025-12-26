import fs from 'fs/promises';
import bcrypt from 'bcrypt';
import path from 'path';

const dbPath = path.join(process.cwd(), 'db.json');
const saltRounds = 10;

async function hashPasswords() {
  try {
    const data = await fs.readFile(dbPath, 'utf-8');
    const db = JSON.parse(data);

    if (!db.users || !Array.isArray(db.users)) {
      console.log('No "users" array found in db.json. Nothing to do.');
      return;
    }
    
    let passwordsHashed = 0;
    for (const user of db.users) {
      // Check if password is not already hashed
      if (user.password && !user.password.startsWith('$2b$')) {
        const hashedPassword = await bcrypt.hash(user.password, saltRounds);
        user.password = hashedPassword;
        passwordsHashed++;
        console.log(`Hashed password for user: ${user.email}`);
      } else {
        console.log(`Password for ${user.email} is already hashed or empty. Skipping.`);
      }
    }

    if (passwordsHashed > 0) {
      await fs.writeFile(dbPath, JSON.stringify(db, null, 2));
      console.log(`
Successfully hashed ${passwordsHashed} password(s) and updated db.json.`);
    } else {
      console.log('\nNo new passwords to hash.');
    }

  } catch (error) {
    console.error('An error occurred while hashing passwords:', error);
  }
}

hashPasswords();
