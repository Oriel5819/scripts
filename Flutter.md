1. create a **Android** folder in cd /home/{username}
2. download latest flutter and add in **Android** folder
3. download latest **commandlinestools** from flutter website and add the content of **cmdline-tools** in /home/{username}/Android/cmdline-tools/latest/
4. add these lines in **~/.bashrc**
```
# Android
export ANDROID=$HOME/Android
# Android SDK
export PATH=$ANDROID/cmdline-tools/latest/bin:$PATH
export PATH=$ANDROID/platform-tools:$PATH
# Flutter
export FLUTTER=$ANDROID/flutter
export PATH=$FLUTTER/bin:$PATH
# Dart
export DART_SDK=$ANDROID/dart-sdk
export PATH=$DART_SDK/bin:$PATH

```
5. execute these command to configure flutter:

sudo vi ~/.bashrc
source ~/.bashrc

sdkmanager --list
sdkmanager --update

sdkmanager --list|grep build-tools
sdkmanager --list|grep platform-tools

sdkmanager "build-tools;34.0.0" "platform-tools" "platforms;android-34" "tools"

In case there is some problem in installing `sudo apt-get install -y pkg-config` and it ask for **cdrom** thing, use this to remove that `sudo sed -i '/cdrom/d' /etc/apt/sources.list`

