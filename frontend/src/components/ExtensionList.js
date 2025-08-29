import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const ExtensionList = () => {
  const [showModal, setShowModal] = useState(false);
  const [extensions, setExtensions] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchExtensions = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/pic-contacts');
        setExtensions(response.data);
      } catch (err) {
        console.error("Gagal mengambil data kontak PIC:", err);
        setError("Gagal memuat data kontak. Silakan coba lagi.");
      } finally {
        setLoading(false);
      }
    };
    fetchExtensions();
  }, []);

  const toggleModal = () => setShowModal(!showModal);

  const filteredCategories = Object.entries(extensions).reduce((acc, [category, picList]) => {
    const lowerCaseCategory = category.toLowerCase();
    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    if (lowerCaseCategory.includes(lowerCaseSearchTerm) || picList.some(pic => pic.name.toLowerCase().includes(lowerCaseSearchTerm))) {
      acc[category] = picList;
    }
    return acc;
  }, {});

  return (
    <>
        <button 
        className="btn btn-secondary rounded-circle shadow"
        style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            width: '50px',
            height: '50px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.2rem',
            zIndex: 1050
        }}
        onClick={toggleModal}
        title="Daftar Extension PIC"
        >
        {loading ? (
            <i className="bi bi-arrow-repeat spin text-white"></i> // Tambahkan kelas 'text-white'
        ) : (
            <i className="bi bi-telephone-fill text-white"></i> // Tambahkan kelas 'text-white'
        )}
        </button>

      {showModal && (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
          <div className="modal-dialog modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Daftar Extension PIC Aplikasi</h5>
                <button type="button" className="btn-close" onClick={toggleModal}></button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  className="form-control mb-3"
                  placeholder="Cari berdasarkan nama aplikasi atau PIC..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />

                {loading && <p>Memuat data...</p>}
                {error && <div className="alert alert-danger">{error}</div>}
                
                {!loading && !error && Object.entries(filteredCategories).length > 0 ? (
                  Object.entries(filteredCategories).map(([category, picList]) => (
                    <div key={category} className="mb-3">
                      <h6 className="text-primary">{category}</h6>
                      <ul className="list-group list-group-flush">
                        {picList.map((pic, index) => (
                          <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                            {pic.name}
                            {pic.ext && <span className="badge bg-secondary rounded-pill">{pic.ext}</span>}
                            {!pic.ext && <span className="badge bg-secondary rounded-pill">{pic.name}</span>}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))
                ) : (
                  !loading && !error && <p className="text-center">Tidak ada hasil ditemukan.</p>
                )}
              </div>
              <div className="modal-footer">
                {/* Tombol "Tutup" telah dihapus */}
              </div>
            </div>
          </div>
        </div>
      )}

      {showModal && <div className="modal-backdrop fade show"></div>}
    </>
  );
};

export default ExtensionList;