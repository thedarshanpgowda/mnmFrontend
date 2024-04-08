import React, { createContext, useState } from 'react';
import '../App.css';

const ModalContext = createContext();
export default ModalContext
export const ModalState = (props) => {
    const [modalBlock, setModalBlock] = useState({
        state: false,
        message: "",
        status: ""
    });

    const updateModal = (message, status) => {
        setModalBlock({
            state: true,
            message,
            status
        });
    };

    const onClose = () => {
        setModalBlock({
            state: false,
            message: "",
            status: ""
        });
    }

    return (
        <ModalContext.Provider value={{ modalBlock, updateModal }}>
            {modalBlock.state && (
                <div className="modal-overlay">
                    <div className="modal">
                        <button onClick={() => onClose()} className="close-button" >
                            X
                        </button>
                        <h2 className="answer heading">{modalBlock.status}</h2>
                        <p className="answer">{modalBlock.message}</p>
                    </div>
                </div>
            )}
            {props.children}
        </ModalContext.Provider>
    );
};
