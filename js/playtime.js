const jsonBinUrl = 'https://api.jsonbin.io/v3/b/6702f985ad19ca34f8b3de85';
const jsonBinApiKey = '$2a$10$rwJQgd5uh/4zBjEpmLU1Heywv16Krg8bxgM0EhS7a3iLMzqEAyLoK';

const savedUsername = localStorage.getItem('username');

async function fetchUserData() {
    try {
        const response = await fetch(jsonBinUrl, {
            method: 'GET',
            headers: {
                'X-Master-Key': jsonBinApiKey
            }
        });
        const data = await response.json();
        return data.record;
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
}

async function updateUserData(updatedData) {
    try {
        const response = await fetch(jsonBinUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Master-Key': jsonBinApiKey
            },
            body: JSON.stringify(updatedData)
        });
        return await response.json();
    } catch (error) {
        console.error('Error updating user data:', error);
    }
}

function addPlaytime() {
    let playtimeInterval = null;

    window.addEventListener('focus', () => {
        if (!playtimeInterval) {
            playtimeInterval = setInterval(async () => {
                const userData = await fetchUserData();
                const user = userData.find(u => u.username === savedUsername);
                if (user) {
                    user.playtime += 60; // Add 60 seconds every 60 seconds
                    await updateUserData(userData);
                    
                    const minutes = Math.floor(user.playtime / 60); // Convert seconds to minutes for display
                    console.log(`Playtime updated for ${savedUsername}. New playtime: ${minutes} mins`);
                }
            }, 60000); // Run the interval every 60 seconds
        }
    });

    window.addEventListener('blur', () => {
        clearInterval(playtimeInterval);
        playtimeInterval = null;
    });
}

if (savedUsername) {
    addPlaytime();
}