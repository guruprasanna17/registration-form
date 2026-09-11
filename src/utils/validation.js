import React from "react";
export const validateForm = (data) => {
  let errors = {};

  if (!data.fullName || data.fullName.length < 3) errors.fullName = "Name must be at least 3 characters";
  if (!data.email || !/\S+@\S+\.\S+/.test(data.email)) errors.email = "Valid email is required";
  if (!data.mobileNumber || !/^\d{10}$/.test(data.mobileNumber)) errors.mobileNumber = "Must be exactly 10 digits";
  if (!data.gender) errors.gender = "Please select a gender";
  if (!data.address) errors.address = "Address is required";
  if (!data.city) errors.city = "City is required";
  if (!data.state) errors.state = "Please select a state";
  if (!data.pincode || !/^\d{6}$/.test(data.pincode)) errors.pincode = "Must be exactly 6 digits";
  if (!data.terms) errors.terms = "You must accept the terms and conditions";

  return errors;
};