var FirebaseHolder=require('../db.js');
var Config=require('../config.js');
var Reader = require('radio-song');
var http = require('http');
var https = require('https');

//1.Get radio stations from firestore

/**
 * Get radio streams from firestore
 */
function getRadioStations() {
    //1. Connect with firestore -- 
    FirebaseHolder.fbs.collection(Config.settings.firestoreCollectionForRadios)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            link=doc.data().stream;
            var portIndex=link.lastIndexOf(":");
            link=link.substr(0,portIndex+5);
            //console.log(doc.id, " => ", link);
            getStreamTitle(doc.data(),doc.id);

            //ice
            //shout
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
}
exports.getRadioStations=getRadioStations;




//2. Get streaming informaions
function getStreamTitle(doc,id){
    url=doc.stream;
    var reader = new Reader(url)
    reader.on('metadata', function(songName) {
        data=songName.split(" - ");
        
        var song=songName;
        var artist="";
        if(songName.length>0&&data.length==2){
            song=data[1];
            artist=data[0];
        }
        getSongImage(artist,song,id,doc);

        

      });
      reader.on('error', function(e){
        console.log(e)
      });
}

//3. Get photo of the current song
function getSongImage(artist,song,id,doc) {
   //console.log(song+" <---> "+artist+" <---> "+id);
    var myreq = http.get("http://ws.audioscrobbler.com/2.0/?method=track.search&track="+song+"&api_key="+Config.settings.lastFMKey+"&format=json", 
                          function(r) {
                      
                                  var str="";
                                  var response={};
                                  
                                    
                                  r.setEncoding('utf8');
                                  r.on('data', function (chunk) {
                                     str += chunk;
                                  });
    
                    
    
                                  r.on('end', function () {
                                    var jsonObject = JSON.parse(str);
                                    if(jsonObject.results&&jsonObject.results.trackmatches&&jsonObject.results.trackmatches.track){
                                      jsonObject=jsonObject.results.trackmatches.track;
                                        //console.log('Number of tracks: '+jsonObject.length);
                                        if(jsonObject.length>0){
                                                var match=jsonObject[0];
                                                if(!match.image){
                                                    response.index=0;
                                                    for(var i=0;i<jsonObject.length;i++){
                                                        response.checkIndex=i;
                                                        if(jsonObject[i].image){
                                                            match=jsonObject[i];
                                                            response.index=i;
                                                            //break;
                                                        }
                                                    }
                                                }
                                                response.length=jsonObject.length;
                                                if(match.image){
                                                    response.photo=match.image[3]['#text']
                                                    response.icon=match.image[0]['#text']
                                                }
                                        }
                                    }
                                    
                                    //console.log(response)
                                    updatePhotoAndSong(song,artist,id,doc,response);
                                    
                                    
                                  });
    
     });



}





//4. Update the photo and current song
function updatePhotoAndSong(song,artist,id,doc,imageresponse) {
   /* console.log(song);
    console.log(artist);
    console.log(id);
    console.log(imageresponse);*/

    doc.currentSong=song;
    doc.currentArtist=artist;
    if(imageresponse!=null&&imageresponse.photo){
        doc.image=imageresponse.photo;
    }

    console.log(doc);

    var setDoc = FirebaseHolder.fbs.collection(Config.settings.firestoreCollectionForRadios).doc(id+"").set(doc);

}