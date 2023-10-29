FROM debian:latest

ENV GO_VERSION 1.18
ENV GOOS linux
ENV GOARCH amd64
ENV SONAR_SCANNER_VERSION 5.0.1.3006

RUN  apt-get update && \
     apt-get install -y wget build-essential unzip git

RUN wget https://golang.org/dl/go$GO_VERSION.$GOOS-$GOARCH.tar.gz -O /tmp/go$GO_VERSION.$GOOS-$GOARCH.tar.gz && \
    tar -C /usr/local -xzf /tmp/go$GO_VERSION.$GOOS-$GOARCH.tar.gz

RUN wget https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-$SONAR_SCANNER_VERSION-linux.zip  -O /tmp/sonar-scanner-cli-$SONAR_SCANNER_VERSION-linux.zip && \
    unzip /tmp/sonar-scanner-cli-$SONAR_SCANNER_VERSION-linux.zip -d /opt/ && \
    ln -s /opt/sonar-scanner-$SONAR_SCANNER_VERSION-linux/bin/sonar-scanner /usr/local/bin/sonar-scanner

RUN apt-get remove -y unzip && \
    apt-get autoremove -y && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* && \
    rm -f /tmp/*

ENV PATH $PATH:/usr/local/go/bin

CMD ["bash"]