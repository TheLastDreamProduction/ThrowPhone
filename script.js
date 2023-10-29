// script.js

let isMeasuring = false;
let startTime;
let startPosition;
let endPosition;
let score = 0;

const startButton = document.getElementById("startButton");
const scoreDisplay = document.getElementById("score");

startButton.addEventListener("click", () => {
    if (!isMeasuring) {
        isMeasuring = true;
        startTime = null;
        startButton.textContent = "Stop Measurement";
        startDeviceMotion();
    } else {
        isMeasuring = false;
        startButton.textContent = "Start Measurement";
        stopDeviceMotion();
    }
});

function startDeviceMotion() {
    window.addEventListener("devicemotion", motionHandler);
}

function stopDeviceMotion() {
    window.removeEventListener("devicemotion", motionHandler);
}

function motionHandler(event) {
    if (!startTime) {
        startTime = event.timeStamp;
        startDeviceMotion();
    }

    if (!startPosition) {
        startPosition = event.accelerationIncludingGravity.y;
    } else {
        endPosition = event.accelerationIncludingGravity.y;
        const accelerationDueToGravity = 9.81; // m/s^2 (Earth's gravity)
        const deltaTime = (event.timeStamp - startTime) / 1000; // in seconds
        const distance = ((startPosition + endPosition) / 2) * Math.pow(deltaTime, 2);
        score += distance;
        scoreDisplay.textContent = score.toFixed(2) + " meters";
        startPosition = endPosition;
    }
}
