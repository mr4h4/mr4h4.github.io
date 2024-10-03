// Create the canvas element and append it to the body
const canvas = document.createElement('canvas');
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');

// Function to set the canvas dimensions to cover the full viewport
function setCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    canvas.style.position = 'fixed'; // Fixed position so it covers the entire viewport
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.zIndex = '-1'; // Ensure the canvas stays behind the content

       // Set the initial background color to black
       ctx.globalAlpha = 0.9;
       ctx.fillStyle = 'black'; // Set fill style to black
       ctx.fillRect(0, 0, canvas.width, canvas.height); // Fill the canvas with black
}

// Initialize canvas size
setCanvasSize();

// Resize canvas on window resize
window.addEventListener('resize', setCanvasSize);

// Characters to display (0s and 1s)
const characters = ['0', '1', 'error', '*', '/', '10', '01', ' 0', ' 1', '0 ', '1 ', 'O', 'l', '001', '110', '010', '101', '011', '100', '{', '}', '$', '#',];
const fontSize = 20; // Size of the characters
let columns = canvas.width / fontSize; // Number of columns for characters
let drops = Array.from({ length: Math.floor(columns) }).fill(1); // Array to track the drops

// Function to draw the falling characters
function draw() {
    // Set a black background with a fade effect
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Set the text color and font
    ctx.fillStyle = '#ff0000';
    ctx.font = `${fontSize}px monospace`;

    // Loop through each column
    for (let i = 0; i < drops.length; i++) {
        const text = characters[Math.floor(Math.random() * characters.length)]; // Randomly select a character
        ctx.fillText(text, i * fontSize, drops[i] * fontSize); // Draw the character

        // Reset drop position after reaching the bottom
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }

        drops[i]++; // Move the drop down
    }
}

// Start the animation
setInterval(draw, 50); // Call the draw function every 50 milliseconds

// Recalculate the number of columns and reset drops when resizing
window.addEventListener('resize', () => {
    columns = canvas.width / fontSize;
    drops = Array.from({ length: Math.floor(columns) }).fill(1);
});
