const obj = window.GlanceAdClientInterface.init
(
{
surface: 'articles',
oem: 'Realme', //Hardcoded for RealMe but can be replaced by other OEM values. Replace RealMe with oemMap[oem] if you are integrating for other OEMs dynamically.
App: 'Glance',
sdkVersion: '<sdkv>',
region: '<optional>',
}
);


obj.onSDKInitFailed(()=>{
console.log(‘sdk failed’);
})
obj.onSDKInitSuccess(()=>{
console.log(‘sdk initialized’);


		function adInstances(){
		const bannerinstance = window.GlanceAdClientInterface.getProvider?.({
		adUnitName: ‘PartnerName_English_StickySmall_Bottom', // Connect with your Glance Account Manager for this value.
		pageName: '<Domain name>', //Connect with your Glance Account Manager for this value. categoryName: ‘Sports’, //Category of the article in your Content Management System.
		placementName: 'StickySmall'//See AdUnitName table for more info containerID: <Div ID>,
		height: 50,
		width: 320,
		xc: “12.0”,
		yc: '3.0',
		gpid: <GPID from the URL> See Appendix to learn more about extracting GPID from a URL. });
		return bannerinstance
		}
		var AdBannerInstance = adInstances()
})