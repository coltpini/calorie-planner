import { html, css, SimpleElement } from "https://esm.sh/simple-custom-element";

class FoodIntake extends SimpleElement {
  styles = css`
    :host {
      display: block;
    }
  `;

  markup = html`
    <h3></h3>
    <input type="checkbox" />
    <label>👆</label>
    <p></p>
    <input type="checkbox" />
    <label>👇🏼</label>
  `;

  properties = {
    calorie: { type: String },
    label: { type: String },
  };

  selectors = {
    label: { selector: "h3" },
    p: { selector: "p" },
  };

  constructor() {
    super();
    this.render();
  }

  static get observedAttributes() {
    return ["calorie", "label"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "calorie") {
      this.elements.p.innerHTML = `${newValue}`;
    }
    if (name === "label") {
      this.elements.label.innerHTML = `${newValue}`;
    }
  }
}

customElements.define("food-intake", FoodIntake);
export default FoodIntake;
