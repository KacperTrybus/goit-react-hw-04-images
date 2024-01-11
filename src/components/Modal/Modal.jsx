import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';

const Modal = ({ isOpen, imageUrl, onClose }) => {
  const handleKeyDown = useMemo(
    () => e => {
      if (e.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  const handleClickOutside = useMemo(
    () => e => {
      if (e.target.classList.contains('overlay')) {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [handleKeyDown, handleClickOutside]);

  return (
    isOpen && (
      <div className="overlay" onClick={handleClickOutside}>
        <div className="modal">
          <img src={imageUrl} alt="" />
        </div>
      </div>
    )
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  imageUrl: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
