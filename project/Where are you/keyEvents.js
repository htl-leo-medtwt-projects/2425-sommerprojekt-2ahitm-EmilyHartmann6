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
        KEY_EVENTS.a = true;
    }
    if (e.key === "w") { 
        KEY_EVENTS.w = true;
    }
    if (e.key === "d") { 
        KEY_EVENTS.d = true;
    }
    if (e.key === "s") { 
        KEY_EVENTS.s = true;
    }
}
function keyListenerUp(e) {
    if (e.key === "a") { 
        KEY_EVENTS.a = false;
    }
    if (e.key === "w") { 
        KEY_EVENTS.w = false;
    }
    if (e.key === "d") {
        KEY_EVENTS.d = false;
    }
    if (e.key === "s") { 
        KEY_EVENTS.s = false;
    }
}
let pressedKeys = {
    w: false,
    a: false,
    s: false,
    d: false,
};

let triggered = false;

function checkAllKeysPressed() {
    if (pressedKeys.w && pressedKeys.a && pressedKeys.s && pressedKeys.d && !triggered) {
        triggered = true;
        document.getElementById("messages").innerText = "Run over a object to collect it";
        document.getElementById("keyItem").style.display = "block"
    }
}

document.addEventListener("keydown", (e) => {
    if (e.key in pressedKeys) {
        pressedKeys[e.key] = true;
        checkAllKeysPressed();
    }
});
