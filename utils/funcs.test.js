import {
  strToFeetInches,
  getBMR,
  lbsToKg,
  heightToCm,
  heightInputToCM,
} from "./funcs.js";

import { expect, test, describe } from "vitest";

describe("strToFeetInches", () => {
  test("converts standard height string to feet and inches", () => {
    const result = strToFeetInches("5'11\"");
    expect(result).toEqual({ feet: 5, inches: 11 });
  });

  test("handles single digit feet and inches", () => {
    const result = strToFeetInches("6'2\"");
    expect(result).toEqual({ feet: 6, inches: 2 });
  });

  test("handles zero inches", () => {
    const result = strToFeetInches("6'0\"");
    expect(result).toEqual({ feet: 6, inches: 0 });
  });

  test("handles double digit feet", () => {
    const result = strToFeetInches("10'6\"");
    expect(result).toEqual({ feet: 10, inches: 6 });
  });

  test("handles single digit feet with double digit inches", () => {
    const result = strToFeetInches("5'10\"");
    expect(result).toEqual({ feet: 5, inches: 10 });
  });
  test("handles single digit feet with decimal inches", () => {
    const result = strToFeetInches("5'10.5\"");
    expect(result).toEqual({ feet: 5, inches: 10.5 });
  });
});

describe("lbsToKg", () => {
  test("converts standard weight in pounds to kilograms", () => {
    const result = lbsToKg(150);
    expect(result).toBeCloseTo(68.027, 3);
  });

  test("handles decimal pounds", () => {
    const result = lbsToKg(180.5);
    expect(result).toBeCloseTo(81.859, 3);
  });

  test("handles very small weights", () => {
    const result = lbsToKg(0.5);
    expect(result).toBeCloseTo(0.227, 3);
  });

  test("handles zero weight", () => {
    const result = lbsToKg(0);
    expect(result).toBe(0);
  });

  test("handles large weights", () => {
    const result = lbsToKg(500);
    expect(result).toBeCloseTo(226.757, 3);
  });

  test("handles negative weights", () => {
    const result = lbsToKg(-100);
    expect(result).toBeCloseTo(-45.351, 3);
  });
});
describe("heightToCm", () => {
  test("converts 6'0\" to centimeters", () => {
    expect(heightToCm(6, 0)).toBe(182.88);
  });

  test("converts 5'8\" to centimeters", () => {
    expect(heightToCm(5, 8)).toBe(172.72);
  });

  test("handles decimal inches", () => {
    expect(heightToCm(5, 5.5)).toBe(166.37);
  });

  test("handles zero feet with inches", () => {
    expect(heightToCm(0, 10)).toBe(25.4);
  });

  test("handles large numbers", () => {
    expect(heightToCm(10, 11)).toBe(332.74);
  });

  test("handles decimal feet", () => {
    expect(heightToCm(5.5, 0)).toBe(167.64);
  });
});
describe("heightInputToCM", () => {
  test("converts standard height to centimeters", () => {
    const result = heightInputToCM(`5'11"`);
    expect(result).toBe(180.34);
  });

  test("converts minimum height to centimeters", () => {
    const result = heightInputToCM(`4'0"`);
    expect(result).toBe(121.92);
  });

  test("converts tall height to centimeters", () => {
    const result = heightInputToCM(`7'2"`);
    expect(result).toBe(218.44);
  });

  test("handles decimal centimeter results", () => {
    const result = heightInputToCM(`5'4"`);
    expect(result).toBe(162.56);
  });

  test("converts maximum practical height to centimeters", () => {
    const result = heightInputToCM(`8'11"`);
    expect(result).toBe(271.78);
  });
});
describe("getBMR", () => {
  test("calculates BMR for male with average values", () => {
    const result = getBMR("male", 180, "5'10\"", 30);
    expect(result).toBeCloseTo(1876, 1);
  });

  test("calculates BMR for female with average values", () => {
    const result = getBMR("female", 140, "5'4\"", 25);
    expect(result).toBeCloseTo(1446, 1);
  });

  test("handles very low weight and height values", () => {
    const result = getBMR("male", 100, "4'11\"", 18);
    expect(result).toBeCloseTo(1318, 1);
  });

  test("handles high weight and height values", () => {
    const result = getBMR("female", 250, "6'2\"", 45);
    expect(result).toBeCloseTo(1877, 1);
  });

  test("calculates BMR for elderly age", () => {
    const result = getBMR("male", 170, "5'8\"", 75);
    expect(result).toBeCloseTo(1484, 1);
  });

  test("handles teenage age", () => {
    const result = getBMR("female", 120, "5'2\"", 16);
    expect(result).toBeCloseTo(1392, 1);
  });

  test("handles decimal height values", () => {
    const result = getBMR("male", 165, "5'7.5\"", 28);
    expect(result).toBeCloseTo(1764, 1);
  });
});
