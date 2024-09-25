// Select the canvas element and set its dimensions
const canvas = document.createElement('canvas');
document.body.appendChild(canvas);
canvas.width = document.body.scrollWidth;
canvas.height = document.body.scrollHeight;
canvas.style.position = 'absolute'; // Position the canvas absolutely
canvas.style.top = '0'; // Align the canvas to the top
canvas.style.left = '0'; // Align the canvas to the left
canvas.style.zIndex = '-1'; // Set z-index to place it above other content
canvas.style.width = document.body.scrollWidth;
canvas.style.height = document.body.scrollHeight;
const ctx = canvas.getContext('2d');

// Characters to display (0s and 1s)
const characters = ['0', '1'];
const fontSize = 20; // Size of the characters
const columns = canvas.width / fontSize; // Number of columns for characters
const drops = Array.from({ length: Math.floor(columns) }).fill(1); // Array to track the drops

// Function to draw the falling characters
function draw() {
    // Set a black background
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'; // Create a fading effect
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Set the text color and font
    ctx.fillStyle = '#00ff00'; // Green color for the characters
    ctx.font = `${fontSize}px monospace`;

    // Loop through each column
    for (let i = 0; i < drops.length; i++) {
        const text = characters[Math.floor(Math.random() * characters.length)]; // Randomly select a character
        ctx.fillText(text, i * fontSize, drops[i] * fontSize); // Draw the character at the specified position

        // Reset drop position after reaching the bottom
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0; // Randomly reset the drop position
        }

        drops[i]++; // Move the drop down
    }
}

// Start the animation
setInterval(draw, 50); // Call the draw function every 50 milliseconds

// Resize the canvas on window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
