function toggleContent(button) {
    var targetId = button.getAttribute("data-target");
    var content = document.getElementById(targetId);

    if (content.style.display === "none") {
        content.style.display = "block"; 
    } else {
        content.style.display = "none";
    }
}