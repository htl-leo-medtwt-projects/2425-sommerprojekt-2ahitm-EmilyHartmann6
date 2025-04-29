let PLAYER = {
    box: document.getElementById('player'),
    isActive: false
};

PLAYER.box.style.left = "50vw";
PLAYER.box.style.top = "50vh";
PLAYER.box.style.width = "5vw";
PLAYER.box.style.height = "10vh";

let colliders = document.querySelectorAll('.collider');
let keyItem = document.getElementById("keyItem");
let hasKey = false;
let collectedKey = document.getElementById("collectedKey");
let collectedLetter = document.getElementById("collectedLetter");
const correctCode = "135"; 
let currentDoor = null; 
let codeLetterCollected = false;
let entityEntered = false;

let door1 = document.getElementById("door1");
let door2 = document.getElementById("door2");
let door3 = document.getElementById("door3");
let door4 = document.getElementById("door4");
let door5 = document.getElementById("door5");
let door6 = document.getElementById("door6");
let door7 = document.getElementById("door7");
let door8 = document.getElementById("door8");
let door9 = document.getElementById("door9");
let door10 = document.getElementById("door10");
let door11 = document.getElementById("door11");
let door12 = document.getElementById("door12");
let door13 = document.getElementById("door13");
let door14 = document.getElementById("door14");
let firstEnding = document.getElementById("firstEnding");

function movePlayer(dx, dy) {
    if (!PLAYER.isActive) return;

    let currentLeft = parseFloat(PLAYER.box.style.left);
    let currentTop = parseFloat(PLAYER.box.style.top);
    
    let newLeft = currentLeft + dx;
    let newTop = currentTop + dy;

    let playerLeftPx = (newLeft / 100) * window.innerWidth;
    let playerTopPx = (newTop / 100) * window.innerHeight;
    let playerRightPx = playerLeftPx + PLAYER.box.clientWidth;
    let playerBottomPx = playerTopPx + PLAYER.box.clientHeight;

    let collisionDetected = false;
    colliders.forEach(collider => {
        if (collider.style.display !== "none") {
            let colliderRect = collider.getBoundingClientRect();
            
            if (playerLeftPx < colliderRect.right &&
                playerRightPx > colliderRect.left &&
                playerTopPx < colliderRect.bottom &&
                playerBottomPx > colliderRect.top) {
                collisionDetected = true;
            }
        }
    });

    if (!collisionDetected) {
        PLAYER.box.style.left = newLeft + 'vw';
        PLAYER.box.style.top = newTop + 'vh';
    }
}

function checkKeyPickup() {
    if (keyItem && isColliding(PLAYER.box, keyItem)) {
        keyItem.style.display = "none";
        hasKey = true;
        document.getElementById("messages").innerText = "Now walk through the door";
        collectedKey.innerHTML = `<img src="img/key.png" id="keyInventory"/> 
        <p>collected</p>`;
    }
}

function hideCodeLetterWhenLeaving() {
    if (!codeLetterCollected && document.getElementById("collectedCodeLetter").style.display !== "block") {
        document.getElementById("codeLetter").style.display = "none";
    }
}

function checkDoorEntry() {
    if (!PLAYER.isActive) return;

    if (isColliding(PLAYER.box, door1)) {
        if (hasKey) {
            document.getElementById("room1").style.display = "none";
            document.getElementById("room2").style.display = "flex";
            document.getElementById("map2").style.display = "flex";
            document.getElementById("messages").innerText = "";
            document.getElementById("currentRoom").innerText = "Corridor";
            PLAYER.box.style.left = "70vw";
            PLAYER.box.style.top = "50vh";
            collectedKey.innerHTML = "";
            document.getElementById("paperBall").style.display = "block";
        } else {
            document.getElementById("messages").innerText = "It is locked Maybe there is a key";
        }
        return;
    }
    
    if (isColliding(PLAYER.box, door2)) {
        document.getElementById("room1").style.display = "flex";
        document.getElementById("room2").style.display = "none";
        document.getElementById("map2").style.display = "none";
        document.getElementById("messages").innerText = "You escaped a painful death";
        document.getElementById("currentRoom").innerText = "Bedroom";
        document.getElementById("firstEnding").style.display = "block";
        PLAYER.box.style.left = "35vw";
        PLAYER.box.style.top = "50vh";
        return;
    }
    
    if (isColliding(PLAYER.box, firstEnding)) {
        PLAYER.box.style.display = "none";
        document.getElementById("gameScreen").style.display = "none";
        document.getElementById("endingOne").style.display = "block";
        playVideo1();
        return;
    }
    
    if (isColliding(PLAYER.box, door3)) {
        document.getElementById("map2").style.display = "none";
        document.getElementById("room2").style.display = "none";
        document.getElementById("room3").style.display = "flex";
        document.getElementById("map3").style.display = "block";
        document.getElementById("endingOne").style.display = "none";
        document.getElementById("currentRoom").innerText = "Broom Closet";
        PLAYER.box.style.left = "50vw";
        PLAYER.box.style.top = "60vh";
        colliders = document.querySelectorAll('.collider');
        stanely.play();
        return;
    }
    
    if (isColliding(PLAYER.box, door4)) {
        document.getElementById("map2").style.display = "flex";
        document.getElementById("room2").style.display = "flex";
        document.getElementById("room3").style.display = "none";
        document.getElementById("map3").style.display = "none";
        document.getElementById("currentRoom").innerText = "Corridor";
        PLAYER.box.style.left = "28.7vw";
        PLAYER.box.style.top = "34.1vh";
        stanely.pause();
        stanely.currentTime = 0;
        return;
    }
    
    if (isColliding(PLAYER.box, document.getElementById("paperBall"))) {
        document.getElementById("letterContainer").style.display = "flex";
        document.getElementById("paperBall").style.display = "none";
        return;
    }
    
    if (isColliding(PLAYER.box, door5)) {
        document.getElementById("map4").style.display = "flex";
        document.getElementById("room4").style.display = "flex";
        document.getElementById("room2").style.display = "none";
        document.getElementById("map2").style.display = "none";
        document.getElementById("currentRoom").innerText = "Corridor";
        PLAYER.box.style.left = "47.8vw";
        PLAYER.box.style.top = "23.3vh";
        return;
    }
    
    if (isColliding(PLAYER.box, door6)) {
        document.getElementById("map2").style.display = "flex";
        document.getElementById("room2").style.display = "flex";
        document.getElementById("room4").style.display = "none";
        document.getElementById("map4").style.display = "none";
        document.getElementById("currentRoom").innerText = "Corridor";
        PLAYER.box.style.left = "47.8vw";
        PLAYER.box.style.top = "63.8vh";
        return;
    }
    
    if (isColliding(PLAYER.box, door7)) {
        document.getElementById("map5").style.display = "flex";
        document.getElementById("room5").style.display = "flex";
        document.getElementById("room4").style.display = "none";
        document.getElementById("map4").style.display = "none";
        document.getElementById("currentRoom").innerText = "Corridor";
        PLAYER.box.style.left = "47.8vw";
        PLAYER.box.style.top = "26.8vh";
        
        if (!codeLetterCollected && document.getElementById("collectedCodeLetter").style.display !== "block") {
            document.getElementById("codeLetter").style.display = "block";
        }
        return;
    }
    
    if (isColliding(PLAYER.box, door8)) {
        document.getElementById("map4").style.display = "flex";
        document.getElementById("room4").style.display = "flex";
        document.getElementById("room5").style.display = "none";
        document.getElementById("map5").style.display = "none";
        document.getElementById("currentRoom").innerText = "Corridor";
        document.getElementById("codeLetter").style.display = "none"; 
        PLAYER.box.style.left = "46.3vw";
        PLAYER.box.style.top = "66vh";
        return;
    }
    
    if (isColliding(PLAYER.box, door9)) {
        currentDoor = door9;
        document.getElementById("codeInputContainer").style.display = "flex";
        document.getElementById("codeInput").focus();
        setGameActive(false);
        return;
    }
    
    if (isColliding(PLAYER.box, door10)) {
        document.getElementById("map5").style.display = "none";
        document.getElementById("room5").style.display = "none";
        document.getElementById("room6").style.display = "flex";
        document.getElementById("map6").style.display = "flex";
        document.getElementById("currentRoom").innerText = "Living Room";
        PLAYER.box.style.left = "44.8vw";
        PLAYER.box.style.top = "20.6vh";
        document.getElementById("codeLetter").style.display = "none"; 
        return;
    }

    if (isColliding(PLAYER.box, door11)) {
        document.getElementById("room7").style.display = "none";
        document.getElementById("map7").style.display = "none";
        document.getElementById("room8").style.display = "flex";
        document.getElementById("map8").style.display = "block";
        document.getElementById("currentRoom").innerText = "Empty Room";
        PLAYER.box.style.left = "50vw";
        PLAYER.box.style.top = "50vh";
        return;
    }
    
    if (isColliding(PLAYER.box, door12)) {
        document.getElementById("room7").style.display = "none";
        document.getElementById("map7").style.display = "none";
        document.getElementById("room9").style.display = "flex";
        document.getElementById("map9").style.display = "block";
        document.getElementById("currentRoom").innerText = "Bedroom";
        PLAYER.box.style.left = "50vw";
        PLAYER.box.style.top = "50vh";
        return;
    }
    
    if (isColliding(PLAYER.box, door13)) {
        document.getElementById("room7").style.display = "none";
        document.getElementById("map7").style.display = "none";
        document.getElementById("room10").style.display = "flex";
        document.getElementById("map10").style.display = "block";
        document.getElementById("currentRoom").innerText = "Corridor";
        PLAYER.box.style.left = "50vw";
        PLAYER.box.style.top = "50vh";
        return;
    }
    
    if (isColliding(PLAYER.box, door14)) {
        document.getElementById("room7").style.display = "none";
        document.getElementById("map7").style.display = "none";
        document.getElementById("room5").style.display = "flex";
        document.getElementById("map5").style.display = "flex";
        document.getElementById("currentRoom").innerText = "Corridor";
        PLAYER.box.style.left = "55.5vw";
        PLAYER.box.style.top = "37.6vh";
        return;
    }

    if (isColliding(PLAYER.box, document.getElementById("triggerCollider")) && !entityEntered) {
        entityEntered = true;
        setGameActive(false);
        document.getElementById("enteringEntity").style.display = "block";
        document.getElementById("enteringEntity").classList.add("enter-animation");
        document.getElementById("messages").innerText = "Oh no! Something's coming in!";
    }
}

function gameLoop() {
    if (PLAYER.isActive) {
        let dx = 0, dy = 0;
        const speed = 0.3;

        if (KEY_EVENTS.w) dy -= speed;
        if (KEY_EVENTS.s) dy += speed;
        if (KEY_EVENTS.a) dx -= speed;
        if (KEY_EVENTS.d) dx += speed;

        if (dx !== 0 || dy !== 0) {
            movePlayer(dx, dy);
            checkKeyPickup();
            checkDoorEntry();
        }
    }
    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);

function setGameActive(state) {
    PLAYER.isActive = state;
    if (!state) {
        KEY_EVENTS = { w: false, a: false, s: false, d: false };
    }
}