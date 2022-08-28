# Description
The "chat-room-history" is a .NET Core + React solution for displaying the log history of a chat room. 

# Installation & execution
Open the root folder on a terminal and install the packages via NPM with the following command:
> npm install

This will install the Azure Static Web App CLI in the root folder, necessary for running both the API and the React client together, as well as all the necessary packages for the [_web client_](#client) project.

To run the API and the client locally together, execute the SWA CLI _start_ command in the root folder:
> swa start

Wait for the terminal to notify that the Azure Static Web Apps emulator is started. You can then access the project at:
> http://localhost:4280/

If you only want to access the web client, you can do it by opening:
> http://localhost:3000

If you only want to access the API, you can do it by opening:
> http://localhost:7071

Note:
It may be that your local machine throws an error when executing the _swa start_ command regarding a digital signature. You can solve this by running the following command first:
> Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass

# Structure
The solution has three projects and a _.github/workflows_ folder, which contains the pipeline for continous integration.

## API
The API is an Azure Functions project. It has a [_data/chatLog.json_](https://github.com/brunoccst/chat-room-history/tree/main/API/data) file, which is the file used as a data source for the whole application. This file is included in the project's assembly as an embedded resource and it's preloaded when the project starts (at [_Startup.cs_](https://github.com/brunoccst/chat-room-history/blob/main/API/Startup.cs)). The preloaded data is injected as a dependency to the solution so the [domain](#domain) can access it without the need of explicitly receiving it from the API.

This project exposes functions that can be called by HTTP requests (made by the [web client](#client)). These functions calls the [domain](#domain) methods to process the preloaded data source and returns the processed data to the request caller.

## Client
A React app for displaying the chat log data. It makes HTTP requests to the [API](#api) and displays it accordingly.

### Features

#### Granularity

The user is able to switch the granularity of the data.
For example, if the granularity "minute by minute" is selected, the data shown looks like this:
* 5pm: Bob enters the room
* 5:05pm: Kate enters the room
* 5:15pm: Bob comments: "Hey, Kate"
* 6pm: Kate comments: "Hey, Bob"

If the granularity is "hourly", the data is agreggated accordingly and is shown like this:
* 5pm:
* * 2 people entered the room
* * 1 comment
* 6pm:
* * 1 comment

## Domain
The Domain is a basic .NET class library project responsible for executing logic in a given data source, returning it in the correct order, agreggation or any other processing required.

### Types of messages
There are four types of messages:

* User entered the chat room (_enter-the-room_);
* User commented something (_comment_);
* User high fived another user in the same room (_high-five-another-user_);
* User left the chat room (_leave-the-room_).