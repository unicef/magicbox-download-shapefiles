magicbox-download-shapefiles
============================

[![Chat on Gitter](https://badges.gitter.im/unicef-innovation-dev/Lobby.png)](https://gitter.im/unicef-innovation-dev/Lobby)
[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)

**Component of [MagicBox](https://github.com/unicef/magicbox)**


## About

MagicBox uses various shapefiles from different datasets to support MagicBox's
purpose. This repository downloads all zipped shape files from a primary source,
[Global Administrative Areas Database](http://gadm.org/) (GADM) and unzips them.

If you're using this repo, you likely want to use
[magicbox-import-shapefiles](https://github.com/unicef/magicbox-import-shapefiles)
to import the shapefiles into a PostgreSQL database.


## How it works

This downloads zipped shapefiles from GADM to:

`./data/zipfiles/`

…and unzips them to:

`./data/shapefiles/gadm3-6/`


## Installation

Use [Docker](https://www.docker.com/) to build this image and run the
downloader. These steps assume you have a working Docker installation. If not,
review the Docker documentation first.

* [Docker - Installation](https://docs.docker.com/engine/installation/)
* [Docker - Getting started](https://docs.docker.com/get-started/)

### Build image, create volume

Create a config.js file based in config-sample.js

```bash
cp config-sample.js config.js
```

Build this image locally on your machine with this command.

```bash
docker build -t unicef/download-shapefiles .
```

This builds the Docker image locally on your machine.

Next, create a volume. A volume is a shared data volume we use across multiple
containers. We'll use it again later in the
[magicbox-import-shapefiles](https://github.com/unicef/magicbox-import-shapefiles)
repo.

```bash
docker volume create --name shapefiles_dbvolume
```

### Run image

Now you can run the image. Start up the image with this command (it will use the
volume we created in the previous step to hold the data).

```bash
docker run --rm -it -v shapefiles_dbvolume:/app/magicbox-download-shapefiles/data:z unicef/download-shapefiles
```

You should see output like this:

```
Downloading AFG
About to write zip to file
File saved.
Begin store to unzip AFG
wait...
[...]
```


## Legal

[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)

This project is licensed under the [BSD 3-Clause
License](https://opensource.org/licenses/BSD-3-Clause).
