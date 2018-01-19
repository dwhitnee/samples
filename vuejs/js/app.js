//----------------------------------------
// Demo using VueJS to create an app eventloop
//
// See also http://codepen.io/dwhitnee/pen/mAXEoJ
//
// 2016 David Whitney
//----------------------------------------
/*global fetch, Vue, Headers */

let now = new Date();

let serverURL = "https://4h7s7kx4f9.execute-api.us-west-2.amazonaws.com/dev/";

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
    debug: ""
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
