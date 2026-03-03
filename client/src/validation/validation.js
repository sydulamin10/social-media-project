import * as Yup from "yup";

export const signUp = Yup.object().shape({
  fName: Yup.string().min(3).max(45).required("Please Enter Your First Name"),
  lName: Yup.string().min(3).max(45).required("Please Enter Your Last Name"),
  email: Yup.string().email().required("Please Enter Your Valid Email"),
  password: Yup.string().min(8).required("Please Enter Your Password"),
  gender: Yup.string().required("Please Select Gender"),
});
export const signIn = Yup.object({
  email: Yup.string().email().required("Please Enter Your Valid Email"),
  password: Yup.string().min(8).required("Please Enter Your Password"),
});
export const emailValidation = Yup.object({
  email: Yup.string().email().required("Please Enter Your Valid Email"),
});
export const emailValidationCode = Yup.object({
  code: Yup.string()
    .min("6", "code must be less than 6 characters")
    .max("6", "code must be greater Than 6 characters")
    .required("Code must be 6 Characters. Please enter valid code"),
});
export const newPassword = Yup.object({
  password: Yup.string().min(8).required("Please Enter Your New Password"),
});
