var SpotifyHelper = function(query, type){
  this.query = query;
  this.type = type;
  this.url = "https://api.spotify.com/v1/search?q=";
  this.results = [];
  this.encodedUrl;
  this.constructUrl();
};

SpotifyHelper.prototype = {

  getNextResults: function(){
    var request = new XMLHttpRequest();
    var currentHelper = this;
    request.open("GET", this.encodedUrl);
    request.onload = function(){
      if(this.status !== 200) return;
      var jsonString = this.responseText;
      var responseObject = JSON.parse(jsonString);
      // console.log(responseObject);
      currentHelper.results = currentHelper.results.concat(responseObject.albums.items);
      currentHelper.encodedUrl = responseObject.albums.next;
      currentHelper.updateDom();
    };

    request.send();
  },

  updateDom: function() {
    this.results.forEach( function(result){
      var ul = document.getElementById('albums')
      var li = document.createElement('li');
      li.innerText = result.name;
      ul.appendChild(li);
    });
    var body = document.querySelector('body');
    nextButton = document.createElement('button');
    nextButton.onclick = this.getNextResults;
    nextButton.innerText = "Next";
    body.appendChild(nextButton);
  },

  constructUrl: function(){
    this.encodedUrl = this.url;
    this.encodedUrl += encodeURIComponent(this.query);
    this.encodedUrl += "&type=";
    this.encodedUrl += this.type;
  },
};
