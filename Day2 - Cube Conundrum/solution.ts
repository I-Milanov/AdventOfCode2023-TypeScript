class Round {
  red: number;
  blue: number;
  green: number;

  constructor(red: number, blue: number, green: number) {
    this.red = red;
    this.blue = blue;
    this.green = green;
  }
}

class Game {
  number: number;
  rounds: Round[];

  constructor(number: number, rounds: Round[]) {
    this.number = number;
    this.rounds = rounds;
  }
}

let rows = document.querySelector("pre")!.textContent!.split("\n");
rows.forEach(r=> console.log(r));
const regexGameNumberPattern = /Game (\d*): /;
const redBallsPattern = /(\d*) red/;
const blueBallsPattern = /(\d*) blue/;
const greenBallsPattern = /(\d*) green/;

let games: Game[];
games = rows.map((r) => {
  let rounds: Round[]
  rounds = r
    .replace(regexGameNumberPattern, "")
    .split("; ")
    .map((s) => {
      let redBallsMatches = redBallsPattern.exec(s);
      let redBalls = parseInt( redBallsMatches != null ? redBallsMatches[1] : "0");
      
      let blueBallsMatches = blueBallsPattern.exec(s);
      let blueBalls = parseInt(blueBallsMatches != null ? blueBallsMatches[1] : "0");
     
      let greenBallsMatches = greenBallsPattern.exec(s);
      let greenBalls = parseInt(greenBallsMatches != null ? greenBallsMatches[1] : "0");

      return new Round(redBalls, blueBalls, greenBalls);
    });

  return new Game(parseInt(regexGameNumberPattern.exec(r)![1]), rounds);
});

let ballChecker: (round: Round) => boolean;
ballChecker = (round: Round) => {
  let result = round.red <= 12 && round.green <= 13 && round.blue <= 14;
  console.log(round);
  return result;
};

let successGames = games.filter((g) =>
  !g.rounds.map((r) => ballChecker(r)).some(value => value === false));

let sumOfSuccessGames = successGames
  .map((g) => g.number)
  .reduce((accumulator, currentValue) => accumulator + currentValue);

console.log(sumOfSuccessGames);

let powerOfBalls = games.map(g => {
 let maxRed = Math.max(...g.rounds.map(r=>r.red));
 let maxGreen = Math.max(...g.rounds.map(r=>r.green));
 let maxBlue = Math.max(...g.rounds.map(r=>r.blue));

 return maxRed*maxGreen*maxBlue;
})

let sumOfPowerOfBalls = powerOfBalls.reduce((accumulator, currentValue) => accumulator + currentValue);

alert(`The answer of first part is ${sumOfSuccessGames}. \n The answer of secont part is ${sumOfPowerOfBalls}`);