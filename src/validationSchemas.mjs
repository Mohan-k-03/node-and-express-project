export const createUserValidationSchema = {
  user_name: {
    notEmpty: { errorMessage: "user not be empty" },
    isLength: {
      options: { min: 3, max: 12 },
      errorMessage: "user name length requirement not met",
    },
  },
  age: { notEmpty: { errorMessage: "age not be empty" } },
};
