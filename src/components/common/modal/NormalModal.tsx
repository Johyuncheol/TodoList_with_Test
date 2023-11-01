import React from 'react';
import styled from 'styled-components';

interface ModalProps {
  content: string;
  modalState:string;
  setModalState:React.Dispatch<React.SetStateAction<string>>
}

const Modal: React.FC<ModalProps> = ({ content,modalState,setModalState }) => {

  const closeModal = () => {
    setModalState('false')
  };

  return (
    <ModalWrapper isOpen={modalState}>
      <ModalContent>
        <pre>{content}</pre>
        <CloseButton onClick={closeModal}>Close</CloseButton>
      </ModalContent>
    </ModalWrapper>
  );
};

export default Modal;

const ModalWrapper = styled.div<{isOpen:string}>`
  display: ${props => props.isOpen ==='true' ? 'block' : 'none'};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
`;

const ModalContent = styled.div`
  background: #fff;
  max-width: 80%;
  margin: 0 auto;
  margin-top: 20%;
  padding: 20px;
  text-align: center;
`;

const CloseButton = styled.button`
  margin-top: 10px;
`;
