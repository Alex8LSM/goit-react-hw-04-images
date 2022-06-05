// import { Component } from 'react';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import s from './Modal.module.css';

const modalRoot = document.querySelector('#modalPortal');

function Modal({ largeImageURL, onToggleModal }) {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onToggleModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onToggleModal]);

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onToggleModal();
    }
  };

  return createPortal(
    <div className={s.Overlay} onClick={handleBackdropClick}>
      <div className={s.Modal}>
        <img src={largeImageURL} alt="" />
      </div>
    </div>,
    modalRoot
  );
}
Modal.propTypes = {
  onToggleModal: PropTypes.func.isRequired,
};

export default Modal;

// class Modal extends Component {
//   componentDidMount() {
//     window.addEventListener('keydown', this.handleKeyDown);
//   }

//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.handleKeyDown);
//   }

//   handleKeyDown = e => {
//     if (e.code === 'Escape') {
//       this.props.onToggleModal();
//     }
//   };

//   handleBackdropClick = e => {
//     if (e.currentTarget === e.target) {
//       this.props.onToggleModal();
//     }
//   };

//   render() {
//     const { largeImageURL } = this.props;

//     return createPortal(
//       <div className={s.Overlay} onClick={this.handleBackdropClick}>
//         <div className={s.Modal}>
//           <img src={largeImageURL} alt="" />
//         </div>
//       </div>,
//       modalRoot,
//     );
//   }
// }

// Modal.propTypes = {
//   onToggleModal: PropTypes.func.isRequired,
// };

// export default Modal;
