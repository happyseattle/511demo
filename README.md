511demo
=======

Demo for next departure time using 511.org APIs

PURPOSE:
The purpose of this project is to implement a prototype for displaying the next departure time for buses in the Bay Area.

HOWTOUSE:
1. (optional) Click "Toggle map" to show/hide the map
2. (optional) Click "Use my location" to use your current location.
3. When prompted by the browser, allow the website to get your location.
4. (Current implemetation allows only single choice, see TODO.1.5
   Check an agency, the "route list" will be shown under "Click a route" section
5. Click a route in the "Click a route" section, the "stop list" will be shown under the "Click a stop" section
6. Click a stop in the "Click a stop" section, the next departure times will be shown in teh "Next departure time is available" section.

IMPLEMENTATION:
1. index.html is the main web page for user interaction.
2. RTTAPI.php is a server side relay of user request for the 511 Real Time Transit information service.
   The main purpose of this relay is to hide the private AccessToken from end user. See TODO.3 for more details.
   It also provided format conversation for the xml data received from the 511 API. 
3. javascript folder has the javascript files that will show user's current location in Google map, and get the 511 Real Time Transit data from the server dynamically.
4. css folder has the style sheet. See TODO.1.1 for more details.

TODO:
Due to time limitation, many features are not well tuned, and they can be improved in the future.
1.  User Experience Improvement
    The following features will imporve the user's experience, and improve the usability. 
    1.1 Apply "media" property to adapt the CSS style sheet to different screen size and devices, especially mobile devices and touch-capable devices.
    1.2 It's better to automatically show the nearest bus stops.
        As we already ask for user's current location, there is no technical difficulty to prevent us from automatically show the nearest bus stops to the end user, instead of asking the user to manually select. However, this involves getting the location/address/latitude and longitude of each bus stop, which is time tedious. Due to time limitation, we will implement this feature in the feature. 
    1.3 It's better to draw the bus routes on maps, draw routes from different agencies with different colors. 
        Again, this will require the location of the bus stops.
    1.4 It's also better to provide the option for user to specify "from" and "to" (preferrably via touch/click on map), and the system provide teh next departure time for that direction, including agency, routes, and bus stops. 
        Again, this will require the location of the bus stops.
    1.5 Current implementation only allows the user to select one single agency, to click one signle route, and to click on single stop, to get the next departure time. 
        In the future, we will need to provide the option for user to do multiple selection.
    1.6 The user interface/styles of the page could be improved. 

2. Performance
    2.1 When the user base increases, we may consider to implement some caching mechanism on the server side. 
        More specifically, in RTTAPI.php, for each user's request, we will fetch the information from 511.org API. As we know, the list of agencies, the routes for each agency, and the bus stop for each route, will not change frequently. We can set different update timer to update these information on our server side and cache the result. When there is a request from the user, we will return the cached results, unless there is a forced update from the user end. 
        For the requests of departure time, we may also implement a cache mechanism, and return cached results to later user. The cache implementation will be slightly different from the aforementioned caches for "the list of agencies, the routes for each agency, and the bus stops for each route", as it has more frequenty updates. 
        For the request of departure time, we may implement a proxy server, to combine requests from different users (at almost the same time, via pre-defined time/delay interval) into one request, and request the larger chunk of data from 511.org, rather than blindly relaying/forwarding each single request to 511.org, to avoid the possibility of flooding the 511.org server.
    2.2 Implement some ata compression to save bandwidth. 
	Instead of formartting the data on server side, we may compress the data(say, use JSON) and do the formatting work on the client side, as we expect most users of the service will be on mobile devices, via mobile data services. Saving bandwidth is important. 

3. Security
    3.1 The access token for 511.org API service is private.
        We need to carefully protect this access token from being accessible from the web. 
        The way I implemented is to put the access token in a separate AccessToken.php file, and "require" that file from RTTAPI.php. The AccessToken.php file is supposed to be placed in a folder that is not accessible on the web. 
        [BUG] However, due to configuration issue, I cannot have the above configuration (place AccessToken.php in a web-inaccessible folder) to work properly on Windows Azure hosting. For demo purpose, I simply put the AccessToken into the RTTAPI.php file. This is for temporary demo purpose only. 

4. Error handling
    4.1 Currently, we will silently fail for any error. We may provide more user-friendly information to the user. 
    4.2 For code robustness, we need to handle more possible error cases in the RTTAPI.php codes. 

5. Quality/Testing
    5.1 I only did some basic unit testing to make sure it works. We may need to implement more testing to assure high quality when there is enough time.  
