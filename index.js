import "./elements/a-day.js";
import { stiva } from "./utils/stiva.js";
import { getBMR, heightInputToCM } from "./utils/funcs.js";

const calendar = document.querySelector(".calendar");
const weight = document.querySelector("#weight");
const height = document.querySelector("#height");
const age = document.querySelector("#age");
const loss = document.querySelector("#loss");
const target = document.querySelector(".target");
const movement = document.querySelector("#movement");
const BMR = document.querySelector(".bmr");

const days = 7;

const change = () =>
  stiva.update("calorie-changed", (cals) => ({
    cals: getCals(),
  }));

for (let i = 0; i < days; i++) {
  const day = document.createElement("a-day");
  day.setAttribute("date", `${i + 1}`);

  calendar.appendChild(day);

  stiva.listen("calorie-changed", (e) => {
    day.setAttribute("calorie", e.cals.target);
    day.setAttribute("weight", `${Math.floor(weight.value / 2)} oz`);
  });
}

stiva.listen("calorie-changed", (e) => {
  target.innerHTML = `${e.cals.target}`;
  BMR.innerHTML = `${e.cals.BMR}`;
});

document.body.addEventListener("change", change);

const getCals = () => {
  const g = document.querySelector("input[name='gender']:checked").value;
  const w = weight.value;
  const h = height.value;
  const a = age.value;
  const m = movement.value;
  const caloriesPerPound = 3500;
  const BMR = Math.floor(getBMR(g, w, h, a, m));
  const target = Math.floor(BMR - (loss.value * caloriesPerPound) / 7);
  return {
    target,
    BMR,
  };
};

change();
