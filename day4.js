const fs = require("node:fs");

const content = fs.readFileSync("./inputs/day4.txt", "utf8");

const lines = content.split(`\n`);

const formatData = (lines) => {
  return lines.reduce((acc, line) => {
    const [, rawData] = line.split(": ");
    const [rawWinningNumbers, rawPlayedNumbers] = rawData.split(" | ");
    const winningNumbers = rawWinningNumbers.trim().split(" ").filter(Boolean);
    const playedNumbers = rawPlayedNumbers.trim().split(" ").filter(Boolean);

    const winningPlayedNumbers = playedNumbers.filter((playedNumber) => {
      return winningNumbers.includes(playedNumber);
    });
    acc.push(winningPlayedNumbers);
    return acc;
  }, []);
};

const doublePoints = (winningNumbers) => {
  let result = 0;
  if (winningNumbers.length <= 2) {
    result = winningNumbers.length;
  } else if (winningNumbers.length > 2) {
    result = 2 ** (winningNumbers.length - 1);
  }

  return result;
};

const firstStar = () => {
  const formattedData = formatData(lines);
  // console.log({ formattedData });
  return formattedData.reduce((acc, game) => {
    acc += doublePoints(game);
    return acc;
  }, 0);
};

const secondStar = () => {
  const scratchcards = formatData(lines);
  const computedScratchcards = scratchcards.reduce(
    (acc, scratchcard, index) => {
      valueIndex = acc.has(index) ? acc.get(index) : 0;
      valueIndex += 1;
      acc.set(index, valueIndex);

      console.log(scratchcard.length);
      for (let i = index + 1; i < index + scratchcard.length + 1; i++) {
        let valueI = acc.has(i) ? acc.get(i) : 0;
        valueI += valueIndex;
        acc.set(i, valueI);
      }

      return acc;
    },
    new Map()
  );

  return [...computedScratchcards.values()].reduce((acc, value) => {
    acc += value;
    return acc;
  });
};

console.log(firstStar());
console.log(secondStar());
