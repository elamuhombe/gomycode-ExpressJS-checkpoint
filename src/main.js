// Import modules
const express = require('express');
const path = require('path'); 
const port = 5000;

// Create an instance of the express server
const app = express();

// Middleware function to restrict access to working hours (9am to 5pm) from Monday to Friday
const workingHoursMiddleware = (req, res, next) => {
    const now = new Date();
    const day = now.getDay(); // 0 (Sunday) to 6 (Saturday)
    const hour = now.getHours();

    // Check if it's a weekday (Monday to Friday) and between 9am and 5pm
    if (day >= 1 && day <= 6 && hour >= 6 && hour < 23) {
        next(); // Proceed to the next middleware/route handler
    } else {
        res.status(403).send('Sorry, the app is only accessible during working hours (9am to 5pm) from Monday to Friday.');
    }
};
// Apply the workingHoursMiddleware to all routes
app.use(workingHoursMiddleware);
// Set the view engine to EJS and specify the views directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'));


// Define the directory for static files
const publicDirectoryPath = path.join(__dirname, '..', 'public'); // Move up one directory to access public directory
const srcDirectoryPath = path.join(__dirname);

// Configure Express to serve static files from the specified directories
app.use(express.static(publicDirectoryPath));
app.use(express.static(srcDirectoryPath));


// Define a route handler for the root URL
app.get('/', (req, res) => {
    res.render('home');
});

app.get('/service', (req, res) => {
    res.render('service');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});


// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});