import React, { useState } from 'react';
import InputField from './InputField';
import SelectField from './SelectField';
import { GENDER_OPTIONS, STATE_OPTIONS } from '../constants/formConstants';
import { validateForm } from '../utils/validation';
import { registerUserAPI } from '../services/userService';

const UserForm = () => {
  const initialFormState = {
    fullName: '', 
    email: '', 
    mobileNumber: '', 
    dateOfBirth: '',
    gender: '', 
    address: '', 
    city: '', 
    state: '', 
    pincode: '', 
    terms: false
  };

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiMessage, setApiMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiMessage({ type: '', text: '' }); 

    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return; 
    }
    setErrors({});
    setLoading(true);

    try {
      const { terms, ...dataToSend } = formData;
      const response = await registerUserAPI(dataToSend);
      
      setApiMessage({ type: 'success', text: `Success! User ID: ${response.userId || 'Created'}` });
      setFormData(initialFormState); 
    } catch (error) {
      setApiMessage({ type: 'error', text: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>User Registration</h2>
      
      {apiMessage.text && (
        <div className={apiMessage.type === 'success' ? 'success-message' : 'error-message'}>
          {apiMessage.text}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <InputField label="Full Name *" 
        name="fullName"
        value={formData.fullName} 
        onChange={handleChange} 
        error={errors.fullName} />

        <InputField label="Email Address *" 
        name="email" 
        type="email" 
        value={formData.email} 
        onChange={handleChange} 
        error={errors.email} />

        <InputField label="Mobile Number *" 
        name="mobileNumber" 
        value={formData.mobileNumber} 
        onChange={handleChange} 
        error={errors.mobileNumber} />

        <InputField 
        label="Date of Birth" 
        name="dateOfBirth" 
        type="date" 
        value={formData.dateOfBirth} 
        onChange={handleChange} />
        
        <SelectField 
        label="Gender *" 
        name="gender" 
        options={GENDER_OPTIONS} 
        value={formData.gender} 
        onChange={handleChange} 
        error={errors.gender} />
        
        <div className="form-group">
          <label>Address *</label>
          <textarea className="form-textarea" 
          name="address" 
          value={formData.address} 
          onChange={handleChange}></textarea>
          {errors.address && <span className="error-text">{errors.address}</span>}
        </div>

        <InputField 
        label="City *" 
        name="city" 
        value={formData.city} 
        onChange={handleChange} 
        error={errors.city} />

        <SelectField 
        label="State *" 
        name="state" 
        options={STATE_OPTIONS} 
        value={formData.state} 
        onChange={handleChange} 
        error={errors.state} />

        <InputField 
        label="Pincode *" 
        name="pincode" 
        value={formData.pincode} 
        onChange={handleChange} 
        error={errors.pincode} />
        <div className="form-group" 
        style={{ flexDirection: 'row', alignItems: 'center', gap: '10px' }}>

        <input 
        type="checkbox" 
        name="terms" 
        checked={formData.terms} 
        onChange={handleChange} />
        <label style={{ margin: 0 }}>I accept the Terms & Conditions *</label>
        </div>
        {errors.terms && <span className="error-text">{errors.terms}</span>}

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Submitting...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default UserForm;

