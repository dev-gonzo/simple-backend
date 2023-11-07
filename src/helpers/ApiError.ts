export class ApiError extends Error {
  public readonly statusCode: number;

  constructor(message: string, statusCode?: number) {
    super(message);
    this.statusCode = statusCode ?? 500;
  }
}

export class BadRequest extends Error {
  public readonly statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = 400;
  }
}


export class Unauthorized extends Error {
  public readonly statusCode: number;

  constructor(message?: string) {
    super(message ?? "Acesso negado");
    this.statusCode = 401;
  }
}

export class InternalServerError extends Error {
  public readonly statusCode: number;

  constructor() {
    super("Erro interno do Servidor");
    this.statusCode = 500;
  }
}
