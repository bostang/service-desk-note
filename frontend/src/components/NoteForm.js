import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const NoteForm = ({ startTime, onSave, onGoBack }) => { // Tambahkan onGoBack
  const [formData, setFormData] = useState({
    nama: '',
    npp: '',
    cabang: '',
    noTelpPic: '',
    kendala: '',
    catatanTambahan: ''
  });

  const [customerDetails, setCustomerDetails] = useState({
    noRekening: '',
    cif: '',
    noTelpNasabah: ''
  });

  const [extraFields, setExtraFields] = useState([]);
  const [newFieldName, setNewFieldName] = useState('');

  const [showCustomerDetails, setShowCustomerDetails] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCustomerDetailsChange = (e) => {
    const { name, value } = e.target;
    setCustomerDetails({ ...customerDetails, [name]: value });
  };

  const handleExtraFieldChange = (index, e) => {
    const { value } = e.target;
    const list = [...extraFields];
    list[index].value = value;
    setExtraFields(list);
  };
  
  const handleAddField = () => {
    if (newFieldName) {
      setExtraFields([...extraFields, { name: newFieldName, value: '' }]);
      setNewFieldName('');
    }
  };

  const handleToggleCustomerDetails = () => {
    setShowCustomerDetails(!showCustomerDetails);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const stopTime = new Date().toLocaleString('sv-SE', { timeZone: 'Asia/Jakarta' }).replace(' ', 'T') + 'Z';
    
    const extraData = extraFields.reduce((obj, item) => ({ ...obj, [item.name]: item.value }), {});
    
    const fullData = {
      ...formData,
      ...showCustomerDetails ? customerDetails : {},
      ...extraData,
      startTime: startTime,
      stopTime: stopTime
    };

    try {
      const response = await axios.post('http://localhost:5000/save-data', fullData);
      alert(response.data.message);
      onSave(); // Kembali ke landing page setelah save
      
    } catch (error) {
      alert('Gagal menyimpan data.');
      console.error('Ada kesalahan:', error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        {/* Tombol Kembali */}
        <div className="d-flex justify-content-end mb-3">
          <button className="btn btn-outline-secondary" onClick={onGoBack}>
            Kembali
          </button>
        </div>

        <h2 className="card-title text-center mb-4">Aplikasi Pencatatan Kendala</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="nama" className="form-label">Nama</label>
            <input type="text" className="form-control" id="nama" name="nama" value={formData.nama} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="npp" className="form-label">NPP</label>
            <input type="text" className="form-control" id="npp" name="npp" value={formData.npp} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="cabang" className="form-label">Cabang</label>
            <input type="text" className="form-control" id="cabang" name="cabang" value={formData.cabang} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="noTelpPic" className="form-label">No. Telp PIC</label>
            <input type="tel" className="form-control" id="noTelpPic" name="noTelpPic" value={formData.noTelpPic} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="kendala" className="form-label">Kendala</label>
            <textarea className="form-control" id="kendala" name="kendala" rows="3" value={formData.kendala} onChange={handleChange} required></textarea>
          </div>
          
          <div className="mb-3">
            <label htmlFor="catatanTambahan" className="form-label">Catatan Tambahan</label>
            <textarea className="form-control" id="catatanTambahan" name="catatanTambahan" rows="2" value={formData.catatanTambahan} onChange={handleChange}></textarea>
          </div>

          <hr />

          <div className="mb-3">
            <button type="button" className="btn btn-secondary w-100" onClick={handleToggleCustomerDetails}>
              {showCustomerDetails ? 'Sembunyikan Detail Nasabah' : 'Tambah Detail Nasabah'}
            </button>
          </div>

          {showCustomerDetails && (
            <div className="border p-3 rounded mb-3 bg-light">
              <h5 className="mb-3">Detail Nasabah</h5>
              <div className="mb-3">
                <label htmlFor="noRekening" className="form-label">No. Rekening</label>
                <input type="text" className="form-control" id="noRekening" name="noRekening" value={customerDetails.noRekening} onChange={handleCustomerDetailsChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="cif" className="form-label">CIF</label>
                <input type="text" className="form-control" id="cif" name="cif" value={customerDetails.cif} onChange={handleCustomerDetailsChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="noTelpNasabah" className="form-label">No. Telepon Nasabah</label>
                <input type="tel" className="form-control" id="noTelpNasabah" name="noTelpNasabah" value={customerDetails.noTelpNasabah} onChange={handleCustomerDetailsChange} />
              </div>
              
              {extraFields.map((field, index) => (
                <div className="mb-3" key={index}>
                  <label htmlFor={field.name} className="form-label">{field.name}</label>
                  <input type="text" className="form-control" name={field.name} value={field.value} onChange={e => handleExtraFieldChange(index, e)} />
                </div>
              ))}

              <div className="input-group mb-3 mt-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nama Field Baru"
                  value={newFieldName}
                  onChange={(e) => setNewFieldName(e.target.value)}
                />
                <button className="btn btn-outline-secondary" type="button" onClick={handleAddField}>Tambah Field</button>
              </div>
            </div>
          )}
          <button type="submit" className="btn btn-primary w-100 mt-2">Simpan</button>
        </form>
      </div>
    </div>
  );
};

export default NoteForm;