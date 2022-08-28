# Description
The "chat-room-history" is a .NET Core + React solution for displaying the log history of a chat room. 

# Installation 
Open the root folder on a terminal and install the packages via NPM. This will install the SWA CLI, necessary for running both the API and the React client together:
> npm install

Do the same at the _client_ project. It will install all necessary packages for the React app:
> npm install

Finally, navigate back to the root folder and execute the SWA CLI _start_ command to run the Azure Static Web App locally:
> swa start

Note:
It may be that your local machine throws an error when executing the _swa start_ command regarding a digital signature. You can solve this by running the following command first:
> Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass

You can then access the project at:
> http://localhost:4280/

# Structure
The solution has three projects and a _.github/workflows_ folder, which contains the pipeline for continous integration.

## API
The API is an Azure Functions project. It is the connection between the [web client](#client) and the data/data logic. The web client makes HTTP requests to the Azure Functions, which then executes the necessary methods in the DataAccess project to get and process the required data and returns it to the web client.

## Client

## Domain

# Types of messages
There are four types of messages:

* User entered the chat room (_enter-the-room_);
* User commented something (_comment_);
* User high fived another user in the same room (_high-five-another-user_);
* User left the chat room (_leave-the-room_).