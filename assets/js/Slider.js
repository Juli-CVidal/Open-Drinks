const items = document.querySelectorAll(".slider-card");
const itemCount = items.length;
let count = 0;

function toggleActiveClass(item) {
  item.classList.toggle("active");
}

function showNextItem() {
  toggleActiveClass(items[count]);
  count = ++count == itemCount ? 0 : count;
  toggleActiveClass(items[count]);
}

function showPrevItem() {
  toggleActiveClass(items[count]);
  count = --count == -1 ? itemCount - 1 : count;
  toggleActiveClass(items[count]);
}

function startSlider() {
  setInterval(showNextItem, 5000);
  const prevBtn = document.getElementById("slider-prev");
  const nextBtn = document.getElementById("slider-next");
  prevBtn.addEventListener("click", showPrevItem);
  nextBtn.addEventListener("click", showNextItem);
}

