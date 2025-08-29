import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';
import DatePicker from './components/DatePicker';
import ExtensionList from './components/ExtensionList';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [selectedDate, setSelectedDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [showCheatsheet, setShowCheatsheet] = useState(false);
  const [showKnowledge, setShowKnowledge] = useState(false);

  const handleCreateNote = () => {
    // Ambil waktu saat ini dan simpan sebagai string ISO
    const currentTime = new Date().toISOString(); 
    setStartTime(currentTime);
    setCurrentPage('create');
  };

  const handleSaveNote = () => {
    setCurrentPage('landing');
    setStartTime(null);
  };

  const handleViewNotes = () => {
    setCurrentPage('date-picker');
  };

  const handleGoBack = () => {
    setCurrentPage('landing');
    setSelectedDate(null);
  };

  const handleSelectDate = (date) => {
    setSelectedDate(date);
    setCurrentPage('list');
  };

  const toggleCheatsheet = () => setShowCheatsheet(!showCheatsheet);
  const toggleKnowledge = () => setShowKnowledge(!showKnowledge);

  return (
    <div>
      <ExtensionList 
        showCheatsheet={showCheatsheet} 
        toggleCheatsheet={toggleCheatsheet}
        showKnowledge={showKnowledge}
        toggleKnowledge={toggleKnowledge}
      />

      {currentPage === 'landing' && <LandingPage onCreateNote={handleCreateNote} onViewNotes={handleViewNotes} />}
      {currentPage === 'create' && <NoteForm startTime={startTime} onSave={handleSaveNote} onGoBack={handleGoBack} />}
      {currentPage === 'date-picker' && <DatePicker onSelectDate={handleSelectDate} onGoBack={handleGoBack} />}
      {currentPage === 'list' && <NoteList selectedDate={selectedDate} onGoBack={handleGoBack} />}
    </div>
  );
}

export default App;
