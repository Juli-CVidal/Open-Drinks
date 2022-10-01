let slider;
let items;
let itemCount;
let interval;
let count = 0;

function createSlide(title, description, img) {
  let div = document.createElement("div");
  div.innerHTML = ` 
  <div class="slider-card">
  <img src="./assets/img/slider/${img}"/>
    <div class="slider-content">
      <h4 class="slider-title">${title}</h4>
      <p>
         ${description}
      </p>
       <a href="#menuSection">READ MORE</a>
    </div>
  </div>`;
  return div;
}

function createInitialSlides() {
  const slides = [];
  slides.push(
    createSlide("Amazing Drinks", "To taste in company", "first.webp")
  );
  slides.push(
    createSlide("Fresh Ingredients", "To stay on top", "second.webp")
  );
  slides.push(
    createSlide(
      "Alcoholic and Non-Alcoholic",
      "For everyone to enjoy",
      "third.webp"
    )
  );
  slides.forEach((slide) => {
    slider.innerHTML += slide.innerHTML;
  });
}

function resetInterval() {
  clearInterval(interval);
  interval = setInterval(showNextItem, 5000);
}

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
  slider = document.querySelector("#slider");
  createInitialSlides();

  items = document.querySelectorAll(".slider-card");
  toggleActiveClass(items[0]);
  itemCount = items.length;
  document.getElementById("slider-next").addEventListener("click", () => {
    showNextItem();
    resetInterval();
  });
  document.getElementById("slider-prev").addEventListener("click", () => {
    showPrevItem();
    resetInterval();
  });
  interval = setInterval(showNextItem, 5000);
}
