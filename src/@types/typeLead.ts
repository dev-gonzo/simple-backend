export type PropsLead = {
  id: number;
  date: Date | string;
  contact: string;
  empresaId: number;
  statusId: number;
  channelId: number;
  userId?: number;
  toView: boolean;
  active: boolean;
  leadPhones?: PropsLeadPhone[];
  leadEmails?: PropsLeadEmail[];
  createAt: Date;
  updateAt: Date;
};

export type PropsLeadPhone = {
  id: number;
  ddd: number;
  phone: string;
  createAt: Date;
  updateAt: Date;
};

export type PropsLeadEmail = {
  id: number;
  email: string;
  createAt: Date;
  updateAt: Date;
};

export type PropsHistoryLeads = {
  id: number;
  description: unknown;
  createAt: Date;
};
