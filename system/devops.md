# SYSTEM ENGINEERING

## Add user on ubuntu
`
sudo adduser <username>
sudo su - <username>
whoami
`

## Enable or disable firewell
`
ufw status
ufw disable 
ufw enable

// allow
ufw allow from 10.0.0.1
ufw allow from 10.0.0.1 to any port 22
ufw allow from 10.0.0.1/24 to any port 22

// deny
ufw deny http
ufw deny ftp
ufw deny from 10.0.0.1

// using number
ufw status numbered
ufw delete 5

// reset
ufw reset
`

## Access by ssh
`
ssh -i ~/.ssh/other_key_to_use user@host
`

## Copy id
`ssh-copy-id alfred@10.200.200.36
`

## Unmount
`
fusermount -u /temp/user/harddrive
`

## To mount from another machine
sudo sshfs -o allow_other tsirr@10.210.210.16:/home/tsirr/mountSrv-core ./
sudo sshfs -o allow_other tsirr@10.210.210.16:/home/tsirr/mountSrv-core ./

## To see command historic
history

## To see command history with specific command
history|grep <command>

## Check all servers working in a machine by pm2 
pm2 ls
pm2 show <server_name | number>

## Change the owner of a folder
sudo chown alfred:alfred -R <foldername>

## IMAGE_REPO needs to be the same as the project name and the name space 
global variable in admin => setting => CI/CD
we need to put an image repo for each project in harbor

- project
- git
- authentication to harbor
- create image in harbor
- deploy (using image in the harbor)
- send to cluster
- application and services
	(all app need to have services in order to communicate one another)

## COPY FOLDER OR FILE FROM A SERVER TO ANOTHER
1. Add each other ssh keys 
2. Use secure copy `scp -r /opt/ericsson root@10.200.200.36:/opt`
3. Change owner `chown alfred:alfred -R ericsson` 
NB: you cannot copy something in '/opt, /etc, ...' without using root

