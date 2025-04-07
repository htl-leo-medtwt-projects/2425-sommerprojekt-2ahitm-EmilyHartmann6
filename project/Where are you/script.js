//bodies
let body1 = document.getElementById("startScreen");
let body2 = document.getElementById("flashbackScreen");
let body3 = document.getElementById("gameScreen");
let body4 = document.getElementById("inGameMenuBody");

//Variablen
let video = document.getElementById("myVideo");
let video1 = document.getElementById("VideoFirstEnding")
let optionOutputs = document.querySelectorAll(".optionOutput");
let optionButton = document.getElementById("optionButton");
let message = document.getElementById("messages");


//side switching
function switchToflashbackScreen() {
    body1.style.display = "none";
    body2.style.display = "block";
    playVideo();
}

document.addEventListener("DOMContentLoaded", function () {
    if (video) {
        video.addEventListener("ended", function () {
          switchTogameScreen();
        });
    }
});
document.addEventListener("DOMContentLoaded", function () {
    if (video1) {
        video1.addEventListener("ended", function () {
          window.location.href = "./index.html";
        });
    }
});
document.addEventListener("DOMContentLoaded", function () {
    if (stanely) {
        stanely.addEventListener("ended", function () {
          window.location.href = "./index.html";
        });
    }
});

function switchTogameScreen() {
    body2.style.display = "none";
    body3.style.display = "flex";
    video.pause();
    document.getElementById("player").style.display = "block";
    document.getElementById("room1").style.display = "flex";
    document.getElementById("messages").style.display = "block";
    document.getElementById("inventory").style.display = "block"
    document.getElementById("currentRoom").style.display = "block"
}


//options
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
        bar.addEventListener("click", function () {
            let level = parseInt(this.getAttribute("data-level"));
            let volume = volumeLevels[level]; 

            video.volume = volume;
            video1.volume = volume;
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

document.addEventListener("DOMContentLoaded", setupVolumeControls);

/*video */
let skipping = false;

function playVideo() {
    video.muted = false;
    video.play().catch(error => console.error("Playback error:", error));
}

function skipForward() {
    if (skipping) {
        video.currentTime += 5;
        requestAnimationFrame(skipForward);
    }
}

function continueOn() {
    body4.style.display = "none"; 
    body3.style.opacity = 1;
}
function playVideo1(){
    video1.muted = false;
    video1.play().catch(error => console.error("Playback error:", error));
}

/*audio*/
let stanely = new Audio("audio/broomClosetEnding.mp3");
