import * as yup from "yup";

export const accessGroupSchema = yup.object({
  name: yup.string().required("Nome é obrigatório"),
});
