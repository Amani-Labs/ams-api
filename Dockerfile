# Use the official image as a parent image
FROM node:current-slim

# Install yarn package
RUN apt-get update && apt-get install -y yarn

# Set the working directory
WORKDIR /usr/src/app

# Copy the file from your host to your current location
COPY package.json .

# Run the command inside your image filesystem
RUN yarn install

# Inform Docker that the container is listening on the specified port at runtime.
EXPOSE 5000

# set container env backend service port 
ENV PORT 5000

# Copy the rest of your app's source code from your host to your image filesystem.
COPY . .

ADD entrypoint.sh /
RUN chmod +x /entrypoint.sh

CMD ["/entrypoint.sh"]
