import React, { Component } from 'react';

import "./style_selectInput.css";

function SelectInput({title, nameText, placeholderText, requiredValue, optionList, noGrayBg}) {
  return (
    <div>    
        {title ?
            <label className="commonSelectInputLabel" htmlFor={nameText}>{title} <span>{requiredValue ? '*' : ''}</span> </label>
            :
            <></>
        }    
    <select className={`commonSelectInput ${noGrayBg ? '':'gray_bg' }`} name={nameText} id={nameText} required={requiredValue}>
        <option disabled defaultValue value="">{`Sélectionnez ${placeholderText}...`}</option>        
        {
            optionList.map((val, ind) => {
                return <option value={val.value}>{val.text}</option>
            })
        
        }
    </select>    
    </div>   
  );
}

export default SelectInput;