const fs = require("node:fs");

const content = fs.readFileSync("./inputs/day1.txt", "utf8");

const splittedContent = content.split(`\n`);

const regex1 = /[1-9]/g;

const numbersMap = new Map([
  ["one", 1],
  ["two", 2],
  ["three", 3],
  ["four", 4],
  ["five", 5],
  ["six", 6],
  ["seven", 7],
  ["eight", 8],
  ["nine", 9],
]);

console.log(numbersMap.get("one"));

const regex2 = /[1-9]|one|two|three|four|five|six|seven|eight|nine/g;
// const regex2 = /[1-9]/g;

const firstStar = (lines) => {
  return lines.reduce((acc, line) => {
    const numbersMatches = [...line.matchAll(regex1)];
    const [first] = numbersMatches[0];
    const [last] = numbersMatches[numbersMatches.length - 1];
    const num = parseInt(`${first}${last}`);
    acc += num;
    return acc;
  }, 0);
};

const validNumbers = [...numbersMap.keys(), ...numbersMap.values()];

const getLastItem = (line) => {
  const lastItems = validNumbers
    .map((validNumber) => {
      let lastItem = line.lastIndexOf(validNumber);
      if (lastItem >= 0) {
        return { i: lastItem, val: validNumber };
      }
    })
    .filter(Boolean);

  const lastItem = lastItems.reduce((acc, value) => {
    if (acc.i < value.i) {
      acc = value;
    }
    return acc;
  });

  return lastItem.val;
};

const secondStar = (lines) => {
  return lines.reduce((acc, line) => {
    let num;
    const numbersMatches = [...line.matchAll(regex2)];

    if (numbersMatches.length > 0) {
      let [tmp1] = numbersMatches[0];
      let tmp2 = getLastItem(line);

      const first = numbersMap.has(tmp1) ? numbersMap.get(tmp1) : tmp1;
      const last = numbersMap.has(tmp2) ? numbersMap.get(tmp2) : tmp2;
      num = parseInt(`${first}${last}`);
    }

    if (num !== undefined) {
      acc += num;
    }

    return acc;
  }, 0);
};

console.log(secondStar(splittedContent));
