export const createGame = async (gameName, gamePassword) => {
    const response = await fetch('https://penjat.codifi.cat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            action: 'createGame',
            gameName: gameName,
            gamePassword: gamePassword,
        }),
    });

    const data = await response.json();
    return data;
};