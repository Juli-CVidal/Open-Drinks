let id;
let banner;
let drinkDetails;
let drink;

function createBanner() {
  div = document.createElement("div");
  div.innerHTML = `  <div class="container">
    <div class="recipe-banner-area vr">
      <h2><a href="#recipe">${drink.strDrink}</a></h2>
      <h3><a href="index.html">GO HOME</a></h3>
    </div>
  </div>`;

  banner.style.backgroundImage = `url(${drink.strDrinkThumb})`;
  return div.innerHTML;
}

function getIngredients() {
  const ingredients = new Map();
  //The list of ingredients starts at index 17, and the list of measures starts at index 32;
  const FIRST_INGREDIENT = 17;
  const FIRST_MEASURE = 32;
  const values = Object.values(drink);
  for (let index = 0; index < 15; index++) {
    const currentIngredient = values[FIRST_INGREDIENT + index];
    if (!currentIngredient) break;
    const currentMeasure = values[FIRST_MEASURE + index];

    ingredients.set(currentIngredient, currentMeasure);
  }
  return ingredients;
}
function createUl() {
  const ingredients = getIngredients();
  const ul = document.createElement("ul");
  const keys = [...ingredients.keys()];
  const values = [...ingredients.values()];
  const SIZE = keys.length;
  for (let index = 0; index < SIZE; index++) {
    const li = document.createElement("li");
    li.innerText = `${values[index]} ${keys[index]}`;
    ul.appendChild(li);
  }
  return ul.innerHTML;
}

function createInstructions() {
  const div = document.createElement("div");
  const instructions = drink.strInstructions.split(".");

  instructions.forEach((instruction) => {
    div.innerHTML += `<p>${instruction}</p>`;
  });
  return div.innerHTML;
}

function createRecipe() {
  div = document.createElement("div");
  div.innerHTML = ` <h2>
     ${drink.strDrink}
    </h2>
    <figure class="recipe-details-img">
      <a href="#"
        ><img src="${drink.strDrinkThumb}" alt="img"
      /></a>
    </figure>
    <div class="recipe-details-single-content">
    ${createUl()}
    <br>
    ${createInstructions()}
      
    </div>`;
  drinkDetails.innerHTML = div.innerHTML;
}

async function fetchDrink() {
  const URL = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";
  const response = await fetch(`${URL}${id}`);
  const responseJSON = await response.json();
  return responseJSON.drinks[0];
}

async function startPage() {
  banner = document.getElementById("recipe-banner");
  drinkDetails = document.getElementById("drink-details");
  id = localStorage.getItem("idDrink");

  drink = await fetchDrink();
  banner.innerHTML = createBanner();
  createRecipe();
}
