import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const DatePicker = ({ onSelectDate, onGoBack }) => {
  const [availableDates, setAvailableDates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDates = async () => {
      try {
        // Mengambil daftar file JSON dari endpoint backend yang baru
        const response = await axios.get('http://localhost:5000/available-dates');
        setAvailableDates(response.data);
      } catch (error) {
        console.error("Gagal mengambil daftar tanggal:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDates();
  }, []);

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-end mb-3">
        <button className="btn btn-outline-secondary" onClick={onGoBack}>
          Kembali
        </button>
      </div>
      <div className="card shadow p-4">
        <h2 className="card-title text-center mb-4">Pilih Tanggal</h2>
        {loading ? (
          <p className="text-center">Memuat tanggal...</p>
        ) : availableDates.length > 0 ? (
          <div className="d-flex flex-wrap justify-content-center">
            {availableDates.map((date) => (
              <button 
                key={date}
                className="btn btn-info m-2"
                onClick={() => onSelectDate(date)}
              >
                {date}
              </button>
            ))}
          </div>
        ) : (
          <p className="text-center">Tidak ada catatan yang ditemukan.</p>
        )}
      </div>
    </div>
  );
};

export default DatePicker;