import React from "react";

function AlertModal({ message, confirm, cancelAlert }) {
  return (
    <div className="modalWrapper">
      <div className="modal">
        <div className="modalContent">
          <p>{message}</p>
          <button className="mock-button" onClick={() => confirm()}>
            OK
          </button>
          <button className="mock-button" onClick={() => cancelAlert()}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default AlertModal;
