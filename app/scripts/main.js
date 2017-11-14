const config = {
  "appKey": "YOUR_API_KEY"
};

const applicationServerPublicKey = 'BIuZ-RVsFwbj6AowVqy2_HNnI98s3jDZcYH93uoNsw8X8Za2spC7SR6vgL8U_pRHOeQNLOxCykG9Akxg8tOO-vg';
const pushButton = document.querySelector('.button');
const baseUrl = 'https://pixabay.com/api/';
let isSubscribed = false;
let swRegistration = null;

async function fetchImages() {
  const url = new URL(baseUrl);
  const params = url.searchParams;
  params.set('key', config.appKey);
  params.set('image_type', 'photo');
  params.set('q', 'landscape');

  const response = await fetch(url.href);
  const json = await response.json();
  return json;
}

async function drawImages() {
  const imageContainer = document.querySelector('.image-container');
  const images = await fetchImages();
  images.hits.forEach((image, index) => {
    imageContainer.innerHTML += `
    <div class="panel panel${index}">
      ${image.tags}
    </div>`;
    let backgroundPanel = document.querySelector(`.panel${index}`);
    backgroundPanel.style.backgroundImage = `url(${image.webformatURL})`;
  });
};

drawImages();

const urlB64ToUint8Array = (base64String) => {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

if ('serviceWorker' in navigator && 'PushManager' in window) {
  console.log('Service Worker and Push is supported');

  navigator.serviceWorker.register('service-worker.js')
  .then((swReg) => {
    console.log('Service Worker is registered', swReg);

    swRegistration = swReg;
    initializeUI();
  })
  .catch((error) => {
    console.error('Service Worker Error', error);
  });
} else {
  console.warn('Push messaging is not supported');
  pushButton.textContent = 'Push Not Supported';
}

const updateSubscriptionOnServer = (subscription) => {
  console.log('updateSubscriptionOnServer', JSON.stringify(subscription));
};

const subscribeUser = () => {
  const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
  swRegistration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: applicationServerKey
  })
  .then((subscription) => {
    console.log('User is subscribed.');

    updateSubscriptionOnServer(subscription);
    isSubscribed = true;
    updateBtn();
  })
  .catch((err) => {
    console.log('Failed to subscribe the user: ', err);
    updateBtn();
  });
};

const unsubscribeUser = () => {
  swRegistration.pushManager.getSubscription()
  .then((subscription) => {
    if (subscription) {
      return subscription.unsubscribe();
    }
  })
  .catch((error) => {
    console.log('Error unsubscribing', error);
  })
  .then(() => {
    updateSubscriptionOnServer(null);
    console.log('User is unsubscribed.');
    isSubscribed = false;
    updateBtn();
  });
};

const updateBtn = () => {
  if (Notification.permission === 'denied') {
    pushButton.textContent = 'Push Messaging Blocked.';
    pushButton.disabled = true;
    updateSubscriptionOnServer(null);
    return;
  }

  if (isSubscribed) {
    pushButton.textContent = 'Disable Push Messaging';
  } else {
    pushButton.textContent = 'Enable Push Messaging';
  }

  pushButton.disabled = false;
};

const initializeUI = () => {
   pushButton.addEventListener('click', () => {
    pushButton.disabled = true;
    if (isSubscribed) {
      unsubscribeUser();
    } else {
      subscribeUser();
    }
  });

  swRegistration.pushManager.getSubscription()
  .then((subscription) => {
    isSubscribed = !(subscription === null);

    if (isSubscribed) {
      console.log('User IS subscribed.');
    } else {
      console.log('User is NOT subscribed.');
    }

    updateBtn();
  });
};
