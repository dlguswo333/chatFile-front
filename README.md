# chatFile
![logo192.png](/img/logo192.png)
<br>

![front_1.png](/img/front_1.png)
<br>

**chatFile** has been made and will be made to communicate with your friends or yourself with *ease*.  
**chatFile** aims to help chat with files as well as texts.  
<br>

**chatFile** has the following features:
<br>
* Chat with texts.
* Share files.
* Authorization e.g. sign up, sign in, and sign out.
* Store user ids and passwords. Passwords are stored being encrypted.
* Remember client sessions.
* Show connected client list.
* Show toast messages.
<br>

The repository you are seeing is the front-end side repository.  

You can find the back-end side Github repository at [here](https://github.com/dlguswo333/chatFile_back).  

# How to Install chatFile
  1. Download the front-end and back-end repositories.
  2. Go to the directory of the back-end and start it by typing:
  ```bash
  npm start
  ```
  3. Likewise, go to the directory of the front-end and start it by typing:
  ```bash
  npm start
  ```
  or build into production and serve them on any web service framwork you like. one example is ``serve`` in npm.
  4. The front-end will communicate automatically if any client accesses the web page.

# chatFile (Front-end side)
**chatFile** front-end side will display clients the interactive, real-time chats and let them type in what they want.
## Dependencies
**chatFile** front-end side is powered with the following dependencies:
  1. [React](https://reactjs.org/)
    <br>
    to design web interactive UI.
  2. [socket.io-client](https://socket.io/)
    <br>
    to synchronize client's chat and server's chat real-time.
  3. [axios](https://github.com/axios/axios)
    <br>
    to send and receive data with back-end side.
<br>

... and many other great modules!

## Version History
### 0.1.0
  ✅ Add client list
  <br>
  ✅ Add SQLite database to store user informations
  <br>
  ✅ Add sign up feature
  <br>
  ✅ Add sign in feature
  <br>
  ✅ Add chat with file feature
  <br>
  ✅ Add chat with text feature
<br>

**chatFile** logos were generated from https://favicon.io/.