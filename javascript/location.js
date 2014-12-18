
function doGeolocation()
{
    if (navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(geolocationSucceeded, geolocationFailed);
    }
    else
    {
        geolocationFailed(-1);
    }
}

function geolocationSucceeded(position)
{
    document.getElementById("geolocation").innerHTML = "Latitude: " + position.coords.latitude + "Longitude: " + position.coords.longitude;

    centermap(position);
}

function geolocationFailed(error)
{
    var message;
    switch (error.code)
    {
        case err.UNKNOWN_ERROR:
            message = "Unable to find your location";
            break;
        case err.PERMISSION_DENINED:
            message = "Permission denied in finding your location";
            break;
        case err.POSITION_UNAVAILABLE:
            message = "Your location is currently unknown";
            break;
        case err.BREAK:
            message = "Attempt to find location took too long";
            break;
        default:
            message = "Location detection not supported in browser";
    }

    document.getElementById('geolocation').innerHTML = message;
}

