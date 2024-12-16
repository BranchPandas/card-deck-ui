export async function createCustomElement(name, onload, html, css, options ={}) {
    // create an HTML template element
    const template = document.createElement('template');

    template.innerHTML = `
        <style>
            ${css}
        </style>
        ${html}
    `;

    class customElementType extends HTMLElement {
        constructor() {
            super();
            if (this.innerHTML) {

                this.innerHTML = template.content.cloneNode(true).outerHTML;
            }
        }

        connectedCallback() {
            // console.log('connectedCallback');
            if(options.afterDomLoaded){
                onload.bind(this)
            }
            else {
                document.addEventListener('DOMContentLoaded', onload.bind(this));
            }
            this.updateTemplate();
        }

        



        attributeChangedCallback(name, oldValue, newValue) {
            if (oldValue !== newValue) {
                this.updateTemplate();
            }
        }

        static get observedAttributes() {
            return [
                'fieldName', 'alias', 'required', 'type', 'multiple', 'accept', 'labelClass', 'redirect', 
                'loginImage', 'signupImage', 'description', 'width', 'slotLinks', 'placeholder', 'test', 
                'mailing-address', 'wa-state-business-license-ubi-number', 'website-social-media', 'medium', 
                'email', 'artistMentor', 'digitalImage1', 'digitalImage2', 'digitalImage4', 'hasBeenReviewed', 
                'phone', 'digitalImage3', 'firstName', 'studio-address', 'lastName', 'artistStatement', 
                'isWithinBoundaries'
            ];
        }

        updateTemplate() {
            const randomId = Math.floor(Math.random() * 1000000);
            const context = {
                fieldName: this.getAttribute('fieldName') || 'defaultFieldName',
            };


            const evaluatedTemplate = evaluateTemplate(html, context);
            this.innerHTML = `
                <style>
                ${css}
                </style>
                ${evaluatedTemplate}
                `;
        }
    }

    customElements.define(name, customElementType);
}


export // Function to evaluate template literals
    function evaluateTemplate(template, context) {
    // console.log({ template, context });
    return new Function(...Object.keys(context), `return \`${template}\`;`)(...Object.values(context));
}