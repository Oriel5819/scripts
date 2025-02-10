# SERVICE

## CREATE SERVICE BY SYSTEMD

1. Go to 

    ````bash
    cd /etc/systemd/system
    ````

2. Create a file with `.service` extension

    ```bash
    sudo nano startup.service
    ```

3. Add some scripts in the created file

    ```bash
    [Unit]
    Description=Stellarix vpn port forwarding
    
    # this service won't restart unless it failed
    # this service will maintain all its process alive
    # this service executes a direct command (vpn --pf)
    
    [Service]
    User=ix-0026
    RemainAfterExit=true
    ExecStart=vpn --pf
    Restart=on-failure
    
    [Install]
    WantedBy=multi-user.target
    ```

    ```bash
    [Unit]
    Description=Stellarix vpn port forwarding
    
    # this service will restart after exit
    # this service will maintain all its process alive
    # this service executes some command in a file
    
    [Service]
    User=ix-0026
    ExecStart=/path/to/file.sh
    Restart=restart
    
    [Install]
    WantedBy=multi-user.target
    ```

4. use this line after every time some change has been applied in the service file

    ```bash
    sudo systemctl daemon-reload
    ```

5. use these lines to start or stop or get the status of the service

    ```bash
    sudo systemctl start <service_name>.service 
    
    sudo systemctl status <service_name>.service 
    
    sudo systemctl restart <service_name>.service 
    
    sudo systemctl stop <service_name>.service 
    
    ```

6. use this line to enable or the disable the service at startup

    ```bash
    sudo systemctl enable <service_name>.service 
    
    sudo systemctl disable <service_name>.service 
    ```