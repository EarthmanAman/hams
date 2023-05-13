FROM python:3-alpine
ENV PYTHONUNBUFFERED=1

RUN apk update && \
    apk add --no-cache wget && \
    wget https://github.com/jwilder/dockerize/releases/download/v0.6.1/dockerize-alpine-linux-amd64-v0.6.1.tar.gz && \
    tar -C /usr/local/bin -xzvf dockerize-alpine-linux-amd64-v0.6.1.tar.gz && \
    rm dockerize-alpine-linux-amd64-v0.6.1.tar.gz && \
    chmod +x /usr/local/bin/dockerize
RUN apk add --no-cache bash
    
WORKDIR /usr/src/app

COPY . ./
RUN pip3 install -r requirements.txt
