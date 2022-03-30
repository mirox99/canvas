let navItems = [];

window.addEventListener('DOMContentLoaded', (event) => {
    navItems = document.getElementsByClassName('nav-item');
});

function setActiveNavItem(el) {
    for (let i = 0; i < navItems.length; i++) {
        navItems[i].classList.remove("active");
    }
    el.classList.add("active");
}

