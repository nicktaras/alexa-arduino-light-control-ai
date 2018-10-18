# alexa-arduino-light-control-ai
A small proof of concept project to connect the Arduino to Alexa audio commands.

## Project Technology

Alexa
Lambda
API Gateway
IAM Permissions / Roles
Arduino UNO
USB serial communication for initial app 
NODE JS as middleware from AWS to Serial

## Project Parts

A: Alexa + Lamda (receive intents and request to update database)

e.g.

Emit from Alexa's Lambda function:

{
   light: 'on'
}

B: Middleware node js server to send information to serial.

e.g.

Send serial data to Arduino: '1' or '0'

C: Handle serial data inside arduino program.

e.g.

if (Serial.read() == '1') {
  digitalWrite(led, HIGH);
}

## Project goals (Part 1)

This project will demonstrate how an arduino can be connected to Alexa and the related AWS services to provide a way to control electronic components. 

- Build an interface with Alexa and services
- Create a method to send Serial data to Arduino (Lambda enpoint to serial data)
- Seamlessly interact with Alexa to control the component using ON / OFF as commands to control the light

## Project goals (Part 2)

- Create a way to allow for the application to become smarter. 
- Include a light sensor
- Add logic to turn the light on and off when light / dark 
- Apply the users perferences to override the initial settings e.g. maybe they don't want the lights on at night on Monday, perhaps they like the lights to come on an hour after sunset. 

## DEV notes

Screen can be used to talk to the serial port via the terminal - screen /dev/ttyS0 19200
https://www.npmjs.com/package/serialport - popular serial port node library

![alt text](https://github.com/nicktaras/alexa-arduino-light-control-ai/blob/master/img/Screen%20Shot%202018-10-18%20at%2020.30.40.png?raw=true)

