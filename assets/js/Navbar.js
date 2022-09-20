let mainNavbar;

function toggleNavbarClasses() {
  if (window.scrollY >= 200) {
    mainNavbar.classList.add("navbar-bg");
  } else {
    mainNavbar.classList.remove("navbar-bg");
  }
}


function startNavbar() {
  mainNavbar = document.querySelector(".mu-main-navbar");
  window.addEventListener("scroll", () => toggleNavbarClasses());
}

