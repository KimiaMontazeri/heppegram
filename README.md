# Heppegram
This project is a real-time chat application built using `Go` for the backend, `React` for the frontend, `WebSocket` protocol for real-time messaging, `GORM` for database management, 
and `Echo` for handling HTTP requests. The application allows users to engage in private conversations, store unread messages, and view the 
online/offline status of other users.

![Home Page](/screenshots/1.png)

## Features
- Private Real-Time Messaging: Users can exchange private messages in real-time using WebSocket protocol, enabling instant communication.
- Unread Messages Storage: The application stores unread messages for each chat, ensuring users can catch up on conversations they may have missed.
- Online/Offline Status: Users can see the online or offline status of other users, providing visibility into their availability for communication.
- Deleting chats and messages

## Future Features
- Read Receipt: notify users when their messages have been read by the recipient.
- Typing Indicator: add functionality to show when a user is typing a message, enhancing the user experience and indicating active communication.
- File Sharing: enable users to send files such as images, documents, or multimedia files during chat sessions, expanding the range of communication possibilities.

# Run 
```
docker-compose up --build
cd front/
npm i
npm run dev
```

