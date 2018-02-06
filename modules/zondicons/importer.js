const generateCss = require('../../scripts/utils/generateCss');
const generateJson = require('../../scripts/utils/generateJson');
const extraFromJson = require('../../scripts/utils/extraFromJson');
const getIconsFromCss3 = require('../../scripts/utils/getIconsFromCss3');
const prepareIcons = require('../../scripts/utils/prepareIcons');
const getSvgs = require('../../scripts/utils/getSvgs');
const copySvgs = require('../../scripts/utils/copySvgs');
const copyLicense = require('../../scripts/utils/copyLicense');
const generateFontsFromSvg = require('../../scripts/utils/generateFontsFromSvg');
const config = require('../../config');
const fs = require('fs-extra');
const path = require('path');

let options = {
  source: path.join(config.sets.customs, 'zondicons'),
  name: 'zondicons',
  class: 'zondicons',
  prefix: 'zondicons-',
  className: 'Zondicons',
  title: 'Zondicons',
  classifiable: false
};

let paths = {
  // package: path.join(options.source, 'package.json'),
  svgs: path.join(options.source, 'zondicons'),
  dest: __dirname,
  svgsDest: path.join(__dirname, 'icons')
};

// let info = extraFromJson(paths.package, ['homepage', 'description', 'version', 'author', 'license']);

// options.license = info.license;
// options.author = info.author.name;
// options.homepage = info.homepage;
// options.description = info.description;
// options.version = info.version;
options.svgs = getSvgs(paths.svgs);

function callback() {
  options.icons = getIconsFromCss3(`${__dirname}/${options.name}.css`, 'zondicons-');
  options = prepareIcons(options);
  generateJson(paths.dest, options.className, options);
  // copyLicense(paths.dest, path.join(options.source, 'LICENSE.md'));
}

module.exports = function() {
  copySvgs(paths.svgsDest, paths.svgs, options.svgs);
  generateFontsFromSvg(paths.dest, options, callback);
};