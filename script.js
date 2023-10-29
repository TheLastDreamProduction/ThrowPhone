// script.js

let isMeasuring = false;
let startTime;
let startAcceleration;
let startVelocity = 0;
let distance = 0;

const startButton = document.getElementById("startButton");
const scoreDisplay = document.getElementById("score");

startButton.addEventListener("click", () => {
    if (!isMeasuring) {
        isMeasuring = true;
        startTime = null;
        startAcceleration = null;
        startVelocity = 0;
        distance = 0;
        startButton.textContent = "Stop Measurement";

        // Add event listeners for device motion
        window.addEventListener("devicemotion", motionHandler);
    } else {
        isMeasuring = false;
        startButton.textContent = "Start Measurement";

        // Remove the event listener
        window.removeEventListener("devicemotion", motionHandler);

        scoreDisplay.textContent = distance.toFixed(2) + " meters";
    }
});

function motionHandler(event) {
    if (startAcceleration === null) {
        startAcceleration = event.accelerationIncludingGravity.z;
        startTime = event.timeStamp;
        return;
    }

    const currentTime = event.timeStamp;
    const deltaTime = (currentTime - startTime) / 1000; // Convert to seconds
    const currentAcceleration = event.accelerationIncludingGravity.z;

    // Calculate the distance using the equation: distance = v0 * t + (1/2) * a * t^2
    distance += startVelocity * deltaTime + 0.5 * (currentAcceleration + startAcceleration) * Math.pow(deltaTime, 2);

    startAcceleration = currentAcceleration; // Update the starting acceleration for the next calculation
    startVelocity += currentAcceleration * deltaTime; // Update the velocity
    startTime = currentTime;
}
