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
$ ionic cordova platform add browser
```
Now run the application
```
$ ionic cordova run browser
```
As you can see, Ionic will behave that same as running `ionic serve`. There is one big difference though, `ionic serve` will run the application with live reload whereas `ionic cordova run browser` does not, for development it is much faster to run the application with `ionic serve`.

### Working with Ionic
Now it's time to start building an application. Go ahead and start by running the application.

Let's start off looking at the project folder structure in the src/ directory and understanding what does what.
```
src/
	app/
		app.component.ts
		app.html
		app.module.ts
		app.scss
		main.ts
	assets/
		icon/
			favicon.ico
		imgs/
			logo.png
	pages/
		home/
			home.html
			home.scss
			home.ts
	theme/
		variables.scss
	index.html
	manifest.json
	service-worker.js
```
The `manifest.json` file has some basic startup configuration but you can leave all that alone.

Most of the files in the `app/` directory can pretty much be ignored as you will rarely touch them. The only file you will need to understand is the `app.module.ts` file. This file configures the applications pages, imports, and providers that we use.

The `assets/` directory is pretty straight forward, it has all the images and any other static files.

The `pages/` directory is what the name says, it's got all the pages of our application. Each page will have its own folder with html, scss, and ts files. The html file is the front-end portion of the page and the scss file is the styling for that page, though there are not many cases when you will need special styling for a specific page. The ts is the back-end functionality of the page, here you can configure how buttons act and how the page interacts with providers but more on that later.

The `theme/` directory has one file called `variables.scss`. The variables in this file are used for in-line color styling with Ionic's syntax. Take a look through the file and take note of the colors variable.

##### Home page
Let's start modifying the home page. Open up the `home.html`, change the page title to Home and add a welcome message for the home page.

Now all this is really bland so let's change up the colors. In `home.scss`, change the background color to something else by adding the appropriate css.
```
page-home {
  background-color: blue;
}
```
Notice how the background didn't change. Inspect the page elements and find out why the background color isn't working.

**Task:** Fix the scss file so that the background color displays a different color. *Hint: What class is overriding the background color for page-home? What css can be added to override that class?*

You should end up with somethiing like this.
![Blue home page](images/home-blue.png?raw=true)

Now let's add a button. This is the syntax for an Ionic button.
```
<button ion-button color="primary">Do a thing</button>
```
Notice the `color="primary"` portion of this line. This is Ionic's in-line color styling. The `theme/variables.scss` file can be modified to change the default colors and add additional colors. Change the primary color to something else.

![Home with button](images/home-with-button.png?raw=true)

Now let's make the button actually do something. To make the button do something when clicked we add `(click)="doThing()"` to the button tag.
```
<button ion-button color="primary" (click)="doThing()">Do a thing</button>
```
If we test this you will just get an error because we haven't implemented doThing() on the backend. In the `home.ts` file we need to have a function to handle the doThing() call. Make a function below the constructor that will alert a message on the screen.
```
doThing(){
	alert("I've done a thing!");
}
```
Now when you press the button we have it alert to the screen!
![Alert a thing](images/alert-thing.png?raw=true)

##### Navbar and pages
Our navbar is very boring and we don't even have any pages yet. First let's add some buttons to our navbar.

**Task:** Add two new pages to the navbar.
![Navbar buttons](images/navbar-buttons.png?raw=true)

Now that we have buttons that we want to go to other pages we should probably make those pages. Making pages in Ionic is fairly simple, we just generate one from the terminal and let Ionic build a page for us.
```
$ ionic generate page About
$ ionic generate page Another
```
Now we have an additional two pages. If you try to navigate to the url for these pages they will not appear and you will get an error. Notice how the newly generated pages have a module.ts file in their folders, we need to make one for the home page. Create a new file `pages/home/home.module.ts` and setup the module.ts page following the other pages module.ts files.

Now we need to edit the `app.module.ts` file. We need to import the home page module and remove HomePage from declarations as it is already declared in `home.module.ts`. Add the imported home page module to the imports section. Your added code should look like this.
```
import { HomePageModule } from '../pages/home/home.module';


imports: [
	HomePageModule,
	BrowserModule,
	IonicModule.forRoot(MyApp)
]
```
Now if we navigate to http://localhost:8100/#/about we should see the about page. Now let's make the the buttons on the home page actually go to the pages we want. Add code to the buttons to call a function, passing in the parameter of what page you want to go to as a string. We also need to add the function to the HomePage class.
```
<button ion-button (click)="goTo('HomePage')">Home</button>

goTo(page){
	// code to navigate to page
}
```
There are two options to navigating to a page with Ionic, `push(page)` and `setRoot(page)` but first you need to understand the navigation stack. Ionic's navigation stack works just like it sounds, it's a stack that keeps track of where you've been. The root of the stack starts as the first page loaded, for our application that is the home page. Using `push(page)` will add that page to the stack and so on. Using `setRoot(page)` clears the stack and sets the root of the stack to the page that was passed in. Try using each one to see what the difference is.
```
this.navCtrl.push(page);
this.navCtrl.setRoot(page);
```
More on the NavController https://ionicframework.com/docs/v3/api/navigation/NavController/

Now that that's working we have a problem, only the home page has the navbar with the links. We need to build a navbar component.





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
