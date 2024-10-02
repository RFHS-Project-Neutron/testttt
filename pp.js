// Function to check if the username is stored in localStorage
function checkUsername() {
    const username = localStorage.getItem('username');

    // If no username is found, create and display the iframe
    if (!username) {
        // Check if the overlay already exists to prevent multiple iframes
        if (!document.getElementById('loginOverlay')) {
            // Create a fullscreen overlay div
            const overlay = document.createElement('div');
            overlay.id = 'loginOverlay'; // Set an ID to reference later
            overlay.style.position = 'fixed';
            overlay.style.top = '0';
            overlay.style.left = '0';
            overlay.style.width = '100vw';
            overlay.style.height = '100vh';
            overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.75)';
            overlay.style.zIndex = '9999';

            // Create an iframe for the /login page
            const iframe = document.createElement('iframe');
            iframe.src = '/overlaylogin';
            iframe.style.width = '100%';
            iframe.style.height = '100%';
            iframe.style.border = 'none';

            // Append the iframe to the overlay
            overlay.appendChild(iframe);

            // Append the overlay to the body
            document.body.appendChild(overlay);
        }
    } else {
        // If a username is found, remove the overlay if it exists
        const overlay = document.getElementById('loginOverlay');
        if (overlay) {
            overlay.remove();
        }
    }
}

// Check the username every 0.5 seconds
setInterval(checkUsername, 500);
