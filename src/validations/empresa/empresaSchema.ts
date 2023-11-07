import * as yup from "yup";
import { isValidCnpj } from "../../helpers/isValidCnpj";

export const empresaSchema = yup.object({
  cnpj: yup
    .string()
    .required("CNPJ é obrigatório")
    .test("invalid", "CNPJ inválido", (value) => {
      return isValidCnpj(value);
    }),
  razaoSocial: yup.string().required("Razão social é obrigatório"),
  nomeFantasia: yup.string().required("Nome fantasia é obrigatório"),
  ramoAtividade: yup.string().required("Ramo atividade é obrigatório"),
  qtdFuncionarios: yup
    .string()
    .required("Quantidade de funcionários é obrigatório"),
  responsavel: yup.string().required("Responsável é obrigatório"),
  telefone: yup.string().required("Telefone é obrigatório"),
  email: yup.string().email("E-mail inválido").required("E-mail é obrigatório"),
});
