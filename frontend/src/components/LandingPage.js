import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const LandingPage = ({ onCreateNote, onViewNotes }) => {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div className="text-center">
        <h1 className="mb-4">Aplikasi Pencatatan Kendala</h1>
        <div className="d-grid gap-2 col-6 mx-auto">
          <button className="btn btn-primary btn-lg" onClick={onCreateNote}>
            Create Note
          </button>
          <button className="btn btn-secondary btn-lg" onClick={onViewNotes}>
            View Notes
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;