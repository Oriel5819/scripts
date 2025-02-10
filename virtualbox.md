# VIRTUAL BOX

## INSTALL

1. download virtualbox from : https://www.virtualbox.org/wiki/Linux_Downloads

2. run this line to dipackage the downloaded package

   ```bash
   sudo dpkg -i virtualbox...deb
   ```

3. in case there is an error of missing libraries, run this code

   ```bash
   sudo add-apt-repository universe
   sudo apt update
   ```

4. install all missing library

   ```bash
   sudo apt install <libraryName1> <libraryName2>...<libraryNameN>
   ```

5. in case it is needed, run this line to fix all broken libraries

   ```bash
   sudo apt --fix-broken install
   ```

6. reinstall the virtualbox, return to step 2.



## UNISTALL

1. purge virtualbox

   ```
   sudo apt-get purge virtualbox*
   ```

2. auto remove all unecessary packages

   ```
   sudo apt-get autoremove
   ```

3. Delete Virtual box use data

   ```
   rm -r ~/.config/VirtualBox
   ```

4. update system

   ```
   sudo apt-get update
   ```




## NETWORK

### HOST-ONLY

1. all vms can communicate with the host machine and the host can communicate with all vms.
2. all vms do not have internet access.

### BRIDGE ADAPTER

1. No access to the internet
2. No access to the host
3. The host has no access to all vm guests

### NAT

1. No access to the internet
2. No access to the host
3. The host has no access to all vm guests

### INTRANET

1. No access to the internet
2. No access to the host
3. The host has no access to all vm guests

### NAT NETWORK

1. No access to the internet
2. No access to the host
3. The host has no access to all vm guests

![image-20241115163230079](/home/ix-0026/.config/Typora/typora-user-images/image-20241115163230079.png)
