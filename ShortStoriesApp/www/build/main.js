webpackJsonp([0],{

/***/ 108:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 108;

/***/ }),

/***/ 149:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 149;

/***/ }),

/***/ 193:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(54);
/// <reference path="../../../plugins/cordova-plugin-mfp/typings/worklight.d.ts" />
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var HomePage = /** @class */ (function () {
    function HomePage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    //Fetches the story content of the selected story
    HomePage.prototype.getObjectData = function () {
        var numbers = document.getElementById("stories");
        var selectedStory = numbers.selectedOptions[0].value;
        var dataRequest = new WLResourceRequest("/adapters/JavaAdapter/cos/getObjectData/" + encodeURI(selectedStory), WLResourceRequest.GET);
        dataRequest.send().then(function (response) {
            var responseContent = response.responseText;
            document.getElementById("objectcontent").innerHTML = responseContent;
        }, function (failure) {
            document.getElementById("objectcontent").innerHTML = JSON.stringify(failure);
            console.log('failure from adapter : ' + JSON.stringify(failure));
        });
    };
    //Gets a list of available stories in the bucket
    HomePage.prototype.getStories = function () {
        document.getElementById("addDiv").style.display = "none";
        var dataRequest = new WLResourceRequest("/adapters/JavaAdapter/cos/", WLResourceRequest.GET);
        dataRequest.send().then(function (response) {
            var responseContent = response.responseText;
            if (responseContent.includes("Forbidden") == false && responseContent.includes("Exception") == false) {
                var xmlDoc = new DOMParser().parseFromString(responseContent, "text/xml");
                var keys = xmlDoc.getElementsByTagName("Key");
                var len = keys.length;
                var counter = 0;
                while (counter < len) {
                    var node = document.createElement("li");
                    var txt = document.createTextNode(keys[counter].innerHTML);
                    node.appendChild(txt);
                    document.getElementById("objects").appendChild(node);
                    counter++;
                    var storynumbers = document.getElementById("stories");
                    var option = document.createElement("option");
                    option.innerHTML = counter + "";
                    option.value = keys[counter - 1].innerHTML;
                    storynumbers.appendChild(option);
                }
                console.log('success. repsonse is : ' + responseContent);
                document.getElementById("objects").style.display = "block";
                document.getElementById("stories").style.display = "block";
                document.getElementById("storiestext").style.display = "block";
                document.getElementById("loadbtn").style.display = "block";
                document.getElementById("getDiv").style.display = "block";
            }
            else {
                document.getElementById("storiestext").innerHTML = responseContent + "\n Check auth token or network in adapter";
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
    };
    //Shows the div containing add option controls
    HomePage.prototype.showAddStory = function () {
        document.getElementById("getDiv").style.display = "none";
        document.getElementById("addDiv").style.display = "block";
    };
    //Adds the story to the COS instance
    HomePage.prototype.addStory = function () {
        var story = document.getElementById("storycontent").value;
        var storytitle = document.getElementById("storyName").value;
        var dataRequest = new WLResourceRequest("/adapters/JavaAdapter/cos/putObjectData/" + encodeURI(storytitle) + "/" + encodeURI(story), WLResourceRequest.PUT);
        dataRequest.send().then(function (response) {
            var responseContent = response.responseText;
            document.getElementById("storyaddresult").innerHTML = responseContent;
        }, function (failure) {
            document.getElementById("storyaddresult").innerHTML = JSON.stringify(failure);
            console.log('failure from adapter : ' + JSON.stringify(failure));
        });
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/Users/bob/cameApp/src/pages/home/home.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      Short Stories App\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content class="home">\n  <ion-card>\n    <ion-card-content>\n      Hello! This app lets you read short stories. You can also add your own stories! :)\n<br><br>\n      <button (click)="getStories()">Get all stories</button>\n<br><br>\n<div>OR</div>\n<br>\n      <button (click)="showAddStory()">Add story</button>\n<br>\n<div id="getDiv" style="display:none">\n      <div class = "list">\n        <ol type="1" id="objects">\n        </ol>\n      </div>\n\n<br>\n\n      <div>\n        <div id="storiestext">Select the story to be loaded : </div>\n        <select id="stories"></select>\n        <button id="loadbtn" (click) = "getObjectData()">Load</button>\n      \n      </div>\n\n        <br>\n        <div><p id="objectcontent"></p></div>\n\n      </div>\n      <div id="addDiv" style="display:none;">\n<div>Enter a name for your short story : </div>\n<input id="storyName"/>\n<br>\n<div></div>\n<br>\n<textarea id="storycontent">\n</textarea>\n<br>\n<button (click)="addStory()">Add to COS</button>\n<br>\n<div><p id="storyaddresult"></p></div>\n      </div>\n    </ion-card-content>\n  </ion-card>\n</ion-content>\n'/*ion-inline-end:"/Users/bob/cameApp/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* NavController */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 194:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(195);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(217);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 217:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(189);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(192);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(267);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_home_home__ = __webpack_require__(193);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */], {}, {
                    links: []
                })
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicErrorHandler */] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 267:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(192);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(189);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(193);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/bob/cameApp/src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/Users/bob/cameApp/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ })

},[194]);
//# sourceMappingURL=main.js.map