# Bitasmbl-Lightweight-Chat-App-f993d3-Nodar_Mebunia

## Description
Build a web application that allows users to join anonymous chatrooms and exchange messages in real-time using WebSockets. The focus is on fast communication, simple interface, and responsive updates without requiring user registration.

## Tech Stack
- React
- Node.js
- Socket.IO

## Requirements
- Gracefully handle disconnected users and reconnections
- Allow users to join chatrooms without authentication
- Send and receive messages in real-time using WebSockets
- Display messages with timestamps and user identifiers (anonymous)
- Handle multiple chatrooms simultaneously

## Installation
Follow these steps to set up the project locally. This guide assumes a repository structure with a backend (Node.js + Socket.IO) and a frontend (React) directories named `server` and `client` respectively.

1. Clone the repository:

   git clone https://github.com/MrBitasmblTester/Bitasmbl-Lightweight-Chat-App-f993d3-Nodar_Mebunia.git

2. Change into the project directory:

   cd Bitasmbl-Lightweight-Chat-App-f993d3-Nodar_Mebunia

3. Install backend dependencies (Node.js + Socket.IO):

   cd server
   npm install

4. Install frontend dependencies (React + Socket.IO client):

   cd ../client
   npm install

Note: Ensure Node.js and npm are installed on your machine before running the above commands.

## Usage
Start the backend server and the frontend development server in separate terminals.

1. Start the backend (server):

   cd server
   npm start

   - Typical backend default: http://localhost:5000 (depending on server configuration)

2. Start the frontend (client):

   cd client
   npm start

   - Typical frontend default: http://localhost:3000

3. Open the frontend URL in a browser. The React client will connect to the Node.js backend via Socket.IO to join chatrooms and exchange messages in real-time.

## Implementation Steps
1. Initialize the Node.js backend:
   - Create a package.json and install express and socket.io.
   - Create an entry file (e.g., server.js) to start an HTTP server and attach Socket.IO.

2. Implement a simple health endpoint (optional) on the backend to verify server status.

3. Implement Socket.IO connection handling on the backend:
   - Listen for client connections.
   - Provide handlers for events such as `joinRoom`, `leaveRoom`, and `message`.
   - Use Socket.IO rooms to manage multiple chatrooms simultaneously.

4. Message payload structure:
   - Ensure each message includes: room identifier, anonymous user identifier, message text, and a timestamp generated on the server.
   - Broadcast messages to the specific room so only room members receive them.

5. Handle anonymous user identifiers:
   - On client connect, generate a short anonymous identifier (e.g., random string) and include it with messages.
   - The identifier may be generated per session; store it in the client session state (or local storage) to persist across reconnections if desired.

6. Graceful disconnects and reconnections:
   - Rely on Socket.IO's built-in reconnection behavior to reconnect clients automatically.
   - On reconnection, have the client re-emit `joinRoom` events for rooms it was previously in so the server can restore room membership.
   - On server detect disconnects and optionally broadcast presence updates to remaining users in a room.

7. Implement the React frontend:
   - Create a minimal UI to list/join chatrooms (input a room name or select from a list), show message history for the joined room, and send messages.
   - Connect to the backend using the Socket.IO client library.
   - Listen for incoming messages and update the UI in real-time.
   - Display each message with its timestamp and the anonymous user identifier.

8. Support multiple chatrooms simultaneously on the client:
   - Allow the user to switch between rooms or open multiple room views.
   - Track active room subscriptions and ensure Socket.IO joins/leaves the correct rooms.

9. Ensure timestamps and ordering:
   - Prefer server-generated timestamps to keep a consistent timeline across clients.
   - Render message timestamps in the UI in a readable format.

10. Testing and verification:
   - Test connecting multiple browser tabs or devices to the same room to verify real-time delivery.
   - Test joining different rooms to verify isolation of messages between rooms.
   - Test disconnect and reconnection flows to ensure the client rejoins rooms and receives missed messages as designed.

## API Endpoints (Optional)
- GET /health
  - Method: GET
  - Very short description: Returns a simple status to confirm the backend server is running.

- Socket.IO (WebSocket) connection
  - Method: WebSocket (Socket.IO)
  - Very short description: Main real-time channel. Events such as `joinRoom`, `leaveRoom`, and `message` are exchanged over this connection to manage rooms and deliver messages.