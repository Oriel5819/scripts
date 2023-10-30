# UBUNTU FORGOTTEN PASSWORD

## WITHOUT GRUB

1. get an USB driver live.
2. use **try ubtuntu**.
3. open **terminal**.
4. use `sudo fdisk -l` to list all partition.
5. find the partition which has the user to recore the password.
6. mount the partition using `sudo mount /dev/sdXY /mnt` by replacing **/dev/sdXY** with the name of the patition.
7. change into the root with `sudo chroot /mnt`.
8. change the password with `passwd username`. Replace the **username** with your username.
9. confirm the password then `exit`
10. restart or shutdown the computer **it should work with the new password**
