const arrayCount = 256;

const array = Array.from(new Array(arrayCount).keys());

// function getSlicing() {
//   let restEnd;
//   let restStart;
//   const isOdd = displayPageAmount % 2 === 1;
//   const half = Math.floor(displayPageAmount / 2);

//   if (activeIdx - half < 1) {
//     restEnd = displayPageAmount - (isOdd ? activeIdx : activeIdx + 1);
//   }

//   if (activeIdx + half > arrayCount) {
//     restStart = activeIdx - displayPageAmount;
//     console.log(restStart);
//   }

//   const start = restStart || Math.max(activeIdx - (isOdd ? half : half - 1), 1);
//   const end = restEnd + half - 1 || activeIdx + half + 1;

//   return { start, end };
// }

const displayPageAmount = 5;
const activeIdx = 1;

function getSlicing() {
  const half = Math.ceil(displayPageAmount / 2);
  console.log(half);
  let start = Math.max(activeIdx - half, 0);
  console.log(start);
  const end = start + displayPageAmount;
  return { start, end };
}
const map = array.slice(getSlicing().start, getSlicing().end).map((count) => {
  return count + 1;
});

console.log(map);
