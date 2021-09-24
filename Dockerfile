#########################
### build environment ###
#########################

# base image
FROM viniro/cypress-bitbucket:1.0 as builder

# set working directory
RUN mkdir /usr/src/app
WORKDIR /usr/src/app

# install and cache app dependencies
COPY ./package.json /usr/src/app/package.json
RUN npm install

# add app
COPY . /usr/src/app

# generate build
RUN npm run build

# run tests
RUN npm run test

WORKDIR /usr/src/app/output

## use the latest docker image for NGINX
FROM nginx:latest
## Remove default NGINX web files
RUN rm -rf /usr/share/nginx/html/*
## Copy the dist files to NGINX web folder

COPY --from=builder /usr/src/app/output/dist /usr/share/nginx/html
## Set the permission for NGINX web folder
RUN chmod 777 -R /usr/share/nginx/html
## Overwrit the default NGINX config using the custom config file
COPY --from=builder /usr/src/app/output/custom-nginx-file.conf /etc/nginx/conf.d/default.conf
## Expose the docker port
EXPOSE 8080
## Initiate the NGINX
CMD ["nginx", "-g", "daemon off;"]