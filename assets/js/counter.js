let counters;
let started;
let section;

function incrementCounter(counter) {
  const limit = parseInt(counter.innerHTML);
  counter.innerHTML = 0;
  const interval = setInterval(() => {
    if (++counter.innerHTML == limit) clearInterval(interval);
  }, 5);
}

function startCounters() {
  counters = document.querySelectorAll(".counter");
  counters.forEach((counter) => {
    incrementCounter(counter);
  });
}

function checkCounters() {
  started = false;
  section = document.getElementById("counter");
  window.addEventListener("scroll", () => {
    const position = section.getBoundingClientRect();
    if (!started && position.top < window.innerHeight) {
      startCounters();
      started = true;
    }
  });
}
