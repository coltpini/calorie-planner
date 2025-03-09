import { html, css, SimpleElement } from "https://esm.sh/simple-custom-element";
import "./food-intake.js";

class ADay extends SimpleElement {
  styles = css`
    :host {
      display: inline-block;
      border: 1px solid #ccc;
      padding: 10px;
    }
    h2 {
      margin: 0;
    }
    section {
      display: flex;
      gap: 10px;
    }
  `;

  markup = html` <h2></h2>
    <section>
      <food-intake label="breakfast"></food-intake>
      <food-intake label="lunch"></food-intake>
      <food-intake label="Snack"></food-intake>
      <food-intake label="Dinner"></food-intake>
      <food-intake label="Snack/Dessert"></food-intake>
      <food-intake label="workout"></food-intake>
    </section>`;

  properties = {
    calorie: { type: Number },
    date: { type: String },
  };

  selectors = {
    breakfast: { selector: "food-intake[label='breakfast']" },
    lunch: { selector: "food-intake[label='lunch']" },
    snack: { selector: "food-intake[label='Snack']" },
    dinner: { selector: "food-intake[label='Dinner']" },
    snackDessert: { selector: "food-intake[label='Snack/Dessert']" },
    workout: { selector: "food-intake[label='workout']" },
    date: { selector: "h2" },
  };

  constructor() {
    super();
    this.render();
  }

  static get observedAttributes() {
    return ["calorie", "date"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "calorie") {
      const c = Math.floor(newValue / 4);
      const s = Math.floor(c / 2);
      this.elements.breakfast.calorie = `${c}`;
      this.elements.lunch.calorie = `${c}`;
      this.elements.dinner.calorie = `${c}`;
      this.elements.snack.calorie = `${s}`;
      this.elements.snackDessert.calorie = `${s}`;
      this.elements.workout.calorie = `Active Calories`;
    }
    if (name === "date") {
      this.elements.date.innerHTML = newValue;
    }
  }
}

customElements.define("a-day", ADay);
export default ADay;
