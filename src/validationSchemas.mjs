export const createUserValidationSchema = {
  user_name: {
    notEmpty: { errorMessage: "user not be empty" },
    isLength: {
      options: { min: 3, max: 12 },
      errorMessage: "user name length requirement not met"
    },
    isString:{errorMessage:'user must be a string'}
  },
  password:{
    notEmpty:{
      errorMessage:'password not empty'}
    }
  ,  
  age: { notEmpty: { errorMessage: "age not be empty" } },
};








