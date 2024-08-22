import React from 'react';

const Modals = () => {
    const showModal = (modalId) => {
        const modal = document.getElementById(modalId);
        if (modal) modal.style.display = 'block';
    };

    const hideModal = (modalId) => {
        const modal = document.getElementById(modalId);
        if (modal) modal.style.display = 'none';
    };

    return (
        <>
            <div id="successModal" className="modal">
                <div className="modal-content">
                    <span className="close" onClick={() => hideModal('successModal')}>×</span>
                    <button className="modalbtn" onClick={() => hideModal('successModal')}>OK</button>
                </div>
            </div>
            <div id="failModal" className="modal">
                <div className="modal-content">
                    <span className="close" onClick={() => hideModal('failModal')}>×</span>
                    <button className="modalbtn" onClick={() => hideModal('failModal')}>OK</button>
                </div>
            </div>
        </>
    );
};

export default Modals;
