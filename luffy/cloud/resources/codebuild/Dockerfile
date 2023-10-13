# Use the Amazon Linux 2 base image
FROM amazonlinux:2

# Install dependencies
RUN yum -y update && \
    yum -y install java-1.8.0-openjdk-devel git unzip

# Download and install SonarScanner
RUN curl -o sonarscanner.zip -L https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-5.0.1.3006-linux.zip && \
    unzip sonarscanner.zip -d /opt && \
    mv /opt/sonar-scanner-5.0.1.3006-linux /opt/sonar-scanner && \
    rm sonarscanner.zip

# Add SonarScanner to PATH
ENV PATH="/opt/sonar-scanner/bin:${PATH}"

# Other customizations here

# Set the working directory
WORKDIR /app

# Define an entry point (e.g., for running builds)
CMD ["bash"]