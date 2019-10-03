var shopify = require('./routes/shopify');
var radio = require('./routes/radios');
var Config= require('./config.js');
var CronJob = require('cron').CronJob;

console.log("Script started, waiting for the correct time ")
new CronJob(Config.settings.cronInterval, function() {
  
  if(Config.settings.startShopify){
    console.log("Starting Shopify Sync")
    shopify.updateData();
  }

  if(Config.settings.startRadio){
    console.log("Starting Radio Sync")
    radio.getRadioStations();
  }


   
  }, null, true, Config.settings.timeZone);


  

