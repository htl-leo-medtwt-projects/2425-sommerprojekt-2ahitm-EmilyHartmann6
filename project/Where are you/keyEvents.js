
/*skip video (e)*/ 
document.addEventListener("keydown", (event) => {
    if (event.key === "e" && !skipping) { 
        skipping = true;
        skipForward();
    }
});

document.addEventListener("keyup", (event) => {
    if (event.key === "e") {
        skipping = false;
    }
});

/*open settings (esc)*/
document.addEventListener("keydown", (event) => {
    let gameScreen = document.getElementById("gameScreen");
    let menuScreen = document.getElementById("inGameMenuBody");
    if (gameScreen.style.display === "flex" && event.key === "Escape") {
        menuScreen.style.display = "block"; 
        gameScreen.style.opacity = 0.8;
    }
});
