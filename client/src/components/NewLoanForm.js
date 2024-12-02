// src/components/NewLoanForm.js
import React, { useState } from 'react';
import axios from '../axios';

const NewLoanForm = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    loanName: '',
    lenderBank: '',
    totalAmount: '',
    remainingAmount: '',
    interestRate: '',
    startDate: '',
    endDate: '',
    repaymentDate: '',
    monthlyRepayment: '',
    repaymentBank: '',
    repaymentAccount: '',
    repaymentStartDate: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/loans', formData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      onAdd(response.data);
      setFormData({
        loanName: '',
        lenderBank: '',
        totalAmount: '',
        remainingAmount: '',
        interestRate: '',
        startDate: '',
        endDate: '',
        repaymentDate: '',
        monthlyRepayment: '',
        repaymentBank: '',
        repaymentAccount: '',
        repaymentStartDate: '',
      });
    } catch (error) {
      console.error('Error adding new loan', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl p-4 mx-auto border rounded-lg">
      {/* 모든 대출 입력 항목을 위한 필드 렌더링 */}
      {Object.keys(formData).map((field) => (
        <div key={field} className="mb-4">
          <label className="block text-gray-700 capitalize" htmlFor={field}>{field}</label>
          <input
            type={field.includes('Date') ? 'date' : 'text'}
            name={field}
            value={formData[field]}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
      ))}
      <button type="submit" className="w-full py-2 text-white bg-green-500 rounded-md">
        Add Loan
      </button>
    </form>
  );
};

export default NewLoanForm;
