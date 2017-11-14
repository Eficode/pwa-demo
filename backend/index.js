const webpush = require('web-push');

/*
 GCMAP api keys are generated only once like: const vapidKeys = webpush.generateVAPIDKeys();
 These keys are auto generated, if you need to generate your own keys please use this command
 or see console commands from github.

 Config values are generated from service worker registeration which will be logged in the developer console
*/

webpush.setGCMAPIKey('BIuZ-RVsFwbj6AowVqy2_HNnI98s3jDZcYH93uoNsw8X8Za2spC7SR6vgL8U_pRHOeQNLOxCykG9Akxg8tOO-vg');
webpush.setVapidDetails(
  'mailto:pepper@eficode.com',
  'BIuZ-RVsFwbj6AowVqy2_HNnI98s3jDZcYH93uoNsw8X8Za2spC7SR6vgL8U_pRHOeQNLOxCykG9Akxg8tOO-vg',
  'qZpKV0HcQs27tXfcH-OP86AbpZwpcPyDQOxqWNDYNNc'
);

const config = {
  'endpoint': '',
  'expirationTime': null,
  'keys': {
    'p256dh': '',
    'auth': ''
  }
}

webpush.sendNotification(config, 'Logging from backend');
