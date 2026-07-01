import React from 'react'

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-white/12'>
            <div className='bg-cyan-950 rounded-xl shadow-lg w-full max-w-md p-6 relative'>

                <button onClick={onClose}
                    className='absolute top-0 right-2 text-white hover:text-red-500 font-bold text-2xl cursor-pointer'>
                    x
                </button>

                {children}
            </div>
        </div>
    )
}

export default Modal