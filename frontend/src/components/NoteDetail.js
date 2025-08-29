import React, { useState } from 'react';
import NoteEdit from './NoteEdit';

// Terima 'selectedDate' dari parent (NoteList)
const NoteDetail = ({ note, index, selectedDate, onGoBack }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleFinishEdit = () => {
    setIsEditing(false);
    onGoBack();
  };

  // Jika isEditing bernilai true, render NoteEdit dan teruskan 'selectedDate'
  if (isEditing) {
    return <NoteEdit note={note} index={index} date={selectedDate} onFinishEdit={handleFinishEdit} />;
  }

  // Jika tidak, render tampilan detail
  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="card-title text-center mb-4">Detail Catatan</h2>
        <div className="mb-3">
          <strong>Nama:</strong> {note.nama}
        </div>
        <div className="mb-3">
          <strong>NPP:</strong> {note.npp}
        </div>
        <div className="mb-3">
          <strong>Cabang:</strong> {note.cabang}
        </div>
        <div className="mb-3">
          <strong>No. Telp PIC:</strong> {note.noTelpPic}
        </div>
        <div className="mb-3">
          <strong>Aplikasi:</strong> {note.aplikasi}
        </div>
        <div className="mb-3">
          <strong>Kendala:</strong> {note.kendala}
        </div>
        {note.extraFields && note.extraFields.length > 0 && (
          <div className="mb-3">
            <hr />
            <strong>Detail Nasabah:</strong>
            {note.extraFields.map((field, i) => (
              <div key={i}>
                - <strong>{field.name}:</strong> {field.value}
              </div>
            ))}
          </div>
        )}
        {note.catatanTambahan && (
          <div className="mb-3">
            <strong>Catatan Tambahan:</strong> {note.catatanTambahan}
          </div>
        )}
        <div className="mb-3">
          <strong>Waktu Mulai:</strong> {new Date(note.startTime).toLocaleString('id-ID')}
        </div>
        <div className="mb-3">
          <strong>Waktu Selesai:</strong> {new Date(note.stopTime).toLocaleString('id-ID')}
        </div>
        <div className="d-flex justify-content-between mt-4">
          <button className="btn btn-secondary" onClick={onGoBack}>
            Kembali
          </button>
          <button className="btn btn-primary" onClick={handleEdit}>
            Edit Catatan
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteDetail;
