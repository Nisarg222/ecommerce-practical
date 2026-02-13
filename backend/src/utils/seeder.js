const { User, Category, sequelize } = require('../models');
const dotenv = require('dotenv');
const path = require('path');

// Load env vars
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const seedData = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected.');

        // Seed Categories
        const categories = [
            { name: 'Electronics', slug: 'electronics', image: '/uploads/electronics.jpg' },
            { name: 'Clothing', slug: 'clothing', image: '/uploads/clothing.jpg' },
            { name: 'Books', slug: 'books', image: '/uploads/books.jpg' }
        ];

        for (const cat of categories) {
             const exists = await Category.findOne({ where: { slug: cat.slug } });
             if (!exists) {
                 await Category.create(cat);
             }
        }
        console.log('Categories seeded.');

        // Seed Admin
        const adminExists = await User.findOne({ where: { role: 'admin' } });

        if (adminExists) {
            console.log('Admin user already exists.');
        } else {
             await User.create({
                name: 'Admin User',
                email: 'admin@example.com',
                password_hash: '123456',
                role: 'admin'
            });
            console.log('Admin user created successfully.');
            console.log('Email: admin@example.com');
            console.log('Password: 123456');
        }

        process.exit();

    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedData();
