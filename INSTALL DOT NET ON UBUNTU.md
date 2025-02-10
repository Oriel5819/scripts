# INSTALL DOT NET ON UBUNTU

## MANUALLY

```Bash
sudo apt-get update
sudo apt-get upgrade

sudo apt install -y apt-transport-https ca-certificates gnupg

wget https://packages.microsoft.com/config/ubuntu/24.04/packages-microsoft-prod.deb -O packages-microsoft-prod.deb

sudo dpkg -i packages-microsoft-prod.deb

sudo apt-get update

# install sdk or runtime (runtime is already included in sdk)
sudo apt install -y dotnet-sdk-8.0
sudo apt install -y dotnet-runtime-8.0

# check whether dotnet is well installed
dotnet --version

# check all installed runtimes
dotnet --list-runtimes
```

## CREATE AND RUN AN APP

```Bash
# create an app
dotnet new console -o <app_name>

# run an app
dotnet run
```
