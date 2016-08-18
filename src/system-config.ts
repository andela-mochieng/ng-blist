// SystemJS configuration file, see links for more information
// https://github.com/systemjs/systemjs
// https://github.com/systemjs/systemjs/blob/master/docs/config-api.md

/***********************************************************************************************
 * User Configuration.
 **********************************************************************************************/
/** Map relative paths to URLs. */
const map: any = {
  '@angular2-material': 'vendor/@angular2-material',
  'angular2-jwt':'vendor/angular2-jwt',
  'ng2-toastr':'vendor/ng2-toastr',
  'ng2-bs3-modal': 'vendor/ng2-bs3-modal',
};

/** User packages configuration. */
const packages: any = {
  '@angular2-material/core': {
    format: 'cjs',
    defaultExtension: 'js',
    main: 'core.js'
  },


  'angular2-jwt': {
    main: 'angular2-jwt.js'
  },
  'ng2-toastr': {
    main: 'ng2-toastr.min.js',

  },
  'ng2-bs3-modal': {
    main: 'ng2-bs3-modal.min.js',

  },



};

const materialPkgs:string[] = [
 'core',
 'toolbar',
 'icon',
 'button',
 'list',
 'card',
 'input',



];

materialPkgs.forEach((pkg) => {
 packages[`@angular2-material/${pkg}`] = {main: `${pkg}.js`};
});


////////////////////////////////////////////////////////////////////////////////////////////////
/***********************************************************************************************
 * Everything underneath this line is managed by the CLI.
 **********************************************************************************************/
const barrels: string[] = [
  // Angular specific barrels.
  '@angular/core',
  '@angular/common',
  '@angular/compiler',
  '@angular/forms',
  '@angular/http',
  '@angular/router',
  '@angular/platform-browser',
  '@angular/platform-browser-dynamic',
  '@angular/router-deprecated',
  'ng2-toastr',
  'ng2-bs3-modal',
  'jquery',


  // Thirdparty barrels.
  'rxjs',

  // App specific barrels.
  'app',
  'app/shared',
  'app/auth/signin',
  'app/auth/index',
  'app/index',
  'app/bucketlist',
  'app/auth/register',
  /** @cli-barrel */
];

const cliSystemConfigPackages: any = {};
barrels.forEach((barrelName: string) => {
  cliSystemConfigPackages[barrelName] = { main: 'index' };
});

/** Type declaration for ambient System. */
declare var System: any;

// Apply the CLI SystemJS configuration.
System.config({
  map: {
    '@angular': 'vendor/@angular',
    'rxjs': 'vendor/rxjs',
    'main': 'main.js'
  },
  packages: cliSystemConfigPackages
});

// Apply the user's configuration.
System.config({ map, packages });
