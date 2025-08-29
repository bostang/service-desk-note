import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

// Tambahkan 'date' sebagai prop yang diterima
const NoteEdit = ({ note, index, date, onFinishEdit }) => {
  const [editedNote, setEditedNote] = useState({ ...note });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedNote({ ...editedNote, [name]: value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      // Gunakan 'date' dan 'index' dalam URL
      const response = await axios.put(`http://localhost:5000/edit-note/${date}/${index}`, editedNote);
      alert(response.data.message);
      onFinishEdit();
    } catch (error) {
      alert("Gagal menyimpan perubahan.");
      console.error("Ada kesalahan:", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="card-title text-center mb-4">Edit Catatan</h2>
        <form onSubmit={handleSave}>
          {Object.entries(editedNote).map(([key, value]) => (
            <div className="mb-3" key={key}>
              <label htmlFor={key} className="form-label">{key.charAt(0).toUpperCase() + key.slice(1)}</label>
              <input 
                type="text" 
                className="form-control" 
                id={key} 
                name={key} 
                value={value || ''}
                onChange={handleChange} 
              />
            </div>
          ))}
          <div className="d-flex justify-content-between mt-4">
            <button type="button" className="btn btn-secondary" onClick={onFinishEdit}>
              Batal
            </button>
            <button type="submit" className="btn btn-primary">
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NoteEdit;