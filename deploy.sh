 #!/bin/bash

echo "AQUUUUI"

mkdir -p ~/.ssh
chmod 700 ~/.ssh

cat > "$HOME/.ssh/config" <<EOL
Host 172.31.124*
  StrictHostKeyChecking no
  UserKnownHostsFile=/dev/null
EOL

chmod 600 "$HOME/.ssh/config"

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
    mkdir viapipeline
EOT

echo "AQUUUU12"