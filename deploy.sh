 #!/bin/bash

#script="aws ec2-instance-connect ssh  \
 #           --instance-id i-0560fb61b4ed18c3a \
  #          --instance-ip 172.31.111.208 \
  #          --connection-type eice  \
 #           --os-user ubuntu  \
   #        --region us-east-1  \
   #         --private-key-file ./endpoint.pem   \
  #          --eice-options maxTunnelDuration=900 \
   #        --no-cli-auto-prompt"


echo "AQUUUUI"

mkdir -p ~/.ssh
chmod 700 ~/.ssh

eval `ssh-agent -s`
echo "$(cat ./endpoint.pem)" | ssh-add -
echo "" > ~/.ssh/known_hosts 
ssh-keyscan -H "172.31.124.225" >> ~/.ssh/known_hosts

ssh-keygen -R

aws ec2-instance-connect ssh  \
  --instance-id i-0973c4c7d024bd386 \
  --instance-ip "172.31.124.225" \
  --connection-type eice  \
  --os-user ubuntu  \
  --region us-east-1  \
  --private-key-file ./endpoint.pem   \
  --eice-options maxTunnelDuration=900<<EOT
    echo "Executing command block 1"
    ls -a
EOT

echo "AQUUUU12"

#bash -c "$script <<EOF
#  ls -a
#  mkdir enodes
#  ls -a
#EOF"