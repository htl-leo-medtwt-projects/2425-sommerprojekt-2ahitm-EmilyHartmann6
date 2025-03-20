
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
    if (event.key === "Escape") { 
        body3.style.opacity = 0.8;
        body4.style.display = "block";
    }
});
