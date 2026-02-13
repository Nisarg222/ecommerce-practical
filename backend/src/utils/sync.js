const { sequelize } = require('../models');

const syncDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected.');
        await sequelize.sync({ alter: true });
        console.log('Database synced successfully.');
        process.exit();
    } catch (error) {
        console.error('Unable to connect/sync database:', error);
        process.exit(1);
    }
};

syncDatabase();
