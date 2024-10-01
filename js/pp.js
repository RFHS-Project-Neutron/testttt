// Variable to track if the iframe is displayed
let isIframeDisplayed = false;

// Function to fetch and check user data
function checkUserData() {
    fetch('/users.json')
        .then(response => response.json())
        .then(users => {
            // Check local storage for username
            const storedUsername = localStorage.getItem('username');

            if (storedUsername) {
                // Find the user based on the stored username
                const user = users.find(user => user.username === storedUsername);

                // Get current date
                const currentDate = new Date();

                if (user) {
                    // Check if the user is banned
                    if (user.banned || new Date(user.expiration) < currentDate || (user.timeout && new Date(user.timeout) > currentDate)) {
                        if (!isIframeDisplayed) {
                            displayIframe();
                        }
                    } else {
                        // User is not banned or expired; hide the iframe if it is displayed
                        if (isIframeDisplayed) {
                            hideIframe();
                        }
                    }
                } else {
                    // User not found, so display the iframe
                    if (!isIframeDisplayed) {
                        displayIframe();
                    }
                }
            } else {
                // No username found in local storage, display the iframe
                if (!isIframeDisplayed) {
                    displayIframe();
                }
            }
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
        });
}

// Function to display the iframe overlay
function displayIframe() {
    const iframe = document.createElement('iframe');
    iframe.src = 'finished-login.html';
    iframe.style.position = 'fixed';
    iframe.style.top = '0';
    iframe.style.left = '0';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    iframe.style.zIndex = '9999'; // Ensure it overlays everything
    iframe.style.backgroundColor = 'rgba(255, 255, 255, 0.9)'; // Optional: Add a white background for better visibility

    // Append the iframe to the body
    document.body.appendChild(iframe);

    // Update the iframe displayed state
    isIframeDisplayed = true;
}

// Function to hide the iframe overlay
function hideIframe() {
    const iframes = document.getElementsByTagName('iframe');
    for (let iframe of iframes) {
        document.body.removeChild(iframe);
    }
    isIframeDisplayed = false;
}

// Check user data every 0.5 seconds
setInterval(checkUserData, 500);
