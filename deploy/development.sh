 #!/bin/bash

set -e

Deploy()
{
mkdir -p ~/.ssh
chmod 700 ~/.ssh

cat > "$HOME/.ssh/config" <<EOL
Host ${HOST_IP}*
  StrictHostKeyChecking no
  UserKnownHostsFile=/dev/null
EOL

chmod 600 "$HOME/.ssh/config"
aws ec2-instance-connect ssh  \
  --instance-id ${HOST_ID} \
  --instance-ip ${HOST_IP} \
  --connection-type eice  \
  --os-user ubuntu  \
  --region us-east-1  \
  --eice-options maxTunnelDuration=900<<EOT
    cd /home/ubuntu/
    ls -a
    exit
EOT
}

while getopts ":d:v:n:u:" option; do
   case $option in
      d) HOST_ID=$OPTARG;;
      v) APP_VERSION=$OPTARG;;
      n) APP_NAME=$OPTARG;;
      u) HOST_IP=$OPTARG;;
     \?) 
         echo "Invalid option"
         exit;;
   esac
done

Deploy
