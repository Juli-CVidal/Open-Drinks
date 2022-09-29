const menuContent = document.getElementById("catalogue");
let lastSelected;
let catalogue = {};

function setLi(li, element) {
  li.innerHTML = ` <div class="media">
      <div class="media-left">
      <a href="#">
      <img
          style="width:100px; height:100px;"
         src="${element.strDrinkThumb}"
        alt="${element.strDrink}"
      />
    </a>
      </div>
      <div class="media-body">
        <h4 class="media-heading">
          <a href="#">${element.strDrink}</a>
        </h4>
        <span class="steps">
          Five stars
        </span>
        <p>
          A classic <br>
          Click For More info
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
  return div;
}

function createUl(list) {
  let ul = document.createElement("ul");
  ul.setAttribute("class", "menu-item-nav");
  ul.setAttribute("id", "categories");

  //Comment this line if you want to get the elements in the original order
  list.sort((a, b) => 0.5 - Math.random());

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
  const response = await getListFromApi(tag);
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


async function getListFromApi(tag) {
  const URL = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=";
  const response = await fetch(`${URL}${tag}`);
  const jsonResponse = await response.json();
  return await jsonResponse.drinks;
}

function showFirstMenu() {
  getMenusByTag("Beer");
}
