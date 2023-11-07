import * as yup from "yup";

export const validate = async (
  value: object,
  schema: yup.ObjectSchema<object>
) => {
  let errors: string[] = [];
  await schema.validate(value, { abortEarly: false }).catch((err) => {
    errors = err.errors;
  });

  if (errors?.length) {
    return errors;
  }
};
