# video-streaming
Local Video Streaming implemented in NodeJS

## Introduction
This is an ***NodeJS*** program that acts like a video streaming service in a Local Area Network (LAN). You can view videos from a server/computer in any device connected to the network without downloading them.

## Why Video Stream Instead of a simple HTTP Server ?
The problem with http server is that in *some devices* you will have to see the video from start to the end there isn't a option to go forward/backward whereas a video streaming service like this allows those things

## Whats different in Video Streaming Service and Simple HTTP server
Not much just some additional headers that allows browsers to get portion of the content.

## How to Run the Service
1. Copy the files in the folder whose files you want to stream
2. Open Command Line or Terminal in the folder where the files are copied
3. Run the following command
```bash  
  node stream.js
```
4. The server will run on port 8124

![Example Output of Running the Script](https://github.com/satanic-devil/output-files/blob/main/video-streaming-cmd.png?raw=true)

## How to view the files
1. Open browser in any device connected to the network
2. You will need to get the IP Address of the Computer/Server running the script.
3. Enter the IP Address in the browser followed by ***":8124"*** 
```bash
  computer_ip:8124
```
Example: 192.168.55.28:8124
![Example Output of accessing the service in browser](https://github.com/satanic-devil/output-files/blob/main/video-streaming-browser-1.png?raw=true)
![Example Output of playing any video in browser](https://github.com/satanic-devil/output-files/blob/main/video-streaming-broswer-video.png?raw=true)

## Problems
The service will only stream MP4 files.
