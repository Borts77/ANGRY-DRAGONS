import React, { useState } from 'react';
import './EditorScene.css';  

const EditorScene = () => {
    const [dragons, setDragons] = useState([]);
    const [dragonsCount, setDragonsCount] = useState(0);

    const addDragon = (x, y) => {
        const newDragon = { id: dragonsCount, x, y };
        setDragons([...dragons, newDragon]);
        setDragonsCount(dragonsCount + 1);
    };

    const removeDragon = (id) => {
        setDragons(dragons.filter(dragon => dragon.id !== id));
    };

    const handleClick = (e) => {
        const rect = e.target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        addDragon(x, y);
    };

    return (
        <div className="editor-container" onClick={handleClick}>
            <h1>Dragon Level Editor</h1>
            <div className="dragon-list">
                {dragons.map(dragon => (
                    <div key={dragon.id} className="dragon" style={{ left: dragon.x, top: dragon.y }}>
                        <span>🀄️</span>
                        <button onClick={() => removeDragon(dragon.id)}>Remove</button>
                    </div>
                ))}
            </div>
            <div className="editor-area">
                <p>Click to place a dragon</p>
            </div>
        </div>
    );
};

export default EditorScene;
