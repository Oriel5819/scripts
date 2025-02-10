# USER

## Create user

```bash
sudo adduser vivek
```

## Test if User exists

```bash
cat /etc/passwd
grep '^{UserNameToSearch}' /etc/passwd
```

or

```bash
getent passwd {UserNameToSearch}
```



## Give root privilege

### by groups

use this line to add a user in sudoer group

```bash
sudo usermod -aG sudo [name-of-user]
```

### in sudoers file

1. go to `visudo` or `/etc/sudoers`
2. add your a line with your username: `<username> ALL=(ALL) ALL`

