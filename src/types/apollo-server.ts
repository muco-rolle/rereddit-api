import { Request, Response } from 'express';

export type Context = {
    req: Request & { session: { userId: string } };
    res: Response;
};
