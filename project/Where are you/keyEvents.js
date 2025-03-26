/* Skip Video (E) */
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

/* Open Settings (ESC) */
document.addEventListener("keydown", (event) => {
    let menuScreen = document.getElementById("inGameMenuBody");

    if (event.key === "Escape") {
        if (menuScreen.style.display === "block") {
            menuScreen.style.display = "none";
            body3.style.opacity = 1;
        } else if (body3.style.display === "flex") {
            menuScreen.style.display = "block";
            body3.style.opacity = 0.8;
        }
    }
});
