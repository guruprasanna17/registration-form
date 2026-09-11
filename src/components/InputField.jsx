import React from 'react';

const InputField = ({ label, name, type = "text", value, onChange, error }) => {
  return (
    <div className="form-group">
      <label>{label}</label>
      <input 
        className="form-input"
        type={type} 
        name={name} 
        value={value} 
        onChange={onChange} 
      />
      {error && <span className="error-text">{error}</span>}
    </div>
  );
};

export default InputField;