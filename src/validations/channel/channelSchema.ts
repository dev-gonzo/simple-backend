import * as yup from "yup";

export const channelSchema = yup.object({
  name: yup.string().required("Nome é obrigatório"),
});
