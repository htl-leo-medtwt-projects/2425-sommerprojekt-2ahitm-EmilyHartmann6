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



let KEY_EVENTS = {
    w: false,
    a: false,
    s: false,
    d: false,
}
document.onkeydown = keyListenerDown;
document.onkeyup = keyListenerUp;


function keyListenerDown(e) {
    if (e.key === "a") { 
        KEY_EVENTS.leftArrow = true;
    }
    if (e.key === "w") { 
        KEY_EVENTS.upArrow = true;
    }
    if (e.key === "d") { 
        KEY_EVENTS.rightArrow = true;
    }
    if (e.key === "s") { 
        KEY_EVENTS.downArrow = true;
    }
   
}
function keyListenerUp(e) {
    if (e.key === "a") { 
        KEY_EVENTS.leftArrow = false;
    }
    if (e.key === "w") { 
        KEY_EVENTS.upArrow = false;
    }
    if (e.key === "d") {
        KEY_EVENTS.rightArrow = false;
    }
    if (e.key === "s") { 
        KEY_EVENTS.downArrow = false;
    }
   
}