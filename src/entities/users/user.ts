import { PropsUser } from "../../@types/typeUsers";
import md5 from "crypto-js/md5";

export class User {
  private props: PropsUser;

  constructor(props: Partial<PropsUser>) {
    this.fullName(props?.name ?? "");

    this.props = this.validUser(props);
  }

  get id(): number | null {
    return this.props?.id ?? null;
  }

  get name(): string {
    return this.props?.name;
  }

  get email(): string {
    return this.props?.email;
  }

  get active(): boolean {
    return this.props?.active;
  }

  get password(): string | undefined {
    return this.props?.password;
  }

  get data() {
    return {
      name: this.props.name,
      email: this.props.email,
      active: this.props.active,
      password: this.props.password,
    };
  }

  private fullName(value: string) {
    const arrName = value?.trim()?.split(" ");
    const filterTwoOrMoreCharacters = arrName?.filter(
      (word) => word?.length > 1
    );

    if (filterTwoOrMoreCharacters?.length < 2) {
      throw new Error("Nome conter duas ou mais palavras.");
    }
  }

  private validUser(user: Partial<PropsUser>): PropsUser {
    const newUser: PropsUser = {
      active: user?.active ?? false,
      email: user?.email ?? "",
      name: user?.name ?? "",
      password: this.hashPassword(user?.password),
    };
    return newUser;
  }

  private hashPassword(value: string | undefined) {
    return value ? md5(value).toString() : "";
  }
}
