const bcrypt = require('bcrypt');

// Function to generate bcrypt hash
async function generateHash(password) {
  try {
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);
    console.log('Password:', password);
    console.log('Bcrypt Hash:', hash);
    return hash;
  } catch (error) {
    console.error('Error generating hash:', error);
  }
}

// Get password from command line argument or use default
const password = process.argv[2] || 'admin123';

generateHash(password);