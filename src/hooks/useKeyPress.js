import { useEffect, useState } from 'react';

export const useKeyPress = () => {
    const [pressedKey, setPressedKey] = useState(null);

    const handleKeyDown = (event) => {
        setPressedKey(event.key);
    };

    const handleKeyUp = () => {
        setPressedKey(null);
    };

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    return pressedKey;
};
