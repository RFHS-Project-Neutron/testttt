// Function to check if the username is stored in localStorage
function checkUsername() {
    const username = localStorage.getItem('username');

    // If no username is found, create and display the iframe
    if (!username) {
        // Create a fullscreen overlay div
        const overlay = document.createElement('div');
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100vw';
        overlay.style.height = '100vh';
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.75)';
        overlay.style.zIndex = '9999';

        // Create an iframe for the /login page
        const iframe = document.createElement('iframe');
        iframe.src = '/login';
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.border = 'none';

        // Append the iframe to the overlay
        overlay.appendChild(iframe);

        // Append the overlay to the body
        document.body.appendChild(overlay);
    }
}

// Run the check when the page loads
window.onload = checkUsername;
