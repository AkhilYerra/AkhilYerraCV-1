const express = require('express');
const Twitter = require('twit');
const Spotify = require('node-spotify-api')
const app = express();
const port=process.env.PORT || 4200

const client = new Twitter({
  consumer_key: 'cqpW07aEmhbpeGAI0Jf6eT4hC',
  consumer_secret: 'luPksK1GDz3KX2GDcAUGJ8oVzZUjT5otlqX2SlE9yFYLaooH1v',
  access_token: '491873327-DcdcK23zGnW0NNiaJw6DWczSnTa48iCz3soOoYUK',
  access_token_secret: 'B0b2PnzOhwlRUJ1efvnZHftFBs6y24c8ihaDbiKqBdFsM'
});

var spotify = new Spotify({
  id: '977951575bfb4d16a577669f4ca18488',
  secret: '2ccfabf3aa804373aa6db9f2e962e9ca'
});

app.use(require('cors')());
app.use(require('body-parser').json());

app.get('/api/artists:id', (req, res) => {
  console.log("SENT");
  id = req.params.id;
  console.log(id);
  spotify.request(`https://api.spotify.com/v1/artists/${id}`)
  .then(function(data) {
    console.log(data); 
    res.send(data);
  })
  .catch(function(err) {
    console.error('Error occurred: ' + err); 
  });
});

app.get('/api/tracks:id', (req, res) => {
  console.log("SENT");
  id = req.params.id;
  console.log(id);
  spotify.request(`https://api.spotify.com/v1/tracks/${id}`)
  .then(function(data) {
    console.log(data); 
    res.send(data);
  })
  .catch(function(err) {
    console.error('Error occurred: ' + err); 
  });
});

app.get('/api/albums:id', (req, res) => {
  console.log("SENT");
  id = req.params.id;
  console.log(id);
  spotify.request(`https://api.spotify.com/v1/albums/${id}`)
  .then(function(data) {
    console.log(data); 
    res.send(data);
  })
  .catch(function(err) {
    console.error('Error occurred: ' + err); 
  });
});

app.get('/api/searchArtist:id', (req, res) => {
  console.log("SENT");
  id = req.params.id;
  console.log(id);
  spotify.request(`https://api.spotify.com/v1/search?q=${id}&type=artist`)
  .then(function(data) {
    console.log(data); 
    res.send(data);
  })
  .catch(function(err) {
    console.error('Error occurred: ' + err); 
  });
});

app.get('/api/searchAlbum:id', (req, res) => {
  console.log("SENT");
  id = req.params.id;
  console.log(id);
  spotify.request(`https://api.spotify.com/v1/search?q=${id}&type=album`)
  .then(function(data) {
    console.log(data); 
    res.send(data);
  })
  .catch(function(err) {
    console.error('Error occurred: ' + err); 
  });
});

app.get('/api/searchSong:id', (req, res) => {
  console.log("SENT");
  id = req.params.id;
  console.log(id);
  spotify.request(`https://api.spotify.com/v1/search?q=${id}&type=track`)
  .then(function(data) {
    console.log(data); 
    res.send(data);
  })
  .catch(function(err) {
    console.error('Error occurred: ' + err); 
  });
});


app.get('/api/trends/place', (req, res) => {
  var woeid = 1
  client.get('trends/place', {
    id: woeid
  }, function (err, data, response) {
    res.send(data);
  });

});


app.listen(process.env.PORT || 4200, () => console.log('Server running'));


var distDir = __dirname + "/dist/";
app.use(express.static(distDir));
