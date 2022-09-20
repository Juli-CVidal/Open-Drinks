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

function setLi(li, element) {
  li.innerHTML = ` <div class="media">
      <div class="media-left">
        <a href="#">
          <img
              style="width:100px; height:100px;"
            src="${element.thumbnail_url}"
            alt="img"
          />
        </a>
      </div>
      <div class="media-body">
        <h4 class="media-heading">
          <a href="#">${element.name}</a>
        </h4>
        <span class="steps">${getSteps(element.instructions)}</span>
        <p>
          ${getDescription(element.description)}
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
  </div>`;
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

async function getMenusByTag(tag) {
  if (lastSelected == tag) return;
  menuContent.innerHTML =
    catalogue[tag] == undefined
      ? await getFromApi(tag).then((results) => {
          let div = createMenu(results);
          catalogue[tag] = div.innerHTML;
          return catalogue[tag]
        })
      : catalogue[tag];

  toggleActive(tag);
}
//   if (catalogue[tag] == undefined) {
//     getFromApi(tag)
//       .then((results) => {
//         let div = createMenu(results);
//         catalogue[tag] = div.innerHTML;
//       })
//       .then(() => {
//         menuContent.innerHTML = catalogue[tag];
//         toggleActive(tag);
//       });
//   } else {
//     menuContent.innerHTML = catalogue[tag];
//     toggleActive(tag);
//   }
// }

function getFromApi(tag) {
  return fetch(URL + tag, options)
    .then((response) => response.json())
    .then((response) => {
      return response.results;
    })
    .catch((err) => console.error(err));
}

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "6c0a84ef39mshe36664d69ea4af4p11b4e2jsnbf73e800b288",
    "X-RapidAPI-Host": "tasty.p.rapidapi.com",
  },
};

function showFirstMenu() {
  getMenusByTag("breakfast");
}
