export interface User {
  id?: number;
  name?: string;
  avatar?: string;
}

export enum Action {
  JOINED,
  LEFT,
}

export enum Event {
  CONNECT = 'connect',
  DISCONNECT = 'disconnect',
}

export interface Message {
  from?: User;
  content?: any;
  action?: Action;
}
