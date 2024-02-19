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

ssh-keyscan -H "172.31.111.208" >> ~/.ssh/known_hosts

echo "$(cat ./endpoint.pem)" | ssh-add -

aws ec2-instance-connect ssh  \
  --instance-id i-0cf5ec99fdb293e01 \
  --instance-ip 172.31.111.208 \
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