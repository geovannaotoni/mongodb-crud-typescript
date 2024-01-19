import { NextFunction, Request, Response } from "express";
import PostService from "../services/PostService";
import mapStatusHTTP from "../utils/mapStatusHTTP";

export default class PostController {
  constructor(
    private postService = new PostService(),
  ) {}

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const serviceResponse = await this.postService.create(req.body);
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    } catch (error) {
      next(error);
    }
  }

  public async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const serviceResponse = await this.postService.getAll();
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    } catch (error) {
      next(error);
    }
  }

  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const serviceResponse = await this.postService.getById(Number(req.params.id));
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    } catch (error) {
      next(error);
    }
  }

  public async update(req: Request, res: Response, next: NextFunction) {
    try {
      const serviceResponse = await this.postService.update(Number(req.params.id), req.body);
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }
    catch (error) {
      next(error);
    }
  }

  public async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const serviceResponse = await this.postService.delete(Number(req.params.id));
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }
    catch (error) {
      next(error);
    }
  }
}