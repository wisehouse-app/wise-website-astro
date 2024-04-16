import BedroomIcon from "../icons/BedroomIcon";
import PriceIcon from "../icons/PriceIcon";
import BathroomsIcon from "../icons/BathroomsIcon";
export default class PropertyCard extends HTMLElement {
    _id: string | undefined = undefined
    _title: string | undefined = undefined
    _canonical: string | undefined = undefined;
    _avatar: string | undefined = undefined;
    _price: number | undefined = undefined
    _n_bedrooms: number | undefined = undefined
    _n_bathrooms: number | undefined = undefined
    _area_sqm: number | undefined = undefined
    _land_arae_sqm: number | undefined = undefined
    _location: string | undefined = undefined
    _buy_rent: "buy" | "rent" | undefined = undefined
    _property_type: string | undefined = undefined

    constructor() {
        super();
    }
    static observedAttributes = [
        "id",
        "title",
        "canonical",
        "avatar",
        "price",
        "n_bedrooms",
        "n_bathrooms",
        "area_sqm",
        "land_area_sqm",
        "location",
        "buy_rent",
        "property_type"
    ]

    attributeChangedCallback(
        name: string,
        oldValue: string,
        newValue: any,
    ) {
        switch (name) {
            case "id":
                this._id = newValue
                break
            case "title":
                this._title = newValue
                break
            case "canonical":
                this._canonical = newValue
                break
            case "avatar":
                this._avatar = newValue
                break
            case "price":
                this._price = newValue
                break
            case "n_bedrooms":
                this._n_bedrooms = newValue
                break
            case "n_bathrooms":
                this._n_bathrooms = newValue
                break
            case "area_sqm":
                this._area_sqm = newValue
                break
            case "land_area_sqm":
                this._land_arae_sqm = newValue
                break
            case "location":
                this._location = newValue
                break
            case "buy_rent":
                this._buy_rent = newValue
                break
            case "property_type":
                this._property_type = newValue
                break
            default:
                throw new Error(`Unknown param ${name}`)
        }
    }

    thePrice(): string | undefined {
        if (!this._price) {
            return undefined
        }
        let priceString = this._price.toString()
        // Reverse the string
        const reversedString = priceString.split("").reverse().join("");

        // Add commas every 3 characters (except the first)
        let formattedPrice = "";
        for (let i = 0; i < reversedString.length; i++) {
            if (i > 0 && i % 3 === 0) {
                formattedPrice += ",";
            }
            formattedPrice += reversedString[i];
        }

        // Reverse the formatted string back to normal order
        return formattedPrice.split("").reverse().join("");

    }
    connectedCallback() {
        if (!this.shadowRoot) {
            this.attachShadow({ mode: "open" });
        }
        this.shadowRoot!.innerHTML = `
        <style>
            a {                        
                cursor: pointer;
                color:inherit;
                text-decoration:none;
                display:block;
                width:fit-content;
            }            
            div#the-div {
                display:flex;
                flex-direction:column;                
                cursor:pointer;                
                background: white;                
                border-radius: 9px;
                width: 180px;
                height: 350px;
                box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
                transition: all 0.3s cubic-bezier(.25,.8,.25,1);
            }
            div#the-div:hover{
                box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
            }
            h1 {
                font-size: 1em;
                margin:0;
                margin-bottom:0.1em;
                font-weight:normal;
                height: 4.6em;                
                overflow-y: hidden;
            }
            img {
                margin: 0 auto;
                width: 100%;
                border-top-right-radius:inherit;
                border-top-left-radius:inherit;
            }
            span.icon {
                font-size: 1.1rem;
            }
            small{
                display:block;
            }
            div#text{
                padding-top: 0.5em;
                display:flex;
                flex-direction: column;
                flex-grow:1;
                justify-content: top;
            }
            #location{
                text-transform:capitalize;
                margin-bottom: 0.3em;
                opacity:0.7;
            }
            #size-data{
                padding: 0.4em 0;
                display:flex;
                justify-content: space-between;
            }
            #text {
                padding: 0 0.8em;
                display:block;
            }
            #price{
                font-size: 0.9em;
                margin-bottom: 0.2em;
            }
        </style>

        ${this._canonical ? `<a target="_blank" href="${this._canonical}">` : ""}
            <div id="the-div">    
                ${this._avatar ? `
                    <img src="${this._avatar}"></img>
                `: ""}

                <div id="text">
                    ${this._location ? `
                        <small id="location">${this._location.replaceAll("_", " ")}</small>
                    `: ""}
                    ${this._price ? `
                        <small id="price">${PriceIcon}${this.thePrice()}</small>
                    `: ""}
                    ${this._title ? `
                        <h1>${this._title}</h1>
                    `: ""}
                    
                    <div style="flex-grow:1"></div>
                    
                    <div id="size-data">
                        ${this._area_sqm ? `
                            <small>${Math.round(this._area_sqm)}m²</small>
                        `: ""}
                        ${this._n_bedrooms ? `
                            <small><span class="icon">${BedroomIcon}</span>${this._n_bedrooms}</small>
                        `: ""}
                        ${this._n_bathrooms ? `
                            <small><span class="icon">${BathroomsIcon}</span>${this._n_bathrooms}</small>
                        `: ""}
                    </div>     
                </div>           
            </div>
            ${this._canonical ? `</a>` : ""}
                                    
        `;

        // const div = this.shadowRoot!.getElementById("the-div")!;
        // let container = div;
        // if (this._canonical !== "") {
        //     container = document.createElement("a");
        //     div.appendChild(container);
        //     //@ts-ignore
        //     container.href = this._canonical;
        //     //@ts-ignore
        //     container.target = "_blank";
        // }

        // if (this._avatar) {
        //     const img = document.createElement("img");
        //     img.src = this._avatar;
        //     container.appendChild(img);
        // }
        // if (this._title) {
        //     const h = document.createElement("h1");
        //     h.innerText = this._title;
        //     container.appendChild(h);
        // }
        // if (this._price) {
        //     const p = document.createElement("small")
        //     p.innerText = `$${this._price}`
        //     container.appendChild(p)
        // }
        // const sizeDiv = document.createElement('div')
        // container.appendChild(sizeDiv)
        // if (this._area_sqm) {
        //     const p = document.createElement("small")
        //     p.innerText = `${this._area_sqm}m²`
        //     sizeDiv.appendChild(p)
        // }
        // if (this._n_bedrooms) {
        //     const p = document.createElement("small")
        //     p.innerText = `${this._n_bedrooms}`
        //     sizeDiv.appendChild(p)
        // }
        // if (this._n_bathrooms) {
        //     const p = document.createElement("small")
        //     p.innerText = `${this._n_bathrooms}`
        //     sizeDiv.appendChild(p)
        // }
        // if (this._location) {
        //     const p = document.createElement("small")
        //     p.innerText = `${this._location}`
        //     container.appendChild(p)
        // }
        // if (this._buy_rent) {
        //     const p = document.createElement("small")
        //     p.innerText = `${this._buy_rent}`
        //     container.appendChild(p)
        // }
        // if (this._property_type) {
        //     const p = document.createElement("small")
        //     p.innerText = `${this._property_type}`
        //     container.appendChild(p)
        // }
    }
}