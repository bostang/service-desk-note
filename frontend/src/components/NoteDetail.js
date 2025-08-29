import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NoteEdit from './NoteEdit'; // Impor komponen baru

// Terima 'index' sebagai props
const NoteDetail = ({ note, index, onGoBack }) => { 
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };
  
  const onFinishEdit = () => {
    setIsEditing(false);
    onGoBack(); 
  }

  // Teruskan 'index' ke komponen NoteEdit
  if (isEditing) {
    return <NoteEdit note={note} index={index} onFinishEdit={onFinishEdit} />;
  }

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <div className="d-flex justify-content-between mb-3">
          <button className="btn btn-outline-secondary" onClick={onGoBack}>
            Kembali
          </button>
          <button className="btn btn-warning" onClick={handleEdit}>
            Edit Detail
          </button>
        </div>

        <h2 className="card-title text-center mb-4">Detail Catatan</h2>
        <ul className="list-group list-group-flush">
          {Object.entries(note).map(([key, value]) => (
            <li className="list-group-item" key={key}>
              <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NoteDetail;