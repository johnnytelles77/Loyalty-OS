import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ToastAlertProps {
  type: 'success' | 'error';
  message: string;
  onClose: () => void;
  duration?: number; // milisegundos, por defecto 4000
}

const ToastAlert: React.FC<ToastAlertProps> = ({ type, message, onClose, duration = 4000 }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const bgColor =
    type === 'success'
      ? 'bg-green-500 text-white'
      : 'bg-red-500 text-white';

  return (
    <div
      className={`fixed top-6 right-6 flex items-center justify-between px-4 py-3 rounded-lg shadow-lg ${bgColor} animate-slide-in z-50`}
    >
      <span className="font-medium">{message}</span>
      <button onClick={onClose} className="ml-3 hover:opacity-80">
        <X size={18} />
      </button>

      <style jsx>{`
        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ToastAlert;
