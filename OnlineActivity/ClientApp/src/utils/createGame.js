import Cookies from "js-cookie";

export async function createGame() {
    const userId = Cookies.get("UserId");
    const response = await fetch("api/v1/games", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "creatorId": userId
        })
    });
    const data = await response.json();
    return data.id;
}