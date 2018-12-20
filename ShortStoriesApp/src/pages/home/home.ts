
/// <reference path="../../../plugins/cordova-plugin-mfp/typings/worklight.d.ts" />


import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
 public base64Image: string;
  constructor(public navCtrl: NavController) {

  }

//Fetches the story content of the selected story
  getObjectData(){
    var numbers = (<HTMLSelectElement>document.getElementById("stories"));
    var selectedStory = numbers.selectedOptions[0].value;
    var dataRequest = new WLResourceRequest("/adapters/JavaAdapter/cos/getObjectData/"+encodeURI(selectedStory), WLResourceRequest.GET);
     dataRequest.send().then(function (response) {
            var responseContent = response.responseText;
            document.getElementById("objectcontent").innerHTML = responseContent;
        }, function (failure) {
                document.getElementById("objectcontent").innerHTML = JSON.stringify(failure);
                console.log('failure from adapter : ' + JSON.stringify(failure));
        });
  }

//Gets a list of available stories in the bucket
  getStories(){
            document.getElementById("addDiv").style.display = "none";
            var dataRequest = new WLResourceRequest("/adapters/JavaAdapter/cos/", WLResourceRequest.GET);
            dataRequest.send().then(function (response) {
            var responseContent = response.responseText;
            if(responseContent.includes("Forbidden") == false && responseContent.includes("Exception")==false){
              var xmlDoc = new DOMParser().parseFromString(responseContent, "text/xml");
              var keys = xmlDoc.getElementsByTagName("Key");
              var len = keys.length;
              var counter = 0;
              while(counter<len) {
                  var node = document.createElement("li");
                  var txt = document.createTextNode(keys[counter].innerHTML);
                  node.appendChild(txt);
                  document.getElementById("objects").appendChild(node);
                  counter++;
                  var storynumbers = document.getElementById("stories");
                  var option = document.createElement("option");
                  option.innerHTML = counter+"";
                  option.value = keys[counter-1].innerHTML;
                  storynumbers.appendChild(option);
              }
              console.log('success. repsonse is : ' + responseContent);
              document.getElementById("objects").style.display = "block";
              document.getElementById("stories").style.display = "block";
              document.getElementById("storiestext").style.display = "block";
              document.getElementById("loadbtn").style.display = "block";
              document.getElementById("getDiv").style.display = "block";
            }else{
              document.getElementById("storiestext").innerHTML = responseContent+"\n Check auth token or network in adapter";
              document.getElementById("objects").style.display = "none";
              document.getElementById("stories").style.display = "none";
              document.getElementById("storiestext").style.display = "block";
              document.getElementById("getDiv").style.display = "block";
            }
            }, function (failure) {
                document.getElementById("storiestext").innerHTML = JSON.stringify(failure);
                console.log('failure from adapter : ' + JSON.stringify(failure));
                document.getElementById("storiestext").style.display = "block";
                document.getElementById("getDiv").style.display = "block";
            });
        }

//Shows the div containing add option controls
  showAddStory(){
      document.getElementById("getDiv").style.display = "none";
      document.getElementById("addDiv").style.display = "block";
  }


//Adds the story to the COS instance
  addStory(){
    var story = (<HTMLTextAreaElement>document.getElementById("storycontent")).value;
    var storytitle = (<HTMLInputElement>document.getElementById("storyName")).value;
    var dataRequest = new WLResourceRequest("/adapters/JavaAdapter/cos/putObjectData/"+encodeURI(storytitle)+"/"+encodeURI(story), WLResourceRequest.PUT);
     dataRequest.send().then(function (response) {
            var responseContent = response.responseText;
            document.getElementById("storyaddresult").innerHTML = responseContent;
        }, function (failure) {
                document.getElementById("storyaddresult").innerHTML =  JSON.stringify(failure);
                console.log('failure from adapter : ' + JSON.stringify(failure));
        });
  }


}
