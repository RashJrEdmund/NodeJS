const toggleActive = () => {
    document.getElementById("nav_list").classList.toggle("active");
    document.getElementById("overlay").classList.toggle("active");
}

document.getElementById("menu").addEventListener("click", toggleActive);

document.getElementById("overlay").addEventListener("click", toggleActive);
