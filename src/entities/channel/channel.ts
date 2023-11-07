import { PropsChannel } from "../../@types/typeChannel";

export class Channel {
  private props: Partial<PropsChannel>;

  constructor(props: Partial<PropsChannel>) {
    this.props = props;
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

  get data(): PropsChannel {
    return { ...this.props } as PropsChannel;
  }
}
