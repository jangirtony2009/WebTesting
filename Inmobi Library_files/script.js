// Method to initialize the MesonWebSDK

  const mesonWebClient = new MesonWebSDK({
    appId: '',
    source: 'glance',
    // mode: 'direct',
  });

  mesonWebClient.init();

  mesonWebClient.onSDKInitSuccess(() => {
    document.getElementById("console-log").innerHTML += `MesonSDK : 😎 SDK is successfully initialized 😎<br>`;
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
    document.getElementById("console-log").innerHTML += `Interstitial : Ad Loaded!!! Yipeee!! ${JSON.stringify(requestId)}<br>`;
    adInstance.show();
  });

   adInstance?.onAdLoadFailed((error) => {
      document.getElementById("console-log").innerHTML += `Interstitial : Load failed received on client side: ${JSON.stringify(error)}<br>`;
    });

    adInstance?.onAdClicked((requestId) => {
      document.getElementById("console-log").innerHTML += `Interstitial : Ad Load Clicked!!! Yipeee!! ${JSON.stringify(requestId)}<br>`;
    });

    adInstance.onAdImpression((info) => {
      document.getElementById("console-log").innerHTML += `Interstitial : onAdImpression ==> ${JSON.stringify(info)}<br>`;
    });

    adInstance.onAdDismissed((info) => {
      document.getElementById("console-log").innerHTML += `Interstitial : onAdDismissed ==> ${JSON.stringify(info)}<br>`;
    });

  adInstances.push(adInstance);
}

function loadBanner() {
  const config = getMockConfig();
  const adInstance = mesonWebClient.getBannerAd(config);
  adInstance?.load();

  adInstance?.onAdLoadSucceeded((requestId) => {
    console.log('onAdLoadSucceeded!!', requestId);
    // Optionally, you can call the showInterstitialAd function here if desired
    document.getElementById("console-log").innerHTML += `Banner :  Ad Loaded!!! Yipeee!! ${JSON.stringify(requestId)}<br>`;
  });

   adInstance?.onAdLoadFailed((error) => {
      document.getElementById("console-log").innerHTML += `Banner : Load failed received on client side: ${JSON.stringify(error)}<br>`;
    });

    adInstance?.onAdClicked((requestId) => {
      document.getElementById("console-log").innerHTML += `Banner : Ad Load Clicked!!! Yipeee!! ${JSON.stringify(requestId)}<br>`;
    });

    adInstance.onAdImpression((info) => {
      document.getElementById("console-log").innerHTML += `Banner : onAdImpression ==> ${JSON.stringify(info)}<br>`;
    });
}


// Helper method to get the mock configuration
function getMockConfig() {
  return {
    adUnitId: document.getElementById("adUnitId").value,
    gpid: document.getElementById("gpid").value,
    userAgent: window.navigator.userAgent,
    bundleId: document.getElementById("bundleId").value,
    refreshInterval: 0,
    overRideRedirect: false,
    width: parseInt(document.getElementById("width").value),
    height: parseInt(document.getElementById("height").value),
    containerId: 'bannerAdContainer',
    device: {
      lmt: 1,
    },
  };
}
