const mongoose = require('mongoose');
const User = require('../model/userModel'); // Import User model
const { seedUsers } = require('../data/users'); // Ensure the path is correct
const colors = require('colors');
const connectDb = require('../config/connectDb');

// Connect to MongoDB
connectDb();

const seedDatabase = async () => {
  try {
    const users = await seedUsers(); // Await the function to get user data
    await User.insertMany(users); // Insert user data into the database

    console.log('Database seeded successfully!'.green);
    process.exit(0); // Exit the process successfully
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1); // Exit the process with an error code
  }
};

const destroyDatabase = async () => {
  try {
    await User.deleteMany(); // Delete all user records
    console.log('Database destroyed successfully!'.bgCyan.blue);
    process.exit(0); // Exit the process successfully
  } catch (error) {
    console.error('Error destroying database:'.bgRed, error);
    process.exit(1); // Exit the process with an error code
  }
};

// Call the appropriate function based on the command-line argument
if (process.argv[2] === 'import') {
  seedDatabase(); // Seed the database
} else if (process.argv[2] === 'destroy') {
  destroyDatabase(); // Destroy the database
} else {
  console.log(
    'Invalid command. Use "import" to seed or "destroy" to delete the database.'
      .red
  );
  process.exit(1); // Exit with an error for invalid commands
}
