const fs = require("fs");

const content = fs.readFileSync("./inputs/day2.txt", "utf8");

const lines = content.split(`\n`);

const formatGames = (lines) => {
  const games = {};
  for (const line of lines) {
    const [gameName, gameRawContent] = line.split(": ");
    const [, gameId] = gameName.split(" ");
    // init game sets
    games[gameId] = [];

    const rawSets = gameRawContent.split("; ");
    for (const rawSet of rawSets) {
      const formattedSet = formatSet(rawSet);
      games[gameId].push(formattedSet);
    }
  }
  return games;
};

// set : "5 red, 1 green, 2 blue"
const formatSet = (rawSet) => {
  const set = {};
  const rawColors = rawSet.split(", ");
  for (const rawColor of rawColors) {
    const [count, colorName] = rawColor.split(" ");
    set[colorName] = parseInt(count);
  }
  return set;
};

const formattedGames = formatGames(lines);

const firstStar = (games, red, green, blue) => {
  const possibleGames = [];
  const fewerValues = [];

  Object.entries(games).forEach(([index, game]) => {
    let reds = 0,
      greens = 0,
      blues = 0;
    const setsValidity = game.map((set) => {
      let ret = [];

      if (set.red) {
        ret.push(set.red <= red);
        if (reds < set.red) {
          reds = set.red;
        }
      }

      if (set.green) {
        ret.push(set.green <= green);
        if (greens < set.green) {
          greens = set.green;
        }
      }

      if (set.blue) {
        ret.push(set.blue <= blue);
        if (blues < set.blue) {
          blues = set.blue;
        }
      }

      return ret;
    });

    const isGameValid = setsValidity.every((value) => {
      return value.every((val) => val === true) === true;
    });

    if (isGameValid) {
      possibleGames.push(parseInt(index));
    }

    fewerValues.push({ red: reds, green: greens, blue: blues });
  });

  const firstStar = possibleGames.reduce((acc, val) => {
    acc += val;
    return acc;
  });

  const secondStar = fewerValues.reduce((acc, game) => {
    acc += game.red * game.green * game.blue;
    return acc;
  }, 0);

  return { firstStar, secondStar };
};

console.log(firstStar(formattedGames, 12, 13, 14));
