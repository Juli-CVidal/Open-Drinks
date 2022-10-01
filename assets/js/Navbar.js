let navbar;
let menuIcon;

function toggleNavbarClasses() {
  if (window.scrollY >= 200) {
    navbarSection.classList.add("navbar-bg");
  } else {
    navbarSection.classList.remove("navbar-bg");
  }
}

function startNavbar() {
  menuIcon = document.querySelector(".menu-icon");
  navbar = document.getElementById("navbar");
  menuIcon.addEventListener("click", () => {
    navbar.classList.toggle("showing");
  });
}
