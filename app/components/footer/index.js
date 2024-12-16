import { createCustomElement } from "../custom-html-element";
import cardTemplate from "./index.html.txt";
import style from "./style.scss";



createCustomElement('footer-component', function() {
    console.log('footer loaded');
}, cardTemplate, style)