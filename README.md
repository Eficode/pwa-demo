# Progressive Web app demo for Eficode

## Get your pixabay api key

1. register at https://pixabay.com/ to get api key
2. Copy paste your api key from https://pixabay.com/api/docs/ to app/scripts/main.js in the beginning: appKey

## Steps to install and run

1. npm install
2. npm start
3. App should open in browser and work

## What to do?

1. Open developer tools > application and inspect following files:

* Manifest - identity, presentation, icons
* Service workers - Service worker should be green and activated

2. From service worker check "offline" and see if images load offline from SW cache
3. Click "Enable push messaging" to register for push messages
4. From console.log message copy keys and endpoint to backend/index.js file to corresponding fields
5. From devtools and service worker view test push from devtools. It should send push message
6. Run "npm run pushmessage" to send push message from fake backend which is located in backend/index.js
7. You should see push message sent from backend.

# Links

1. Web push library for backend:
https://github.com/web-push-libs/web-push

2. Workbox used to generate Manifest
https://developers.google.com/web/tools/workbox/

3. Lighthouse to audit your website
https://developers.google.com/web/tools/lighthouse/

4. caniuse.com to see compatibility
https://caniuse.com/

5. Google introduction to progressive web apps
https://developers.google.com/web/ilt/pwa/introduction-to-progressive-web-app-architectures-slides

6. Google web starter kit for progressive web apps
https://github.com/google/web-starter-kit
