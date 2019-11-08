# Android Development

Time to setup running the application on an android. This'll probably be harder.


- [Prerequisites](#prerequisites)
	- [Android SDK](#android-sdk)
	  - [Setting Android path variables](#setting-android-path-variables)
	  - [Accepting Android licenses](#accepting-android-licenses)
	 - [Java JDK](#java-jdk)
		 - [Installing Java 1.8](#installing-java-1.8)
		 - [Completely removing Java](#completely-removing-java)
	 - [Gradle](#gradle)
- [Android emulator](#android-emulator)
	- [Creating an Android Virtual Device](#creating-an-android-virtual-device)
	- [AVD fix](#avd-fix)
- [Running the code with Ionic on an Android device](#running-the-code-with-ionic-on-an-android-device)
	- [Add Android platform to Ionic](#add-android-platform-to-ionic)
	- [Putting your Android device in developer mode](#putting-your-android-device-in-developer-mode)
	- [Sending to physical Android device](#sending-to-physical-android-device)
	- [Sending to virtual Android device](#sending-to-virtual-android-device)
	- [Run with logs](#run-with-logs)

## Prerequisites
* Android SDK
* Java 1.8
* Gradle

### Android SDK
The easiest way to get the Android SDK is by downloading Android Studio. Alternatively you can just download the SDK but it will be easier to setup with Android Studio.

1. Download Android Studio from [here](https://developer.android.com/studio/) or use Ubuntu's software manager.

**Note for Windows users:** The Google USB Driver is required for Windows if you want to perform adb debugging with Google devices. Follow the steps [here](https://developer.android.com/studio/run/win-usb) to download and install the driver if you do not see it as an option in the SDK manager.
1. Open Android Studio and in the bottom right hand corner, click the Configure button and open up the SDK Manager.

![Configure settings](images/configure.png?raw=true)

2. Go to the SDK Tools tab.

![SDK tools](images/sdk-tools.png?raw=true)

3. Select the Google USB Driver and apply the changes.

#### Setting Android path variables
Now we need to set the Android sdk path variable that Ionic uses.
1. First locate where your Android sdk was installed. For me, working in ubuntu, it was in /home/$USER/Android/Sdk.
2. Set the ANDROID_SDK_ROOT variable to the location where your android sdk is located. Then update the PATH variable.
```
$ export ANDROID_SDK_ROOT=/home/$USER/Android/Sdk
$ export PATH=$ANDROID_SDK_ROOT/platform-tools:$ANDROID_SDK_ROOT/tools:$PATH
```
3. This will only work in the current terminal and will not be reflected in other tabs or windows and will not be set after restart, so we need to make these variables automatically set on boot. First create this file:
```
$ sudo nano /etc/profile.d/android.sh
```
4. These lines will export the variables, make sure the path to your sdk is correct.
```
export ANDROID_SDK_ROOT=/home/$USER/Android/Sdk
export PATH=$ANDROID_SDK_ROOT/platform-tools:$ANDROID_SDK_ROOT/tools:$PATH
```
5. Make the script executable by issuing the following chmod command:
```
$ sudo chmod +x /etc/profile.d/android.sh
```
6. Load the environment variables using the source command:
```
$ source /etc/profile.d/android.sh
```
7. Restart your computer and check that the path has been correctly set.
```
$ echo $PATH
```

#### Accepting Android licenses
Before we are able to run the application we have to accept the Android licenses.
1. The easiest way to accept the licenses will be to use the sdkmanager from the command line. First make sure your Android path variable is setup correctly.
```
$ echo $ANDROID_SDK_ROOT
```
This should output something like `/home/USER/Android/Sdk`, if nothing is output you will need to make sure that variable is setup.
2. Now run this sdkmanager command to accept the licenses:
```
$ $ANDROID_SDK_ROOT/tools/bin/sdkmanager --licenses
```
Just accept all the licenses.

### Java JDK

This part will be the hard part as Ionic will only run with Java 1.8, 1.11 did not work for me.

#### Installing Java 1.8
https://www.oracle.com/technetwork/java/javase/downloads/java-archive-javase8-2177648.html

1. Download the latest JAVA 8 SE development kit from here: https://www.oracle.com/technetwork/java/javase/downloads/java-archive-javase8-2177648.html
2. Make the directory where we will install Java
```
$ mkdir /opt/jdk.
```
3. Untar Java in your new folder.
```
$ tar -zxf jdk-8u202-linux-x64.tar.gz -C /opt/jdk.
```
4. Set oracle JDK as the default JVM by running these two instructions:
```
$ update-alternatives --install /usr/bin/java java /opt/jdk/jdk1.8.0_<YourVersion>/bin/java 100
$ update-alternatives --install /usr/bin/javac javac /opt/jdk/jdk1.8.0_<YourVersion>/bin/javac 100
```
You can check the result by running `java -version`, you should see some output that looks like this:
```
java version "1.8.0_202"
Java(TM) SE Runtime Environment (build 1.8.0_202-b08)
Java HotSpot(TM) 64-Bit Server VM (build 25.202-b08, mixed mode)
```
If your version of Java is not 1.8 you will have to follow the steps to completely remove Java and then reinstall 1.8.

#### Completely removing Java
This will help completely remove all Java instances from your computer.
1. Remove all the Java related packages (Sun, Oracle, OpenJDK, IcedTea plugins, GIJ):
```
$ dpkg-query -W -f='${binary:Package}\n' | grep -E -e '^(ia32-)?(sun|oracle)-java' -e '^openjdk-' -e '^icedtea' -e '^(default|gcj)-j(re|dk)' -e '^gcj-(.*)-j(re|dk)' -e '^java-common' | xargs sudo apt-get -y remove
$ sudo apt-get -y autoremove
```
2. Purge config files (careful. This command removed libsgutils2-2 and virtualbox config files too):
```
$ dpkg -l | grep ^rc | awk '{print($2)}' | xargs sudo apt-get -y purge
```
3. Remove Java config and cache directory:
```
$ sudo bash -c 'ls -d /home/*/.java' | xargs sudo rm -rf
```
4. Remove manually installed JVMs:
```
$ sudo rm -rf /usr/lib/jvm/*
```
5. Remove Java entries, if there is still any, from the alternatives:
```
$ for g in ControlPanel java java_vm javaws jcontrol jexec keytool mozilla-javaplugin.so orbd pack200 policytool rmid rmiregistry servertool tnameserv unpack200 appletviewer apt extcheck HtmlConverter idlj jar jarsigner javac javadoc javah javap jconsole jdb jhat jinfo jmap jps jrunscript jsadebugd jstack jstat jstatd native2ascii rmic schemagen serialver wsgen wsimport xjc xulrunner-1.9-javaplugin.so; do sudo update-alternatives --remove-all $g; done
```
6. Search for possible remaining Java directories:
```
$ sudo updatedb
$ sudo locate -b '\pack200'
```
If the command above produces any output like `/path/to/jre1.6.0_34/bin/pack200` remove the directory that is parent of bin, like this:
```
$ sudo rm -rf /path/to/jre1.6.0_34
```

### Gradle
We need to install Gradle in order to run the application.

1. Start by downloading the Gradle Binary-only zip file in the /tmp directory using the following wget command:
```
$ wget https://services.gradle.org/distributions/gradle-5.0-bin.zip -P /tmp
```
2. Once the download is completed, extract the zip file in the /opt/gradle directory:
```
$ sudo unzip -d /opt/gradle /tmp/gradle-*.zip
```
Verify that the Gradle files are extracted by listing the /opt/gradle/gradle-5.0 directory:
```
$ ls /opt/gradle/gradle-5.0
```
3. Next, we’ll need to configure the PATH environment variable to include the Gradle bin directory. To do so, open your text editor and create a new file named gradle.sh inside of the /etc/profile.d/ directory.
```
$ sudo nano /etc/profile.d/gradle.sh
```
4. Paste the following configuration:
```
export GRADLE_HOME=/opt/gradle/gradle-5.0
export PATH=${GRADLE_HOME}/bin:${PATH}
```
5. Make the script executable.
```
$ sudo chmod +x /etc/profile.d/gradle.sh
```
6. Load the environment variables.
```
$ source /etc/profile.d/gradle.sh
```
Verify the Gradle installation
```
$ gradle -v
```
These variables will be applied on startup.

## Android emulator
If you're running a virtual machine this probably won't work for you as most VMs don't support virtualization within a virtual machine.

### Creating an Android Virtual Device
1. Open Android Studio and in the bottom right hand corner, click the Configure button and open up the AVD Manager.

![Configure settings](images/configure.png?raw=true)

2. Click on Create Virtual Device and follow the steps to create a virtual device.

### AVD fix
If you get an error when in the Virtual Device Configuration menu for a virtual device that complains about `.android/avd` you will need to apply this fix.
**Note: Ubuntu and Linux Mint need to run `sudo apt install qemu-kvm` first**

1. If `/dev/kvm` does not exist for you, you will need to create it first.
```
$ mkdir -p $HOME/.android/avd
```
2. Check the ownership of /dev/kvm.
```
$ ls -al /dev/kvm
```
3. The user should be root and the group kvm. Check which users are in the kvm group.
```
$ grep kvm /etc/group
```
This should produce some output like
```
kvm:x:some_number:
```
4. Now let's add your user to the group
```
$ sudo adduser $USER kvm
```
Restart to reflect these changes.


## Running the code with Ionic on an Android device

### Add Android platform to Ionic
First we need to actually have out application be able to build and run on an Android platform, so be add it using:
```
$ ionic cordova platform add android
```

### Putting your Android device in developer mode
You need to have your Android device in developer mode if you want to send the application to a physical device.
1. Go to your settings
2. Scroll all the way to the bottom and tap on About Phone
3. Repeatedly tap on Build Number until your phone is in developer mode
4. Go back to settings, you should now have a new option called Developer options
5. Go into Developer options and make sure that USB debugging is turned on. I also have OEM unlocking turned on but I don’t think you need it.

### Sending to physical Android device

1. First, check to make sure that your device is detected by your system by running
```
$ adb devices
```
This should return something like this:
```
List of devices attached
R58M83GLQMH	device
```
If you don't see anything listed then the device may not be in USB debugging mode or your computer can't find it. Emulated devices will not show up in this list. To show all devices run this:
```
$ ionic cordova run android --list
```

2. You can run the normal `ionic cordova run android` command and it should automatically select your device. If for some reason it doesn't, we can specify a target device using the target flag.
```
$ ionic cordova run android --target=R58M83GLQMH
```
The app should automatically open and start. You can relaunch the app by finding it in the apps page or home screen depending on your phone settings. The app will look like this:

![App](images/app.jpg?raw=true)


### Sending to virtual Android device
This is fairly similar to running the device on a physical device with a few benefits.
1. We need to list the virtual devices available to us.
```
$ $ANDROID_SDK_ROOT/tools/bin/avdmanager list avd
```
The output should be something like:
```
The following Android Virtual Devices could not be loaded:
    Name: Pixel_2_API_28
    Path: /home/user/.android/avd/Pixel_2_API_28.avd
   Error: Google pixel_2 no longer exists as a device
```
This will only list the virtual devices. If we want to list ALL available devices, both physical and virtual, run this:
```
$ ionic cordova run android --list
```
This should produce an output like:
```
[native-run]
[native-run] Connected Devices:
[native-run]
[native-run]   samsung SM-A505U (API 28) R58M83GLQMH
[native-run]
[native-run] Virtual Devices:
[native-run]
[native-run]   Pixel 2 API 28 (API 28) Pixel_2_API_28
[native-run]
```
2. Now let's send in to the emulator.
```
$ ionic cordova run android --target=Pixel_2_API_28
```
3. The emulated phone should look something like this:

![App](images/emulated-phone.png?raw=true)

4. The advantage of running the application on an emulated device is that we can use the live reload option. You can try running the application on a physical device with live reload but it never worked for me.
```
$ ionic cordova run android --target=Pixel_2_API_28 --livereload
```
5. Try running the application with livereload and then change the alert output while it's running to see if the live reload is working.

### Run with logs

We need to debug, so we need to run the application while being able to view the logs. First try running it normally with the capture logs flag.
```
$ ionic cordova run android -c
```
But I never got it to work, there was always a connection error. The way around it is to run:
```
$ adb logcat
```
This will show every log from everything on the device, to narrow down the logs to just be from the application run:
```
$ adb logcat SystemWebChromeClient:D *:S
```
This should only show logs from our application.
