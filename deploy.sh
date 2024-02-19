 #!/bin/bash

script="aws ec2-instance-connect ssh  \
            --instance-id i-0560fb61b4ed18c3a \
            --connection-type eice  \
            --os-user ubuntu  \
            --region us-east-1  \
            --private-key-file ./endpoint.pem \
            --eice-options maxTunnelDuration=900"

bash -c "$script <<EOF
  ls -a
EOF"