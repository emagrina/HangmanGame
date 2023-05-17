import { useState } from 'react';
import { HangedLayout } from './game/layout/HangedLayout.jsx';
import { AuthLayout } from './auth/layout/AuthLayout.jsx';

export const HangedApp = () => {
    const [showAuthLayout, setShowAuthLayout] = useState(true);

    const handleCreateOrJoin = (gameName) => {
        setShowAuthLayout(false);
        console.log('Nombre de la partida:', gameName);
    };

    return (
        <div>
            {showAuthLayout ? (
                <AuthLayout onCreateOrJoin={handleCreateOrJoin} />
            ) : (
                <HangedLayout />
            )}
        </div>
    );
};
