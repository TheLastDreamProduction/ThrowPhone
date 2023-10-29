// script.js

let isMeasuring = false;
let startTime;
let endTime;
let startY;

const startButton = document.getElementById("startButton");
const scoreDisplay = document.getElementById("score");

startButton.addEventListener("click", () => {
    if (!isMeasuring) {
        isMeasuring = true;
        startTime = null;
        startY = null;
        startButton.textContent = "Stop Measurement";

        // Add an event listener to track device motion
        window.addEventListener("devicemotion", motionHandler);
    } else {
        isMeasuring = false;
        endTime = new Date();
        startButton.textContent = "Start Measurement";

        // Remove the event listener
        window.removeEventListener("devicemotion", motionHandler);

        if (startTime && startY !== null) {
            const timeDiff = (endTime - startTime) / 1000; // in seconds
            const gravity = 9.81; // m/s^2 (Earth's gravity)
            const accelerationDueToGravity = gravity * (startY / 9.81);
            const distance = 0.5 * accelerationDueToGravity * Math.pow(timeDiff, 2);
            scoreDisplay.textContent = distance.toFixed(2) + " meters";
        }
    }
});

function motionHandler(event) {
    if (event.accelerationIncludingGravity) {
        if (!startTime) {
            startTime = new Date();
        }
        if (startY === null) {
            startY = event.accelerationIncludingGravity.y;
        }
    }
}
