customElements.define('custom-button', class CustomButton extends HTMLElement {

    text = "";    
    color = "white";     
    primaryColor = "rgb(51, 153, 255, 1)";
    secondaryColor = "rgb(0, 102, 204, 1)";
    width = "300px";
    height = "50px";

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    static get observedAttributes () {
        return ['text', 'primary', 'secondary', 'color', 'width', 'height'];
    }

    attributeChangedCallback (name, oldValue, newValue) {
        if (name === 'text') {
            this.text = newValue;
        }
        if (name === 'primary') {
            this.primaryColor = newValue;
        }
        if (name === 'secondary') {
            this.secondaryColor = newValue;
        }
        if (name === 'color') {
            this.color = newValue;
        }
        if (name === 'width') {
            this.width = newValue;
        }
        if (name === 'height') {
            this.height = newValue;
        }

        console.log(`Attribute ${name} changed from ${oldValue} to ${newValue}`);
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            ${this.templateCss()}
            ${this.template()}        
        `;
    }

    templateCss() {
        return /*html*/`
            <style>
               
                .btn {
                    display: flex;
                    width: ${this.width};
                    height: ${this.height};
                    font-family: arial, verdana, sans-serif;    
                    color: ${this.color};
                }
                
                .btn .btn-img {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 50px;
                    height: ${this.height};
                    background-color: ${this.secondaryColor};
                    font-size: 22px;
                    font-weight: bold;
                    border-radius: 5px 0 0 5px;
                }
                
                .btn .btn-text {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background-color: ${this.primaryColor};
                    width: 100%;
                    font-size: 18px;
                    border-radius: 0 5px 5px 0;
                }

                .btn:hover {
                    opacity: .8;
                    cursor: pointer;
                }

                .btn:active {
                    opacity: .5;
                    cursor: pointer;
                }                

            </style>
        `;
    }

    template() {
        return /*html*/`
            <div class="btn">
                <div id="btnId" class="btn-img">
                    <slot></slot>
                </div>
                <div class="btn-text">${this.text}</div>
            </div>
        `
    }

    connectedCallback() {
        this.render();
    }
    
    disconnectedCallback() {
        this.remove();
    }
     
})
