import React, { Component } from 'react';

import "./style_textArea.css";

function TextArea({title, nameText, placeholderText, requiredValue, rowsValue, colsValue, grayColor}) {
  return (
    <div>
    
    <label className="commonTextAreaLabel" htmlFor={nameText}>
      {title} 
      <span>{requiredValue ? '*' : ''}</span>
    </label>
    <textarea 
    className={`commonTextArea ${grayColor ? "grayColor": ""}`} 
    rows={rowsValue} 
    cols={colsValue} 
    id={nameText} 
    name={nameText} 
    required={requiredValue} 
    placeholder={placeholderText}/>
    
    </div>   
  );
}

export default TextArea;