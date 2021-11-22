// @flow
import * as React from 'react';
import './modalWindow.scss'

type TModalProps = {
    children: React.ReactNode
};
const ModalWindow: React.FC<TModalProps> = (props) => {
    return (
        <div className="modal-wrapper">
            <div className="modal">
                {props.children}
            </div>
        </div>
    );
};

export default ModalWindow