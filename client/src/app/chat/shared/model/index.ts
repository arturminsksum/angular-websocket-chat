export interface User {
  id?: number;
  name?: string;
  avatar?: string;
}

export enum Action {
  JOINED,
  LEFT,
  RENAME,
}

export enum Event {
  CONNECT = 'connect',
  DISCONNECT = 'disconnect',
}

export interface Message {
  from?: User;
  connect?: any;
  action?: Action;
}
