import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const NoteForm = ({ startTime, onSave, onGoBack }) => {
  const [formData, setFormData] = useState({
    nama: '',
    npp: '',
    cabang: '',
    noTelpPic: '',
    aplikasi: '',
    kendala: '',
    catatanTambahan: ''
  });

  const [extraFields, setExtraFields] = useState([
    { name: 'No. Rekening', value: '' },
    { name: 'CIF', value: '' },
    { name: 'No. Telepon Nasabah', value: '' }
  ]);
  const [newFieldName, setNewFieldName] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const [messageToCopy, setMessageToCopy] = useState('');

  const generateWhatsAppMessage = (data) => {
    let message = `Selamat Sore Rekan Analis, mohon di bantu laporan Cabang berikut ini :

*NPP*: ${data.npp}
*Aplikasi*: ${data.aplikasi || '...'}
*Kendala*: ${data.kendala}
*Unit/Cabang*: ${data.cabang}
*No. PIC*: ${data.noTelpPic}
`;

    // Tambahkan extra fields secara dinamis
    data.extraFields.forEach(field => {
      if (field.value) {
        message += `\n*${field.name}*: ${field.value}`;
      }
    });

    if (data.catatanTambahan) {
      message += `\n*Catatan Tambahan*:\n${data.catatanTambahan}`;
    }

    message += `\n\nDemikian dan Terima kasih
Command Center`;

    return message;
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(messageToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Gagal menyalin teks:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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

  const handleRemoveField = (index) => {
    const list = [...extraFields];
    list.splice(index, 1);
    setExtraFields(list);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const stopTime = new Date().toLocaleString('sv-SE', { timeZone: 'Asia/Jakarta' }).replace(' ', 'T') + 'Z';
    
    const fullData = {
      ...formData,
      extraFields, // Kirim array extraFields ke backend
      startTime,
      stopTime
    };

    try {
      const response = await axios.post('http://localhost:5000/save-data', fullData);
      alert(response.data.message);
      
      setIsSaved(true);
      setMessageToCopy(generateWhatsAppMessage(fullData));
      
    } catch (error) {
      alert('Gagal menyimpan data.');
      console.error('Ada kesalahan:', error);
    }
  };
  
  const handleCreateNew = () => {
    setIsSaved(false);
    setCopied(false);
    setFormData({
      nama: '', npp: '', cabang: '', noTelpPic: '', aplikasi: '', kendala: '', catatanTambahan: ''
    });
    setExtraFields([
      { name: 'No. Rekening', value: '' },
      { name: 'CIF', value: '' },
      { name: 'No. Telepon Nasabah', value: '' }
    ]);
    setNewFieldName('');
    setMessageToCopy('');
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        {isSaved ? (
          <div>
            <h4 className="text-center mb-4">Catatan Berhasil Disimpan!</h4>
            <div className="alert alert-info">
              <h6 className="text-center">Pesan Siap untuk Disalin</h6>
              <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word', fontSize: '0.9rem', backgroundColor: '#e9ecef', padding: '10px', borderRadius: '5px' }}>
                {messageToCopy}
              </pre>
            </div>
            <div className="d-flex justify-content-between mt-3">
              <button className="btn btn-outline-secondary" onClick={onGoBack}>
                Selesai
              </button>
              <button 
                className={`btn ${copied ? 'btn-success' : 'btn-primary'}`} 
                onClick={handleCopy}
              >
                {copied ? <><i className="bi bi-check2"></i> Tersalin!</> : <><i className="bi bi-clipboard-fill"></i> Salin Pesan</>}
              </button>
              <button className="btn btn-info" onClick={handleCreateNew}>
                Buat Baru
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="d-flex justify-content-end mb-3">
              <button className="btn btn-outline-secondary" onClick={onGoBack}>
                Kembali
              </button>
            </div>

            <h2 className="card-title text-center mb-4">BNI IT Service Desk Buddy</h2>
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
                <label htmlFor="aplikasi" className="form-label">Aplikasi</label>
                <input type="text" className="form-control" id="aplikasi" name="aplikasi" value={formData.aplikasi} onChange={handleChange} required />
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

              <div className="border p-3 rounded mb-3 bg-light">
                <h5 className="mb-3">Detail Nasabah</h5>
                
                {extraFields.map((field, index) => (
                  <div className="input-group mb-3" key={index}>
                    <span className="input-group-text">{field.name}</span>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={field.value} 
                      onChange={e => handleExtraFieldChange(index, e)} 
                    />
                    <button 
                      className="btn btn-outline-danger" 
                      type="button" 
                      onClick={() => handleRemoveField(index)}
                    >
                      Hapus
                    </button>
                  </div>
                ))}

                <div className="input-group mt-4">
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
              <button type="submit" className="btn btn-primary w-100 mt-2">Simpan</button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default NoteForm;