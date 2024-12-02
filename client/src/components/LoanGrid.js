// src/components/LoanGrid.js
import React, { useEffect, useState } from 'react';
import axios from '../axios';
import NewLoanForm from './NewLoanForm';

const LoanGrid = () => {
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    fetchLoans();
  }, []);

  const fetchLoans = async () => {
    try {
      const response = await axios.get('/loans', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setLoans(response.data);
    } catch (error) {
      console.error('Failed to fetch loans', error);
    }
  };

  const handleAddLoan = (newLoan) => {
    setLoans([...loans, newLoan]);
  };

  // 삭제 핸들러 추가
  const handleDeleteLoan = async (id) => {
    try {
      await axios.delete(`/loans/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setLoans(loans.filter(loan => loan._id !== id));
    } catch (error) {
      console.error('Failed to delete loan', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="mb-4 text-2xl font-bold">Loan List</h2>
      <NewLoanForm onAdd={handleAddLoan} />
      <table className="min-w-full mt-4 bg-white rounded-lg shadow-md">
        <thead>
          <tr>
            <th className="py-2">Lender</th>
            <th className="py-2">Amount</th>
            <th className="py-2">Interest (%)</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {loans.map((loan) => (
            <tr key={loan._id}>
              <td className="px-4 py-2 border">{loan.lenderBank}</td>
              <td className="px-4 py-2 border">{loan.totalAmount}</td>
              <td className="px-4 py-2 border">{loan.interestRate}</td>
              {/* 수정 및 삭제 버튼 추가 */}
              <td className="px-4 py-2 border">
                {/* 수정 및 삭제 로직을 위한 버튼 */}
                <button className="px-2 py-1 mr-2 text-white bg-blue-500 rounded">Edit</button>
                <button className="px-2 py-1 text-white bg-red-500 rounded" onClick={() => handleDeleteLoan(loan._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LoanGrid;
