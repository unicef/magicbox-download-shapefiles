# Download shapefiles from gadm.org

#### This is a component of [Magic Box](https://github.com/unicef/magicbox/wiki)

This repository downloads all zipped shape files from gadm.org to:

	./data/zipfiles/

and unzips them to:

	./data/shapefiles/gadm2-8/

### Dependencies:
#### NVM
	curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.32.1/install.sh | bash
#### Node.js
	nvm install 8
#### Setup
	git clone https://github.com/unicef/download_shapefiles_from_gadm.git
	cd download_shapefiles_from_gadm
	cp config-sample.js config.js
	bash setup.sh
    node main.js
