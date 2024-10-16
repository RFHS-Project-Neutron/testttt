// Function to fetch the JSON data
async function fetchSites() {
    try {
        const response = await fetch('https://raw.githubusercontent.com/RFHS-Project-Neutron/testttt/refs/heads/main/links.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        updateTitleAndFavicon(data.sites);
    } catch (error) {
        console.error('Failed to fetch sites:', error);
        // Default to fallback values on error
        setDefaultTitleAndFavicon();
    }
}

// Function to update title and favicon based on current URL
function updateTitleAndFavicon(sites) {
    const currentUrl = window.location.href;
    let foundMatch = false; // Flag to check if a match was found

    for (let site of sites) {
        if (currentUrl.includes(site.url)) {
            // Update the title
            document.title = site.title;

            // Update the favicon
            const link = document.getElementById('favicon');
            link.href = site.favicon;

            foundMatch = true; // Match found
            break; // Stop looping once a match is found
        }
    }

    // If no match was found, set default title and favicon
    if (!foundMatch) {
        setDefaultTitleAndFavicon();
    }
}

// Function to set default title and favicon
function setDefaultTitleAndFavicon() {
    document.title = "PN+"; // Default title
    const link = document.getElementById('favicon');
    link.href = "https://example.com/200x200"; // Default favicon
}

// Call fetchSites when the page loads
window.onload = fetchSites;
