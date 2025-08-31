import { type ReactNode, useEffect } from 'react'
interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: ReactNode
}

const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-label={title || 'Dialog'}>
      <div className="modal-backdrop" onClick={onClose} />
      <div className="modal-content card-organic">
        <div className="modal-header">
          {title && <h3 className="display-text text-old-growth" style={{ margin: 0 }}>{title}</h3>}
          <button className="modal-close" onClick={onClose} aria-label="Close dialog">×</button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Modal


