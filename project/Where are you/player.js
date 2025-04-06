let PLAYER = {
    box: document.getElementById('player'),
}
PLAYER.box.style.left = "780px"; 
PLAYER.box.style.top = "360px";
let colliders = document.querySelectorAll('.collider');
function movePlayer(dx, dy, dr) {
    // Save original position
    let originalX = parseFloat(PLAYER.box.style.left);
    let originalY = parseFloat(PLAYER.box.style.top);

    // Calculate new position
    let newX = originalX + dx;
    let newY = originalY + dy;

    // Check for collisions
    let collisionDetected = false;
    colliders.forEach(collider => {
        let colliderRect = collider.getBoundingClientRect();
        let playerRect = PLAYER.box.getBoundingClientRect();

        if (
            newX < colliderRect.right &&
            newX + playerRect.width > colliderRect.left &&
            newY < colliderRect.bottom &&
            newY + playerRect.height > colliderRect.top
        ) {
            collisionDetected = true;
        }
    });
        if(!collisionDetected){
        PLAYER.box.style.left = newX + 'px';
        PLAYER.box.style.top = newY + 'px';
        }

}
setInterval(() => {
    let dx = 0, dy = 0;
    const speed = 5;

    if (KEY_EVENTS.w) dy -= speed;
    if (KEY_EVENTS.s) dy += speed;
    if (KEY_EVENTS.a) dx -= speed;
    if (KEY_EVENTS.d) dx += speed;

    movePlayer(dx, dy, 0);
    if (KEY_EVENTS.w || KEY_EVENTS.a || KEY_EVENTS.s || KEY_EVENTS.d) {
        checkKeyPickup();
        checkDoorEntry();
    }

}, 16);
console.log("Player Position:", PLAYER.box.style.left, PLAYER.box.style.top);

//key
let keyItem = document.getElementById("keyItem");
let hasKey = false;


function checkKeyPickup() {
    if (keyItem && isColliding(PLAYER.box, keyItem)) {
        keyItem.style.display = "none";
        hasKey = true;
        document.getElementById("messages").innerText = "Now walk through the door";
    }
}
//doors
let door1 = document.getElementById("door1");
let door2 = document.getElementById("door2");
let firstEnding = document.getElementById("firstEnding");
function checkDoorEntry() {
    if (isColliding(PLAYER.box, door1)) {
        if (hasKey) {
            console.log(hasKey)
            document.getElementById("room1").style.display = "none";
            document.getElementById("room2").style.display = "flex";
            document.getElementById("map2").style.display = "flex";
            document.getElementById("messages").innerText = "";
            document.getElementById("currentRoom").innerText = "Corridor"
            PLAYER.box.style.left = "1035px";
            PLAYER.box.style.top = "425px";

        } else {
            document.getElementById("messages").innerText = "It is locked Maybe there is a key";
        }
    }
    if (isColliding(PLAYER.box, door2)) {
       
            document.getElementById("room1").style.display = "flex";
            document.getElementById("room2").style.display = "none";
            document.getElementById("map2").style.display = "none";
            document.getElementById("messages").innerText = "You escaped a painful and deadly adventure";
            document.getElementById("currentRoom").innerText = "Bedroom"
            document.getElementById("firstEnding").style.display ="block"
            PLAYER.box.style.left = "525px";
            PLAYER.box.style.top = "395px";
    }
    if (isColliding(PLAYER.box, firstEnding)) {
       PLAYER.box.style.display = "none"
       document.getElementById("gameScreen").style.display = "none";
       document.getElementById("endingOne").style.display = "block";
       playVideo1();
}
}
