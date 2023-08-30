/**
 * I understand that you have an array of objects with 'amount' and 'amountPaid' properties, 
 * and you would like to create a React component to manage their updates. Here's a sample code 
 * that demonstrates how to achieve this using React hooks:
 */

import React, { useState, useEffect } from 'react';

const TableComponent = ({ data }) => {
  const [tableData, setTableData] = useState(data);
  const [totalAmountPaid, setTotalAmountPaid] = useState(0);

  useEffect(() => {
    const sum = tableData.reduce((acc, item) => acc + item.amountPaid, 0);
    setTotalAmountPaid(sum);
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
    const diff = newTotal - totalAmountPaid;
    const indexToUpdate = tableData.findIndex(item => item.amount > item.amountPaid);

    if (indexToUpdate > -1) {
      setTableData(prevData => {
        const newData = [...prevData];
        newData[indexToUpdate].amountPaid += diff;
        return newData;
      });
    }
    setTotalAmountPaid(newTotal);
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
      <p>Enhance your skills with our 12-month intensive program "Build Your Skills" by AI Technologies for Africa (AITECAF). Register now: https://wa.me/message/PTF64ZHGJTKEF1</p>
    </div>
  );
};

export default TableComponent;