# learning-ionic

## Getting Started

Get a copy of the repo and make sure you have installed all of the prerequisites

```
$ git clone https://github.com/jobr3255/learning-ionic.git
```

### Prerequisites

In order to run everything correctly you have to make sure you have the following installed
* Git
* node.js
* Java JDK
* Android SDK
* Ionic
* Cordova

You can check if you have any of the programs installed using
```
$ nodejs -v
```
For git it's
```
$ git --version
```
To check if the environment paths are set up correctly run these
```
$ echo $JAVA_HOME
$ echo $ANDROID_HOME
```

### Installing ###

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

#### Node.js and npm
1. Run these two commands
```
$ sudo apt-get update
$ sudo apt-get install nodejs
```
2. Now you install npm
```
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

#### Putting your Android device in developer mode
1. Go to your settings
2. Scroll all the way to the bottom and tap on About Phone
3. Repeatedly tap on Build Number until your phone is in developer mode
4. Go back to settings, you should now have a new option called Developer options
5. Go into Developer options and make sure that USB debugging is turned on. I also have OEM unlocking turned on but I don’t think you need it.

## Starting a project


```
$ ionic start MyIonicProjectName tutorial --type=ionic-angular
```

## Running the code in browser

The run command will automatically run the compile and build commands before running
```
$ ionic cordova run browser
```

You can separately compile and build the application with these commands
```
$ ionic cordova compile browser
$ ionic cordova build browser
```

## Running the code on Android

Before you can run the code you have to make sure you have an android device and that it's in developer mode.

The run command will automatically run the compile and build commands before running
```
$ ionic cordova run android
```
Note that when you first run the application after cloning the repo that it will ask you if you want to install the project dependencies and you have to say yes.

You can seperately compile and build the application with these commands
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
