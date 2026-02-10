async function zoekAvatar() {
    const username = document.getElementById("username").value;
    const status = document.getElementById("status");
    const avatar = document.getElementById("avatar");

    status.textContent = "Zoeken...";
    avatar.src = "";

    try {
        // 1. Username → UserID
        const userRes = await fetch("https://users.roblox.com/v1/usernames/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                usernames: [username],
                excludeBannedUsers: false
            })
        });

        const userData = await userRes.json();

        if (!userData.data || userData.data.length === 0) {
            status.textContent = "❌ Gebruiker niet gevonden";
            return;
        }

        const userId = userData.data[0].id;

        // 2. UserID → Avatar image
        const avatarUrl = `https://www.roblox.com/headshot-thumbnail/image?userId=${userId}&width=420&height=420&format=png`;

        avatar.src = avatarUrl;
        status.textContent = "✅ Avatar gevonden!";
    } catch (error) {
        status.textContent = "⚠️ Er ging iets fout";
        console.error(error);
    }
}
