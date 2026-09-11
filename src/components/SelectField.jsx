import React from 'react';

const SelectField = ({ label, name, options, value, onChange, error }) => {
  return (
    <div className="form-group">
      <label>{label}</label>
      <select className="form-select" name={name} value={value} onChange={onChange}>
        <option value="">-- Select {label} --</option>
        {options.map((opt, index) => (
          <option key={index} value={opt}>{opt}</option>
        ))}
      </select>
      {error && <span className="error-text">{error}</span>}
    </div>
  );
};

export default SelectField;