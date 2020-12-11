# `Overview` 
Red Rhinoceros project is a teleconferencing service developed using the WebRTC platform.

# `Features`

## `User Management`
This feature would allow registered users to create a video conference room. Unregistered users cannot create rooms, but they can use an temporary name to join a meeting created by other registered users using room number on the up-left in the meeting room.

## `Room Entry` 
For user logged in, click 'CREATE' to create room with automatically assigned ID or click 'JOIN' and input a room ID to join an exsiting room. For temporary user, input name and room ID to join an existing room.

## `Video Conference` 
The core video conference feature is developed using the WebRTC platform. One advantage about WebRTC is that it would provide an multi-platform video conference function without any installation needed. This is a basic implementation of WebRTC combined with socket.io, constructed a client-server project with peer-to-peer video connection. 

## `Screen Share` 
The feature introduced a convenience way to share screen with others in the same room. This feature uses the build in media-device selection function to get the media-stream and uses peer connection switch function to send stream to the other end of the peer connection.
This feature current alows one screen share at time across the whole service. 
TODO: upgrade the screen share function to allow one screen share for one room instead of the whole service. 

## `Mute/Unmute` 
This feature allows the current user to mute self so that users on the other end of peer connection does not hear current user's voice.

## `Whiteboard`
This feature help user share their idea in the real time. There is a canvas on the right side of main video player. User can use the mouse to click and draw on the canvas. Each stroke would be shared to other clients in real time and stored in the server for the clients who join in lately. And there is a button whose name is clear. Once one of users press this button, the whiteboard in the meeting room will be cleared to a blank whiteboard.

## `Invite` 
The invite feature is complete, the function of it is to copy a certain url and ID to clipboard for the users to paste to the browser.

## `Chat` 
In conference room, click 'Chat' button to display chat panel to receive and send messages to users in the same room. If chat panel is invisible, new message will been shown in a pop-up notification window.

## `Hands up` 
This feature enable muted users send a notification to all members in the same room. The host would receive a notification with an "confirm" button, then decide whether to unmute this user in 5 seconds. Other members in this meeting would just receive a notification and they can click on the notification to ignore the message or just leave it to close automatically.

While we do not have a public domain yet, the function copy a static url, the url is not yet going to work. 

# `how to run the project`
In the project directory, you can run: <br/>

yarn install <br />
yarn build <br />
node server/server.js <br />
npm is also accepted 

Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

## `Access from WAN`
For users in the WAN can access this web app, the Ngrok can be used for this feature.

Follow the steps on the [download](https://ngrok.com/download)  page of Ngrok website to set up the Ngrok service. 
Because we set the server listen the port of 8080, in the last step you should use ./ngrok http 8080 instead of ./ngrok http 80.

## `Make sure you have Internet access`
database is on the cloud, so please confirm that you can access Internet when test our program.
