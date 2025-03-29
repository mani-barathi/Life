import "./style.css";

const grid = document.querySelector("#picture");
const datePicker = document.querySelector("#date");
const percentage = document.querySelector("#percentage");
let dob = new Date("2001/03/08");
const AVERAGE_AGE = 70;
const TOTAL_MONTHS = AVERAGE_AGE * 12;

const getMonthDiff = (d1, d2) => {
  var months;
  months = (d2.getFullYear() - d1.getFullYear()) * 12;
  months -= d1.getMonth();
  months += d2.getMonth();
  return months <= 0 ? 0 : months;
};

const getEachMonth = (idx, currentMonth = 0) => {
  let className = "w-4 h-4 rounded-full border";
  const isCompleted = idx < currentMonth;
  const onGoing = idx === currentMonth;

  if (onGoing) className += " bg-blue-300";
  else if (isCompleted) className += " bg-green-300";
  else className += " bg-zinc-200";

  const month = `<div class="${className}"></div>`;
  return month;
};

const getLife = (currentMonth) => {
  let monthEl = "";

  Array.from({ length: TOTAL_MONTHS }).map((_, idx) => {
    monthEl += getEachMonth(idx + 1, currentMonth);
  });

  grid.innerHTML = monthEl;
};

const setPercentage = (currentMonth = 0) => {
  const percent = (currentMonth / TOTAL_MONTHS) * 100;
  percentage.textContent = `${percent.toFixed(1)}%`;
};

datePicker.addEventListener("change", (e) => {
  dob = new Date(e.target.value);
  const currentMonth = getMonthDiff(dob || new Date(), new Date());
  getLife(currentMonth);
  setPercentage(currentMonth);
});

getLife(0);
setPercentage(0);
