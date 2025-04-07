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
    setGameActive(false); // Disable player controls
    playVideo();
}

function switchTogameScreen() {
    body2.style.display = "none";
    body3.style.display = "flex";
    setGameActive(true); // Enable player controls
    video.pause();
    
    // Initialize game elements
    document.getElementById("player").style.display = "block";
    document.getElementById("room1").style.display = "flex";
    document.getElementById("messages").style.display = "block";
    document.getElementById("inventory").style.display = "block";
    document.getElementById("currentRoom").style.display = "block";
    
    // Reset to room 1 if coming from ending
    document.getElementById("room2").style.display = "none";
    document.getElementById("room3").style.display = "none";
    document.getElementById("map2").style.display = "none";
    document.getElementById("map3").style.display = "none";
    document.getElementById("firstEnding").style.display = "none";
}

function continueOn() {
    body4.style.display = "none"; 
    body3.style.opacity = 1;
    setGameActive(true); // Re-enable controls when continuing
}

// Video control functions
function playVideo() {
    video.muted = false;
    video.play().catch(error => console.error("Playback error:", error));
}

function playVideo1() {
    video1.muted = false;
    video1.play().catch(error => console.error("Playback error:", error));
}

function skipForward() {
    if (skipping) {
        video.currentTime += 5;
        requestAnimationFrame(skipForward);
    }
}

// Options menu functions
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
        1: 0.1,
        2: 0.3,
        3: 0.5,
        4: 0.7,
        5: 1.0
    };

    bars.forEach(bar => {
        bar.addEventListener("click", function() {
            let level = parseInt(this.getAttribute("data-level"));
            let volume = volumeLevels[level];

            video.volume = volume;
            video1.volume = volume ;
            stanely.volume = volume;

            bars.forEach((b, index) => {
                if (index < level) {
                    b.classList.add("active");
                } else {
                    b.classList.remove("active");
                }
            });
        });
    });
}

// Event listeners for video endings
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
    
    // Initialize volume controls
    setupVolumeControls();
});

// Key event listeners
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