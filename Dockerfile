FROM node:14.16.1

WORKDIR /usr/src/backend

COPY ./ ./

RUN rm -rf node_modules/
RUN npm update 

CMD ["/bin/bash"]