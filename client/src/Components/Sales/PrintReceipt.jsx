import React from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line react/prop-types
const PrintReceipt = React.forwardRef(function PrintReceipt({ cart, totalAmount, customerName, date,  }, ref) {
  return (
    <div ref={ref} className="p-5 bg-white max-w-lg mx-auto  rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <div>
          <img src="/logo.avif" alt="Pharmacy Logo" className="h-16" />
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-bold">City Central Pharmacy</h1>
          <p className="text-gray-600 text-sm">okaishie drug lane, Accra,Ghana</p>
        </div>
      
      </div>
      <h2 className="text-xl font-bold mb-4 text-center">Receipt</h2>
      <div className="mb-4">
      <div className="text-lg">
  <p><strong>Date:</strong> {date}</p>
  <p><strong>Name:</strong> {customerName}</p>
</div>

      </div>
      <table className="min-w-full bg-white border-collapse mb-6">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 border-b">#</th>
            <th className="px-4 py-2 border-b">Product</th>
            <th className="px-4 py-2 border-b">Qty</th>
            <th className="px-4 py-2 border-b">Price</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((cartProduct, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-4 py-2 border-b">{index + 1}</td>
              <td className="px-4 py-2 border-b">{cartProduct.name}</td>
              <td className="px-4 py-2 border-b">{cartProduct.quantity}</td>
              <td className="px-4 py-2 border-b">Gh₵{cartProduct.price.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 text-right">
        <h2 className="text-xl font-bold">Total Amount: Gh₵{totalAmount.toFixed(2)}</h2>
      </div>
    </div>
  );
});

PrintReceipt.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
        
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
      totalAmount: PropTypes.number.isRequired,
    })
  ).isRequired,
  totalAmount: PropTypes.number.isRequired,
  customerName: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  salesId: PropTypes.string.isRequired,
  
};

export default PrintReceipt;
