import * as yup from "yup";

export const originSchema = yup.object({
  name: yup.string().required("Nome é obrigatório"),
});
