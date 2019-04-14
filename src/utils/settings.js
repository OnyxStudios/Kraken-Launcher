let settings = document.getElementById('settings-window');

function openSettings() {
    settings.style.display = "block";
}

function closeSettings() {
    settings.style.display = "none";
}

document.onclick = function(event) {
    if(event.target == settings) {
        settings.style.display = "none";
    }
}