const webpush = require('web-push');

webpush.setGCMAPIKey('BIuZ-RVsFwbj6AowVqy2_HNnI98s3jDZcYH93uoNsw8X8Za2spC7SR6vgL8U_pRHOeQNLOxCykG9Akxg8tOO-vg');
webpush.setVapidDetails(
  'mailto:pepper@eficode.com',
  'BIuZ-RVsFwbj6AowVqy2_HNnI98s3jDZcYH93uoNsw8X8Za2spC7SR6vgL8U_pRHOeQNLOxCykG9Akxg8tOO-vg',
  'qZpKV0HcQs27tXfcH-OP86AbpZwpcPyDQOxqWNDYNNc'
);

const config = {
  'endpoint': 'https://fcm.googleapis.com/fcm/send/cruoURNz5N8:APA91bGRD-ED0wYwNRoTQ97BCfJLYZfORLO3dw395zgBDDwXaMMCKeUfvwk9fif-FnyvxWACNSgAQJiLCMN0Sb0TdhztvlNoVAwI7efInRXvvWsZNvCBEoASBQj0FJc3AY6A_GzzpmMx',
  'expirationTime': null,
  'keys': {
    'p256dh': 'BL0159_ng6XdSSwchUgahZpRzQu1f8npinVl8n8JY-oOQv94P6uvi3HLM7gQMK6npi_9b8XRA1A54JAPoAMBBPQ=',
    'auth': 'WVtiOliA70b93cApu2Nogw=='
  }
}

webpush.sendNotification(config, 'Logging from backend');
