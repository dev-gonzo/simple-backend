import { PropsLead } from "../@types/typeLead";
import { prismaClient } from "../database/prismaClient";
import { BadRequest, InternalServerError } from "../helpers/ApiError";

export class LeadController {
  public empresa: PropsLead | undefined;
  async create(payload: PropsLead, empresaId: number, userId: number) {
    const { leadEmails, leadPhones, ...lead } = payload;

    try {
      const createLead = await prismaClient.leads.create({
        data: {
          ...lead,
          empresaId: empresaId,
          active: true,
          toView: false,
          leadsEmail: {
            create: leadEmails,
          },
          leadsPhone: {
            create: leadPhones,
          },
          historyLeads: {
            create: {
              description: JSON.stringify({
                userId: userId,
                message: `Novo lead cadastrado`,
              }),
            },
          },
        },
      });

      return createLead;
    } catch (e) {
      throw new BadRequest("Erro ao cadatrar");
    }
  }

  async filter(
    filter: {
      date: string;
      phone: string;
      ddd: number;
      contact: string;
      email: string;
    },
    empresaId: number
  ) {
    try {
      const { date, phone, ddd, contact, email } = filter;

      const leads = await prismaClient.leads.findMany({
        where: {
          AND: [
            { empresaId: empresaId },
            {
              contact: contact,
            },
            {
              date: {
                gte: this.dateInitial(date),
              },
            },
            {
              date: {
                lte: this.dateFinal(date),
              },
            },
            {
              leadsPhone: {
                some: {
                  phone: {
                    contains: phone,
                  },
                  ddd: {
                    equals: ddd,
                  },
                },
              },
            },
            {
              leadsEmail: {
                some: {
                  email: {
                    contains: email,
                  },
                },
              },
            },
          ],
        },
        include: {
          leadsPhone: true,
          leadsEmail: true,
        },
      });

      return leads;
    } catch (e) {
      throw new InternalServerError();
    }
  }

  dateInitial(date: Date | string | undefined) {
    if (typeof date === "string") {
      const yearMonthDay = date.split("T");
      return new Date(`${yearMonthDay[0]} 00:00:00`);
    }
    return date;
  }

  dateFinal(date: Date | string | undefined): Date {
    if (typeof date === "string") {
      const yearMonthDay = date.split("T");
      return new Date(`${yearMonthDay[0]} 23:59:59`);
    }
    return date as Date;
  }
}
