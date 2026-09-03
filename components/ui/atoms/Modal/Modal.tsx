"use client"
import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { XIcon } from "@phosphor-icons/react";
import { Text } from "../Text/Text";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-9998"
          />
          
          {/* Modal Content */}
          <div className="fixed inset-0 flex items-center justify-center p-4 z-9999 pointer-events-none">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              style={{
                clipPath: 'polygon(0 8px, 8px 8px, 8px 0, calc(100% - 8px) 0, calc(100% - 8px) 8px, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 8px calc(100% - 8px), 0 calc(100% - 8px))'
              }}
              className="bg-[#14181F] border-4 border-[#384252] shadow-[8px_8px_0px_rgba(0,0,0,1)] w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col pointer-events-auto text-white"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-5 border-b-2 border-black bg-[#1F2530]">
                <Text variant="h4" weight="medium" className="text-white font-mono uppercase font-black">
                  {title}
                </Text>
                <button
                  onClick={onClose}
                  style={{
                    clipPath: 'polygon(0 2px, 2px 2px, 2px 0, calc(100% - 2px) 0, calc(100% - 2px) 2px, 100% 2px, 100% calc(100% - 2px), calc(100% - 2px) calc(100% - 2px), calc(100% - 2px) 100%, 2px 100%, 2px calc(100% - 2px), 0 calc(100% - 2px))'
                  }}
                  className="w-8 h-8 bg-[#2C3440] hover:bg-[#3E4856] active:translate-x-px active:translate-y-px border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] text-white flex items-center justify-center transition-all cursor-pointer"
                >
                  <XIcon size={16} weight="bold" />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 overflow-y-auto custom-scrollbar">
                {children}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
