import { object, string, ref } from "yup";

export const createUserSchema = object({
  body: object({
    name: string().required("Name is required"),
    password: string()
      .required("Password is required")
      .min(6, "Password is too short - shoyld be 8 characters or longer")
      .matches(
        /^[a-zA-Z0-9._-]*$/,
        "Password can only contain alphabets, numbers , underscore, period and dash"
      ),
    passwordConfirmation: string().oneOf(
      [ref("password"), null],
      "Passwords must match"
    ),
    email: string()
      .email("Must be a valid email")
      .required("Email is required"),
  }),
});

export const createUserSessionSchema = object({
  body: object({
    password: string()
      .required("Password is required")
      .min(6, "Password is too short - shoyld be 8 characters or longer")
      .matches(
        /^[a-zA-Z0-9._-]*$/,
        "Password can only contain alphabets, numbers , underscore, period and dash"
      ),
    email: string()
      .email("Must be a valid email")
      .required("Email is required"),
  }),
});
