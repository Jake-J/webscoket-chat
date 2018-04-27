import { Component } from '@angular/core';
import { SocketService } from "./services/socket.service"
import {Message} from "./models/message"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {


  messagesList: Message[] = [{"from":"raz","message":"seassesassesassesassesssesas","time":"14:46"}];
  name: String;
  messageText: String;
  stompClient;

  constructor(private socketService: SocketService) { }

  startConnection(userName){

    this.name = userName.value;
    this.stompClient = this.socketService.connectSocket();
    const stompClient = this.stompClient;
  
    
    stompClient.connect({}, frame => {
        stompClient.subscribe('/chat/messages', response => {
          const data = JSON.parse(response.body);

          this.messagesList.push(data);
          console.log(data);
        })
    });
    
  }
  stopConnection(){
    this.stompClient.disconnect();
  }
  sendMessage(){
    this.stompClient.send("/app/message", {}, JSON.stringify({'message': this.messageText,'from':this.name}));
  }

}
