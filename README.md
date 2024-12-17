# Card Deck UI

## Project Goals

- Create UI for a customizable card game
  - Cards for main player
  - Cards for opponents
  - Table
  - Organizing cards and other objects in to component files

## Contributors 

1. Start by going to a new directory on your machine and running `git clone https://github.com/BranchPandas/card-deck-ui.git; git clone https://github.com/BranchPandas/card-deck-ui.wiki.git`
   1. This will create two local git repos for this project, one for the codebase and another for this Wiki.
   2. Contribute to both!
2. Run `cd card-deck-ui; npm install;`
   1. This will move to the correct directory and install packages for this project (See `package.json`)
3. Spin up the project locally by running `npm run dev`
   1. This is a special command in `package.json` scripts.
   2. This command uses a package called concurrently to spin up multiple services in a single terminal
      1. (Without it, you would have to open a new terminal for each and run the commands separately) 


> Learn more about the project in the Github Wiki  
> https://github.com/BranchPandas/card-deck-ui/wiki

---


### Project Scope

We are just building the UI, with the intention of game play being added later. This project will create the mechanics for game play. Pluggins would be used to define game play.

| Within Scope                             | Beyond Scope              |
| ---------------------------------------- | ------------------------- |
| Consider how plugins would be integrated | Implement any plugins     |

## Tools

- HTML/CSS/JavaScript
  - No frontend frameworks 
- Express.js
- Webpack.js

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

