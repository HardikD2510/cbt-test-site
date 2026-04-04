let currentQ = 0;
let answers = new Array(questions.length).fill(null);
let startTime = Date.now();

/* LOAD QUESTION */
function loadQuestion() {
  let q = questions[currentQ];

  document.getElementById("qNo").innerText = currentQ + 1;
  document.getElementById("questionImage").src = q.image;

  let optionsHTML = "";

  q.options.forEach((opt, i) => {
    optionsHTML += `
      <label>
        <input type="radio" name="option" value="${i}"
        ${answers[currentQ] === i ? "checked" : ""}>
        ${opt}
      </label>
    `;
  });

  document.getElementById("options").innerHTML = optionsHTML;
}

/* SAVE ANSWER */
function saveAnswer() {
  let selected = document.querySelector('input[name="option"]:checked');

  if (selected) {
    answers[currentQ] = parseInt(selected.value);
  }
}

/* NEXT */
function saveAndNext() {
  saveAnswer();

  if (currentQ < questions.length - 1) {
    currentQ++;
    loadQuestion();
  } else {
    showResult();
  }
}

/* PREVIOUS */
function prevQuestion() {
  saveAnswer();

  if (currentQ > 0) {
    currentQ--;
    loadQuestion();
  }
}

/* SKIP */
function skipQuestion() {
  answers[currentQ] = null;

  if (currentQ < questions.length - 1) {
    currentQ++;
    loadQuestion();
  }
}

/* RESULT */
function showResult() {
  let score = 0;

  questions.forEach((q, i) => {
    if (answers[i] === q.answer) {
      score += 2;
    }
  });

  let totalTime = Math.floor((Date.now() - startTime) / 1000);
  let speed = Math.floor(totalTime / questions.length);

  document.body.innerHTML = `
    <h1>Test Completed</h1>
    <h2>Score: ${score}</h2>
    <h3>Accuracy: ${(score / (questions.length * 2) * 100).toFixed(2)}%</h3>
    <h3>Speed: ${speed} Sec/Q</h3>

    <div class="motivation-box">
     KEEP IT UP ASHU, I AM PROUD OF YOU AND I AM SURE THAT YOU WILL CLEAR THIS EXAM.
     AAP ARAM SE CLEAR KRLOGE EXAM BSS EK TO JESE ABHI PREPARE KR RHE HO CHHODNA NHI HAI
     AND MERE SATH TUNED REHNA JIS SE ME BHI SIKHU APSE CHIJE OR HUM DONO MILKE CLEAR KRE
     BDIA SE AND PRACTICE SE HI APP OR ME IMPROVE KREGE. JITNA PRACTICE KROGE UTNI SPEED
     IMPROVE HOGI OR APKA FIRST TIME H PHIR BHI AAP ITNA BDIA KR RHE HO. SO KEEP GOING,
     STAY MOTIVATED AND ENJOY THE PROCESS. I HAVE FAITH IN YOU — KEEP WORKING ❤️

     You are closer than you think.
     Every small effort is building your success.
     Consistency will take you where motivation can’t.
     You’ve got this — don’t stop now. 🚀
    </div>

    <h2 class="made-by">Made for Ashu ❤️</h2>
  `;
}

/* START */
loadQuestion();