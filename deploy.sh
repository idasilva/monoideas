 #!/bin/bash

script="aws ec2-instance-connect ssh  \
            --instance-id i-0560fb61b4ed18c3a \
            --instance-ip 172.31.111.208 \
            --connection-type eice  \
            --os-user ubuntu  \
            --region us-east-1  \
            --private-key-file ./endpoint.pem   \
            --eice-options maxTunnelDuration=900 \
            --no-cli-auto-prompt"

bash -c "$script <<EOF
  ls -a
EOF"