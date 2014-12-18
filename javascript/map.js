var map;
var marker;

window.google = window.google || {};
google.maps = google.maps || {};

(function () {

    function getScript(src)
    {
        document.write('<' + 'script src="' + src + '"><' + '/script>');
    }

    var modules = google.maps.modules = {};
    google.maps.__gjsload__ = function (name, text)
    {
        modules[name] = text;
    };

    google.maps.Load = function (apiLoad)
    {
        delete google.maps.Load;
        apiLoad([0.009999999776482582, [[["http://mt0.googleapis.com/vt?lyrs=m@284000000\u0026src=api\u0026hl=en-US\u0026", "http://mt1.googleapis.com/vt?lyrs=m@284000000\u0026src=api\u0026hl=en-US\u0026"], null, null, null, null, "m@284000000", ["https://mts0.google.com/vt?lyrs=m@284000000\u0026src=api\u0026hl=en-US\u0026", "https://mts1.google.com/vt?lyrs=m@284000000\u0026src=api\u0026hl=en-US\u0026"]], [["http://khm0.googleapis.com/kh?v=163\u0026hl=en-US\u0026", "http://khm1.googleapis.com/kh?v=163\u0026hl=en-US\u0026"], null, null, null, 1, "163", ["https://khms0.google.com/kh?v=163\u0026hl=en-US\u0026", "https://khms1.google.com/kh?v=163\u0026hl=en-US\u0026"]], [["http://mt0.googleapis.com/vt?lyrs=h@284000000\u0026src=api\u0026hl=en-US\u0026", "http://mt1.googleapis.com/vt?lyrs=h@284000000\u0026src=api\u0026hl=en-US\u0026"], null, null, null, null, "h@284000000", ["https://mts0.google.com/vt?lyrs=h@284000000\u0026src=api\u0026hl=en-US\u0026", "https://mts1.google.com/vt?lyrs=h@284000000\u0026src=api\u0026hl=en-US\u0026"]], [["http://mt0.googleapis.com/vt?lyrs=t@132,r@284000000\u0026src=api\u0026hl=en-US\u0026", "http://mt1.googleapis.com/vt?lyrs=t@132,r@284000000\u0026src=api\u0026hl=en-US\u0026"], null, null, null, null, "t@132,r@284000000", ["https://mts0.google.com/vt?lyrs=t@132,r@284000000\u0026src=api\u0026hl=en-US\u0026", "https://mts1.google.com/vt?lyrs=t@132,r@284000000\u0026src=api\u0026hl=en-US\u0026"]], null, null, [["http://cbk0.googleapis.com/cbk?", "http://cbk1.googleapis.com/cbk?"]], [["http://khm0.googleapis.com/kh?v=84\u0026hl=en-US\u0026", "http://khm1.googleapis.com/kh?v=84\u0026hl=en-US\u0026"], null, null, null, null, "84", ["https://khms0.google.com/kh?v=84\u0026hl=en-US\u0026", "https://khms1.google.com/kh?v=84\u0026hl=en-US\u0026"]], [["http://mt0.googleapis.com/mapslt?hl=en-US\u0026", "http://mt1.googleapis.com/mapslt?hl=en-US\u0026"]], [["http://mt0.googleapis.com/mapslt/ft?hl=en-US\u0026", "http://mt1.googleapis.com/mapslt/ft?hl=en-US\u0026"]], [["http://mt0.googleapis.com/vt?hl=en-US\u0026", "http://mt1.googleapis.com/vt?hl=en-US\u0026"]], [["http://mt0.googleapis.com/mapslt/loom?hl=en-US\u0026", "http://mt1.googleapis.com/mapslt/loom?hl=en-US\u0026"]], [["https://mts0.googleapis.com/mapslt?hl=en-US\u0026", "https://mts1.googleapis.com/mapslt?hl=en-US\u0026"]], [["https://mts0.googleapis.com/mapslt/ft?hl=en-US\u0026", "https://mts1.googleapis.com/mapslt/ft?hl=en-US\u0026"]], [["https://mts0.googleapis.com/mapslt/loom?hl=en-US\u0026", "https://mts1.googleapis.com/mapslt/loom?hl=en-US\u0026"]]], ["en-US", "US", null, 0, null, null, "http://maps.gstatic.com/mapfiles/", "http://csi.gstatic.com", "https://maps.googleapis.com", "http://maps.googleapis.com", null, "https://maps.google.com"], ["http://maps.gstatic.com/maps-api-v3/api/js/19/3", "3.19.3"], [1950806765], 1, null, null, null, null, null, "", null, null, 0, "http://khm.googleapis.com/mz?v=163\u0026", null, "https://earthbuilder.googleapis.com", "https://earthbuilder.googleapis.com", null, "http://mt.googleapis.com/vt/icon", [["http://mt0.googleapis.com/vt", "http://mt1.googleapis.com/vt"], ["https://mts0.googleapis.com/vt", "https://mts1.googleapis.com/vt"], null, null, null, null, null, null, null, null, null, null, ["https://mts0.google.com/vt", "https://mts1.google.com/vt"], "/maps/vt", 284000000, 132], 2, 500, ["http://geo0.ggpht.com/cbk", "http://g0.gstatic.com/landmark/tour", "http://g0.gstatic.com/landmark/config", "", "http://www.google.com/maps/preview/log204", "", "http://static.panoramio.com.storage.googleapis.com/photos/", ["http://geo0.ggpht.com/cbk", "http://geo1.ggpht.com/cbk", "http://geo2.ggpht.com/cbk", "http://geo3.ggpht.com/cbk"]], ["https://www.google.com/maps/api/js/master?pb=!1m2!1u19!2s3!2sen-US!3sUS!4s19/3", "https://www.google.com/maps/api/js/widget?pb=!1m2!1u19!2s3!2sen-US"], 0, 0], loadScriptTime);
    };

    var loadScriptTime = (new Date).getTime();
    getScript("http://maps.gstatic.com/maps-api-v3/api/js/19/3/main.js");
})();


  function initializemap()
  {
    var latlng = new google.maps.LatLng(37.7830, -122.4170);
    var mapoptions =
        {
          zoom: 10,
          center: latlng,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          disableDefaultUI: true
        }

    map = new google.maps.Map(document.getElementById("mapcanvas"), mapoptions);
  }

  // centre the map on the location
  function centermap(position)
  {
      var coords = position.coords || position.coordinate || position;
      var latLng = new google.maps.LatLng(coords.latitude, coords.longitude);
      map.setCenter(latLng);
      map.setZoom(12);
      marker = new google.maps.Marker(
          {
              map: map,
              position: latLng,
              title: 'Here!'
          }
          );

      reversegeocode(latLng);
  }

  function reversegeocode(latLng)
  {
      (new google.maps.Geocoder()).geocode(
          { latLng: latLng },
          function (resp)
          {
              var place = "";
              if (resp[0]) {
                  var bits = [];
                  for (var i = 0, I = resp[0].address_components.length; i < I; i++)
                  {
                      var component = resp[0].address_components[i];
                      if (contains(component.types, 'political'))
                      {
                          bits.push('<b>' + component.long_name + '</b>');
                      }
                  }
                  if (bits.length)
                  {
                      place = bits.join(' > ');
                  }

                  marker.setTitle(resp[0].formatted_address);
              }

              document.getElementById('geolocation').innerHTML = resp[0].formatted_address;
          }
      );
  }

  function contains(array, item)
  {
      for (var i = 0, I = array.length; i < I; ++i)
      {
          if (array[i] == item) return true;
      }

      return false;
  }


