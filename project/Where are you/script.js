let optionOutput = document.getElementById("optionOutput");
let optionButton = document.getElementById("optionButton");
function options(){
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
    bar.addEventListener("click", function() {
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
