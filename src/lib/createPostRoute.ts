import { Request, Response } from 'express';

interface RouteHandler {
  ({
    request,
    response,
  }: {
    request: Request;
    response: Response;
  }): void | Promise<void>;
}

function __createRoute(method: 'post' | 'get', handler: RouteHandler) {
  return {
    method,
    handler(request: Request, response: Response) {
      handler({ request, response });
    },
  };
}

export function createGetRoute(handler: RouteHandler) {
  return __createRoute('get', handler);
}

export function createPostRoute(handler: RouteHandler) {
  return __createRoute('post', handler);
}
