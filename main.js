// node download_shapefiles_from_gadm
// Downloads shapefiles for all countries.
// Generates geojson files
// node main.js
let bluebird = require('bluebird');
let config = require('./config');
let country_codes = require('./country_codes');
let extract = require('extract-zip');
let fs = require('fs');
let mkdirp = require('mkdirp');
let request = require('request');
// Make sure that a directory for temporary storage has been created.
// Add this directory in config.js
let temp_storage = config.zipfile_dir;
// Folder where shapefiles o
let shapefile_dir = config.shapefile_dir;
let shapefiles_url = config.shapefile_url;

let source = 'gadm3-6';

shapefile_dir = config.shapefile_dir + source

/**
 * Get list of countries you need shapefiles for, then fetch them.
 * TODO Destroy local file on upload complete
 * @param{String} country_codes - array of 3 letter country ISO code taken from wikipedia
 * @return{Promise} Fulfilled with result of azure upload
 */

bluebird.each(country_codes, function(e) {
  return download_shapefile_then_unzip(e);
}, {concurrency: 1})
.catch(console.log)
.then(() => {
  console.log('All done!');
  process.exit();
});


/**
 * Downloads shape file.
 * @param{String} country_code - 3 letter country ISO code
 * @return{Promise} Fulfilled with result of azure upload
 */
function download_shapefile_then_unzip(country_code) {
  return new Promise((resolve, reject) => {
    let url = shapefiles_url + country_code + '_shp.zip';
    console.log(url)
    let output = temp_storage + country_code + '.zip';
    console.log('Downloading', country_code);
    request({
      url: url,
      encoding: null
    }, function(err, resp, body) {
      if ( resp.statusCode != 200) {
        console.log('NOGO!', country_code);
        return resolve();
      }

      if (err) {
        return reject(err);
      }
      console.log('About to write zip to file');
      fs.writeFile(output, body, error => {
        if (error) throw error;
        console.log('File saved.');
        unzip(country_code).then( () => {
          setTimeout(function() {
            console.log('wait...');
            resolve();
          }, 2000);
        });
      });
    });
  });
}

/**
 * Unzipes shapefile and creates geojson
 * @param{String} country_code - 3 letter ISO country code
 * @param{String} local_dir - Directory where shapefile zip is located.
 * @return{Promise} Fulfilled -
 */
function unzip(country_code) {
  return new Promise(function(resolve, reject) {
    mkdirp(shapefile_dir + '/' + country_code, function(err) {
      if (err) {
        console.log(err);
        return reject(err);
      }
      console.log('Begin store to unzip', country_code);
      let path = temp_storage + country_code + '.zip';
      extract(path, {dir: shapefile_dir + '/' + country_code}, error => {
        if (error) {
          return reject(error);
        }``
        resolve();
      });
    });
  });
}
