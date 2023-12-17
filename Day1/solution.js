var Digit = /** @class */ (function () {
    function Digit(v, p) {
        this.value = v;
        this.position = p;
    }
    return Digit;
}());
var rows = document.querySelector("pre").textContent.split("\n");
var getAllDigits;
getAllDigits = function (row) {
    var digits = [];
    for (var i = 0; i < row.length; i++) {
        var char = row[i];
        if (/\d/.test(char)) {
            digits.push(new Digit(parseInt(char), i));
        }
    }
    return digits;
};
var values = rows.map(function (r) {
    var d = getAllDigits(r);
    var _a = d.reduce(function (result, currentDigit) {
        if (currentDigit.position < result.minDigit.position) {
            result.minDigit = currentDigit;
        }
        if (currentDigit.position > result.maxDigit.position) {
            result.maxDigit = currentDigit;
        }
        return result;
    }, {
        minDigit: d[0],
        maxDigit: d[0],
    }), minDigit = _a.minDigit, maxDigit = _a.maxDigit;
    console.log("In '".concat(r, "'"));
    var value = parseInt("".concat(minDigit.value).concat(maxDigit.value));
    console.log("Value is '".concat(value, "'"));
    return value;
});
console.log("Sum is ".concat(values.reduce(function (accumulator, x) { return accumulator + x; }, 0)));
