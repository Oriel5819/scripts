# INSTALL JAVA IN UBUNTU

## Download

Download JAVA from this site `https://www.oracle.com/java/technologies/downloads/`

## Configure

1. get the JAVA pwd:
    something like `/usr/lib/jvm/jdk-23.0.1-oracle-x64`
2. go to `cd /etc/environment`
3. add the pwd in the file:
    `JAVA_HOME=/usr/lib/jvm/jdk-23.0.1-oracle-x64`
4. reload the environments:
    `source /etc/environment` 

## Test 

```bash
which java
```

```bash
echo $JAVA_HOME
```
