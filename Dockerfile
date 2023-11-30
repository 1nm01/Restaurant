FROM ubuntu:latest
COPY components /home/restaurant/components
COPY public /home/restaurant/public
COPY src /home/restaurant/src
COPY .eslintrc.json /home/restaurant
COPY jsconfig.json /home/restaurant
COPY next.config.js /home/restaurant
COPY package.json /home/restaurant
COPY postcss.config.js /home
COPY tailwind.config.js /home
RUN apt-get update && apt-get install -y ca-certificates curl gnupg
RUN curl -sL https://deb.nodesource.com/setup_20.x | bash -
RUN apt-get install -y nodejs
WORKDIR /home/restaurant
EXPOSE 3000
RUN npm cache clean --force
RUN npm install
CMD ["npm", "run" ,"dev"]