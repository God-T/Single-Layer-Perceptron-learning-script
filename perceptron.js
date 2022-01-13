/* set inputs */

// wk1 exe q2
const dataSet = [
  { label: 'a', x1: 0, x2: 1, c: 0 },
  { label: 'b', x1: 2, x2: 0, c: 0 },
  { label: 'c', x1: 1, x2: 1, c: 1 },
];
const lr = 1;
let w0 = -1.5;
let w1 = 0;
let w2 = 2;

// // exam sample:
// const dataSet = [
//     { label: 'a', x1: -2, x2: 2, c: 1 },
//     { label: 'b', x1: 2, x2: 1, c: 0 },
//     { label: 'c', x1: -1, x2: -1, c: 0 },
//   ];
//   const lr = 1;
//   let w0 = -0.5;
//   let w1 = -1;
//   let w2 = -2;

console.log('\nGiven data:');
console.table(dataSet);
console.table([{ w0, w1, w2, learning_rate: lr }]);

/* helper func */
const onClassify = ({ x1, x2, c }) => {
  const s = w0 + w1 * x1 + w2 * x2;
  const action = s > 0 ? (c ? 'none' : 'sub') : c ? 'add' : 'none';
  return { s, action };
};
const subWeights = ({ x1, x2 }) => {
  w0 -= lr;
  w1 -= lr * x1;
  w2 -= lr * x2;
};
const addWeights = ({ x1, x2 }) => {
  w0 += lr;
  w1 += lr * x1;
  w2 += lr * x2;
};

/* run main */
const lastItem = 'dataSet[dataSet.length - 1].label';
let res = [];
let noOfNonAction = 0;
while (noOfNonAction <= 3) {
  dataSet.map(data => {
    const w0_pre = w0;
    const w1_pre = w1;
    const w2_pre = w2;
    const { s, action } = onClassify(data);

    if (action === 'add') addWeights(data);
    else if (action === 'sub') subWeights(data);
    else if (action === 'none') noOfNonAction++;

    const { label, x1, x2, c } = data;
    res = [
      ...res,
      {
        w0: w0_pre,
        w1: w1_pre,
        w2: w2_pre,
        Item: label,
        x1,
        x2,
        Class: c ? '+1' : '-1',
        S: s,
        Action: action,
      },
    ];
    if (label === lastItem && noOfNonAction <= dataSet.length) {
      noOfNonAction = 0;
    }
  });
}

/* display result */
console.log('Training results:');
console.table(res);
console.log(
  'Final outcome:',
  w0,
  '+',
  w1 === 1 ? 'x1' : w1 === -1 ? '-x1' : w1 + '*x1',
  '+',
  w2 === 1 ? 'x2' : w2 === -1 ? '-x2' : w2 + '*x2',
  '= 0'
);
