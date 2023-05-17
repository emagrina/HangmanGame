export async function getGameState(gameName) {
    try {
        const response = await fetch('https://penjat.codifi.cat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                action: 'infoGame',
                gameName: gameName
            })
        });

        const responseData = await response.json();

        const { status, response: apiResponse, gameInfo, player } = responseData;

        if (status === 'OK') {
            console.log(gameInfo);
            console.log(player);
            return { gameInfo, player };
        } else {
            throw new Error(apiResponse);
        }
    } catch (error) {
        throw new Error(`Error while fetching game state: ${error.message}`);
    }
}
