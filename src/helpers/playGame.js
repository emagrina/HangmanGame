export const playGame = async (gameName, letter, player) => {
    try {
        const response = await fetch('https://penjat.codifi.cat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                action: 'playGame',
                gameName,
                word: letter,
                player
            })
        });

        const data = await response.json();

        // Aquí puedes manejar la respuesta de la API y realizar las acciones necesarias
        // según el estado de la partida

        if (data.status === 'OK') {
            // La petición se realizó correctamente
            console.log('Movimiento enviado exitosamente');
        } else {
            // Hubo un error en la petición
            console.error('Error al enviar el movimiento:', data.response);
        }
    } catch (error) {
        console.error('Error en la petición:', error);
    }
};
