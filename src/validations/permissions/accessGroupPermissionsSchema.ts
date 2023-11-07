import * as yup from "yup";

export const accessGroupPermissionsSchema = yup.object({
  permissions: yup
    .array()
    .typeError("Permissões é obrigatório")
    .min(1, "Informa ao menos uma permissão")
    .required("Permissões é obrigatório"),
});
