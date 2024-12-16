import { createCustomElement } from "../custom-html-element";
import cardTemplate from "./index.html.txt";
import style from "./style.scss";
import cardSprite from "../../assets/card-skins/captainlaptop.itch.io.jpg";


createCustomElement('card-component', function() {
    console.log('card loaded');
    
    //@TODO Import the image for the card

    //@TODO Map the rank/suit combo to the right image
    
    //@TODO Test the card component by creating new card elements

    
}, cardTemplate, style, {
    attributes: ['rank', 'suit']
})