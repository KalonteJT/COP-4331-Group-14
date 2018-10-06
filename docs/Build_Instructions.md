Build Instructions for running Queue Up
----------------------------------------
Queue Up is built with React Native. An emulator is required in order to run Queue Up. For instructions on setting up the development
environment necessary to run the app, please go to the site below:<br />
https://facebook.github.io/react-native/docs/getting-started.html <br />
Once there, click the right tab **"Building Projects with Native Code"**. You will need to select
the current OS your computer is using next to **"Development OS"**. You will also need to
select the **"Target OS"** for whichever emulator you plan on using to run the app.<br /> 
**Note: If using a Windows or Linux OS you must use the Android emulator as XCode is not supported by these OS.<br />
Note: You will also need Java SDK 8 in order to run this app on an android emulator.<br />**
After following through the tutorial on setting up the environment necessary to run the app, please follow these instructions once you have opened a terminal window.

1. If you have not already installed command line git, please go to the following site for instructions once installing git "https://git-scm.com/book/en/v2/Getting-Started-Installing-Git"

2. After installing git clone the repository from our groups github by typing<br /> "git clone https://github.com/KalonteJT/COP-4331-Group-14.git" This will create a folder with our repository's files in your current directory

3. After downloading our repository, navigate to the repository folder by typing "cd COP-4331-Group-14". Then navigate to the QUp folder by typing "cd QUp" in the terminal window

4. Once in the QUp folder you will need to run the following command "npm install" to install the necessary
node modules.

5. After installing the node modules, you are ready to run the app and can do so by typing the following command
- If you selected iOS as target OS for your emulator please type "react-native run-ios" to launch the app and emulator
- If you selected Android as the target OS for your emulator please type "react-native run-android" to launch the app and emulator.<br /> 
**Note: For the Android app you will need to have an android emulator running before typing the command above for it to load the app on the emulator.**
