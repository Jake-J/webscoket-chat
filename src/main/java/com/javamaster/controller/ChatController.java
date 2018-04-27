package com.javamaster.controller;

import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import com.javamaster.domain.Message;

@Controller
public class ChatController {

	@MessageMapping("/message")
	@SendTo("/chat/messages")
	public Message getMessages(Message message) {
		//System.out.println(message);
		String time = new SimpleDateFormat("HH:mm").format(new Date());
		return new Message(message.getFrom(),message.getMessage(),time);
	}
//	public Message getMessages(Message message) {
//		System.out.println(message);
//		return message;
//	}
}
