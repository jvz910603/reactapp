var settings={
  serverPort:8000,
  appName:"Shopify Sync",
  shopifySite:"https://mobidonia.myshopify.com",  //Link to your shopify store
  firestoreCollectionForCategories:"product_collection_shopify", //Where to save the collections
  firestoreCollectionForProduct:"products_shopify", //Where to save the products
  firestoreCollectionForRadios:"radios", //Where to save the products
  cronInterval:"30 20 02 * * *", //How ofter should the cron job run https://github.com/kelektiv/node-cron,
  timeZone:'Europe/Skopje',
  startShopify:true,
  startRadio:true,
  lastFMKey:"fbf511a1574db0f922ee0cd2a9f5897c"

}
exports.settings=settings;


var config = {
  apiKey: "AIzaSyCH6wmL18AbDqCIXNsGBGINxzUnlPkB3bs",
  authDomain: "universalapp-a272a.firebaseapp.com",
  databaseURL: "https://universalapp-a272a.firebaseio.com",
  projectId: "universalapp-a272a",
  storageBucket: "universalapp-a272a.appspot.com",
  messagingSenderId: "35001014547"
};
exports.firebase=config;
