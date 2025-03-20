/*
For men: BMR = 66.5 + (13.75 × weight in kg) + (5.003 × height in cm) - (6.75 × age
For women: BMR = 655.1 + (9.563 × weight in kg) + (1.850 × height in cm) - (4.676 × age)
*/

export const getBMR = (gender, weight, height, age, movement = 1) => {
  const kgs = lbsToKg(weight);
  const c = heightInputToCM(height);

  // return Math.round(
  //   gender === "male"
  //     ? 66.5 + 13.75 * kgs + 5.003 * c - 6.75 * age
  //     : 655.1 + 9.563 * kgs + 1.85 * c - 4.676 * age
  // );

  // Mifflin-st. jeor equation
  return (
    Math.round(
      gender === "male"
        ? 10 * kgs + 6.25 * c - 5 * age + 5
        : 10 * kgs + 6.25 * c - 5 * age - 161
    ) * movement
  );
};

export const lbsToKg = (lbs) => lbs / 2.205;
export const heightToCm = (feet, inches) =>
  Number(((feet * 12 + inches) * 2.54).toFixed(2));

export const strToFeetInches = (str) => {
  const feet = str.slice(0, str.indexOf("'"));
  const inches = str.slice(str.indexOf("'") + 1, str.indexOf('"'));
  return { feet: parseInt(feet, 10), inches: parseFloat(inches, 10) };
};

export const heightInputToCM = (str) => {
  const { feet, inches } = strToFeetInches(str);
  return heightToCm(feet, inches);
};
