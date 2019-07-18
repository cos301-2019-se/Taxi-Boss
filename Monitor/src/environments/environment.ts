/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebaseConfig : {
    apiKey: "AIzaSyDcPdaDs-ixSojbM4P_DhOO4-x05QG0_08",
    authDomain: "taxi-boss.firebaseapp.com",
    databaseURL: "https://taxi-boss.firebaseio.com",
    projectId: "taxi-boss",
    storageBucket: "taxi-boss.appspot.com",
    messagingSenderId: "99448085876",
    appId: "1:99448085876:web:42157fda8280ee8e"
  }
};
