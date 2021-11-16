FROM nginx:1.9

# Install nodejs
ENV NODE_VERSION=12.6.0
RUN apt-get update
RUN apt install -y curl
RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash
ENV NVM_DIR=/root/.nvm
RUN . "$NVM_DIR/nvm.sh" && nvm install ${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm use v${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm alias default v${NODE_VERSION}
ENV PATH="/root/.nvm/versions/node/v${NODE_VERSION}/bin/:${PATH}"
RUN node --version
RUN npm --version

# To handle 'not get uid/gid'
RUN npm config set unsafe-perm true

# делаем каталог 'app' текущим рабочим каталогом
WORKDIR /app

# копируем оба 'package.json' и 'package-lock.json' (если есть)
COPY package*.json ./

# устанавливаем зависимости проекта
RUN npm install

# копируем файлы и каталоги проекта в текущий рабочий каталог (т.е. в каталог 'app')
COPY . .

# собираем приложение для production с минификацией
ARG environment
RUN npm run build:${environment}

# Copy static to nginx static folder
RUN mkdir -p /var/www/html
RUN cp -r /app/build/* /var/www/html

# Copy config to nginx config folder
RUN rm -rf /etc/nginx
RUN cp -r /app/nginx/config /etc/nginx

EXPOSE 80 443
CMD [ "nginx", "-g", "daemon off;" ]
