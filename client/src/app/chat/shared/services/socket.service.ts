import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import * as socketIO from 'socket.io-client';
import { Message, Event } from '../model';

const SERVER_URL = 'http://localhost:8080';
@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket;

  initSocket(): void {
    this.socket = socketIO(SERVER_URL);
  }

  send(message: Message): void {
    this.socket.emit('message', message);
  }

  onMessage(): Observable<Message> {
    return new Observable<Message>(observer => {
      this.socket.on('message', (data: Message) => observer.next(data));
    });
  }

  onEvent(event: Event): Observable<any> {
    return new Observable<Event>(observer => {
      this.socket.on(event, () => observer.next());
    });
  }
}
