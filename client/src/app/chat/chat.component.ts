import { Component, OnInit } from '@angular/core';

import { Action, User, Message, Event } from './shared/model';
import { SocketService } from './shared/services/socket.service';
import { Subscription } from 'rxjs';

const AVATAR_URL = 'https://api.adorable.io/avatars/285';

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
    this.initModel();
    this.sendNotification(Action.JOINED);
  }

  private getRandomId(): number {
    return Math.floor(Math.random() * 1000000) + 1;
  }

  private initModel(): void {
    const randomId = this.getRandomId();
    this.user = {
      id: randomId,
      name: `user${Date.now()}`,
      avatar: `${AVATAR_URL}/${randomId}.png`,
    };
  }

  private initIoConnection(): void {
    this.socketService.initSocket();

    this.ioConnection = this.socketService.onMessage().subscribe((message: Message) => {
      this.messages.push(message);
    });

    this.socketService.onEvent(Event.CONNECT).subscribe(() => console.log('connected'));

    this.socketService.onEvent(Event.DISCONNECT).subscribe(() => console.log('disconnected'));
  }

  sendMessage(message: string): void {
    if (!message) {
      return;
    }

    this.socketService.send({
      from: this.user,
      content: message,
    });

    this.messageContent = null;
  }

  sendNotification(action: Action): void {
    let message: Message;

    if (action === Action.JOINED) {
      message = {
        from: this.user,
        action: action,
      };
    }

    this.socketService.send(message);
  }
}
