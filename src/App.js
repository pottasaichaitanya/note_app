import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import NotesList from './components/NotesList';
import Search from './components/Search';
import Header from './components/Header';

const App = () => {
    const [notes, setNotes] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const savedNotes = localStorage.getItem('react-notes-app-data');
        if (savedNotes) {
            try {
                setNotes(JSON.parse(savedNotes)); // Parse and set initial notes
            } catch (error) {
                console.error('Failed to parse notes from localStorage:', error);
            }
        }
    }, []);

    useEffect(() => {
        if (notes.length > 0) {
            console.log('Saving notes to localStorage:', notes);
            localStorage.setItem('react-notes-app-data', JSON.stringify(notes));
        }
    }, [notes]);

    const addNote = (text) => {
        const date = new Date();
        const newNote = {
            id: nanoid(),
            text: text,
            date: date.toLocaleDateString(),
        };
        setNotes((prevNotes) => [...prevNotes, newNote]); // Add new note to state
    };

    const deleteNote = (id) => {
        setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    };

    return (
        <div className={`${darkMode ? 'dark-mode' : ''}`}>
            <div className="container">
                <Header handleToggleDarkMode={setDarkMode} />
                <Search handleSearchNote={setSearchText} />
                <NotesList
                    notes={notes.filter((note) =>
                        note.text.toLowerCase().includes(searchText.toLowerCase())
                    )}
                    handleAddNote={addNote}
                    handleDeleteNote={deleteNote}
                />
            </div>
        </div>
    );
};

export default App;
