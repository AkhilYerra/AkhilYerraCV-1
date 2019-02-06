import { Component, OnInit, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap'
import { Tweet } from '../model/tweet.model';
import { Trends } from '../model/trends.model';
import { TwitterService } from '../model/twitterAPI.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { topArtist } from '../model/topArtist.model';
import { HashTable } from 'angular-hashtable';
import { SpotifyService } from '../model/spotifyAPI.service'
import { Artist } from '../model/artist.model'
import { searchArtist } from '../model/searchArtist.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Pipe, PipeTransform } from '@angular/core';
import { Track } from '../model/track.model'
import { searchTrack } from '../model/searchTrack.model';
import { searchAlbum } from '../model/searchAlbum.model';
import { Album } from '../model/album.model'
@Pipe({ name: 'safe' })
@Component({
  selector: 'akhil',
  templateUrl: './akhil.component.html',
  styleUrls: ['./akhil.component.css'],
  providers: [TwitterService, SpotifyService]
})
export class AkhilComponent implements OnInit {
  constructor(private modalService: BsModalService, private sanitizer: DomSanitizer, private twitter: TwitterService, private httpService: HttpClient, private spotify: SpotifyService) { }
  //Variables for age calculation
  dateString: Observable<String>
  ageCalc: String;
  now = new Date();
  private birthdate = new Date("07/19/1997 13:32:00");
  //Variables for Twitter API stuff
  modalRef: BsModalRef;
  trendLocation: any;
  Trends = [];
  trendClicked: boolean;
  //Variables for Music Graph
  serverChartData: any;
  chartLabels = [];
  chartDataPlays = [];
  title: string;
  chartOptions: any;
  chartData = [];
  labels: any;
  colors: any;
  hasLoaded: boolean;
  topArtistList: HashTable<string, any>;
  topArtistArray = [];
  topAlbumList: HashTable<string, any>;
  topAlbumArray = [];
  selected: string;
  spotifyArtist: searchArtist;
  artistID: string;
  trackID: string;
  url: SafeResourceUrl;
  spotifyLoaded: boolean;
  spotifyTrack: searchTrack;
  spotifyAlbum: searchAlbum;
  spotifyAlbumObject: Album;
  spotifyModalTitle: string;
  imageIcon: string;



  ngOnInit() {
    setInterval(() => {         //replaced function() by ()=>
      this.now = new Date();
      this.dateDifferenceCalc() // just testing if it is working
    }, 1000);

    this.selected = "Song";
    this.httpService.get('./assets/data/iTunes.json', { responseType: 'json' }).subscribe(
      data => {
        this.serverChartData = data as any[];
        if (this.selected == "Song") {
          this.transformBySong();
        } else if (this.selected == "Artist") {
          this.transformByArtist();
        } else if (this.selected == "Album") {
          this.transformByAlbum();
        } else {
          this.transformBySong();
        }
        this.hasLoaded = true;
      },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      }
    );


  }

  whatsTrending(){
    console.log("OKAY")
    this.trendClicked = true;
    this.twitter.trends().subscribe(trend => {
      this.trendLocation = trend;
      for (var i = 0; i < this.trendLocation[0].trends.length; i++) {
        this.Trends[i] = this.trendLocation[0].trends[i].name;
      }
      this.trendClicked = true;
      // this.Trends.subscribe();
    });

  }

  transformIssue() {
    this.httpService.get('./assets/data/iTunes.json', { responseType: 'json' }).subscribe(
      data => {
        this.chartData.length = 0;
        this.chartDataPlays.length = 0;
        this.chartLabels.length = 0;
        this.labels.length = 0;
        this.title = "";
        this.colors = null;
        //this.topArtistList = null;
        this.topArtistArray.length = 0;
        //this.topAlbumList = null;
        this.topAlbumArray.length = 0;
        this.hasLoaded = false;
        if (!this.serverChartData) {
          this.serverChartData = data as any[];
        }
        if (this.selected == "Song") {
          this.transformBySong();
        } else if (this.selected == "Artist") {
          this.transformByArtist();
        } else if (this.selected == "Album") {
          this.transformByAlbum();
          console.log(this.labels);
        } else {
          this.transformBySong();
        }
        this.hasLoaded = true;
      },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      }
    );

  }

  transformByAlbum() {
    this.spotifyLoaded = false;
    this.topAlbumList = new HashTable<string, any>();
    for (var i = 0; i < this.serverChartData.length; i++) {
      if (this.topAlbumList) {
        if (this.topAlbumList.has(this.serverChartData[i].Album) && (this.topAlbumList != null)) {
          var currentPlays = parseInt(this.topAlbumList.get(this.serverChartData[i].Album));
          var totalPlays = currentPlays + parseInt(this.serverChartData[i].Plays);
          if (!this.serverChartData[i].Album.includes("(A)")) {
            this.topAlbumList.put(this.serverChartData[i].Album, totalPlays);
          }
        } else {
          var albumName = this.serverChartData[i].Album;
          var initialPlays = parseInt(this.serverChartData[i].Plays);
          if (albumName) {
            if (!albumName.includes("(A)")) {
              this.topAlbumList.put(albumName, initialPlays);
            }
          }
        }
      } else {
        var albumName = this.serverChartData[i].Album;
        var initialPlays = parseInt(this.serverChartData[i].Plays);
        if (!albumName.includes("(A)")) {
          this.topAlbumList.put(albumName, initialPlays);
        }
      }
    }
    this.topAlbumList.forEach((key, value) => {
      var object = [`${key}`, value];
      this.topAlbumArray.push(object);
    });
    this.topAlbumArray.sort(function (a, b) { return b[1] - a[1] });

    if (this.topAlbumArray.length > 15) {
      for (var i = 0; i < 15; i++) {
        this.chartLabels.push(this.topAlbumArray[i][0]);
        this.chartDataPlays.push(this.topAlbumArray[i][1]);
      }
    } else {
      for (var i = 0; i < this.topAlbumArray.length; i++) {
        this.chartLabels.push(this.topAlbumArray[i][0]);
        this.chartDataPlays.push(this.topAlbumArray[i][1]);
      }
    }
    this.title = 'Most Listened to Albums via Apple Music';

    this.chartOptions = {
      responsive: true    // THIS WILL MAKE THE CHART RESPONSIVE (VISIBLE IN ANY DEVICE).
    }
    this.labels = this.chartLabels;
    this.chartData = [
      {
        label: "Number of Plays",
        data: this.chartDataPlays,
      }
    ];
    this.colors = [{ backgroundColor: 'rgba(255,192,203, 1)' },];
  }

  transformByArtist() {
    this.spotifyLoaded = false;
    this.topArtistList = new HashTable<string, any>();
    for (var i = 0; i < this.serverChartData.length; i++) {
      if (this.topArtistList) {
        if (this.topArtistList.has(this.serverChartData[i].Artist) && (this.topArtistList != null)) {
          var currentPlays = parseInt(this.topArtistList.get(this.serverChartData[i].Artist));
          var totalPlays = currentPlays + parseInt(this.serverChartData[i].Plays);
          this.topArtistList.put(this.serverChartData[i].Artist, totalPlays);
        } else {
          var artistName = this.serverChartData[i].Artist;
          var initialPlays = parseInt(this.serverChartData[i].Plays);
          this.topArtistList.put(artistName, initialPlays);
        }
      } else {
        var artistName = this.serverChartData[i].Artist;
        var initialPlays = parseInt(this.serverChartData[i].Plays);
        this.topArtistList.put(artistName, initialPlays);
      }
    }
    this.topArtistList.forEach((key, value) => {
      var object = [`${key}`, value];
      this.topArtistArray.push(object);
    });
    this.topArtistArray.sort(function (a, b) { return b[1] - a[1] });

    if (this.topArtistArray.length > 15) {
      for (var i = 0; i < 15; i++) {
        this.chartLabels.push(this.topArtistArray[i][0]);
        this.chartDataPlays.push(this.topArtistArray[i][1]);
      }
    } else {
      for (var i = 0; i < this.topArtistArray.length; i++) {
        this.chartLabels.push(this.topArtistArray[i][0]);
        this.chartDataPlays.push(this.topArtistArray[i][1]);
      }
    }
    this.title = 'Most Listened to Artists via Apple Music';
    this.labels = this.chartLabels;
    this.chartData = [
      {
        label: "Number of Plays",
        data: this.chartDataPlays,
      }
    ];
    this.chartOptions = {
      responsive: true
    }
    this.colors = {};
    this.colors = [
      { // 1st Year.
        backgroundColor: 'rgba(0, 94, 196, 1)'
      }
    ]

  }

  transformBySong() {
    this.spotifyLoaded = false;
    for (var i = 0; i < this.serverChartData.length; i++) {
      if (this.serverChartData[i]['Song Title']) {
        if (!this.serverChartData[i]['Song Title'].includes("mp3")) {
          this.chartLabels.push(this.serverChartData[i]['Song Title']);
          this.chartDataPlays.push(this.serverChartData[i].Plays);
          if(this.chartLabels.length === 25 && this.chartDataPlays.length === 25){
            break;
          }
        }
      }
    }
    this.title = 'Most Listened to Songs via Apple Music';

    this.chartOptions = {
      responsive: true    // THIS WILL MAKE THE CHART RESPONSIVE (VISIBLE IN ANY DEVICE).
    }
    this.labels = this.chartLabels;
    this.chartData = [
      {
        label: "Number of Plays",
        data: this.chartDataPlays,
      }
    ];


    this.colors = [
      { // 1st Year.
        backgroundColor: 'rgba(50, 230, 250, 1)'
      }
    ]
  }



  dateDifferenceCalc() {
    var minutesDiff = this.now.getMinutes() - this.birthdate.getMinutes();
    var hourDiff = this.now.getHours() - this.birthdate.getHours();
    var dayDiff = this.now.getDate() - this.birthdate.getDate();
    var monthDiff = this.now.getMonth() - this.birthdate.getMonth();
    var yearDiff = this.now.getFullYear() - this.birthdate.getFullYear();
    var secDiff = this.now.getSeconds() - this.birthdate.getSeconds();
    if (secDiff < 0) {
      secDiff = secDiff + 60;
      minutesDiff = minutesDiff - 1;
    }
    if (minutesDiff < 0) {
      hourDiff = hourDiff - 1;
      minutesDiff = minutesDiff + 60;
    }
    if (hourDiff < 0) {
      hourDiff = hourDiff + 24;
      dayDiff = dayDiff - 1;
    }
    if (dayDiff < 0) {
      dayDiff = dayDiff + 30;
      monthDiff = monthDiff - 1;
    }
    if (monthDiff < 0) {
      monthDiff = monthDiff + 12;
      yearDiff = yearDiff - 1;
    }
    this.ageCalc = yearDiff + "Years, " + monthDiff + " Months, " + dayDiff + " Days, " + hourDiff + " Hours, " + minutesDiff + " Minutes, " + secDiff + " Seconds Old or Young";

  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  searchSpotify(artistName) {
    this.spotify.searchArtist(artistName).subscribe(artistInfo => {
      //this.spotifyArtist = artistInfo;
      //console.log(this.spotifyArtist)
    });
  }

  onChartClick(template: TemplateRef<any>, event, selected) {
    console.log(event);
    if (!event.active[0]) {
      return;
    }
    if (selected == "Artist") {
      this.spotify.searchArtistByName(event.active[0]._model.label).subscribe(artistInfo => {
        this.spotifyArtist = artistInfo;
        this.spotifyLoaded = true;
        console.log(this.spotifyArtist.artists.items[0].id)
        this.artistID = 'https://open.spotify.com/embed/artist/' + this.spotifyArtist.artists.items[0].id;
        this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.artistID);
        this.spotifyModalTitle = this.spotifyArtist.artists.items[0].name;
        this.imageIcon = this.spotifyArtist.artists.items[0].images[0].url;
        this.openModal(template);
      })
    } else if (selected == "Song") {
      if (event.active[0]._model.label.includes("mp3")) {

      } else {
        this.spotify.searchSongByName(event.active[0]._model.label).subscribe(songInfo => {
          this.spotifyTrack = songInfo;
          this.spotifyLoaded = true;
          console.log(this.spotifyTrack.tracks.items[0])
          this.spotifyTrack.tracks.items[0]
          this.trackID = 'https://open.spotify.com/embed/track/' + this.spotifyTrack.tracks.items[0].id;
          this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.trackID);
          this.spotifyModalTitle = this.spotifyTrack.tracks.items[0].name;
          this.imageIcon = this.spotifyTrack.tracks.items[0].album.images[0].url;
          this.openModal(template);
        })
      }

    } else if (selected == "Album") {
      if (event.active[0]._model.label.includes("(A)") || event.active[0]._model.label === "?") {
        if (event.active[0]._model.label === "?") {
          var specificAlbumID = "2Ti79nwTsont5ZHfdxIzAm"
          this.spotify.searchAlbum(specificAlbumID).subscribe(albumInfo => {
            this.spotifyAlbumObject = albumInfo;
            this.spotifyLoaded = true;
            console.log(this.spotifyAlbumObject)
            this.trackID = 'https://open.spotify.com/embed/album/' + specificAlbumID;
            this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.trackID);
            this.spotifyModalTitle = this.spotifyAlbumObject.name;
            this.imageIcon = this.spotifyAlbumObject.images[0].url;
            this.openModal(template);
          })
        }
      } else {
        this.spotify.searchAlbumByName(event.active[0]._model.label).subscribe(albumInfo => {
          this.spotifyAlbum = albumInfo;
          this.spotifyLoaded = true;
          console.log(this.spotifyAlbum)
          console.log(this.spotifyAlbum.albums.items[0].id)
          this.trackID = 'https://open.spotify.com/embed/album/' + this.spotifyAlbum.albums.items[0].id;
          this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.trackID);
          this.spotifyModalTitle = this.spotifyAlbum.albums.items[0].name;
          this.imageIcon = this.spotifyAlbum.albums.items[0].images[0].url;
          this.openModal(template);
        })
      }

    }

  }



}
