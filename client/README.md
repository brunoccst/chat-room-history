# Description
A React app for displaying the chat log data. It makes HTTP requests to the API and displays it accordingly to the user.

# Technology
This project uses React 18.2.0 and Typescript 4.8.2.

# Features

## Granularity

The user is able to switch the granularity of the data.
For example, if the granularity "minute by minute" is selected, the data shown looks like this:
* 5pm: Bob enters the room
* 5:05pm: Kate enters the room
* 5:15pm: Bob comments: "Hey, Kate"
* 6pm: Kate comments: "Hey, Bob"

If the granularity is "hourly", the data is agreggated accordingly and is shown like this:
* 5pm:
  * 2 people entered the room
  * 1 comment
* 6pm:
  * 1 comment
