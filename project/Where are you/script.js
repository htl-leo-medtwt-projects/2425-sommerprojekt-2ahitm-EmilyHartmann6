const sounds = {
    scream: new Howl({
      src: ['audio/scream.mp3'],
      volume: 0.9,
      preload: true
    }),
    footstep: new Howl({
        src: ['audio/footsteps.mp3'],
        volume: 0.7,
        sprite: {
            step: [0, 60]
        },
        rate: 1.2,
        onend: function() {
            this.stop();
        }
    }),
    paperBall: new Howl({
        src: ['audio/paperBall.mp3'],
        volume: 0.7,
        sprite: {
            short: [0, 1000]
        },
        preload: true
    }),
    letter: new Howl({
        src: ['audio/letter.mp3'],
        volume: 0.7,
        preload: true
    }),
    doorCreak: new Howl({
        src: ['audio/door_creak.mp3'],
        volume: 0.6,
        preload: true
    }),
    background: new Howl({
        src: ['audio/background.mp3'],
        volume: 0.1,  
        loop: true,   
        preload: true
    }),
       laughing: new Howl({
        src: ['audio/laughing.mp3'],
        volume: 0.8,
        preload: true
    }),
     sorryMessage: new Howl({
        src: ['audio/sorryMessage.mp3'],
        volume: 0.7,
        preload: true
    }),
     whereAreYou: new Howl({
        src: ['audio/whereAreYou.mp3'],
        volume: 1.0,  
        preload: true
    })
}

  // Footstep management
  let isMoving = false;
  let footstepInterval;

// Screen elements
let body1 = document.getElementById("startScreen");
let body2 = document.getElementById("flashbackScreen");
let body3 = document.getElementById("gameScreen");
let body4 = document.getElementById("inGameMenuBody");

// Video elements
let video = document.getElementById("myVideo");
let video1 = document.getElementById("VideoFirstEnding");

// UI elements
let optionOutputs = document.querySelectorAll(".optionOutput");
let optionButton = document.getElementById("optionButton");
let message = document.getElementById("messages");

// Audio elements
let stanely = new Audio("audio/broomClosetEnding.mp3");
let skipping = false;

// Screen switching functions
function switchToflashbackScreen() {
    body1.style.display = "none";
    body2.style.display = "block";
    setGameActive(false); 
    playVideo();
}

function switchTogameScreen() {
     sounds.background.play();
    body2.style.display = "none";
    body3.style.display = "flex";
    document.getElementById("player").style.display = "block";
    setGameActive(true); 
    video.pause();
    
    document.getElementById("player").style.display = "block";
    document.getElementById("room1").style.display = "flex";
    document.getElementById("messages").style.display = "block";
    document.getElementById("inventory").style.display = "block";
    document.getElementById("currentRoom").style.display = "block";
    
    document.getElementById("room2").style.display = "none";
    document.getElementById("room3").style.display = "none";
    document.getElementById("map2").style.display = "none";
    document.getElementById("map3").style.display = "none";
    document.getElementById("firstEnding").style.display = "none";
}

function continueOn() {
    body4.style.display = "none"; 
    body3.style.opacity = 1;
    setGameActive(true); 
}

function playVideo() {
     sounds.background.stop();
    video.muted = false;
    video.play().catch(error => console.error("Playback error:", error));
}

function playVideo1() {
     sounds.background.stop();
    video1.muted = false;
    video1.play().catch(error => console.error("Playback error:", error));
}

function skipForward() {
    if (skipping) {
        video.currentTime += 5;
        requestAnimationFrame(skipForward);
    }
}

function options() {
    optionOutputs.forEach(optionOutput => {
        optionOutput.innerHTML = `
        <h2 class="middelHeading">Volume</h2>
        <div class="volume-container">
            <div class="bar" data-level="1"></div>
            <div class="bar" data-level="2"></div>
            <div class="bar" data-level="3"></div>
            <div class="bar" data-level="4"></div>
            <div class="bar" data-level="5"></div>
        </div>`;
    });

    if (optionButton) {
        optionButton.style.color = "#702020";
    }

    setupVolumeControls();
}

function setupVolumeControls() {
    const bars = document.querySelectorAll(".bar");
    
    const volumeLevels = {
        1: 0.3,  
        2: 0.6,
        3: 0.8,
        4: 0.9,
        5: 1.0
    };

    bars.forEach(bar => {
        bar.addEventListener("click", function() {
            let level = parseInt(this.getAttribute("data-level"));
            let volume = volumeLevels[level];

            
            video.volume = 1.0;
            video1.volume = 1.0;
            
           
            stanely.volume = volume;
            sounds.background.volume(volume * 0.3); 
            sounds.doorCreak.volume(volume);
            sounds.footstep.volume(volume);
            sounds.paperBall.volume(volume);
            sounds.letter.volume(volume);
            sounds.scream.volume(volume);
            sounds.whereAreYou.volume(volume * 0.5);

            bars.forEach((b, index) => {
                if (index < level) {
                    b.classList.add("active");
                } else {
                    b.classList.remove("active");
                }
            })
        })
    })
}

function optionLetter() {
    sounds.letter.play(); 
    if (document.getElementById("collectedCodeLetter").style.display !== "block") {
        document.getElementById("codeLetterModal").style.display = "flex";
        setGameActive(false);
    }
}

function closeCodeLetterModal() {
    sounds.letter.play(); 
    codeLetterCollected = true;
    document.getElementById("codeLetterModal").style.display = "none";
    document.getElementById("collectedCodeLetter").style.display = "block";
    document.getElementById("codeLetter").style.display = "none";
    setGameActive(true);
}

function letterContinue(){
    sounds.letter.play(); 
    document.getElementById("letterContainer").style.display = "none";
    document.getElementById("letterInventory").style.display = "block";
}

function letterReturn(){
    window.location.href = "./index.html";
}

function checkCode() {
    const input = document.getElementById("codeInput").value;
    if (input === correctCode) {
        document.getElementById("codeFeedback").innerText = "";
        document.getElementById("codeInputContainer").style.display = "none";
        
        setTimeout(() => {
            sounds.doorCreak.play();
            proceedThroughDoor(currentDoor);
        }, 100);
    } else {
        document.getElementById("codeFeedback").innerText = "WRONG CODE";
        document.getElementById("codeInput").value = "";
        setTimeout(() => {
            document.getElementById("codeFeedback").innerText = "";
        }, 1500);
    }
}

function closeCodeInput() {
    document.getElementById("codeInputContainer").style.display = "none";
    document.getElementById("codeFeedback").innerText = "";
    document.getElementById("codeInput").value = "";
    setGameActive(true);
}

function proceedThroughDoor(door) {
    const fadeScreen = document.getElementById("fadeScreen");
    
    async function doTransition() {
        
        fadeScreen.classList.add("fade-out");
        await new Promise(resolve => setTimeout(resolve, 500));
       
        if (door === door9) {
            document.getElementById("map5").style.display = "none";
            document.getElementById("room5").style.display = "none";
            document.getElementById("room7").style.display = "flex";
            document.getElementById("map7").style.display = "flex";
            document.getElementById("currentRoom").innerText = "Corridor";
            document.getElementById("codeLetter").style.display = "none"; 
            PLAYER.box.style.left = "55.5vw";
            PLAYER.box.style.top = "37.6vh";
        }
        
       
        fadeScreen.classList.remove("fade-out");
        fadeScreen.classList.add("fade-in");
        await new Promise(resolve => setTimeout(resolve, 500));
        
        fadeScreen.classList.remove("fade-in");
        setGameActive(true);
    }
    
    setGameActive(false);
    doTransition();
}

document.addEventListener("DOMContentLoaded", function() {
    if (video) {
        video.addEventListener("ended", function() {
            switchTogameScreen();
        });
    }
    
    if (video1) {
        video1.addEventListener("ended", function() {
            window.location.href = "./index.html";
        });
    }
    
    if (stanely) {
        stanely.addEventListener("ended", function() {
            window.location.href = "./index.html";
        });
    }
    if (document.getElementById("badEndingVideo")) {
        document.getElementById("badEndingVideo").addEventListener("ended", function() {
            window.location.href = "./index.html";
        });
    }
    if (document.getElementById("goodEndingVideo")) {
        document.getElementById("goodEndingVideo").addEventListener("ended", function() {
            window.location.href = "./index.html";
        });
    }
    
    setupVolumeControls();

    document.getElementById("submitCode").addEventListener("click", checkCode);
    document.getElementById("cancelCode").addEventListener("click", closeCodeInput);
    document.getElementById("codeInput").addEventListener("keypress", function(e) {
        if (e.key === "Enter") {
            checkCode();
        }
    });
});

document.addEventListener("keydown", (event) => {
    if (event.key === "e" && !skipping) {
        skipping = true;
        skipForward();
    }
    
    if (event.key === "Escape") {
        let menuScreen = document.getElementById("inGameMenuBody");
        if (menuScreen.style.display === "block") {
            menuScreen.style.display = "none";
            body3.style.opacity = 1;
            setGameActive(true);
        } else if (body3.style.display === "flex") {
            menuScreen.style.display = "block";
            body3.style.opacity = 0.8;
            setGameActive(false);
        }
    }
});

document.addEventListener("keyup", (event) => {
    if (event.key === "e") {
        skipping = false;
    }
});

function stopAllSounds() {
    sounds.scream.stop();
    sounds.footstep.stop();
   stopAmbientSound();
    clearInterval(footstepInterval);
    isMoving = false;
}