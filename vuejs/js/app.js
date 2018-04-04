//----------------------------------------
// Demo using VueJS to create an app eventloop
//
// See also http://codepen.io/dwhitnee/pen/mAXEoJ
//
// 2016 David Whitney
//----------------------------------------
/*global fetch, Vue, Headers */

let API_KEY = "AIzaSyCSzD9haJ-HWTjwRef7MuNL_lUtXJiYfic";

let now = new Date();

let serverURL = "https://i526t8ar6k.execute-api.us-west-2.amazonaws.com/dev/";

// Our data and methods that can be seen directly on the web
// page go here.  Other objects can go elsewhere
let app = new Vue({
  el: '#myVueApp',


  // update these values, rather than update the DOM directly
  data: {
    message: "Hello Vue.js! It's " + now.toDateString(),
    newState: "",
    states: ["WA","OR","CA"],
    buses: [],
    busComment: "",
    busEvents: [],
    timeLeft: 0,
    position: 0,
    debug: "",
//    destination: "Ingraham High School",
    destination: "Space Needle"
  },

  beforeCreate: function() {
    // find out where we are
    var self = this;
    navigator.geolocation.watchPosition( function( position ) {
      console.log("Location = " + position.coords.latitude, position.coords.longitude );
      self.position = position.coords;
    });
  },

  // event handlers accessible from the web page
  methods: {
    addState: function() {
      this.states.push( this.newState );
      this.newState = "";
      console.log( this.states );
    },

    // Go to the URL data has our data and display it
    loadBusRoutes: function() {
      // Store "this" so we can access our Vue object inside the asynchronous then() functions.
      // By the time the data is returned from the cloud, loadBusRoutes() has exited, and our context is no longer the Vue object
      // but "self" sticks around since it was defined here. This is a "closure".
      let self = this;

      fetch( serverURL + "bus-routes")
        .then( function( response ) { if (response.ok) { return response.json(); }})
        .then( function( data ) {
          console.log( data );
          self.buses = data.busRoutes;
        });

      fetch( serverURL + "events?bus=1999")
        .then( function( response ) { if (response.ok) { return response.json(); }})
        .then( function( events ) {
          console.log( events );
          self.busEvents = events;
        });

    },

    // Go to the URL data has our data and display it
    loadTimeRemaining: function() {
      let self = this;
      if (!this.position) {
        this.timeLeft = "can't figure out your location";
        return;
      }
      let origin = this.position.latitude + "," + this.position.longitude;
      // let dest = "Ingraham High School";
      let dest = this.destination;
      let url = "https://maps.googleapis.com/maps/api/distancematrix/json?origins=" + origin + "&destinations=" + dest + "&key=" + API_KEY;

      fetch( url, { mode: 'cors' })
        .then( function( response ) { return response.json();  })
        .then( function( data ) {
          console.log( data );
          self.timeLeft = data.rows[0].elements[0].duration.text;
        });
    },

    // Go to the URL data has our data and display it
    saveComment: function() {
      // Store "this" so we can access our Vue object inside the asynchronous then() function
      let self = this;

      let data = {
        userName: "Anonymous",
        comment: this.busComment,
        bus: 1999
      };

      let jsonHeaders = {
        "Accept" : "application/json",
        "Content-Type" : "application/json"
      };

      // post the data to the server to store
      fetch( serverURL + "event", {
        headers: jsonHeaders,
        method: "POST",
        body: JSON.stringify( data )
      })
        .then(  function( response ) {
          console.log( response ); self.debug = response.json();
        })
        .catch( function( response ) { console.error( response ); });
    }

  }
});
