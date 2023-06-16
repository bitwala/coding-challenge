# Base image
FROM node:18

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and yarn.lock files
COPY package.json yarn.lock ./

# Install Yarn and app dependencies
RUN curl -o- -L https://yarnpkg.com/install.sh | bash
RUN yarn install

# Bundle app source
COPY . .

# Creates a "dist" folder with the production build
RUN yarn run build

# Start the server using the production build
CMD [ "node", "dist/main.js" ]
