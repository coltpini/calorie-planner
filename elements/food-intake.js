import { html, css, SimpleElement } from "https://esm.sh/simple-custom-element";

class FoodIntake extends SimpleElement {
  styles = css`
    :host {
      display: block;
      margin: 0.3em;
      padding: 0;
    }
    ul {
      display: flex;
      justify-content: space-between;
      align-items: center;
      list-style: none;
      padding: 0;
      margin: 0;
    }
    h3 {
      font-size: 0.8em;
      margin: 0;
      padding: 0;
    }
    li {
      text-align: center;
    }
    p {
      text-align: center;
      margin: 0;
    }
  `;

  markup = html`
    <h3></h3>
    <ul>
      <li>🦧</li>
      <li>👆</li>
      <p></p>
      <li>👇🏼</li>
      <li>🚫</li>
    </ul>
  `;

  properties = {
    amount: { type: String },
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
    return ["amount", "label"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "amount") {
      this.elements.p.innerHTML = `${newValue}`;
    }
    if (name === "label") {
      this.elements.label.innerHTML = `${newValue}`;
    }
  }
}

customElements.define("food-intake", FoodIntake);
export default FoodIntake;
