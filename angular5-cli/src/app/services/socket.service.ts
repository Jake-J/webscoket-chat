import { Injectable } from '@angular/core';
import * as SockJs from "sockjs-client";
import * as Stomp from "stompjs";

@Injectable()
export class SocketService {

  constructor() { }

  public connectSocket() {

    let socket = new SockJs('http://localhost:8080/chat-messaging');
    let stompClient = Stomp.over(socket);

    //console.log( socket)
    
    return stompClient;
    
  }
}
