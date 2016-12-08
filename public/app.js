var app = function(){
  spotify = new SpotifyHelper("blur", "album");
  // SpotifyHelper.currentHelper = spotify;
  spotify.getNextResults();

}

window.onload = app;
