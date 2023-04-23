let minutes = document.querySelector(".time .min");
let seconds = document.querySelector(".time .sec");
let currentQuest = document.querySelector(".current-quest");
let total = document.querySelector(".total");
let question = document.querySelector(".question");
let submit = document.querySelector(".submit");
let answers = document.querySelector(".answers");
let index = 0;
let quizArray;
let rigthAnswers = [];
let wrongAnswers = [];
let timer = window.setInterval(() => {
  if (minutes.innerHTML == 10) {
    minutes.innerHTML--;
    seconds.innerHTML = 60;
  }
  seconds.innerHTML--;
  if (seconds.innerHTML == 0) {
    seconds.innerHTML == 60;
    minutes.innerHTML--;
  }
  if (minutes.innerHTML == 0) {
    window.clearInterval(timer);
  }
}, 1000);
fetching();

function fetching() {
  //Fetching
  fetch("questions.json")
    .then((accepted) => {
      return accepted.json();
    })
    .then((accepted) => {
      quizArray = accepted;
      creating(quizArray);
    });

  //
}
function creating(quizArray) {
  answers.innerHTML = "";
  for (let i = 0; i < 4; i++) {
    let lab = document.createElement("label");
    lab.classList.add("label-div");
    answers.appendChild(lab);
  }
  let labels = document.querySelectorAll(".label-div");
  currentQuest.innerHTML = index + 1;

  total.innerHTML = quizArray.length;

  question.innerHTML = quizArray[index].title;

  labels.forEach((label, i) => {
    // label.innerHTML = quizArray[index][`answer_${i + 1}`];
    label.innerHTML = `<input  class="answer" type="radio" checked />`;
    let span = document.createElement("span");
    span.innerHTML = quizArray[index][`answer_${i + 1}`];
    label.appendChild(span);
    label.addEventListener("click", function (la) {
      document.querySelectorAll(".selected").forEach((select) => {
        select.classList.remove("selected");
      });
      la.currentTarget.classList.add("selected");
    });
  });
}
submit.addEventListener("click", async function () {
  await fetch("questions.json")
    .then((accepted) => {
      return accepted.json();
    })
    .then((accepted) => {
      quizArray = accepted;
      let sel = document.querySelector(".selected");
      if (index == +total.innerHTML - 1) {
        submit.innerHTML = "Submit";
        if (sel.textContent == quizArray[index].right_answer) {
          rigthAnswers.push(0);
        } else wrongAnswers.push(0);
        result(rigthAnswers, quizArray);
        return false;
      } else if (sel.textContent == quizArray[index].right_answer) {
        rigthAnswers.push(0);
      } else wrongAnswers.push(0);
      index++;
      fetching();
      if (index == +total.innerHTML - 1) {
        submit.innerHTML = "submit";
      }
    });
});
function result(rigthAnswers, quizArray) {
  let res = document.createElement("div");
  res.classList.add("result");
  let right = document.createElement("div");
  right.innerHTML = `You Result is ${rigthAnswers.length} / ${quizArray.length}`;
  res.appendChild(right);
  document.body.appendChild(res);
}
