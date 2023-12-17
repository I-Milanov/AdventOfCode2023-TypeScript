var Round = /** @class */ (function () {
    function Round(red, blue, green) {
        this.red = red;
        this.blue = blue;
        this.green = green;
    }
    return Round;
}());
var Game = /** @class */ (function () {
    function Game(number, rounds) {
        this.number = number;
        this.rounds = rounds;
    }
    return Game;
}());
var rows = document.querySelector("pre").textContent.split("\n");
rows.forEach(function (r) { return console.log(r); });
var regexGameNumberPattern = /Game (\d*): /;
var redBallsPattern = /(\d*) red/;
var blueBallsPattern = /(\d*) blue/;
var greenBallsPattern = /(\d*) green/;
var games;
games = rows.map(function (r) {
    var rounds;
    rounds = r
        .replace(regexGameNumberPattern, "")
        .split("; ")
        .map(function (s) {
        var redBallsMatches = redBallsPattern.exec(s);
        var redBalls = parseInt(redBallsMatches != null ? redBallsMatches[1] : "0");
        var blueBallsMatches = blueBallsPattern.exec(s);
        var blueBalls = parseInt(blueBallsMatches != null ? blueBallsMatches[1] : "0");
        var greenBallsMatches = greenBallsPattern.exec(s);
        var greenBalls = parseInt(greenBallsMatches != null ? greenBallsMatches[1] : "0");
        return new Round(redBalls, blueBalls, greenBalls);
    });
    return new Game(parseInt(regexGameNumberPattern.exec(r)[1]), rounds);
});
var ballChecker;
ballChecker = function (round) {
    var result = round.red <= 12 && round.green <= 13 && round.blue <= 14;
    console.log(round);
    return result;
};
var successGames = games.filter(function (g) {
    return !g.rounds.map(function (r) { return ballChecker(r); }).some(function (value) { return value === false; });
});
var sumOfSuccessGames = successGames
    .map(function (g) { return g.number; })
    .reduce(function (accumulator, currentValue) { return accumulator + currentValue; });
console.log(sumOfSuccessGames);
var powerOfBalls = games.map(function (g) {
    var maxRed = Math.max.apply(Math, g.rounds.map(function (r) { return r.red; }));
    var maxGreen = Math.max.apply(Math, g.rounds.map(function (r) { return r.green; }));
    var maxBlue = Math.max.apply(Math, g.rounds.map(function (r) { return r.blue; }));
    return maxRed * maxGreen * maxBlue;
});
var sumOfPowerOfBalls = powerOfBalls.reduce(function (accumulator, currentValue) { return accumulator + currentValue; });
alert("The answer of first part is ".concat(sumOfSuccessGames, ". \n The answer of secont part is ").concat(sumOfPowerOfBalls));
