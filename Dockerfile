# Docker image for download_shapes_from_gadm
# Downloads all shapefiles from gadmn and unpacks them in the data/ directory
#
# https://hub.docker.com/r/jflory/download_shapefiles_from_gadm/
#

FROM centos:latest

LABEL maintainer="Justin W. Flory <jflory@unicef.org>" \
      vendor="UNICEF Office of Innovation"

WORKDIR /app

RUN yum upgrade -y \
    && yum install -y \
        curl \
        git \
    && yum clean all

# Add NodeJS 8 package
# https://github.com/nodesource/distributions#rpm
RUN curl -sL https://rpm.nodesource.com/setup_8.x | bash -
RUN yum install -y nodejs

# Set up coordinate_to_admin_id_server
RUN     git clone https://github.com/unicef/download_shapefiles_from_gadm.git
WORKDIR download_shapefiles_from_gadm
RUN     npm install \
        && mkdir -p data/{shapefiles,zipfiles}
COPY    config.js .

ENTRYPOINT ["node", "main.js"]
