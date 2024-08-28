"use strict";
const canvas = document.getElementById("game");
if (!canvas) {
    throw new Error("Canvas element not found");
}
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");
if (!ctx) {
    throw new Error("Failed to get 2D context");
}
const w = canvas.width;
const h = canvas.height;
const boxSize = 100;
const boxPadding = 10;
const boxesPerRow = Math.floor(w / (boxSize + boxPadding));
const boxesPerColumn = Math.floor(h / (boxSize + boxPadding));
const boxes = [];
let currentNumber = 1;
let score = 0;
let gameOver = false;
let startTime;
let remainingTime = 240;
let lastclickednumber = null;
function shuffleArray(array) {
    let currentIndex = array.length;
    let randomIndex;
    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}
function createBoxes() {
    const numbers = Array.from({ length: 100 }, (_, i) => i + 1); // Create an array [1, 2, ..., 100]
    const shuffledNumbers = shuffleArray(numbers); // Shuffle the numbers
    let index = 0;
    for (let i = 0; i < boxesPerColumn; i++) {
        for (let j = 0; j < boxesPerRow; j++) {
            if (index >= shuffledNumbers.length)
                break;
            const x = j * (boxSize + boxPadding) + boxPadding;
            const y = i * (boxSize + boxPadding) + boxPadding;
            const color = getRandomColor();
            boxes.push({ number: shuffledNumbers[index], x, y, color });
            index++;
        }
    }
}
function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}
function drawBoxes() {
    if (ctx) {
        ctx.clearRect(0, 0, w, h);
    }
    boxes.forEach(box => {
        if (ctx) {
            ctx.fillStyle = "#b1b3b1";
            ctx.fillRect(box.x, box.y, boxSize, boxSize);
            ctx.strokeStyle = "#000000";
            ctx.lineWidth = 2;
            ctx.strokeRect(box.x, box.y, boxSize, boxSize);
            // Draw the number in the center
            ctx.fillStyle = "#000000";
            ctx.font = "24px Arial";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(box.number.toString(), box.x + boxSize / 2, box.y + boxSize / 2);
        }
    });
    if (gameOver) {
        if (ctx) {
            ctx.fillStyle = "#000000";
            ctx.font = "36px Arial";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(`Game Over! You clicked ${score} out of 100 boxes.`, w / 2, h / 2);
        }
    }
    else {
        if (ctx) {
            // Display the remaining time
            ctx.fillStyle = "#000000";
            ctx.font = "24px Arial";
            ctx.textAlign = "center";
            ctx.textBaseline = "bottom";
            ctx.fillText(`Time Left: ${Math.max(remainingTime, 0)}s`, w / 2, h - 450);
            ctx.fillStyle = "#000000";
            ctx.font = "24px Arial";
            ctx.textAlign = "center";
            ctx.textBaseline = "bottom";
            ctx.fillText(`last clicked: ${lastclickednumber !== null ? lastclickednumber : 'None'}`, w / 2, h - 400);
        }
    }
}
function checkClick(x, y) {
    if (gameOver)
        return;
    boxes.forEach((box, index) => {
        if (x >= box.x && x <= box.x + boxSize &&
            y >= box.y && y <= box.y + boxSize) {
            if (box.number === currentNumber) {
                score++;
                lastclickednumber = box.number;
                currentNumber++;
                boxes.splice(index, 1);
                if (score === 100) {
                    gameOver = true;
                    alert(`Congratulations! You clicked all boxes in order.`);
                }
            }
        }
    });
}
window.addEventListener("mousedown", e => {
    if (gameOver)
        return;
    const x = e.pageX;
    const y = e.pageY;
    checkClick(x, y);
});
function startGame() {
    createBoxes();
    score = 0;
    currentNumber = 1;
    gameOver = false;
    startTime = Date.now();
    remainingTime = 240; // 4 minutes in seconds
    const timer = setInterval(() => {
        if (gameOver) {
            clearInterval(timer);
            return;
        }
        remainingTime = 240 - Math.floor((Date.now() - startTime) / 1000);
        if (remainingTime <= 0) { // Time's up
            gameOver = true;
            clearInterval(timer);
            alert(`Time's up! You clicked ${score} out of 100 boxes.`);
        }
    }, 1000); // Update every second
    function animate() {
        drawBoxes();
        if (!gameOver) {
            window.requestAnimationFrame(animate);
        }
    }
    animate();
}
window.addEventListener("load", startGame);
//# sourceMappingURL=script.js.map