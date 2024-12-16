const express = require('express');
const path = require('path');
const fs = require('fs');
const net = require('net');

const app = express();
let port = process.env.PORT || 3000;

// Function to check if a port is in use
function checkPort(port, callback) {
    const server = net.createServer();
    server.once('error', (err) => {
        if (err.code === 'EADDRINUSE') {
            callback(true);
        } else {
            callback(false);
        }
    });
    server.once('listening', () => {
        server.close();
        callback(false);
    });
    server.listen(port);
}

// Function to find an available port
function findAvailablePort(port, callback) {
    checkPort(port, (isInUse) => {
        if (isInUse) {
            console.log(`Port ${port} is in use, trying port ${port + 1}`);
            findAvailablePort(port + 1, callback);
        } else {
            callback(port);
        }
    });
}

// Log all requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Back out of server file to get root path
const rootPath = path.join(__dirname, '../app');

// Serve static files
app.use(express.static(path.join(rootPath, '/assets')));

// Shortcut urls for special files
app.get('/components', (req, res) => {
    res.sendFile(path.join(rootPath, '/assets/webpack/component-builds.js'));
});
app.get('/global-styles.css', (req, res) => {
    res.sendFile(path.join(rootPath, '/assets/styles/global-styles.css'));
});

// Serve all pages in the pages directory
const pagesDir = path.join(rootPath, '/pages');
fs.readdir(pagesDir, (err, folders) => {
    if (err) {
        console.error('Unable to read pages directory:', err);
        return;
    }
    folders.forEach(folder => {
        const folderPath = path.join(pagesDir, folder);
        if (fs.lstatSync(folderPath).isDirectory()) {
            app.use(`/${folder}`, express.static(folderPath));
        }
    });
});

// Serve all folders in pages as a page
const playgroundPagesDir = path.join(rootPath, '/playground-pages');
fs.readdir(playgroundPagesDir, (err, folders) => {
    if (err) {
        console.error('Unable to read pages directory:', err);
        return;
    }
    folders.forEach(folder => {
        const folderPath = path.join(playgroundPagesDir, folder);
        if (fs.lstatSync(folderPath).isDirectory()) {
            app.use(`/${folder}`, express.static(folderPath));
        }
    });
});

// fall back to game-room page
app.get('/', (req, res) => {
    // Send the use to the game-room (in the future this would be the login page or home page)
    res.sendFile(rootPath + '/pages/game-room/index.html');
});

// Find an available port and start the server
findAvailablePort(port, (availablePort) => {
    app.listen(availablePort, () => {
        console.log(`Server is running on port http://localhost:${availablePort}`);
    });
});