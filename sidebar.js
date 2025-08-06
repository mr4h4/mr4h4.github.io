  fetch("sidebar.html")
      .then(response => response.text())
      .then(data => {
        document.getElementById("sidebar-container").innerHTML = data;
      });

function openNav() {
    document.getElementById("sidebar").classList.add("open");
    document.getElementById("main-content").classList.add("open");
}

// Cierra el menú lateral
function closeNav() {
    document.getElementById("sidebar").classList.remove("open");
    document.getElementById("main-content").classList.remove("open");
}