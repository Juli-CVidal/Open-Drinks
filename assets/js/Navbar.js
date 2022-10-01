let mainNavbar;

function toggleNavbarClasses() {
  if (window.scrollY >= 200) {
    mainNavbar.classList.add("navbar-bg");
  } else {
    mainNavbar.classList.remove("navbar-bg");
  }
}


function startNavbar() {
  mainNavbar = document.querySelector(".main-navbar");
  window.addEventListener("scroll", () => toggleNavbarClasses());
}

