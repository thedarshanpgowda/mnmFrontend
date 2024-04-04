import React from 'react';
import '../App.css'
export const Modal = (props) => {
  return (
    props.view && (
      <div className="modal-overlay">
        <div className="modal">
          <button onClick={()=>props.onClose()} className="close-button" >
            X
          </button>
          <h2 className="answer heading">{props.status}</h2>
          <p className="answer">{props.message}</p>
        </div>
      </div>
    )
  );
};
