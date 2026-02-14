import { memo, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

const Modal = ({ isOpen, onClose, children, title }) => {
  const handleEscape = useCallback(
    (e) => {
      if (e.key === "Escape") onClose?.();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleEscape]);

  if (!isOpen) return null;

  const content = (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center w-full h-full overflow-y-auto p-4 bg-black/40 backdrop-blur-sm animate-fade-in"
      onClick={(e) => e.target === e.currentTarget && onClose?.()}
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4 md:px-6 md:py-5 border-b border-gray-100">
          <h2
            id="modal-title"
            className="text-lg font-semibold text-gray-900 md:text-xl"
          >
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="flex items-center justify-center w-9 h-9 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" aria-hidden />
          </button>
        </div>
        <div className="p-5 md:p-6 text-gray-700 overflow-y-auto max-h-[calc(90vh-80px)]">
          {children}
        </div>
      </div>
    </div>
  );

  return createPortal(content, document.body);
};

export default memo(Modal);
