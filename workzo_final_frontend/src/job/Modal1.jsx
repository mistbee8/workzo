import React from "react";

const Modal1 = ({ isOpen, onClose, fetchData, children }) => {
	if (!isOpen) return null;

	return (
		<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
			<div className='bg-white rounded-lg w-full max-w-6xl max-h-[90vh] overflow-y-auto relative'>
				{/* Close Icon Button */}
				<button onClick={onClose} className='absolute top-4 right-4 z-10 text-gray-500 hover:text-gray-700 bg-white rounded-full p-1 shadow-md hover:shadow-lg transition-all duration-200'>
					<svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
						<path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12' />
					</svg>
				</button>

				{/* Modal Content */}
				{children}
			</div>
		</div>
	);
};

export default Modal1;
