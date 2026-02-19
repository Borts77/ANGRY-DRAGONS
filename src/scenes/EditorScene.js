import React, { useState } from 'react';

const EditorScene = () => {
    const [dragons, setDragons] = useState([]);
    const [ammo, setAmmo] = useState([]);

    const addDragon = () => {
        const newDragon = { id: dragons.length, name: `Dragon ${dragons.length + 1}` };
        setDragons([...dragons, newDragon]);
    };

    const removeDragon = (id) => {
        setDragons(dragons.filter(dragon => dragon.id !== id));
    };

    const configureDragon = (id, name) => {
        setDragons(dragons.map(dragon => (dragon.id === id ? { ...dragon, name } : dragon)));
    };

    const addAmmo = () => {
        const newAmmo = { id: ammo.length, type: `Ammo ${ammo.length + 1}` };
        setAmmo([...ammo, newAmmo]);
    };

    const removeAmmo = (id) => {
        setAmmo(ammo.filter(a => a.id !== id));
    };

    const configureAmmo = (id, type) => {
        setAmmo(ammo.map(a => (a.id === id ? { ...a, type } : a)));
    };

    return (
        <div>
            <h1>Level Editor</h1>
            <h2>Dragons</h2>
            <button onClick={addDragon}>Add Dragon</button>
            <ul>
                {dragons.map(dragon => (
                    <li key={dragon.id}>
                        <input type="text" value={dragon.name} onChange={e => configureDragon(dragon.id, e.target.value)} />
                        <button onClick={() => removeDragon(dragon.id)}>Remove</button>
                    </li>
                ))}
            </ul>
            <h2>Ammo</h2>
            <button onClick={addAmmo}>Add Ammo</button>
            <ul>
                {ammo.map(a => (
                    <li key={a.id}>
                        <input type="text" value={a.type} onChange={e => configureAmmo(a.id, e.target.value)} />
                        <button onClick={() => removeAmmo(a.id)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EditorScene;