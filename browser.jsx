import React, { useState } from 'react';

const TextInputButton = () => {
    const [inputText, setInputText] = useState('');

    const handleInputChange = (e) => {
        setInputText(e.target.value);
    };

    const handleButtonClick = () => {
        alert(`Texto ingresado: ${inputText}`);
    };

    return (
        <div>
            <input
                type="text"
                value={inputText}
                onChange={handleInputChange}
                placeholder="nombre de la movie"
            />
            <div>
                <button onClick={handleButtonClick}>Mostrar Texto</button>
            </div>        
        </div>
    );
};

export default TextInputButton;
