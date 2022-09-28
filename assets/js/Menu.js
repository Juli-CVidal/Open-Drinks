const URL = "https://tasty.p.rapidapi.com/recipes/list?from=0&size=8&tags=";
const menuContent = document.getElementById("catalogue");
let lastSelected;
let catalogue = {};

function getSteps(instructions) {
  return instructions ? instructions.length + " steps" : "...";
}

function getDescription(description) {
  return description ? description : "...";
}

function showIngredients(ingredients) {
  return ingredients
    .map((ingredient) => {
      return `* ${ingredient.name}, ${ingredient.quantity} <br>`;
    })
    .join("");
}

function setLi(li, element, source) {
  li.innerHTML = ` <div class="media">
      <div class="media-left">
      <a href="#">
      <img
          style="width:100px; height:100px;"
         src="${"api" == source ? element.thumbnail_url : "/assets/img/menu/item-1.jpg"}"
        alt="${element.name}"
      />
    </a>
      </div>
      <div class="media-body">
        <h4 class="media-heading">
          <a href="#">${element.name}</a>
        </h4>
        <span class="steps">
          ${
            "api" == source
              ? getSteps(element.instructions)
              : `${element.steps.length} steps`
          }
        </span>
        <p>
          ${
            "api" == source
              ? getDescription(element.description)
              : showIngredients(element.ingredients)
          }
        </p>
      </div>
    </div>`;
}

function createMenu(list) {
  const half = Math.ceil(list.length / 2);
  let div = document.createElement("div");
  div.setAttribute("class", "col-md-12");
  div.innerHTML = `<div class="col-md-6">
    <div class="left-part">
      <ul class="menu-item-nav">
        ${createUl(list.slice(0, half))}
      </ul>
    </div>
  </div>
  <div class="col-md-6">
    <div class="right-part">
      <ul class="menu-item-nav">
        ${createUl(list.slice(half))}
      </ul>
   </div>
  </div>
  `;
  console.log(div);
  return div;
}

function createUl(list) {
  let ul = document.createElement("ul");
  ul.setAttribute("class", "menu-item-nav");
  ul.setAttribute("id", "categories");
  list.forEach((element) => {
    let li = document.createElement("li");
    setLi(li, element);
    ul.appendChild(li);
  });
  return ul.innerHTML;
}

function toggleActive(tag) {
  if (undefined != lastSelected) {
    document.getElementById(lastSelected).classList.remove("active");
  }
  document.getElementById(tag).classList.add("active");
  lastSelected = tag;
}

async function addToList(tag) {
  const response = await getFromApi(tag);
  const menus = createMenu(response).innerHTML;
  catalogue[tag] = menus;
  return menus;
}

async function getMenusByTag(tag) {
  if (lastSelected == tag) return;
  const menus = catalogue[tag] ? catalogue[tag] : await addToList(tag);
  menuContent.innerHTML = menus;
  toggleActive(tag);
}

//If the api is not available I will use the recipes I get from recipes.json
async function getFromApi(tag) {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "6c0a84ef39mshe36664d69ea4af4p11b4e2jsnbf73e800b288",
      "X-RapidAPI-Host": "tasty.p.rapidapi.com",
    },
  };
  const request = new Request(`${URL}${tag}`, options);
  const response = await fetch(request);
  return response.ok ? await response.json().results : await getFromLocal();
}

async function getFromLocal() {
  const options = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    mode: "cors",
    cache: "default",
  };
  const request = new Request("./assets/js/recipes.json", options);
  const response = await fetch(request);
  const json = await response.json();
  return json;
}

function showFirstMenu() {
  getMenusByTag("breakfast");
}
