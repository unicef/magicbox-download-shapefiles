# Download shapefiles from gadm.org
![Screenshot](https://github.com/unicef/download_shapefiles_from_gadm/blob/master/public/images/dl_gadm.png)

#### This is a component of Magic Box

This repository downloads all zipped shape files from gadm.org to:

	./data/zipfiles/

and unzips them to:

	./data/shapefiles/gadm2-8/

#### Setup
	git clone https://github.com/unicef/download_shapefiles_from_gadm.git
	cd download_shapefiles_from_gadm
	cp config-sample.js config.js
	bash setup.sh
    node main.js
