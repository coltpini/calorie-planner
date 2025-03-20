import { html, css, SimpleElement } from "https://esm.sh/simple-custom-element";
import "./food-intake.js";

class ADay extends SimpleElement {
  styles = css`
    :host {
      display: inline-block;
      border: 0.2em solid var(--bg-color-100);
      xbackground-color: var(--bg-color-200);
      padding: 2em;
      min-width: 8em;
      max-width: 12em;
    }
    h2 {
      margin: 0;
    }
    section {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
  `;

  markup = html`
    <h2></h2>
    <section>
      <food-intake label="breakfast"></food-intake>
      <food-intake label="lunch"></food-intake>
      <food-intake label="Snack"></food-intake>
      <food-intake label="Dinner"></food-intake>
      <food-intake label="Snack/Dessert"></food-intake>
      <food-intake label="workout"></food-intake>
      <food-intake label="water 💧"></food-intake>
    </section>
  `;

  properties = {
    calorie: { type: Number },
    date: { type: String },
    weight: { type: Number },
  };

  selectors = {
    breakfast: { selector: "food-intake[label='breakfast']" },
    lunch: { selector: "food-intake[label='lunch']" },
    snack: { selector: "food-intake[label='Snack']" },
    dinner: { selector: "food-intake[label='Dinner']" },
    snackDessert: { selector: "food-intake[label='Snack/Dessert']" },
    workout: { selector: "food-intake[label='workout']" },
    water: { selector: "food-intake[label='water 💧']" },
    date: { selector: "h2" },
  };

  constructor() {
    super();
    this.render();
  }

  static get observedAttributes() {
    return ["calorie", "date", "weight"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "calorie") {
      const c = Math.floor(newValue / 4);
      const s = Math.floor(c / 2);
      this.elements.breakfast.amount = `${c}`;
      this.elements.lunch.amount = `${c}`;
      this.elements.dinner.amount = `${c}`;
      this.elements.snack.amount = `${s}`;
      this.elements.snackDessert.amount = `${s}`;
    }
    if (name === "date") {
      this.elements.date.innerHTML = newValue;
    }
    if (name === "weight") {
      this.elements.water.amount = `${newValue}`;
    }
    this.elements.workout.amount = `❤️‍🔥`;
  }
}

customElements.define("a-day", ADay);
export default ADay;
