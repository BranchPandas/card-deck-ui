import { createCustomElement } from "../custom-html-element";
import header from "./index.html.txt";
import style from "./style.scss";



createCustomElement('header-component', function() {
    console.log('header loaded');
}, header, style)