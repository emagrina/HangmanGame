export const useJoinGame = () => {
    const joinGame = async (gameName) => {
        const response = await fetch('https://penjat.codifi.cat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action: 'infoGame',
                gameName: gameName,
            }),
        });

        const data = await response.json();
        return data;
    };

    return { joinGame };
};

