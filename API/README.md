# Description
The API is an Azure Functions project. It exposes functions that can be called by HTTP requests and returns data. It has a predefined set of data at _data/chatLog.js_, which is  preloaded on the start of the project. The preloaded data is injected as a dependency to the solution and it is used in the Domain methods calls to process it according to the requested Azure function.

# Technology
This project uses .NET 6.0 and C# 10.0.