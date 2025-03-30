let PLAYER = {
    box: document.getElementById('player'),
}
PLAYER.box.style.left = window.innerWidth - 200 + 'px';
PLAYER.box.style.top = window.innerHeight / 2 + 'px';
let colliders = document.querySelectorAll('.collider');
function movePlayer(dx, dy, dr) {
    // Set initial position if not already set
    if (!PLAYER.box.style.left) {
        PLAYER.box.style.left = window.innerWidth - 200 + 'px';
    }
    if (!PLAYER.box.style.top) {
        PLAYER.box.style.top = window.innerHeight / 2 + 'px';
    }

    // Save original position
    let originalX = parseFloat(PLAYER.box.style.left);
    let originalY = parseFloat(PLAYER.box.style.top);

    // Calculate new position
    let newX = originalX + dx;
    let newY = originalY + dy;

}