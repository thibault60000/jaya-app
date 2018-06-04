import React from 'react'
import PropTypes from 'prop-types'

const ModalCard = ({
  open,
  title,
  content,
  footer,
  onCloseClick
}) => (
  <div className={`modal ${open ? 'is-active' : ''}`}>
    <div className='modal-background' />
    <div className='modal-card'>
      <header className='modal-card-head'>
        {title && (<p>{title}</p>)}
        <button
          className='delete'
          aria-label='close'
          onClick={onCloseClick}
        />
      </header>

      {content && (
        <section clasName='modal-card-body'>
          {content}
        </section>
      )}

      {footer && (
        <footer className='modal-card-foot'>
          {footer}
        </footer>
      )}
    </div>
  </div>
)

ModalCard.propTypes = {
  title: PropTypes.string,
  content: PropTypes.node,
  footer: PropTypes.node,
  open: PropTypes.bool,
  onCloseClick: PropTypes.func
}

export default ModalCard
