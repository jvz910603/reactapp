
import appConfig from './app.json'

//FireBase  --- CHANGE THEM WITH YOUR OWN FIREBASE DB
<!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="https://www.gstatic.com/firebasejs/7.0.0/firebase-app.js"></script>

<!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#available-libraries -->
<script src="https://www.gstatic.com/firebasejs/7.0.0/firebase-analytics.js"></script>

<script>
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyB6jySCLD_GaRtdYfEKZs8f2w0l4p3ca7A",
    authDomain: "reactapp-efa58.firebaseapp.com",
    databaseURL: "https://reactapp-efa58.firebaseio.com",
    projectId: "reactapp-efa58",
    storageBucket: "reactapp-efa58.appspot.com",
    messagingSenderId: "66680723590",
    appId: "1:66680723590:web:336d9e403ba68f44c65907",
    measurementId: "G-GFJ4MW28P7"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
</script>
};


exports.paypal={
  acceptPayments:true, // Set this to false if you don't want to accept paypal payments
  sandBoxMode:true,
  clientID:"Af_H2HSMUFkVQsDfIggWgobv-QK59pLOR6iX77TpEWLUN8ob0eBGCg48CBX1gcifFKUdu0YHRfyS6Tnl",
  secretKey:"EHrmFLREuoQ7FMIEITEKckqydqhtQan07pIy0Uhc1TnNmmE33_xWfqlFoBXHg7gjuismQQaNoSzMLWIS",
  return_url:"https://envato.com/#products", //Replace it with your own webpage thank-you site
  cancel_url:"https://market.envato.com/", //Replace it with your own webpage cancel url
  includeShippingInfo:true,
  currency:"$",
  state:"CA",//Checkc PayPalPayment.js in components to see how it is used, If it is not static, allow user to enter it in submit screen
  country_code:"US", //Country code must be 2-character ISO 3166-1 value (upper case)
  postal_code: "95131", //Required postal code - If it is not static, allow user to enter it in submit screen
  city: "San Jose", //Required city - If it is not static, allow user to enter it in submit screen
}

exports.loginSetup={
  welcomeText:"Welcome to React  App",
  facebookLogin:true, //Do we have Facebook login
  facebookID:"178511486175063",
  googleLogin:true, //Do we have Google login
  googleIOSid:"148773293873-o35mgo7q5ceea45v4fhd9uqivgtjlh4j.apps.googleusercontent.com",
  googleAndroidId:"419235345147-5ld8h97mhnk6qq257djds3bu1l9acfuu.apps.googleusercontent.com"
}


exports.sendEmailWhenOrderPlacer=true;

//Choose which style for profile sceen you want to use 
//1. For style 1 enter -> ProfileOption1
//2. For style 2 enter -> ProfileOption2 
exports.profileScreensInSubMenu=true; //Are our profiles screen under some menu
exports.profileScreen='ProfileOption1',

//ADS IDs
// -------- Do you want ads to be shown - Controller from firebase ------ //
exports.showBannerAds = false;
exports.showinterstitialAds = false;

// -------- Enter your adMob ids here - Controller from firebase  ------- //
exports.bannerID = "";
exports.interstitialID = "";
exports.isTesting=true; //On ios device ads show only if you cpecifically set that this is test mode


//The Sendgrid KEY   --- CHANGE THEM WITH YOUR OWN SENDGRID
exports.SENDGRID_API_KEY="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";

//Orders are sent to --- CHANGE IT WITH YOUR OWN EMAIL
exports.sendToEmail="contact@mobidonia.com" //YOU CAN USE SMOOCH.IO email here

//Do you want BarCode Scanner to be shown
exports.showBCScanner = false;

//Used for the Firebase RunTime setup
exports.config = null

//Set this to true if you want to preview the demo apps
exports.isPreview=false;
