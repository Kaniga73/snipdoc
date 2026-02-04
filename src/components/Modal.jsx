import '../styles/Modal.css'

function Modal({ title, children, onClose }) {
  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose()
    }
  }

  return (
    <div className="sd-modal-backdrop" onClick={handleBackdropClick}>
      <div className="sd-modal">
        <header className="sd-modal__header">
          {title && <h2 className="sd-modal__title">{title}</h2>}
          <button
            type="button"
            className="sd-modal__close"
            aria-label="Close"
            onClick={onClose}
          >
            ✕
          </button>
        </header>
        <div className="sd-modal__body">{children}</div>
      </div>
    </div>
  )
}

export default Modal


