"use strict";
console.log('Hello, World!');

const selSum1 = document.querySelector(".sum-one");
const selSum2 = document.querySelector(".sum-two");
const selCur1 = document.querySelector(".cur-one");
const selCur2 = document.querySelector(".cur-two");
const sum = [0, 0];
const cur = [0, 0];
let turnCount = 1;

// MODAL Start
const modal = document.querySelector(".modal");
const modalWinner = document.querySelector(".winner");
const overlay = document.querySelector(".modal-overlay");
const btnCloseModal = document.querySelector(".close-modal");

const showingWindow = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};
const showingWinnerWindow = function () {
  modalWinner.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const hidingWindow = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};
const hidingWinnerWindow = function () {
  modalWinner.classList.add("hidden");
  overlay.classList.add("hidden");
};

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    hidingWindow();
  } else if (e.key === "Escape" && !modalWinner.classList.contains("hidden")) {
    hidingWinnerWindow();
  }
});

btnCloseModal.addEventListener("click", hidingWindow);
btnCloseModal.addEventListener("click", hidingWinnerWindow);
overlay.addEventListener("click", hidingWindow);
overlay.addEventListener("click", hidingWinnerWindow);

// MODAL End

function imgDice(x) {
  document.querySelector(
    ".img-box"
  ).style.backgroundImage = `url(rolls/dice-${x}.png)`;
}

const turnChanger = function () {
  turnCount++;
  if (turnCount % 2 === 0) {
    document.querySelector(".overlay").style.left = "50%";
  } else {
    document.querySelector(".overlay").style.left = "0";
  }
};

const reset = function () {
  document.querySelector(".overlay").style.left = "0";
  sum[0] = 0;
  selSum1.textContent = sum[0];
  sum[1] = 0;
  selSum2.textContent = sum[1];
  cur[0] = 0;
  selCur1.textContent = cur[0];
  cur[1] = 0;
  selCur2.textContent = cur[1];
  if (document.querySelector(".img-box").classList.contains("trans")) {
    document.querySelector(".img-box").classList.toggle("trans");
    document.querySelector(".btn-roll").classList.toggle("trans");
    document.querySelector(".btn-hold").classList.toggle("trans");
  }
  imgDice(null);
};

document.querySelector(".btn-start").addEventListener("click", reset);

document.querySelector(".btn-roll").addEventListener("click", function () {
  let roll = Math.floor(Math.random() * 6 + 1);
  if (turnCount % 2 === 1) {
    if (roll === 1) {
      imgDice(roll);
      cur[0] = 0;
      selCur1.textContent = cur[0];
      turnChanger();
      showingWindow();
    } else {
      imgDice(roll);
      cur[0] += roll;
      selCur1.textContent = cur[0];
    }
  } else {
    if (roll === 1) {
      imgDice(roll);
      cur[1] = 0;
      selCur2.textContent = cur[1];
      turnChanger();
      showingWindow();
    } else {
      imgDice(roll);
      cur[1] += roll;
      selCur2.textContent = cur[1];
    }
  }
});

document.querySelector(".btn-hold").addEventListener("click", function () {
  if (turnCount % 2 === 1) {
    sum[0] += cur[0];
    cur[0] = 0;
    selCur1.textContent = cur[0];
    selSum1.textContent = sum[0];
    if (sum[0] >= 100) {
      showingWinnerWindow();
      reset();
    }
    turnChanger();
  } else {
    sum[1] += cur[1];
    cur[1] = 0;
    selCur2.textContent = cur[1];
    selSum2.textContent = sum[1];
    if (sum[1] >= 100) {
      showingWinnerWindow();
      reset();
    }
    turnChanger();
  }
});
