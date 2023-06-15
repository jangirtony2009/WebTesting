// Method to initialize the MesonWebSDK

  const mesonWebClient = new MesonWebSDK({
    appId: '',
    source: 'glance',
    // mode: 'direct',
  });

  mesonWebClient.init();

  mesonWebClient.onSDKInitSuccess(() => {
    console.log(`😎 SDK is successfully initialized 😎`);
  });

  mesonWebClient.onSDKInitFail((info) => {
    console.log('onSDKInitFail ==>', info);
  });

let adInstances = [];

function loadInterstitialAd() {
  const config = getMockConfig();
  const adInstance = mesonWebClient.getInterstitialAd(config);
  adInstance?.load();

  adInstance?.onAdLoadSucceeded((requestId) => {
    console.log('onAdLoadSucceeded!!', requestId);
    // Optionally, you can call the showInterstitialAd function here if desired
    adInstance.show();
  });

  adInstance?.onAdLoadFailed((error) => {
    console.log('Load failed received on client side', error);
  });

  adInstance?.onAdClicked((requestId) => {
    console.log('Ad Load Clicked!!! Yipeee!!', requestId);
  });

  adInstance.onAdImpression((info) => {
    console.log('onAdImpression ==>', info);
  });

  adInstance.onAdDismissed((info) => {
    console.log('onAdDismissed ==>', info);
  });

  adInstances.push(adInstance);
}

function showInterstitialAd(index) {
  if (adInstances[index]) {
    adInstances[index].show();
  } else {
    console.log('No interstitial ad instance available.');
  }
}



// Helper method to get the mock configuration
function getMockConfig() {
  return {
    adUnitId: '06053301-b3f5-4a8d-bb75-12ceb0e957d9',
    gpid: '0512701e-ea36-4fb4-bd00-10ca1ad1abe1',
    userAgent: window.navigator.userAgent,
    bundleId: 'com.miui.android.fashiongallery',
    refreshInterval: 0,
    overRideRedirect: false,
    width: 200,
    height: 180,
    containerId: 'c1-ele',
    device: {
      lmt: 1,
    },
  };
}
