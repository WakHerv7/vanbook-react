/**
 * Sure! I've updated the code to handle the cases where the user inputs 
 * a totalAmountPaid value lower or higher than the total amount. 
 * The code now distributes the difference between the new totalAmountPaid 
 * value and the previous one proportionally across all the amountPaid values.
 */

import React, { useState, useEffect } from 'react';

const TableComponent = ({ data }) => {
  const [tableData, setTableData] = useState(data);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalAmountPaid, setTotalAmountPaid] = useState(0);

  useEffect(() => {
    const sumAmount = tableData.reduce((acc, item) => acc + item.amount, 0);
    const sumAmountPaid = tableData.reduce((acc, item) => acc + item.amountPaid, 0);
    setTotalAmount(sumAmount);
    setTotalAmountPaid(sumAmountPaid);
  }, [tableData]);

  const handleAmountPaidChange = (index, e) => {
    const newAmountPaid = parseFloat(e.target.value);
    setTableData(prevData => {
      const newData = [...prevData];
      newData[index].amountPaid = newAmountPaid;
      return newData;
    });
  };

  const handleTotalAmountPaidChange = (e) => {
    const newTotal = parseFloat(e.target.value);

    if (newTotal <= totalAmount) {
      const diff = newTotal - totalAmountPaid;
      const percentageChange = (totalAmountPaid + diff) / totalAmountPaid;

      setTableData(prevData => {
        const newData = prevData.map(item => {
          const updatedAmountPaid = item.amountPaid * percentageChange;
          return { ...item, amountPaid: Math.min(updatedAmountPaid, item.amount) };
        });
        return newData;
      });
    }

    setTotalAmountPaid(Math.min(newTotal, totalAmount));
  };

  return (
    <div>
      {tableData.map((item, index) => (
        <div key={index}>
          <label>Amount: {item.amount}</label>
          <input
            type="number"
            value={item.amountPaid}
            onChange={(e) => handleAmountPaidChange(index, e)}
          />
        </div>
      ))}
      <div>
        <label>Total Amount Paid: </label>
        <input
          type="number"
          value={totalAmountPaid}
          onChange={handleTotalAmountPaidChange}
        />
      </div>
      <p>Boost your career with our "Build Your Skills" 12-month intensive program by AI Technologies for Africa (AITECAF). Register now: https://wa.me/message/PTF64ZHGJTKEF1</p>
    </div>
  );
};

export default TableComponent;