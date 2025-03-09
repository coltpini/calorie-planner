import "./elements/a-day.js";
import { stiva } from "./utils/stiva.js";
import { getBMR, heightInputToCM } from "./utils/funcs.js";

const gender = document.querySelector("input[name='gender']:checked");
const weight = document.querySelector("#weight");
const height = document.querySelector("#height");
const age = document.querySelector("#age");
const loss = document.querySelector("#loss");
const target = document.querySelector(".target");
const BMR = document.querySelector(".bmr");

const days = 30;

const change = () =>
  stiva.update("calorie-changed", (cals) => ({
    cals: getCals(),
  }));

for (let i = 0; i < days; i++) {
  const day = document.createElement("a-day");
  day.setAttribute("date", `${i + 1}`);
  document.body.appendChild(day);

  stiva.listen("calorie-changed", (e) => {
    day.setAttribute("calorie", e.cals.target);
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
  const BMR = getBMR(g, w, h, a);
  const target = Math.round(BMR - (loss.value * 3000) / 7);
  return {
    target,
    BMR,
  };
};

change();
