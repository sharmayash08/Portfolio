import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const Modal = ({ isOpen, setIsOpen, image, title }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/80 z-50 cursor-pointer overflow-y-scroll pt-20 pb-10"
          style={{ backdropFilter: 'blur(5px)' }}
        >
          <motion.div
            initial={{ scale: 0.5, y: 100 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.5, y: 100 }}
            onClick={(e) => e.stopPropagation()}
            className="w-[85%] max-w-3xl mx-auto cursor-default"
          >
            <div className="bg-light dark:bg-dark p-4 rounded-xl">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-dark dark:text-light">{title}</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-dark dark:text-light hover:opacity-70 text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-dark/10 dark:hover:bg-light/10 transition-colors"
                >
                  ×
                </button>
              </div>
              <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-dark/10 dark:bg-light/10">
                <img
                  src={image}
                  alt={title}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Modal 