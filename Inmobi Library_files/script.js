// Global variables and event listeners declaration

var req_ctr = 0;
var req_no = 1;
const form = document.getElementById("myform");
function handleForm(event) { 
  event.preventDefault(); 
} 
form.addEventListener('submit', handleForm);


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
  //console.log(config)
  const adInstance = mesonWebClient.getInterstitialAd(config);
  adInstance?.load();
  req_ctr ++ ;
  adInstance?.onAdLoadSucceeded((requestId) => {
    console.log('onAdLoadSucceeded!!', requestId);
    // Optionally, you can call the showInterstitialAd function here if desired
    document.getElementById("console-log").innerHTML += `Interstitial : Ad Loaded!!! Yipeee!! ${JSON.stringify(requestId)}<br>
    Number of requests tried: ${req_ctr}<br>`;
    //console.log('Number of requests : ', req_ctr);
    req_ctr = 0;
    adInstance.show();
  });

   adInstance?.onAdLoadFailed((error) => {
    console.log('onAdLoadFailed!', requestId);
      document.getElementById("console-log").innerHTML += `Interstitial : Load failed received on client side: ${JSON.stringify(error)}<br>`;
      req_ctr < req_no && loadInterstitialAd()
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

function check() {
  const form = document.getElementById("myform");
  if(form.checkValidity()){
    req_no = document.getElementById("noreq").value;
    console.log("no of req: ",req_no)
    req_ctr = 0;
    document.getElementById("adType").value === 'banner' ? loadBanner() : loadInterstitialAd()
  }
}
function loadBanner() {
  updateBannerConatiner()
  const config = getMockConfig();
  var adInstance = mesonWebClient.getBannerAd(config);
  console.log(adInstance)
  adInstance?.load();
   req_ctr ++ ;
  adInstance?.onAdLoadSucceeded((requestId) => {
    console.log('onAdLoadSucceeded!!', requestId);
    // Optionally, you can call the showInterstitialAd function here if desired
    document.getElementById("console-log").innerHTML += `Banner :  Ad Loaded!!! Yipeee!! ${JSON.stringify(requestId)}<br>
    Number of requests tried: ${req_ctr}<br>`;
    req_ctr = 0;
  });

   adInstance?.onAdLoadFailed((error) => {
    console.log('onAdLoadFailed!');
      document.getElementById("console-log").innerHTML += `Banner : Load failed received on client side: ${JSON.stringify(error)}<br>`;
      req_ctr < req_no && loadBanner()
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
    userAgent: document.getElementById("uagent").value,
    bundleId: document.getElementById("bundleId").value,
    refreshInterval: 0,
    overRideRedirect: false,
    width: parseInt(document.getElementById("width").value),
    height: parseInt(document.getElementById("height").value),

    containerId: 'bannerAdContainer',
    device: {
      lmt: parseInt(document.getElementById("lmtval").value),
    },
  }}

function updateBannerConatiner() {
       var widthInput = document.getElementById("width");
      var heightInput = document.getElementById("height");
      var bannerContainer = document.getElementById("bannerAdContainer");

      var width = parseInt(widthInput.value);
      var height = parseInt(heightInput.value);

      bannerContainer.style.width = width + "px";
      bannerContainer.style.height = height + "px";
  };
