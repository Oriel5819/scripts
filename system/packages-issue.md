# PACKAGE ISSUES

In case we have a package issue in where you cannot remove, update a package, 

1. go to `/var/lib/dpkg/info`
2. find the `prerm` file of the package (ex: sudo nano terminator.prerm )
3. comment out all the lines below `set -e`
4. then, reinstall the package (sudo apt install --reinstall <package>)