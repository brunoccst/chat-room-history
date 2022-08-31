# Description
The DataAccess is a basic .NET class library project responsible for executing logic in a given data source, returning it in the correct order, agreggation or any other processing required.

# Technology
This project uses .NET 6.0 and C# 10.0.

# Types of messages
There are four types of messages:

* User entered the chat room (_enter-the-room_);
* User commented something (_comment_);
* User high fived another user in the same room (_high-five-another-user_);
* User left the chat room (_leave-the-room_).

# Class map
The smallest unit is the `ChatEvent`, which represents each chat event got from the data source.

Objects of `ChatEvent` type can be grouped by their `Timestamp` and `EventType`, becoming the `ChatEventGroup` class. Each `ChatEventGroup` has the respective `Timestamp`, `EventType` and the list of `ChatEvent`.
A `ChatEventGroup` is the most outer class of the domain logic and a list of it is returned by the main service `ChatEventService`.