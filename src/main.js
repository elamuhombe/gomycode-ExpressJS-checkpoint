// Import modules
const express = require('express');

// Create an instance of the express server
const app = express();

// Middleware function to restrict access to working hours (9am to 5pm) from Monday to Friday
const workingHoursMiddleware = (req, res, next) => {
    const now = new Date();
    const day = now.getDay(); // 0 (Sunday) to 6 (Saturday)
    const hour = now.getHours();

    // Check if it's a weekday (Monday to Friday) and between 9am and 5pm
    if (day >= 1 && day <= 5 && hour >= 9 && hour < 23) {
        next(); // Proceed to the next middleware/route handler
    } else {
        res.status(403).send('Sorry, the app is only accessible during working hours (9am to 5pm) from Monday to Friday.');
    }
};
app.use(workingHoursMiddleware);