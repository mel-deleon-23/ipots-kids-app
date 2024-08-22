import React from 'react';

const FailModal = () => {
  const handleClose = () => {
    document.getElementById("failModal").style.display = "none";
  };

  return (
    <div id="failModal" className="modal">
      <div className="modal-content">
        <span className="close" onClick={handleClose}>&times;</span>
        <p>Incorrect answer. Please try again.</p>
        <button className="modalbtn" onClick={handleClose}>OK</button>
      </div>
    </div>
  );
};

export default FailModal;
