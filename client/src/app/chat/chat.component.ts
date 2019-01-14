import { Component, OnInit } from '@angular/core';

import { Action, User, Message, Event } from './shared/model';
import { SocketService } from './shared/services/socket.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'tcc-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  action = Action;
  user: User;
  messages: Message[] = [];
  messageContent: string;
  ioConnection: Subscription;

  constructor(private socketService: SocketService) {}

  ngOnInit(): void {
    this.initIoConnection();
  }

  private initIoConnection(): void {
    this.socketService.initSocket();

    this.ioConnection = this.socketService.onMessage().subscribe((message: Message) => {
      this.messages.push(message);
    });

    this.socketService.onEvent(Event.CONNECT).subscribe(() => console.log('connected'));

    this.socketService.onEvent(Event.DISCONNECT).subscribe(() => console.log('disconnected'));
  }
}
