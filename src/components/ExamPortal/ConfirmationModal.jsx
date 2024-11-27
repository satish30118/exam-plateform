import React from 'react';

const ConfirmationModal = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center text-black bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded shadow-lg">
        <h2 className="text-lg font-bold mb-4">Confirm Submission</h2>
        <p className="mb-4">Are you sure you want to submit your exam? Once submitted, you cannot make changes.</p>
        <div className="flex space-x-4 justify-end">
          <button className="bg-red-600 text-white px-6 py-2 rounded" onClick={onCancel}>Cancel</button>
          <button className="bg-green-600 text-white px-6 py-2 rounded" onClick={onConfirm}>Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
