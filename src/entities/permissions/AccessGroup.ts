import { PropsAccessGroup, PropsPermission } from "../../@types/typePermission";

export class AccessGroup {
  private props: Partial<PropsAccessGroup>;

  constructor(props: PropsAccessGroup) {
    this.props = {
      name: props.name,
      active: props?.active === true ? true : false,
    };
  }

  get id(): number | undefined {
    return this.props?.id;
  }

  get name(): string | undefined {
    return this.props?.name;
  }

  get active(): boolean | undefined {
    return this.props?.active;
  }

  get data(): PropsAccessGroup {
    return { ...this.props } as PropsAccessGroup;
  }
}
