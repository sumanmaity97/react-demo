import React, { useEffect, useRef, useState } from "react";
import '../styles/Home.css';
import { showToast } from "../utils/helpers";
import Checkbox from '@mui/material/Checkbox';

function Home() {

    const [note, setNote] = useState("");
    const [noteList, setNoteList] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState([]);

    useEffect(() => {
        let notes = localStorage.getItem('notes') ? JSON.parse(localStorage.getItem('notes')) : [];
        setNoteList(notes);
    }, [])

    const handleSubmit = () => {
        if (!note) {
            showToast("Please enter note first", "error");
            return;
        }
        let notes = localStorage.getItem('notes') ? JSON.parse(localStorage.getItem('notes')) : [];
        notes.push(note);
        setNoteList(notes);
        setNote('');
        localStorage.setItem('notes', JSON.stringify(notes));
    }

    const handleCheckboxChange = (index) => {
        setSelectedIndex((prevIndexes) => {
            let updatedIndexes = [...prevIndexes];
            let findIndex = updatedIndexes.indexOf(index);

            if (findIndex === -1) {
                updatedIndexes.push(index); // Add index if not found
            } else {
                updatedIndexes.splice(findIndex, 1); // Remove index if already selected
            }

            return updatedIndexes;
        });
    };

    const clearSelected = () => {
        if(selectedIndex.length === 0){
            showToast("Please select at least one item!", "error");
            return;
        }
        let arr = [...noteList];
        for(let i = 0; i < selectedIndex.length; i++){
            arr.splice(selectedIndex[i], 1);
        }
        console.log('AFTER: ', arr);
        setNoteList(arr);
        setSelectedIndex([]);
        localStorage.setItem('notes', JSON.stringify(arr));
    }

    const clearAll = () => {
        setNoteList([]);
        localStorage.removeItem('notes');
    }

    return (
        <div className="home-background">
            <div className="note-input-card" >
                <h3 className="note">Add Notes</h3>
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <textarea
                        type="text"
                        placeholder="Enter note"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        className="note-area"
                    />
                </div>
                <div>
                    <button onClick={handleSubmit} className="add-note-button">
                        Add
                    </button>
                </div>

            </div>
            <div className="space"/>
            <div >
                <h3 className="note">Notes</h3>
                <div>
                    {
                        noteList.length > 0 ?
                            <div className="notes-wrap">
                                <div className="note-card">
                                    {noteList.map((name, index) => {
                                        return (
                                            <div className="note-item">
                                                <Checkbox
                                                    size="small"
                                                    checked={selectedIndex.includes(index)}
                                                    onChange={() => handleCheckboxChange(index)}
                                                />
                                                <p className="note">{name}</p>

                                            </div>
                                        )
                                    })}
                                </div>
                                <div className="clear-btn-wrap">
                                    <button className="clear-button" onClick={clearSelected}>
                                        Clear Selected
                                    </button>
                                    <button className="clear-button" onClick={clearAll}>
                                        Clear All
                                    </button>
                                </div>
                            </div>
                            :
                            <div className="not-found-card">
                                <p className="note">No notes found</p>
                            </div>
                    }
                </div >
            </div>
        </div>
    )
}

export default Home;
