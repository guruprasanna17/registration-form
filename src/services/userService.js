
export const registerUserAPI = async (userData) => {
  
  await new Promise((resolve) => setTimeout(resolve, 1000));

  
  return {
    status: "SUCCESS",
    message: "User details saved successfully",
    userId: Math.floor(1000 + Math.random() * 9000)
  };
};