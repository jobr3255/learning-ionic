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
