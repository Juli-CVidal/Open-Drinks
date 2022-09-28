let section;
let counters;
let windowHt;
const counterSection = section.offset();
const viewportHeight = window.height();

const updateCounter = (counter) => {
  const target = counter.getAttribute("data-target");
  const current = +counter.innerText;

  if (current < target) {
    counter.innerText = current + 1;
    setTimeout(updateCounter(), 100);
  }
};

function checkIfInView() {
  if (window.scrollY() > counterSection.top - viewportHeight) {
    updateCounter();
  }
}

const init = () => {
  windowHt = window.innerHeight;
  section = document.getElementById("mu-counter");
  counters = document.querySelectorAll(".counter");

  window.addEventListener("scroll", checkIfInView());
};

window.onload = init();
