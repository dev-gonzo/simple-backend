import { PropsOrigin } from "../../@types/typeOrigin";

export class Origin {
  private props: Partial<PropsOrigin>;

  constructor(props: Partial<PropsOrigin>) {
    this.props = props;
  }

  get id(): number | undefined {
    return this.props?.id;
  }

  get name(): string | undefined {
    return this.props?.name;
  }

  get description(): string | undefined {
    return this.props?.description;
  }

  get active(): boolean | undefined {
    return this.props?.active;
  }

  get data(): PropsOrigin {
    return { ...this.props } as PropsOrigin;
  }
}
