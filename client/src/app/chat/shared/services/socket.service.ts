import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

import * as socketIO from 'socket.io-client';

const SERVER_URL = 'http://localhost:8080';
@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket;

  initSocket(): void {
    this.socket = socketIO(SERVER_URL);
  }
}
