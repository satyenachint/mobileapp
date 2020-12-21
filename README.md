# NewsApp

## Prerequisite Requirements
Follow all the instructions in [React Native CLI Quickstart Tab](https://reactnative.dev/docs/environment-setup) depending on your Development OS( macOS / Windows / Linux ) and your Target OS( iOS / Android )

After following above guide you should have<br>

Android<br>
node, watchman (MacOS only), JDK, Android Studio(Android SDK, Android SDK Platform, Android Virtual Device, Android SDK Build-Tools)

iOS<br>
node, watchman (MacOS only), Xcode, CocoaPods

You need latest node,npm and yarn to be installed in your machine
After installing Node install yarn
Install [Yarn](https://www.npmjs.com/package/yarn)
Verify by entering:
### `yarn -v`

## Available Scripts

In the project directory, you can run:

### `yarn or yarn install`

Installs all the required Dependencies. make sure you have yarn globally installed<br>

### `yarn android`

Runs the app in the development mode for any available Android adb device.

### Running IOS app

Install Cocoapod Dependencies for iOS
`cd ios && pod install && cd ..`

Open NewsApp.xcworkspace in ios directory and use Xcode to run the project

## Running on Emulators

### Android
Make sure you are running emulator before running Project and check if it is detected in adb `adb devices`
