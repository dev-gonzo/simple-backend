import { PropsEmpresa } from "../../@types/typeEmpresa";
import { BadRequest } from "../../helpers/ApiError";

export class Empresa {
  private props: Partial<PropsEmpresa>;

  constructor(props: Partial<PropsEmpresa>) {
    this.fullRazaoSocial(props.razaoSocial ?? "");
    this.props = props;
  }

  get id(): number | undefined {
    return this.props?.id;
  }

  get razaoSocial(): string | undefined {
    return this.props?.razaoSocial;
  }

  get nomeFantasia(): string | undefined {
    return this.props?.nomeFantasia;
  }

  get ramoAtividade(): string | undefined {
    return this.props?.ramoAtividade;
  }

  get qtdFuncionarios(): string | undefined {
    return this.props?.qtdFuncionarios;
  }

  get responsavel(): string | undefined {
    return this.props?.responsavel;
  }

  get telefone(): string | undefined {
    return this.props?.telefone;
  }

  get email(): string | undefined {
    return this.props?.email;
  }

  get active(): boolean | undefined {
    return this.props?.active;
  }

  get data(): PropsEmpresa {
    return { ...this.props } as PropsEmpresa;
  }

  private fullRazaoSocial(value: string) {
    const arrRazaoSocial = value?.trim()?.split(" ");
    const filterTwoOrMoreCharacters = arrRazaoSocial?.filter(
      (word) => word?.length > 1
    );

    if (filterTwoOrMoreCharacters?.length < 2) {
      throw new BadRequest("Razão social deve conter duas ou mais palavras.");
    }
  }
}
