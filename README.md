# Card Deck UI

## Project Goals

- Create UI for a customizable card game
  - Cards for main player
  - Cards for opponents
  - Table
  - Organizing cards and other objects in to component files

## Project Scope

| Within Scope                             | Beyond Scope              |
| ---------------------------------------- | ------------------------- |
| Consider how plugins would be integrated | Implement any plugins     |

## Tools

- HTML
  - Templates
  - Pages
- CSS
  - SCSS
- JavaScript
  - NodeJS for webpack
    - ... For building component library
  - NodeJS for SCSS compiling 

## Project Structure

```
app/ <-- Holds most of the source code
    components/ <-- Holds any type of component
        [component-name]/
            index.html.txt <-- This is the template for the component
            style.scss.txt <-- Styles for the component
            index.js <--- File to import for bundling the component 
    pages/ <--- Holds any "pages" of the app
        [page-slug]/ 
            index.html
            (any other files)            
dist/ <-- Holds build files (built components)
    (May contain other assets)
utils/ 
    custom-element.js <-- Holds a helper function for creating vanilla javascript components
package.json/ <-- Contains the "npm run <cmd>" scripts for starting up the project
server.js <-- Server file which serves all the content
webpack.components.config/ <-- Contains the bundling logic for building components
    (This imports files with ext: <name>.html.txt, or <name>.scss.txt as text files... 
    Allowing for javascript template string interpolation)
```

