import tableTemplate from './index.html.txt'
import { createCustomElement } from "../custom-html-element";
import style from "./style.scss";



createCustomElement('table-component', function() {
    console.log('table loaded');
}, tableTemplate, style)