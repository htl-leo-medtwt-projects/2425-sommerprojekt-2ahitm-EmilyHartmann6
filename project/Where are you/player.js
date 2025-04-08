
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
let collectedLetter = document.getElementById("collectedLetter")

let door1 = document.getElementById("door1");
let door2 = document.getElementById("door2");
let door3 = document.getElementById("door3");
let door4 = document.getElementById("door4");
let firstEnding = document.getElementById("firstEnding");

function movePlayer(dx, dy) {
    if (!PLAYER.isActive) return;

    let currentLeft = parseFloat(PLAYER.box.style.left);
    let currentTop = parseFloat(PLAYER.box.style.top);
    
    let newLeft = currentLeft + dx;
    let newTop = currentTop + dy;

    // Convert vw/vh to pixels 
    let playerLeftPx = (newLeft / 100) * window.innerWidth;
    let playerTopPx = (newTop / 100) * window.innerHeight;
    let playerRightPx = playerLeftPx + PLAYER.box.clientWidth;
    let playerBottomPx = playerTopPx + PLAYER.box.clientHeight;

    // Check for collisions
    let collisionDetected = false;
    colliders.forEach(collider => {
        if (collider.style.display !== "none") { // Only check visible colliders
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

// Key 
function checkKeyPickup() {
    if (keyItem && isColliding(PLAYER.box, keyItem)) {
        keyItem.style.display = "none";
        hasKey = true;
        document.getElementById("messages").innerText = "Now walk through the door";
        collectedKey.innerHTML = `<img src="img/key.png" id="keyInventory"/> 
        <p>collected</p>`;
    }
}

// Door
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
        } else {
            document.getElementById("messages").innerText = "It is locked. Maybe there is a key";
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
        PLAYER.box.style.left = "35vw";
        PLAYER.box.style.top = "50vh";
        stanely.pause();
        stanely.currentTime = 0;
        return;
    }
}

// Game loop
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
        // Reset key 
        KEY_EVENTS = { w: false, a: false, s: false, d: false };
    }
}