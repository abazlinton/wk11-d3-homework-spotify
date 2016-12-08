var SpotifyHelper = function(query, type){
  this.query = query;
  this.type = type;
  this.url = "https://api.spotify.com/v1/search?limit=3&q=";
  this.results = [];
  this.encodedUrl;
  this.initialise();
};

SpotifyHelper.prototype = {

  // scopePreserver: function(holdThis) {
  //   return this.getNextResults
  // },

  getNextResults: function(rightThis){

    var request = new XMLHttpRequest();

    // if we triggered getNextResults from the button press line below won't work properly as 'this' is now button
    var currentHelper = this;
    if (this.correctScope !== undefined) {
      currentHelper = this.correctScope;
    };
    request.open("GET", currentHelper.encodedUrl);
    request.onload = function(){
      if(this.status !== 200) return;
      var jsonString = this.responseText;
      var responseObject = JSON.parse(jsonString);
      // console.log(responseObject);
      currentHelper.results = responseObject.albums.items;
      currentHelper.encodedUrl = responseObject.albums.next;
      currentHelper.updateDom();
    };

    request.send();
  },

  updateDom: function() {
    var ul = document.getElementById('albums')
    while (ul.firstChild) {
      ul.removeChild(ul.firstChild);
    };
    this.results.forEach( function(result){
      var img = document.createElement('img');
      var li = document.createElement('li');
      img.src = result.images[0].url
      li.innerText = result.name + " - " + result.artists[0].name;
      ul.appendChild(li);
      ul.appendChild(img);
    });
    var body = document.querySelector('body');
      var nextButton = document.getElementById('next');
    // var oldLIs = document.getElementsByTagName('li');
    // nextButton.onclick = this.getNextResults;
      nextButton.correctScope = this;
    // nextButton.innerText = "Next";
    // body.appendChild(nextButton);
  },

  queryChanged: function(){
    if (this.value.length > 0){
      this.correctScope.encodedUrl = this.correctScope.url;
      this.correctScope.encodedUrl += encodeURIComponent(this.value);
      this.correctScope.encodedUrl += "&type=";
      this.correctScope.encodedUrl += this.correctScope.type;
      this.correctScope.getNextResults();
    }
  },

  initialise: function(){
    this.encodedUrl = this.url;
    this.encodedUrl += encodeURIComponent(this.query);
    this.encodedUrl += "&type=";
    this.encodedUrl += this.type;
    var nextButton = document.getElementById('next');
    nextButton.onclick = this.getNextResults;
    var queryBox = document.getElementById('search-query');
    queryBox.onkeyup = this.queryChanged;
    queryBox.correctScope = this;
  },
};
