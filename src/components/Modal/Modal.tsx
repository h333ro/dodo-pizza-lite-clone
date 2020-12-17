import React, {useCallback, useEffect} from 'react';
import ReactDom from 'react-dom';
import {useHandlerOnOutsideClick} from "../../customHooks/useHandlerOnOutsideClick";
import {CSSTransition} from "react-transition-group";

import '../../CSSTransition/modal.css';

type PropsType = {
    isOpen: boolean,
    children?: React.ReactNode,
    closeModal: () => void;
}

export const Modal: React.FC<PropsType> = React.memo(({isOpen, children, closeModal}) => {

        useEffect(() => {
            if (!isOpen) return;
            document.documentElement.style.paddingRight = window.innerWidth - document.documentElement.clientWidth + 'px';
            document.documentElement.style.overflow = 'hidden';
        }, [isOpen]);

        const onModalClose = useCallback(() => {
            closeModal();
            document.documentElement.style.overflow = 'auto';
            document.documentElement.style.paddingRight = 0 + 'px';
        }, [closeModal]);
        const modalRef = useHandlerOnOutsideClick<HTMLDivElement>(onModalClose);

        const el = document.getElementById('portal');
        if (!el) return null;

        return ReactDom.createPortal(
            <CSSTransition timeout={300} in={isOpen} unmountOnExit classNames={'modal'}>
                    <div className={'modal'} ref={modalRef}>
                        <div className="modal__content">
                            <button className={'modal__close-button'} onClick={onModalClose}>
                                <i className="fas fa-times"/>
                            </button>
                            {children}
                        </div>
                    </div>
            </CSSTransition>
            , el)
});