<?php

//require '../../locks/AccessToken.php';
$AccessToken = "2f7fb7e8-701c-4ff9-b70d-c33223320551";

function FetchXmlContent()
{
  global $AccessToken;

  $serviceName = isset($_REQUEST['serviceName']) ? $_REQUEST['serviceName'] : "";
  $agencyName = isset($_REQUEST['agencyName']) ? $_REQUEST['agencyName'] : "";
  $agencyNames = isset($_REQUEST['agencyNames']) ? $_REQUEST['agencyNames'] : "";
  $routeIDF = isset($_REQUEST['routeIDF']) ? $_REQUEST['routeIDF'] : "";
  $stopName = isset($_REQUEST['stopName']) ? $_REQUEST['stopName'] : "";
  $stopcode = isset($_REQUEST['stopcode']) ? $_REQUEST['stopcode'] : "";

  $url = "http://services.my511.org/Transit2.0/";

  switch($serviceName)
  {
      case "GetAgencies":
        $url .= "$serviceName.aspx?token=$AccessToken";
      break;

      case "GetRoutesForAgency":
        $url .= "$serviceName.aspx?token=$AccessToken&agencyName=$agencyName";
      break;

      case "GetRoutesForAgencies":
        $url .= "$serviceName.aspx?token=$AccessToken&agencyNames=$agencyNames";
      break;

      case "GetStopsForRoute":
      case "GetStopsForRoutes":
        $url .= "$serviceName.aspx?token=$AccessToken&routeIDF=$routeIDF";
      break;

      case "GetNextDeparturesByStopName":
        $url .= "$serviceName.aspx?token=$AccessToken&agencyName=$agencyName&stopName=$stopName";
      break;

      case "GetNextDeparturesByStopCode":
        $url .= "$serviceName.aspx?token=$AccessToken&stopcode=$stopcode";
      break;
  }

  $url = str_replace(" ", "%20", $url);
  
  $str = @file_get_contents($url);

  // error check
  if (strpos($str, "transitServiceError") != FALSE)
  {
    return "";
  }

  return $str;
}

function ProcessXmlContent($xmlString)
{
  $serviceName = isset($_REQUEST['serviceName']) ? $_REQUEST['serviceName'] : "";

  $RTT = simplexml_load_string($xmlString);
  $AgencyList = $RTT->AgencyList;

  $result = "";

  switch($serviceName)
  {
      case "GetAgencies":
          $result = GenerateGetAgencies($AgencyList);
      break;

      case "GetRoutesForAgency":
      case "GetRoutesForAgencies":
          $result = GenerateGetRoutesForAgencies($AgencyList);
      break;

      case "GetStopsForRoute":
      case "GetStopsForRoutes":
          $result = GenerateGetStopsForRoutes($AgencyList);
      break;

      case "GetNextDeparturesByStopName":
      case "GetNextDeparturesByStopCode":
          $result = GenerateGetNextDepartures($AgencyList);
          //$result = $xmlString;
      break;
  }

  echo $result;
}

function GenerateGetAgencies($AgencyList)
{
    $result = "";
    
    foreach ($AgencyList->Agency as $Agency):
      $Name = $Agency["Name"];
      $result .= '<input type="checkbox" name="agencies" value="' .$Name .'" class="AgencyItem">$Name';
    endforeach;
    
    return $result;
}

function GenerateGetRoutesForAgencies($AgencyList)
{
    $result = "";
    
    foreach ($AgencyList->Agency as $Agency):
        $result .= '<div class="AgencyContainer">';
        $result .= '<table class="RouteList"><caption class="AgencyName">' .$Agency["Name"] .'</caption><tr><th>RouteName</th><th>RouteCode</th><th>DirectionCode</th></tr>';

        foreach ($Agency->RouteList->Route as $Route):
            if (isset($Route->RouteDirectionList))
            {
              foreach ($Route->RouteDirectionList->RouteDirection as $RouteDirection):
                $result .= '<tr class="RouteItem">';
                $result .= '<td class="RouteName">' .$Route["Name"] .'</td>';
                $result .= '<td class="RouteCode">' .$Route["Code"] .'</td>';
                $result .= '<td class="DirectionCode">' .$RouteDirection["Code"] .'</td>';
                $result .= '</tr>';
              endforeach;
            }
            else
            {
                $result .= '<tr class="RouteItem">';
                $result .= '<td class="RouteName">' .$Route["Name"] .'</td>';
                $result .= '<td class="RouteCode">' .$Route["Code"] .'</td>';
                $result .= '<td class="DirectionCode"></td>';
                $result .= '</tr>';
            }
        endforeach;
        
        $result .= '</table></div>';
    endforeach;
    
    return $result;
}

function GenerateGetStopsForRoutes($AgencyList)
{
    $result = "";

    foreach ($AgencyList->Agency as $Agency):
        
        $result .= '<div class="RouteContainer"><h3 class="AgencyName">' .$Agency["Name"] .'</h3>';
        foreach ($Agency->RouteList->Route as $Route):
            if (isset($Route->RouteDirectionList))
            {
                foreach ($Route->RouteDirectionList->RouteDirection as $RouteDirection):
                    $result .= '<table class="StopList"><caption class="RouteDirection">' .$Route["Name"] .$RouteDirection["Name"] .'</caption><tr><th>StopName</th><th>StopCode</th></tr>';
                    foreach ($RouteDirection->StopList->Stop as $Stop):
                        $result .= '<tr class="StopItem">';
                        $result .= '<td class="StopName">' .$Stop["name"] .'</td>';
                        $result .= '<td class="StopCode">' .$Stop["Code"] .'</td>';
                        $result .= '</tr>';
                    endforeach;
                    $result .= '</table>';
                endforeach;
            }
            else
            {
                $result .= '<table class="StopList"><caption class="RouteName">' .$Route["Name"] .'</caption><tr><th>StopName</th><th>StopCode</th></tr>';
                foreach ($Route->StopList->Stop as $Stop):
                    $result .= '<tr class="StopItem">';
                    $result .= '<td class="StopName">' .$Stop["name"] .'</td>';
                    $result .= '<td class="StopCode">' .$Stop["Code"] .'</td>';
                    $result .= '</tr>';
                endforeach;
                $result .= '</table>';
            }
        endforeach;
            
        $result .= '</div>';
            
    endforeach;

    return $result;
}

function GenerateGetNextDepartures($AgencyList)
{
    $result = "";
    
    foreach ($AgencyList->Agency as $Agency):
        $result .= '<div class="TimeContainer">';
        $result .= '<table class="DepartureTimeList"><caption class="DepartureTimeListCaption">' .$Agency["Name"] .'</caption>';
        $result .= '<tr><th>StopName</th><th>StopCode</th><th>DepartureTime</th></tr>';
        foreach ($Agency->RouteList->Route as $Route):

            if (isset($Route->RouteDirectionList))
            {
                foreach ($Route->RouteDirectionList->RouteDirection as $RouteDirection):
                    $result .='<tr><td class="RouteDirection" colspan="3">' .$RouteDirection["Name"] .'</td></tr>';
                    foreach ($RouteDirection->StopList->Stop as $Stop):

                        if (count($Stop->DepartureTimeList->DepartureTime) < 1)
                        {
                            // do nothing
                            $result .='<tr><td class="EmptyData" colspan="3">N/A</td></tr>';
                        }
                        else
                        {
                          foreach ($Stop->DepartureTimeList->DepartureTime as $DepartureTime):
                              $result .= '<tr><td class="StopName">' .$Stop["name"] .'</td><td class="StopCode">' .$Stop["StopCode"] .'</td><td class="DepartureTime">' .$DepartureTime .'</td></tr>';
                          endforeach;
                        }
                    endforeach;
                endforeach;
            }
            else
            {
                $result .='<tr><td class="Route" colspan="3">' .$Route["Name"] .'</td></tr>';
                foreach ($Route->StopList->Stop as $Stop):
                    if (count($Stop->DepartureTimeList->DepartureTime) < 1)
                    {
                        // do nothing
                        $result .='<tr><td class="EmptyData" colspan="3">N/A</td></tr>';
                    }
                    else
                    {
                      foreach ($Stop->DepartureTimeList->DepartureTime as $DepartureTime):
                          $result .= '<tr><td class="StopName">' .$Stop["name"] .'</td><td class="StopCode">' .$Stop["StopCode"] .'</td><td class="DepartureTime">' .$DepartureTime .'</td></tr>';
                      endforeach;
                    }

                endforeach;
            }
        endforeach;
        $result .= '</table></div>';
    endforeach;
    
    return $result;
}

$xmlString = FetchXmlContent();
if(strlen($xmlString) > 0)
{
  ProcessXmlContent($xmlString);
}

?>
