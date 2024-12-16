import { createCustomElement } from "../custom-html-element";
import cardTemplate from "./index.html.txt";
import style from "./style.scss";



createCustomElement('card-component', function() {
    console.log('card loaded');
}, cardTemplate, style)