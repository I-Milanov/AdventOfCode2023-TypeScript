class Digit {
  value: number;
  position: number;

  constructor(v: number, p: number) {
    this.value = v;
    this.position = p;
  }
}

let rows = document.querySelector("pre")!.textContent!.split("\n");

let getAllDigits: (row: string) => Digit[]
getAllDigits = (row) => {
  let digits: Digit[] = [];

  for (let i = 0; i < row.length; i++) {
    let char = row[i];

    if (/\d/.test(char)) {
      digits.push(new Digit(parseInt(char), i));
    }
  }

  return digits;
};

let values: number[] = rows!.map((r) => {
  let d = getAllDigits(r);

  const { minDigit, maxDigit } = d.reduce(
    (result, currentDigit) => {
      if (currentDigit.position < result.minDigit.position) {
        result.minDigit = currentDigit;
      }
  
      if (currentDigit.position > result.maxDigit.position) {
        result.maxDigit = currentDigit;
      }
  
      return result;
    },
    {
        minDigit: d[0],
        maxDigit: d[0],
    }
  );

  console.log(`In '${r}'`);

  let value = parseInt(`${minDigit.value}${maxDigit.value}`);
  console.log(`Value is '${value}'`);

  return value;
});

console.log(`Sum is ${values.reduce((accumulator, x) => accumulator + x, 0)}`)