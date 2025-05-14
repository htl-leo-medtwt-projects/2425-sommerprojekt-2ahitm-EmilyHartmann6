let PLAYER = {
    box: document.getElementById('player'),
    isActive: false,
    direction: 'right',
    speed: 0.2
};

PLAYER.box.style.left = "50vw";
PLAYER.box.style.top = "50vh";
PLAYER.box.className = "player player-right";

let colliders = document.querySelectorAll('.collider');
let keyItem = document.getElementById("keyItem");
let hasKey = false;
let collectedKey = document.getElementById("collectedKey");
let collectedLetter = document.getElementById("collectedLetter");
const correctCode = "135";
let currentDoor = null;
let codeLetterCollected = false;
let entityEntered = false;

// Door references
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
let door15 = document.getElementById("door15");
let door16 = document.getElementById("door16");
let door17 = document.getElementById("door17");
let door18 = document.getElementById("door18");
let door19 = document.getElementById("door19");
let door20 = document.getElementById("door20");
let firstEnding = document.getElementById("firstEnding");

function movePlayer(dx, dy) {
    if (!PLAYER.isActive) return;


    if (dx !== 0 || dy !== 0) {

        if (Math.abs(dx) > Math.abs(dy)) {
            if (dx > 0) {
                // Moving right
                if (PLAYER.direction !== 'right') {
                    PLAYER.direction = 'right';
                    PLAYER.box.style.backgroundImage = "url('img/playerside.png')";
                    PLAYER.box.style.transform = "scaleX(1)";
                }
            } else {
                // Moving left
                if (PLAYER.direction !== 'left') {
                    PLAYER.direction = 'left';
                    PLAYER.box.style.backgroundImage = "url('img/playerside.png')";
                    PLAYER.box.style.transform = "scaleX(-1)";
                }
            }
        } else {
            if (dy > 0) {
                // Moving down (front)
                if (PLAYER.direction !== 'front') {
                    PLAYER.direction = 'front';
                    PLAYER.box.style.backgroundImage = "url('img/playerback.png')";
                    PLAYER.box.style.transform = "scaleX(1) rotate(180deg)";
                }
            } else {
                // Moving up (back)
                if (PLAYER.direction !== 'back') {
                    PLAYER.direction = 'back';
                    PLAYER.box.style.backgroundImage = "url('img/playerback.png')";
                    PLAYER.box.style.transform = "scaleX(1)";
                }
            }
        }
    }

    // Calculate new position
    let currentLeft = parseFloat(PLAYER.box.style.left);
    let currentTop = parseFloat(PLAYER.box.style.top);
    let newLeft = currentLeft + dx;
    let newTop = currentTop + dy;


    let playerRect = PLAYER.box.getBoundingClientRect();
    let newPlayerRect = {
        left: (newLeft / 100) * window.innerWidth,
        right: (newLeft / 100) * window.innerWidth + playerRect.width,
        top: (newTop / 100) * window.innerHeight,
        bottom: (newTop / 100) * window.innerHeight + playerRect.height
    };


    let collisionDetected = false;
    colliders.forEach(collider => {
        if (window.getComputedStyle(collider).display !== "none") {
            let colliderRect = collider.getBoundingClientRect();

            if (newPlayerRect.left < colliderRect.right &&
                newPlayerRect.right > colliderRect.left &&
                newPlayerRect.top < colliderRect.bottom &&
                newPlayerRect.bottom > colliderRect.top) {
                collisionDetected = true;
            }
        }
    });


    if (!collisionDetected) {
        PLAYER.box.style.left = newLeft + 'vw';
        PLAYER.box.style.top = newTop + 'vh';
    }

    return { dx, dy };
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

    async function transitionThroughDoor(callback) {
        const fadeScreen = document.getElementById("fadeScreen");
        setGameActive(false);

        fadeScreen.classList.add("fade-out");
        await new Promise(resolve => setTimeout(resolve, 500));

        callback();


        fadeScreen.classList.remove("fade-out");
        fadeScreen.classList.add("fade-in");
        await new Promise(resolve => setTimeout(resolve, 500));

        fadeScreen.classList.remove("fade-in");
        setGameActive(true);
    }

    if (isColliding(PLAYER.box, door1)) {
        if (hasKey) {
            transitionThroughDoor(() => {
                document.getElementById("room1").style.display = "none";
                document.getElementById("room2").style.display = "flex";
                document.getElementById("map2").style.display = "flex";
                document.getElementById("messages").innerText = "";
                document.getElementById("currentRoom").innerText = "Corridor";
                PLAYER.box.style.left = "68vw";
                PLAYER.box.style.top = "50vh";
                collectedKey.innerHTML = "";
                document.getElementById("paperBall").style.display = "block";
            });
        } else {
            document.getElementById("messages").innerText = "It is locked Maybe there is a key";
        }
        return;
    }

    if (isColliding(PLAYER.box, door2)) {
        transitionThroughDoor(() => {
            document.getElementById("room1").style.display = "flex";
            document.getElementById("room2").style.display = "none";
            document.getElementById("map2").style.display = "none";
            document.getElementById("messages").innerText = "You escaped a painful death";
            document.getElementById("currentRoom").innerText = "Bedroom";
            document.getElementById("firstEnding").style.display = "block";
            PLAYER.box.style.left = "32vw";
            PLAYER.box.style.top = "50vh";
        });
        return;
    }

    if (isColliding(PLAYER.box, firstEnding)) {
        stopAllSounds();
        PLAYER.box.style.display = "none";
        document.getElementById("gameScreen").style.display = "none";
        document.getElementById("endingOne").style.display = "block";
        playVideo1();
        return;
    }

    if (isColliding(PLAYER.box, door3)) {
        transitionThroughDoor(() => {
            stopAllSounds();
            document.getElementById("map2").style.display = "none";
            document.getElementById("room2").style.display = "none";
            document.getElementById("room3").style.display = "flex";
            document.getElementById("map3").style.display = "block";
            document.getElementById("endingOne").style.display = "none";
            document.getElementById("currentRoom").innerText = "Broom Closet";
            PLAYER.box.style.left = "47vw";
            PLAYER.box.style.top = "55vh";
            colliders = document.querySelectorAll('.collider');
            stanely.play();
        });
        return;
    }

    if (isColliding(PLAYER.box, door4)) {
        transitionThroughDoor(() => {
            document.getElementById("map2").style.display = "flex";
            document.getElementById("room2").style.display = "flex";
            document.getElementById("room3").style.display = "none";
            document.getElementById("map3").style.display = "none";
            document.getElementById("currentRoom").innerText = "Corridor";
            PLAYER.box.style.left = "25vw";
            PLAYER.box.style.top = "34.1vh";
            stanely.pause();
            stanely.currentTime = 0;
        });
        return;
    }

    if (isColliding(PLAYER.box, document.getElementById("paperBall"))) {
        stopAllSounds();
        sounds.paperBall.play('short');
        document.getElementById("letterContainer").style.display = "flex";
        document.getElementById("paperBall").style.display = "none";
        return;
    }

    if (isColliding(PLAYER.box, door5)) {
        transitionThroughDoor(() => {
            document.getElementById("map4").style.display = "flex";
            document.getElementById("room4").style.display = "flex";
            document.getElementById("room2").style.display = "none";
            document.getElementById("map2").style.display = "none";
            document.getElementById("currentRoom").innerText = "Corridor";
            PLAYER.box.style.left = "46vw";
            PLAYER.box.style.top = "23.3vh";
        });
        return;
    }

    if (isColliding(PLAYER.box, door6)) {
        transitionThroughDoor(() => {
            document.getElementById("map2").style.display = "flex";
            document.getElementById("room2").style.display = "flex";
            document.getElementById("room4").style.display = "none";
            document.getElementById("map4").style.display = "none";
            document.getElementById("currentRoom").innerText = "Corridor";
            PLAYER.box.style.left = "46vw";
            PLAYER.box.style.top = "63.8vh";
        });
        return;
    }

    if (isColliding(PLAYER.box, door7)) {
        transitionThroughDoor(() => {
            document.getElementById("map5").style.display = "flex";
            document.getElementById("room5").style.display = "flex";
            document.getElementById("room4").style.display = "none";
            document.getElementById("map4").style.display = "none";
            document.getElementById("currentRoom").innerText = "Corridor";
            PLAYER.box.style.left = "46vw";
            PLAYER.box.style.top = "26.8vh";

            if (!codeLetterCollected && document.getElementById("collectedCodeLetter").style.display !== "block") {
                document.getElementById("codeLetter").style.display = "block";
            }
        });
        return;
    }

    if (isColliding(PLAYER.box, door8)) {
        transitionThroughDoor(() => {
            document.getElementById("map4").style.display = "flex";
            document.getElementById("room4").style.display = "flex";
            document.getElementById("room5").style.display = "none";
            document.getElementById("map5").style.display = "none";
            document.getElementById("currentRoom").innerText = "Corridor";
            document.getElementById("codeLetter").style.display = "none";
            PLAYER.box.style.left = "45vw";
            PLAYER.box.style.top = "60vh";
        });
        return;
    }

    if (isColliding(PLAYER.box, door9)) {
        stopAllSounds();
        currentDoor = door9;
        document.getElementById("codeInputContainer").style.display = "flex";
        document.getElementById("codeInput").focus();
        setGameActive(false);
        return;
    }

    if (isColliding(PLAYER.box, door10)) {
        transitionThroughDoor(() => {
            document.getElementById("map5").style.display = "none";
            document.getElementById("room5").style.display = "none";
            document.getElementById("room6").style.display = "flex";
            document.getElementById("map6").style.display = "flex";
            document.getElementById("currentRoom").innerText = "Living Room";
            PLAYER.box.style.left = "43vw";
            PLAYER.box.style.top = "20.6vh";
            document.getElementById("codeLetter").style.display = "none";
            document.getElementById("doubleBodyCorpse").style.display = "block";
        });
        return;
    }

    if (isColliding(PLAYER.box, door11)) {
        transitionThroughDoor(() => {
            document.getElementById("room7").style.display = "none";
            document.getElementById("map7").style.display = "none";
            document.getElementById("room8").style.display = "flex";
            document.getElementById("map8").style.display = "block";
            document.getElementById("currentRoom").innerText = "empty room";
            document.getElementById("badEndingCorpse").style.display = "block";
            PLAYER.box.style.left = "52vw";
            PLAYER.box.style.top = "45vh";

            setTimeout(() => {
                sounds.scream.seek(8);
                sounds.scream.play();
                setGameActive(false);
                setTimeout(() => {
                    setGameActive(false);
                    stopAllSounds();

                    const badEndingVideo = document.getElementById("badEndingVideo");
                    badEndingVideo.style.display = "block";
                    badEndingVideo.style.position = "fixed";
                    badEndingVideo.style.top = "0";
                    badEndingVideo.style.left = "0";
                    badEndingVideo.style.width = "100vw";
                    badEndingVideo.style.height = "100vh";
                    badEndingVideo.style.zIndex = "1000";

                    badEndingVideo.muted = false;
                    badEndingVideo.volume = 1;

                    const playPromise = badEndingVideo.play();

                    if (playPromise !== undefined) {
                        playPromise.catch(error => {
                            badEndingVideo.muted = true;
                            badEndingVideo.play();
                        });
                    }

                    badEndingVideo.onended = function () {
                        window.location.href = "./index.html";
                    };
                }, 10000);
            }, 1000);
        });
        return;
    }

    if (isColliding(PLAYER.box, door12)) {
        transitionThroughDoor(() => {
            document.getElementById("room7").style.display = "none";
            document.getElementById("map7").style.display = "none";
            document.getElementById("room9").style.display = "flex";
            document.getElementById("map9").style.display = "block";
            document.getElementById("currentRoom").innerText = "Bedroom";
            PLAYER.box.style.left = "42vw";
            PLAYER.box.style.top = "60vh";

            const room9Entity = document.getElementById("room9Entity");
            room9Entity.style.display = "block";

            setTimeout(() => {
                document.getElementById("messages").innerText = "There you are...";
                setTimeout(() => {
                    document.getElementById("messages").innerText = "Lets leave...";
                }, 3000);
            }, 1000);
        });
        return;
    }

    if (isColliding(PLAYER.box, door13)) {
        transitionThroughDoor(() => {
            document.getElementById("room7").style.display = "none";
            document.getElementById("map7").style.display = "none";
            document.getElementById("room10").style.display = "flex";
            document.getElementById("map10").style.display = "block";
            document.getElementById("currentRoom").innerText = "Corridor";
            PLAYER.box.style.left = "48vw";
            PLAYER.box.style.top = "23vh";
        });
        return;
    }

    if (isColliding(PLAYER.box, door14)) {
        transitionThroughDoor(() => {
            document.getElementById("room7").style.display = "none";
            document.getElementById("map7").style.display = "none";
            document.getElementById("room5").style.display = "flex";
            document.getElementById("map5").style.display = "flex";
            document.getElementById("currentRoom").innerText = "Corridor";
            PLAYER.box.style.left = "54vw";
            PLAYER.box.style.top = "37.6vh";
        });
        return;
    }

    if (isColliding(PLAYER.box, door15)) {
        transitionThroughDoor(() => {
            setGameActive(false);
            stopAllSounds();

            const goodEndingVideo = document.getElementById("goodEndingVideo");
            goodEndingVideo.style.display = "block";
            goodEndingVideo.style.position = "fixed";
            goodEndingVideo.style.top = "0";
            goodEndingVideo.style.left = "0";
            goodEndingVideo.style.width = "100vw";
            goodEndingVideo.style.height = "100vh";
            goodEndingVideo.style.zIndex = "1000";

            goodEndingVideo.muted = false;
            goodEndingVideo.volume = 1;

            const playPromise = goodEndingVideo.play();

            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    goodEndingVideo.muted = true;
                    goodEndingVideo.play();
                });
            }

            goodEndingVideo.onended = function () {
                window.location.href = "./index.html";
            };
        });
        return;
    }

if (isColliding(PLAYER.box, door16)) {
    transitionThroughDoor(() => {
        document.getElementById("room10").style.display = "none";
        document.getElementById("room11").style.display = "flex";
        document.getElementById("map11").style.display = "block";
        document.getElementById("currentRoom").innerText = "Corridor";
        PLAYER.box.style.left = "48vw";
        PLAYER.box.style.top = "20vh";
    });
    return;
}

if (isColliding(PLAYER.box, door17)) {
    transitionThroughDoor(() => {
        document.getElementById("room11").style.display = "none";
        document.getElementById("room12").style.display = "flex";
        document.getElementById("map12").style.display = "block";
        document.getElementById("currentRoom").innerText = "Corridor";
        PLAYER.box.style.left = "48vw";
        PLAYER.box.style.top = "80vh";
    });
    return;
}

if (isColliding(PLAYER.box, door18)) {
    transitionThroughDoor(() => {
        document.getElementById("room12").style.display = "none";
        document.getElementById("room13").style.display = "flex";
        document.getElementById("map13").style.display = "block";
        document.getElementById("currentRoom").innerText = "Corridor";
        PLAYER.box.style.left = "48vw";
        PLAYER.box.style.top = "20vh";
    });
    return;
}

if (isColliding(PLAYER.box, door19)) {
    transitionThroughDoor(() => {
        document.getElementById("room13").style.display = "none";
        document.getElementById("room12").style.display = "flex";
        document.getElementById("map12").style.display = "block";
        document.getElementById("currentRoom").innerText = "Corridor";
        PLAYER.box.style.left = "48vw";
        PLAYER.box.style.top = "80vh";
    });
    return;
}

if (isColliding(PLAYER.box, door20)) {
    transitionThroughDoor(() => {
        document.getElementById("room13").style.display = "none";
        document.getElementById("room14").style.display = "flex";
        document.getElementById("map14").style.display = "block";
        document.getElementById("currentRoom").innerText = "Final Room";
        PLAYER.box.style.left = "48vw";
        PLAYER.box.style.top = "50vh";
    });
    return;
}

if (isColliding(PLAYER.box, door21)) {
    transitionThroughDoor(() => {
        document.getElementById("room14").style.display = "none";
        document.getElementById("room13").style.display = "flex";
        document.getElementById("map13").style.display = "block";
        document.getElementById("currentRoom").innerText = "Corridor";
        PLAYER.box.style.left = "48vw";
        PLAYER.box.style.top = "20vh";
    });
    return;
}

    if (isColliding(PLAYER.box, document.getElementById("door14"))) {
        transitionThroughDoor(() => {
            document.getElementById("room10").style.display = "none";
            document.getElementById("map10").style.display = "none";
            document.getElementById("room11").style.display = "flex";
            document.getElementById("map11").style.display = "block";
            document.getElementById("currentRoom").innerText = "Corridor";
            PLAYER.box.style.left = "48vw";
            PLAYER.box.style.top = "20vh";
        });
        return;
    }

    

    if (isColliding(PLAYER.box, document.getElementById("triggerCollider")) && !entityEntered) {
        stopAllSounds();
        entityEntered = true;
        setGameActive(false);
        let entity = document.getElementById("enteringEntity");
        entity.style.display = "block";
        entity.style.top = "20vh";
        entity.style.right = "38vw";
        entity.classList.add("enter-animation");
        document.getElementById("messages").innerText = "Is that...";

        entity.addEventListener('animationend', () => {
            const endingMessage = document.getElementById("ending-message");
            endingMessage.classList.add("show");

            setTimeout(() => {
                window.location.href = "./index.html";
            }, 3000);
        });
    }
}

function gameLoop() {
    if (PLAYER.isActive) {
        let dx = 0, dy = 0;
        const speed = PLAYER.speed;

        if (KEY_EVENTS.w) dy -= speed;
        if (KEY_EVENTS.s) dy += speed;
        if (KEY_EVENTS.a) dx -= speed;
        if (KEY_EVENTS.d) dx += speed;

        const wasMoving = isMoving;
        isMoving = dx !== 0 || dy !== 0;


        if (isMoving && !wasMoving) {

            footstepInterval = setInterval(() => {
                sounds.footstep.play('step');
            }, 500);
        } else if (!isMoving && wasMoving) {

            clearInterval(footstepInterval);
        }

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