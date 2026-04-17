let startTime = Date.now();

window.addEventListener("beforeunload", () => {
  let timeSpent = Date.now() - startTime;
  console.log("time spent on page (ms):", timeSpent);
});

document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", () => {
    console.log("navigation clicked:", link.href);
  });
});

document.querySelectorAll("button").forEach(btn => {
  btn.addEventListener("click", () => {
    console.log("button clicked:", btn.innerText);
  });
});

document.querySelectorAll("form").forEach(form => {
  form.addEventListener("submit", () => {
    console.log("form submitted:", form.id);
  });
});

const characters = [
  { name: "Mario", img: "images/mario.png", hint: "he’s a plumber in red." },
  { name: "Sonic", img: "images/sonic.png", hint: "blue, fast, loves rings." },
  { name: "Pikachu", img: "images/pikachu.png", hint: "electric yellow mouse." },
  { name: "Link", img: "images/link.png", hint: "green tunic, master sword." },
  { name: "SpongeBob", img: "images/spongebob.png", hint: "lives in a pineapple." },
  { name: "Mickey Mouse", img: "images/mickey.png", hint: "disney’s mascot." },
  { name: "Scooby-Doo", img: "images/scooby.png", hint: "mystery-solving dog." },
  { name: "Goku", img: "images/goku.png", hint: "saiyan with spiky hair." },
  { name: "Naruto", img: "images/naruto.png", hint: "ninja with orange outfit." },
  { name: "Luffy", img: "images/luffy.png", hint: "straw hat pirate." },
  { name: "Shadow", img: "images/shadow.png", hint: "black hedgehog, rival to sonic." }
];

let index = 0;
let score = 0;

function loadCharacter() {
  const char = characters[index];
  const img = document.getElementById("silhouette");
  const category = document.getElementById("category");
  const feedback = document.getElementById("feedback");
  const guessInput = document.getElementById("guessInput");

  if (!img || !category || !feedback || !guessInput) return;

  img.src = char.img;
  category.textContent = "";
  feedback.textContent = "";
  guessInput.value = "";
}

function showHint() {
  const char = characters[index];
  const category = document.getElementById("category");
  if (!category) return;
  category.textContent = char.hint;
}

function checkGuess(e) {
  e.preventDefault();
  const guessInput = document.getElementById("guessInput");
  const feedback = document.getElementById("feedback");
  const scoreEl = document.getElementById("score");
  if (!guessInput || !feedback || !scoreEl) return;

  const guess = guessInput.value.trim().toLowerCase();
  const answer = characters[index].name.toLowerCase();

  if (guess === answer) {
    feedback.textContent = "correct";
    score++;
  } else {
    feedback.textContent = "wrong — it was " + characters[index].name;
  }

  scoreEl.textContent = "score: " + score + " / " + characters.length;
}

function nextCharacter() {
  index++;
  if (index >= characters.length) {
    index = 0;
    score = 0;
  }
  loadCharacter();
}

if (document.body.dataset.page === "Game") {
  loadCharacter();
  const hintBtn = document.getElementById("hintBtn");
  const nextBtn = document.getElementById("nextBtn");
  const guessForm = document.getElementById("guessForm");

  if (hintBtn) hintBtn.addEventListener("click", showHint);
  if (nextBtn) nextBtn.addEventListener("click", nextCharacter);
  if (guessForm) guessForm.addEventListener("submit", checkGuess);
}
