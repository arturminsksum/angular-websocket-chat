import { createServer, Server } from 'http';
import * as express from 'express';
import * as socketIO from 'socket.io';

import { Message } from './model';

export class ChatServer {
  public static readonly PORT: number = 8080;
  private app: express.Application;
  private server: Server;
  private io: socketIO.Server;
  private port: string | number;
}
