import React, { useState } from "react";
import "./Modal.css"; // Assuming you have a separate CSS file for modal styles.

function successModal() {
    const [isVisible, setIsVisible] = useState(false);

    const showModal = () => {
        setIsVisible(true);
    };

    const hideModal = () => {
        setIsVisible(false);
    };

    const handleWindowClick = (event) => {
        if (event.target.id === "successModal") {
            hideModal();
        }
    };

    return (
        <div>
            <button onClick={showModal}>Show Modal</button> {/* Example button to trigger the modal */}
            {isVisible && (
                <div id="successModal" className="modal" onClick={handleWindowClick}>
                    <div className="modal-content">
                        <span className="close" onClick={hideModal}>
                            &times;
                        </span>
                        <div className="modal-body">
                            <button className="modalbtn" onClick={hideModal}>
                                Close Modal
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default successModal;

