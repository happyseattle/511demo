
function agenciesHandler()
{
    if (this.responseText.length > 0)
    {
        document.getElementById("idAgenciesContainer").innerHTML = this.responseText;
    }
}

function updateAgencies()
{
    if (window.XMLHttpRequest)
    {
        xmlhttp=new XMLHttpRequest();
    }
    xmlhttp.onload = agenciesHandler;
    xmlhttp.open("GET", "RTTAPI.php?serviceName=GetAgencies", true);
    xmlhttp.send();
}

function routesHandler()
{
    if (this.responseText.length > 0)
    {
        document.getElementById("idRoutesContainer").innerHTML = this.responseText;
    }
}

function updateRoutesForAgencies(agencyNames)
{
    if (window.XMLHttpRequest)
    {
        xmlhttp = new XMLHttpRequest();
    }
    xmlhttp.onload = routesHandler;
    xmlhttp.open("GET", "RTTAPI.php?serviceName=GetRoutesForAgencies&agencyNames=" + agencyNames, true);
    xmlhttp.send();
}

function removeRoutesForAgency(agencyName)
{

}

function updateRoutesForAgency(agencyName) {
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    }
    xmlhttp.onload = routesHandler;
    var url = "RTTAPI.php?serviceName=GetRoutesForAgency&agencyName=" + agencyName;
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function stopsHandler()
{
    if (this.responseText.length > 0)
    {
        document.getElementById("idStopsContainer").innerHTML = this.responseText;
    }
}

function updateStopsForRoutes()
{
    if (window.XMLHttpRequest)
    {
        xmlhttp = new XMLHttpRequest();
    }
    xmlhttp.onload = stopsHandler;
    var url = "RTTAPI.php?serviceName=GetStopsForRoutes";
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}


function updateStopsForRoute(routeIDF)
{
    if (window.XMLHttpRequest)
    {
        xmlhttp = new XMLHttpRequest();
    }
    xmlhttp.onload = stopsHandler;
    var url = "RTTAPI.php?serviceName=GetStopsForRoute&" + routeIDF;
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function departureTimeHandler()
{
    if (this.responseText.length > 0)
    {
        document.getElementById("idDepartureTimeContainer").innerHTML = this.responseText;
    }
}

function updateDepartureTime(stopcode, usestopcode)
{
    if (window.XMLHttpRequest)
    {
        xmlhttp = new XMLHttpRequest();
    }
    xmlhttp.onload = departureTimeHandler;
    if (usestopcode)
    {
        url = "RTTAPI.php?serviceName=GetNextDeparturesByStopCode&" + stopcode;
    }
    else
    {
        url = "RTTAPI.php?serviceName=GetNextDeparturesByStopName&" + stopcode;
    }

    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

$(".header").click(function () {
    $header = $(this);
    $content = $header.next();

    $content.slideToggle(500);
});

$('input[type="checkbox"][name="agencies"]').change(function () {
    if (this.checked) {
        updateRoutesForAgency(this.value);
    }
    else {
        removeRoutesForAgency(this.value);
    }

    if (!$("#idRoutesContainer").is(":visible"))
        $("#idRoutesContainer").slideToggle(500);

    $("#idAgenciesContainer").slideToggle(500);
});

$('body').on('click', '.RouteItem', function () {
    var routeIDF = "routeIDF=" + $(this).closest(".AgencyContainer").find(".AgencyName").text();
    routeIDF += "~" + $(this).find(".RouteCode").text();
    if ($(this).find(".DirectionCode").length > 0) {
        routeIDF += "~" + $(this).find(".DirectionCode").text();
    }
    updateStopsForRoute(routeIDF);

    if (!$("#idStopsContainer").is(":visible"))
        $("#idStopsContainer").slideToggle(500);

    $("#idRoutesContainer").slideToggle(500);
});

$('body').on('click', '.StopItem', function () {
    if ($(this).find(".StopCode").text().length > 0) {
        stopcode = "stopcode=" + $(this).find(".StopCode").text();
        updateDepartureTime(stopcode, true);
    }
    else {
        agencyName = "agencyName=" + $(this).closest(".RouteContainer").find(".AgencyName").text();
        stopName = "&stopName=" + $(this).find(".StopName").text();
        updateDepartureTime(agencyName + stopName, false);
    }

    if (!$("#idDepartureTimeContainer").is(":visible"))
        $("#idDepartureTimeContainer").slideToggle(500);

    $("#idStopsContainer").slideToggle(500);
});
