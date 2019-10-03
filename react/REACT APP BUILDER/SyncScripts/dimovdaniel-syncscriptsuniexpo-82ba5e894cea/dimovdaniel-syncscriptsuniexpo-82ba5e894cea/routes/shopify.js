var shopifyHelper = require('./shopifyhelper')
var Config=require('../config.js');
var FirebaseHolder=require('../db.js');

//Functions
function updateData(){
	shopifyHelper.startGettingCollectionsDirectlyFromShopify(Config.settings.shopifySite,function(data){
		console.log("Place to save the categories "+Config.settings.firestoreCollectionForCategories);
		for (var i = 0; i < data.length && data[i].handle!="all"; i++) {
				var currentItem=data[i];
				var singleColleciton = {
				 title: currentItem.title,
				 description: " ",
				 image: currentItem.photo
			 };
			 // Add a new document in collection 
			 var setDoc = FirebaseHolder.fbs.collection(Config.settings.firestoreCollectionForCategories).doc(currentItem.id+"").set(singleColleciton);
 
			 //Now get the products for this collection
			 shopifyHelper.getProductsFromCollections(Config.settings.shopifySite,currentItem.handle,currentItem.id,function(products,handler,collid){
				 console.log(handler+": "+products.length+" products.");
 
				 for (var p = 0; p < products.length; p++) {
					 var currentProduct=products[p];
					 currentProduct.description=currentProduct.body_html.replace(/<(?:.|\n)*?>/gm, '');
 
					 if(currentProduct.images){
						 currentProduct.image=currentProduct.images[0].src;
 
						 //Create the photos
						 for (var im = 1; im < currentProduct.images.length; im++) {
							 var currentPhoto=currentProduct.images[im];
							 var setDocImage = FirebaseHolder.fbs.collection(Config.settings.firestoreCollectionForProduct+"/"+currentProduct.id+"/photos").doc(currentPhoto.id+"").set({
								 photo:currentPhoto.src
							 });
						 }
 
					 }
					 currentProduct.price=currentProduct.variants[0].price;
					 for (var v = 0; v < currentProduct.variants.length; v++) {
							 var currentVariant=currentProduct.variants[v];
							 currentVariant.variant_id=currentVariant.id; //Because the app overrides the id element
							 var setDocVariant = FirebaseHolder.fbs.collection(Config.settings.firestoreCollectionForProduct+"/"+currentProduct.id+"/variants").doc("variant"+(v+1)).set(currentVariant);
						 }
 
					 currentProduct.collection_product=FirebaseHolder.fbs.doc("products_shopify_collection/"+collid+"");
 
					 //Handle the options
					 var rawOptions=currentProduct.options;
					 var modifiedOptions={};
					 for (var op = 0; op < rawOptions.length; op++) {
						 currentOption=rawOptions[op];
						 modifiedOptions["option"+(op+1)]=currentOption;
					 }
					 currentProduct.options=modifiedOptions;
 
					 // Add a new document in collection 
					 var setDocProduct = FirebaseHolder.fbs.collection(Config.settings.firestoreCollectionForProduct).doc(currentProduct.id+"").set(currentProduct);
 
				 }
			 })
		}
		//Collections are in data;
		console.log("All collection are received and saved");
   },true);
}
exports.updateData=updateData;
