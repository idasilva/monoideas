 #!/bin/bash
 
script="aws ec2-instance-connect ssh  \
            --instance-id i-0cf5ec99fdb293e01 \
            --connection-type eice  \
            --os-user ubuntu  \
            --region us-east-1  \
            --eice-options maxTunnelDuration=900"

bash -c "$script <<EOF
  ls -a
EOF"