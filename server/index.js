const express = require('express');
const path = require('path');
const fs = require('fs');
const e = require('express');

const app = express();
const port = process.env.PORT || 3000;

// Log all requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Back out of server file to get root path
const rootPath = path.join(__dirname, '../app');

// Serve static files
app.use(express.static(path.join(rootPath, '/assets')));


app.get('/components', (req, res) => {
    res.sendFile(path.join(rootPath, '/assets/webpack/component-builds.js'));
})

// app.use(express.static(path.join(rootPath, '/components')));


// serve all pages in the pages directory
// Serve all folders in pages as a page
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

// start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});