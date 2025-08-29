import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import NoteDetail from './NoteDetail';

const NoteList = ({ selectedDate, onGoBack }) => {
  const [notes, setNotes] = useState([]);
  const [viewedNote, setViewedNote] = useState(null);
  const [viewedIndex, setViewedIndex] = useState(null);

  const fetchNotes = async () => {
    try {
      // Pastikan selectedDate ada sebelum membuat permintaan
      if (selectedDate) {
        const response = await axios.get(`http://localhost:5000/get-data/${selectedDate}`);
        setNotes(response.data);
      }
    } catch (error) {
      console.error("Gagal mengambil data:", error);
      setNotes([]);
    }
  };

  useEffect(() => {
    // Panggil fetchNotes hanya jika selectedDate berubah dan bukan null
    if (selectedDate) {
      fetchNotes();
    }
  }, [selectedDate]); // Dependency array memastikan ini berjalan saat selectedDate berubah

  const handleDelete = async (indexToDelete) => {
    try {
      if (selectedDate) {
        const response = await axios.delete(`http://localhost:5000/delete-note/${selectedDate}/${indexToDelete}`);
        alert(response.data.message);
        fetchNotes();
      }
    } catch (error) {
      alert("Gagal menghapus note.");
      console.error("Ada kesalahan:", error);
    }
  };

  const handleViewDetail = (note, index) => {
    setViewedNote(note);
    setViewedIndex(index);
  };
  
  const handleBackToList = () => {
    setViewedNote(null);
    setViewedIndex(null); 
    fetchNotes();
  };

  if (viewedNote) {
    return <NoteDetail note={viewedNote} index={viewedIndex} selectedDate={selectedDate} onGoBack={handleBackToList} />;
  }

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-end mb-3">
        <button className="btn btn-outline-secondary" onClick={onGoBack}>
          Kembali
        </button>
      </div>

      <h2 className="text-center mb-4">Daftar Catatan Kendala ({selectedDate})</h2>
      {notes.length > 0 ? (
        <div style={{ overflowX: 'auto' }}>
          <table className="table table-striped table-bordered">
            <thead className="table-dark">
              <tr>
                <th>No.</th>
                <th>Nama</th>
                <th>NPP</th>
                <th>Cabang</th>
                <th>Kendala</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {notes.map((note, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{note.nama}</td>
                  <td>{note.npp}</td>
                  <td>{note.cabang}</td>
                  <td>
                    {note.kendala && note.kendala.length > 100 
                      ? note.kendala.substring(0, 100) + '...'
                      : note.kendala}
                  </td>
                  <td className="d-flex flex-column align-items-center justify-content-center"> 
                    <button className="btn btn-info btn-sm mb-1 w-100" onClick={() => handleViewDetail(note, index)}>
                      View Detail
                    </button>
                    <button className="btn btn-danger btn-sm w-100" onClick={() => handleDelete(index)}>
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center">Tidak ada catatan yang tersimpan untuk tanggal ini.</p>
      )}
    </div>
  );
};

export default NoteList;