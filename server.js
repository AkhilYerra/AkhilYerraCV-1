const express = require('express');
const Twitter = require('twit');
const Spotify = require('node-spotify-api')
const app = express();
const client = new Twitter({
  consumer_key: '123123123123',
  consumer_secret: '123123123123',
  access_token: '123123123123',
  access_token_secret: '123123123123'
});

var spotify = new Spotify({
  id: '123123123123',
  secret: '123123123123'
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


app.listen(3000, () => console.log('Server running'));
