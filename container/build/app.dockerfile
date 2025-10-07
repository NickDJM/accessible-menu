ARG UBUNTU_VERSION=25.10
FROM ubuntu:$UBUNTU_VERSION
LABEL maintainer="Coldfront Labs Inc. <info@coldfrontlabs.ca>"
ARG CONTAINER_DIR=/var/www/html
WORKDIR $CONTAINER_DIR

# Update packages.
ENV DEBIAN_FRONTEND=noninteractive
RUN apt update -y; apt upgrade -y; \
  # @todo determine which keys are insecure and update them.; \
  apt update --allow-insecure-repositories --allow-unauthenticated; \
  apt install -y ca-certificates curl ssh gnupg; \
  apt-get clean && \
  apt-get autoclean && \
  apt-get autoremove

# Fix arm/Apple Silicon support.
ARG ARCHITECTURE="linux/x86_64"
RUN if [ "$ARCHITECTURE" = "linux/arm64" ] ; then wget -O "/usr/local/bin/go-replace" "https://github.com/webdevops/goreplace/releases/download/1.1.2/gr-arm64-linux" \
  && chmod +x "/usr/local/bin/go-replace" \
  && "/usr/local/bin/go-replace" --version ; fi

# Add git.
ENV SHELL bash
RUN curl -skL https://raw.githubusercontent.com/git/git/master/contrib/completion/git-completion.bash -o ~/.git-completion.bash; \
  echo 'source ~/.git-completion.bash' >> ~/.bashrc;

# Add nodejs, git-lfs and other dev tools.
ARG NODE_MAJOR_VERSION="22"
RUN mkdir -p /etc/apt/keyrings; \
  curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg; \
  echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR_VERSION.x nodistro main" | tee /etc/apt/sources.list.d/nodesource.list; \
  apt update -y; \
  apt install nodejs build-essential git-lfs bash-completion -y --no-install-recommends; \
  apt-get clean && \
  apt-get autoclean && \
  apt-get autoremove || true;

# Customize NPM if need be.
ARG NPM_MAJOR_VERSION=""
RUN if [ ! -z "$NPM_MAJOR_VERSION" ] ; then npm i -g npm@$NPM_MAJOR_VERSION ; fi
