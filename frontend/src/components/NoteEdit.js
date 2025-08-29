import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const NoteEdit = ({ note, index, date, onFinishEdit }) => {
  const [editedNote, setEditedNote] = useState({ 
    ...note,
    // Pastikan extraFields dan catatanTambahan ada, jika tidak, inisialisasi sebagai array/string kosong
    extraFields: note.extraFields || [], 
    catatanTambahan: note.catatanTambahan || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedNote({ ...editedNote, [name]: value });
  };

  const handleExtraFieldChange = (i, e) => {
    const newExtraFields = [...editedNote.extraFields];
    newExtraFields[i] = { ...newExtraFields[i], [e.target.name]: e.target.value };
    setEditedNote({ ...editedNote, extraFields: newExtraFields });
  };

  const handleAddExtraField = () => {
    setEditedNote({
      ...editedNote,
      extraFields: [...editedNote.extraFields, { name: '', value: '' }]
    });
  };

  const handleRemoveExtraField = (i) => {
    const newExtraFields = editedNote.extraFields.filter((_, index) => index !== i);
    setEditedNote({ ...editedNote, extraFields: newExtraFields });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
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
          {Object.entries(editedNote).map(([key, value]) => {
            // Kita akan render input secara kustom untuk extraFields dan catatanTambahan
            if (key === 'extraFields' || key === 'catatanTambahan' || key === 'startTime' || key === 'stopTime') {
              return null;
            }
            return (
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
            );
          })}

          {/* Bagian Extra Fields (Detail Nasabah) */}
          <hr />
          <h5>Detail Nasabah</h5>
          <div className="mb-3">
            {editedNote.extraFields.map((field, i) => (
              <div key={i} className="row mb-2">
                <div className="col-5">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nama Field"
                    name="name"
                    value={field.name}
                    onChange={(e) => handleExtraFieldChange(i, e)}
                  />
                </div>
                <div className="col-5">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nilai"
                    name="value"
                    value={field.value}
                    onChange={(e) => handleExtraFieldChange(i, e)}
                  />
                </div>
                <div className="col-2">
                  <button
                    type="button"
                    className="btn btn-danger w-100"
                    onClick={() => handleRemoveExtraField(i)}
                  >
                    Hapus
                  </button>
                </div>
              </div>
            ))}
            <button
              type="button"
              className="btn btn-secondary mt-2"
              onClick={handleAddExtraField}
            >
              Tambah Field
            </button>
          </div>

          {/* Bagian Catatan Tambahan */}
          <hr />
          <h5>Catatan Tambahan</h5>
          <div className="mb-3">
            <textarea
              className="form-control"
              name="catatanTambahan"
              value={editedNote.catatanTambahan}
              onChange={handleChange}
              rows="3"
            ></textarea>
          </div>

          {/* Bagian Waktu (ReadOnly) */}
          <hr />
          <div className="mb-3">
            <label className="form-label">Waktu Mulai</label>
            <input type="text" className="form-control" value={new Date(editedNote.startTime).toLocaleString('id-ID')} readOnly />
          </div>
          <div className="mb-3">
            <label className="form-label">Waktu Selesai</label>
            <input type="text" className="form-control" value={new Date(editedNote.stopTime).toLocaleString('id-ID')} readOnly />
          </div>

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