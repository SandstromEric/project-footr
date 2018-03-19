// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
    production: false,
    firebase: {
        apiKey: "AIzaSyB7rVBm75jmINrqg7XyCqida0Ibm1Fohs8",
        authDomain: "project-footr.firebaseapp.com",
        databaseURL: "https://project-footr.firebaseio.com",
        projectId: "project-footr",
        storageBucket: "project-footr.appspot.com",
        messagingSenderId: "568588022246"
    }
};
