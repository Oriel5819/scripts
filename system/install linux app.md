# INSTALL LINUX APP

## SNAP

## .deb FILES

1. use `sudo dpkg -i applicationName.deb`
2. follow the instructions

## .tar.gz FILES

1. Download the `tar.gz` file
2. go to `/usr/share/applications`
3. create `applicationName.desktop` and add those following lines

```Bash
[Desktop Entry]
Encoding=UTF-8
Version=1.0
Type=Application
Name=ApplicationName
Icon=/home/[your username]/icon.png
Path=/home/[your username]/theApplicationContainer
Exec=/home/[your username]/theApplicationContainer/theApplication
StartupNotify=false
StartupWMClass=ApplicationName
OnlyShowIn=Unity;GNOME;
X-UnityGenerated=true
```
4. copy the application `Parent Folder` to `Exec`
5. copy the application icon to `Icon`

support: `https://www.youtube.com/watch?v=Cy6vUC2qLiY&ab_channel=CodeWithArjun`