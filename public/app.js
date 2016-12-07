var app = function(){
  spotify = new SpotifyHelper("christmas", "album");
  // SpotifyHelper.currentHelper = spotify;
  spotify.getNextResults();

}

window.onload = app;
