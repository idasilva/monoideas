### SonarQueb

Para executar uma analisar através de uma pipeline:
```
export SONAR_SCANNER_VERSION=5.0.1.3006
export SONAR_SCANNER_HOME=$HOME/.sonar/sonar-scanner-$SONAR_SCANNER_VERSION-linux
curl --create-dirs -sSLo $HOME/.sonar/sonar-scanner.zip https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-$SONAR_SCANNER_VERSION-linux.zip
unzip -o $HOME/.sonar/sonar-scanner.zip -d $HOME/.sonar/
export PATH=$SONAR_SCANNER_HOME/bin:$PATH
export SONAR_SCANNER_OPTS="-server"
```

Exemplo de execução de scanner:
```
export SONAR_TOKEN=sqp_9714330c32eeccaf1f41628d27c4cd5499add39c
sonar-scanner \
  -Dsonar.projectKey=luffy \
  -Dsonar.sources=. \
  -Dsonar.host.url=https://abaded3a005db4a0eaf3ccd13a62a98a-1727960395.sa-east-1.elb.amazonaws.com:9000
```