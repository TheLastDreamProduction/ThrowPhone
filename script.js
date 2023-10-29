let isMeasuring = false;
let startTime;
let endTime;

const startButton = document.getElementById("startButton");
const scoreDisplay = document.getElementById("score");

startButton.addEventListener("click", () => {
    if (!isMeasuring) {
        isMeasuring = true;
        startTime = new Date();
        startButton.textContent = "Stop Measurement";
    } else {
        isMeasuring = false;
        endTime = new Date();
        const timeDiff = (endTime - startTime) / 1000; // in seconds
        const gravity = 9.81; // m/s^2 (Earth's gravity)
        const distance = 0.5 * gravity * Math.pow(timeDiff, 2);
        scoreDisplay.textContent = distance.toFixed(2) + " meters";
        startButton.textContent = "Start Measurement";
    }
});
