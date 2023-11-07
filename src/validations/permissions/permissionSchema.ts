import * as yup from "yup";

export const permissionSchema = yup.object({
  key: yup.string().required("Código é obrigatório"),
});
