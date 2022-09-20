let section;
let counters;
let windowHt;

const updateCounter = (counter) => {
  const target = counter.getAttribute("data-target");
  const current = +counter.innerText;

  if (current < target) {
    counter.innerText = current + 1;
    setTimeout(updateCounter(counter), 100);
  }
};

const checkIfInView = () => {
  let sectionPos = section.getBoundingClientRect().top;
  if (sectionPos <= windowHt / 1.3) {
    alert("hiii")
    counters.forEach((counter) => updateCounter(counter));
  }
};

const init = () => {
  windowHt = window.innerHeight;
  section = document.getElementById("mu-counter");
  counters = document.querySelectorAll(".counter");
  // document.addEventListener("DOMContentLoaded", checkIfInView());
  window.addEventListener("scroll", checkIfInView());
};

window.onload = init();
