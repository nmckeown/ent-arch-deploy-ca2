FROM ubuntu:22.04

# Prevent interactive prompts during install
ENV DEBIAN_FRONTEND=noninteractive

# Install MongoDB and dependencies
RUN apt-get update && \
    apt-get install -y gnupg curl && \
    curl -fsSL https://pgp.mongodb.com/server-7.0.asc | gpg --dearmor -o /usr/share/keyrings/mongodb-server-7.0.gpg && \
    echo "deb [ signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-7.0.list && \
    apt-get update && \
    apt-get install -y mongodb-org && \
    mkdir -p /data/db && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Expose MongoDB port
EXPOSE 27017

# Start MongoDB
CMD ["mongod", "--bind_ip_all"]
