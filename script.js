let currentQ = 0;
let selectedAnswers = new Array(questions.length).fill(null);

let startTime = Date.now();

// TIMER
setInterval(() => {
  let time = Math.floor((Date.now() - startTime) / 1000);
  document.getElementById("timer").innerText = "Time: " + time + "s";
}, 1000);

loadQuestion();

function loadQuestion() {
  let q = questions[currentQ];

  document.getElementById("questionImage").src = q.image;
  document.getElementById("qNo").innerText = currentQ + 1;

  let optionsHTML = "";

  q.options.forEach((opt, i) => {
    optionsHTML += `
      <label>
        <input type="radio" name="option" value="${i}"
        ${selectedAnswers[currentQ] === i ? "checked" : ""}>
        ${opt}
      </label>
    `;
  });

  document.getElementById("options").innerHTML = optionsHTML;
}

function saveAndNext() {
  let selected = document.querySelector('input[name="option"]:checked');

  if (!selected) {
    alert("Select an option!");
    return;
  }

  selectedAnswers[currentQ] = parseInt(selected.value);

  currentQ++;

  if (currentQ < questions.length) {
    loadQuestion();
  } else {
    finishTest();
  }
}

function finishTest() {
  let marks = 0;
  let correct = 0;

  for (let i = 0; i < questions.length; i++) {
    if (selectedAnswers[i] === questions[i].answer) {
      marks += 2;
      correct++;
    }
  }

  let totalTime = (Date.now() - startTime) / 1000;
  let accuracy = (correct / questions.length) * 100;
  let speed = totalTime / questions.length;

  localStorage.setItem("result", JSON.stringify({
    marks,
    total: questions.length * 2,
    accuracy,
    speed
  }));

  window.location.href = "result.html";
}