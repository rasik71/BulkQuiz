const quizData = [
  {
    question: "What is the primary goal of Bulk Trade as a decentralized exchange?",
    options: [
      "A. To replace AMM based DEXs with higher leverage products",
      "B. To replicate centralized exchange performance while preserving non custodial trading",
      "C. To enable cross-chain trading through bridges",
      "D. To provide yield farming opportunities on Solana"
    ],
    answer: 1
  },
  {
    question: "Why is Bulk Trade built natively on Solana rather than being EVM compatible?",
    options: [
      "A. Solana offers lower validator requirements than EVM chains",
      "B. Solana’s architecture enables high throughput and low latency execution",
      "C. EVM chains do not support perpetual futures",
      "D. Solana enforces stronger KYC compliance"
    ],
    answer: 1
  },
  {
    question: "What does gasless trading mean in the context of Bulk Trade?",
    options: [
      "A. Users never pay any fees of any kind",
      "B. Validators cover gas costs in exchange for governance power",
      "C. Users pay only exchange fees, not per transaction blockchain gas",
      "D. Gas fees are paid using the $BULK token"
    ],
    answer: 2
  },
  {
    question: "How does Bulk Trade reduce custodial risk compared to centralized exchanges?",
    options: [
      "A. By storing funds in multisig smart contracts",
      "B. By holding assets in Bulk controlled cold wallets",
      "C. By allowing users to keep assets in their own Solana SPL wallets",
      "D. By insuring user deposits through validators"
    ],
    answer: 2
  },
  {
    question: "Why does Bulk share a portion of taker fees with validators running Bulk agave?",
    options: [
      "A. To reduce token inflation",
      "B. To encourage validators to prioritize Bulk transactions",
      "C. To comply with Solana governance requirements",
      "D. To subsidize user trading losses"
    ],
    answer: 1
  }
];

let currentQuestion = 0;
let score = 0;
let timeLeft = 15;
let timer;

document.getElementById("startBtn").onclick = () => {
  const username = document.getElementById("username").value.trim();
  if (!username) {
    alert("Enter your Discord name");
    return;
  }

  document.getElementById("startPage").classList.add("hidden");
  document.getElementById("quizPage").classList.remove("hidden");
  loadQuestion();
};

function loadQuestion() {
  if (currentQuestion >= quizData.length) {
    showResult();
    return;
  }

  timeLeft = 15;
  document.getElementById("time").innerText = timeLeft;
  document.getElementById("questionText").innerText =
    quizData[currentQuestion].question;

  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  quizData[currentQuestion].options.forEach((opt, index) => {
    const div = document.createElement("div");
    div.className = "option";
    div.innerText = opt;
    div.onclick = () => selectAnswer(index, div);
    optionsDiv.appendChild(div);
  });

  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("time").innerText = timeLeft;

    if (timeLeft === 0) {
      clearInterval(timer);
      showCorrectAnswer();
    }
  }, 1000);
}

function selectAnswer(selectedIndex, selectedDiv) {
  clearInterval(timer);

  const correctIndex = quizData[currentQuestion].answer;

  // Mark wrong selection
  if (selectedIndex !== correctIndex) {
    selectedDiv.style.backgroundColor = "red";
  } else {
    score++;
  }

  // Mark correct answer
  const optionsDiv = document.getElementById("options").children;
  optionsDiv[correctIndex].style.backgroundColor = "green";

  // Wait 1 second and go to next question
  setTimeout(() => {
    currentQuestion++;
    loadQuestion();
  }, 1000);
}

function showCorrectAnswer() {
  const correctIndex = quizData[currentQuestion].answer;
  const optionsDiv = document.getElementById("options").children;
  optionsDiv[correctIndex].style.backgroundColor = "green";

  setTimeout(() => {
    currentQuestion++;
    loadQuestion();
  }, 1000);
}

function showResult() {
  document.getElementById("quizPage").classList.add("hidden");
  document.getElementById("resultPage").classList.remove("hidden");
  document.getElementById("scoreText").innerText =
    `Your Score: ${score} / ${quizData.length}`;
}
