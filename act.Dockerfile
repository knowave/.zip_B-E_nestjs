FROM ghcr.io/catthehacker/ubuntu:act-latest

RUN apt-get update && apt-get install -y \
    awscli \
    jq \
    unzip \
    curl \
    docker.io