import { PropsPermission } from "../../@types/typePermission";

export class Permission {
  private props: Partial<PropsPermission>;

  constructor(props: PropsPermission) {
    this.props = {
      key: props.key.toLocaleUpperCase(),
      active: props?.active === true ? true : false,
    };
  }

  get id(): number | undefined {
    return this.props?.id;
  }

  get key(): string | undefined {
    return this.props?.key;
  }

  get active(): boolean | undefined {
    return this.props?.active;
  }

  get data(): PropsPermission {
    return { ...this.props } as PropsPermission;
  }
}
