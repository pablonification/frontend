-- Create a new admin user account
-- Replace the email and password with your preferred credentials

-- First, let's check if the users table exists and has the right structure
-- If the table doesn't exist, uncomment and run the CREATE TABLE statement below:

/*
CREATE TABLE IF NOT EXISTS users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  role ENUM('admin', 'user') DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
*/

-- Insert a new admin user
-- NOTE: Replace 'your-email@example.com' with your desired email
-- NOTE: Replace 'your-secure-password' with your desired password
-- The password will be hashed using bcrypt (you'll need to hash it first or use Supabase auth)

-- Option 1: If you're using Supabase Auth (recommended)
-- You can create the user through the Supabase dashboard Authentication section
-- Then add their metadata to your custom users table:

INSERT INTO users (email, password_hash, full_name, role) 
VALUES (
  'admin@labkimia.ac.id', 
  '$2b$10$rOzJqQjQjQjQjQjQjQjQjOzJqQjQjQjQjQjQjQjQjQjQjQjQjQjQjQjQjQjQ', -- This is a bcrypt hash for 'admin123'
  'Admin User', 
  'admin'
) ON CONFLICT (email) DO UPDATE SET 
  role = EXCLUDED.role,
  full_name = EXCLUDED.full_name,
  updated_at = CURRENT_TIMESTAMP;

-- Option 2: If you want to use a different email/password
-- Generate a bcrypt hash for your password first (you can use an online tool or Node.js)
-- Then replace the values below:

/*
INSERT INTO users (email, password_hash, full_name, role) 
VALUES (
  'your-email@example.com', 
  'your-bcrypt-hashed-password-here', 
  'Your Name', 
  'admin'
);
*/

-- Option 3: If you're using Supabase Auth with Row Level Security (RLS)
-- You might need to create the user through Supabase Auth first
-- Then link it to your users table:

/*
-- After creating user in Supabase Auth, run:
INSERT INTO users (id, email, full_name, role) 
VALUES (
  'supabase-user-id-here', -- This comes from Supabase Auth
  'your-email@example.com', 
  'Your Name', 
  'admin'
);
*/

-- Verify the user was created
SELECT * FROM users WHERE email = 'admin@labkimia.ac.id';