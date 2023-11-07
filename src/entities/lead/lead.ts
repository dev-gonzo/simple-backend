import {
  PropsLead,
  PropsLeadEmail,
  PropsLeadPhone,
} from "../../@types/typeLead";

export class Lead {
  private props: Partial<PropsLead>;

  constructor(props: Partial<PropsLead>) {
    this.props = props;
  }

  get id(): number | undefined {
    return this.props?.id;
  }

  get date(): Date | undefined | string {
    return this.props?.date;
  }

  get contact(): string | undefined {
    return this.props?.contact;
  }

  get phones(): Array<PropsLeadPhone> | undefined {
    return this.props?.leadPhones;
  }

  get emails(): Array<PropsLeadEmail> | undefined {
    return this.props?.leadEmails;
  }

  get toView(): boolean | undefined {
    return this.props?.toView;
  }

  get active(): boolean | undefined {
    return this.props?.active;
  }

  get data(): PropsLead {
    return { ...this.props } as PropsLead;
  }
}
