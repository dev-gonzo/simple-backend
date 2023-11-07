import * as yup from "yup";

export const usersCreateSchema = yup.object({
  name: yup.string().required("Nome é obrigatório"),
  email: yup.string().email("E-mail inválido").required("E-mail é obrigatório"),
  password: yup.string().required("Senha é obrigatório"),
  confirmPassword: yup
    .string()
    .required("Confirmação de senha é obrigatório")
    .oneOf([yup.ref("password")], "Senhas são diferentes"),
});
