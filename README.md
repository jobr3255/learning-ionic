# learning-ionic

## Getting Started

Fork the repo and clone it to your machine. Make sure to install all of the prerequisites

## Prerequisites
* node.js
* Ionic
* Cordova

##### Android development prerequisites
* Java JDK
* Android SDK

## Installing

Before installing anything, update your computer.
```
$ sudo apt-get update
```

#### Node.js and npm
```
$ sudo apt-get install nodejs
$ sudo apt-get install npm
```

#### Ionic
```
$ npm install -g ionic
```

#### Cordova
```
$ npm install -g cordova
```

## Setting up Android
These are only needed for Android development and deployment.
#### Android SDK

1. Download Android Studio from [here](https://developer.android.com/studio/)
	1. Choose standard for the installation type and Finish
	2. Open Android Studio and go to File -> Settings -> System Settings -> SDK Tools and install Google USB Driver
2. Set the ANDROID_HOME variable to the location where your android sdk is located. For me (working in ubuntu virtual environment) it was in /home/user/Android/Sdk
```
$ export ANDROID_HOME=/home/user/Android/Sdk
```
3. Now add the tools and platform tools to your path
```
$ export PATH=$ANDROID_HOME/platform-tools:$ANDROID_HOME/tools:$PATH
```
You can check your path variable with
```
$ echo $PATH
```

#### Java JDK
1. First update your package index
```
$ sudo apt-get update
```
2. Next install the Java Runtime Environment
```
$ sudo apt-get install default-jre
```
3. Now install the JDK
```
$ sudo apt-get install default-jdk
```
4. Set the JAVA_HOME path variable. Mine was located at /usr/lib/jvm/java-8-oracle
```
$ export JAVA_HOME=/usr/lib/jvm/java-8-oracle
```
To check if the environment paths are set up correctly run these
```
$ echo $JAVA_HOME
$ echo $ANDROID_HOME
```

#### Putting your Android device in developer mode
1. Go to your settings
2. Scroll all the way to the bottom and tap on About Phone
3. Repeatedly tap on Build Number until your phone is in developer mode
4. Go back to settings, you should now have a new option called Developer options
5. Go into Developer options and make sure that USB debugging is turned on. I also have OEM unlocking turned on but I don’t think you need it.

## Starting a project

In a different directory run this command to produce a prebuilt Ionic tutorial project
```
$ ionic start MyIonicProjectName tutorial --type=ionic-angular
```
Now move into that directory and run the application.
```
$ cd MyIonicProject/
$ ionic serve
```
Ionic will automatically open the application in your browser. Go ahead and look around to see what's provided by the tutorial. We will be starting from a blank project and adding everything ourselves.

Return to your terminal and stop the tutorial application with Ctrl+C. Now move back into the learning-ionic/ directory. Start this application and see what we have to start off with.

### Running the project

Currently we start the application with `ionic serve` but there are more ways to run the application. Running with `ionic serve` will automatically run the application in the browser but we can specify what platform we want to run it on.

First we need to add what platform we want to run on. We'll just add browser for now but you can also add `android` and `ios`.
```
ionic cordova platform add browser
```
Now run the application
```
ionic cordova run browser
```
As you can see, Ionic will behave that same as running `ionic serve`

### Working with Ionic
Now it's time to start building an application in Ionic.








## Android Development

### Running the code on Android

Before you can run the code you have to make sure you have an android device and that it's in developer mode.

Add the Android platform to the application
```
ionic cordova platform add android
```
The run command will automatically run the compile and build commands before running
```
$ ionic cordova run android
```
You can separately compile and build the application with these commands
```
$ ionic cordova compile android
$ ionic cordova build android
```

#### Run with logs

In order to run the application while being able to view the logs you can try running it normally with the capture logs flag
```
$ ionic cordova run android -c
```
But I never got it to work, there was always a connection error.

The way around it is to run
```
$ adb logcat
```
By doing so you'll get every log from everything on the device, to narrow down the logs to just be from the application run
```
$ adb logcat SystemWebChromeClient:D *:S
```
