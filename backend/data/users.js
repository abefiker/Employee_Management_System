const bcrypt = require('bcryptjs');

exports.seedUsers = async () => {
  const hashedPassword1 = await bcrypt.hash('password123', 10);
  const hashedPassword2 = await bcrypt.hash('password123', 10);
  const hashedPassword3 = await bcrypt.hash('password123', 10);
  const hashedPassword4 = await bcrypt.hash('password123', 10);

  return [
    {
      name: 'Abemelek Daniel',
      email: 'kidabemelek@gmail.com',
      password: hashedPassword1,
      phone: '0123456789', // Add a valid phone number
      position: 'Software Engineer', // Add position
      department: 'IT', // Add department
      hireDate: new Date('2022-01-15'), // Add hire date
      isAdmin: false,
    },
    {
      name: 'Admin',
      email: 'admin@gmail.com',
      password: hashedPassword2,
      phone: '0987654321', // Add a valid phone number
      position: 'Administrator', // Add position
      department: 'Administration', // Add department
      hireDate: new Date('2020-06-20'), // Add hire date
      isAdmin: true,
    },
    {
      name: 'Alice Johnson',
      email: 'alice.johnson@example.com',
      password: hashedPassword3,
      phone: '0234567890', // Add a valid phone number
      position: 'Project Manager', // Add position
      department: 'Management', // Add department
      hireDate: new Date('2021-03-10'), // Add hire date
      isAdmin: false,
    },
    {
      name: 'Bob Smith',
      email: 'bob.smith@example.com',
      password: hashedPassword4,
      phone: '0345678901', // Add a valid phone number
      position: 'Data Analyst', // Add position
      department: 'Analytics', // Add department
      hireDate: new Date('2023-08-15'), // Add hire date
      isAdmin: false,
    },
  ];
};
