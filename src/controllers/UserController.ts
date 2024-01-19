import { NextFunction, Request, Response } from "express";
import mapStatusHTTP from "../utils/mapStatusHTTP";
import UserService from "../services/UserService";

export default class UserController {
  constructor(
    private userService = new UserService(),
  ) {}

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const serviceResponse = await this.userService.create(req.body);
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    } catch (error) {
      next(error);
    }
  }

  public async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const serviceResponse = await this.userService.findById(Number(req.params.id));
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    } catch (error) {
      next(error);
    }
  }

  public async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const serviceResponse = await this.userService.findAll();
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    } catch (error) {
      next(error);
    }
  }

  public async update(req: Request, res: Response, next: NextFunction) {
    try {
      const serviceResponse = await this.userService.update(Number(req.params.id), req.body);
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    } catch (error) {
      next(error);
    }
  }

  public async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const serviceResponse = await this.userService.delete(Number(req.params.id));
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    } catch (error) {
      next(error);
    }
  }
}