//bodies
let body1 = document.getElementById("startScreen");
let body2 = document.getElementById("flashbackScreen")
let body3 = document.getElementById("gameScreen");

/*site switching*/
function switchToflashbackScreen() {
    body1.style.display = "none";
    body2.style.display = "block"
    playVideo();
}
document.addEventListener("DOMContentLoaded", function () {
    
    if (video) {
        video.addEventListener("ended", function () {
            body2.style.display = "none";
            body3.style.display = "flex";
        });
    }
});
function switchTogameScreen() {
    body2.style.display = "none";
    body3.style.display = "flex";
    video.pause();
}
/*options*/
let optionOutput = document.getElementById("optionOutput");
let optionButton = document.getElementById("optionButton");
function options() {
    optionOutput.innerHTML = `
    <h2 class="middelHeading">Volume</h2>
    <div class="volume-container">
        <div class="bar" data-level="1"></div>
        <div class="bar" data-level="2"></div>
        <div class="bar" data-level="3"></div>
        <div class="bar" data-level="4"></div>
        <div class="bar" data-level="5"></div>
    </div>`;
    optionButton.style.color = "#702020"
}
const bars = document.querySelectorAll(".bar");

bars.forEach(bar => {
    bar.addEventListener("click", function () {
        let volumeLevel = parseInt(this.getAttribute("data-level"));
        bars.forEach((b, index) => {
            if (index < volumeLevel) {
                b.classList.add("active");
            } else {
                b.classList.remove("active");
            }
        });
    });
});

/*Video*/
let skipping = false;
let video = document.getElementById("myVideo");

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

