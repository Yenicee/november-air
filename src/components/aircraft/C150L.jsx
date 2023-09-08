const CalculateC150L = {
  takeOffDistance: (depPress, depElev, depTemp, depWindDir, depWindInt, depRwy) => {
    let depPressAlt = ((((Math.pow(depPress / 1013.25, 1 / 5.2559)) - 1) / -0.0000225577) / 0.3048) + depElev;
    let depTempF = (depTemp * 9 / 5) + 32;
    let depHeadWindAngle = depRwy - depWindDir;

    if (depHeadWindAngle < 0) {
      depHeadWindAngle = depHeadWindAngle * -1;
    }

    if (depHeadWindAngle > 90) {
      depHeadWindAngle = 360 - depHeadWindAngle;
    }

    let toffDist = 0;

    if (depPressAlt <= 0) {
      toffDist = 735;

      if (depTempF > 59 && depTempF <= 94) {
        toffDist = 819;
      }
      if (depTempF > 94 && depTempF <= 129) {
        toffDist = 882;
      }
      if (depTempF > 129) {
        toffDist = 956;
      }
    } else if (depPressAlt > 0 && depPressAlt <= 2500) {
      toffDist = 910;
      if (depTempF > 50 && depTempF <= 85) {
        toffDist = 1001;
      }
      if (depTempF > 85 && depTempF <= 120) {
        toffDist = 1092;
      }
      if (depTempF > 120) {
        toffDist = 1183;
      }
    } else if (depPressAlt > 2500 && depPressAlt <= 5000) {
      toffDist = 1115;
      if (depTempF > 41 && depTempF <= 76) {
        toffDist = 1227;
      }
      if (depTempF > 76 && depTempF <= 111) {
        toffDist = 1338;
      }
      if (depTempF > 146) {
        toffDist = 1450;
      }
    } else if (depPressAlt > 5000) {
      toffDist = 1360;
      if (depTempF > 32 && depTempF <= 67) {
        toffDist = 1496;
      }
      if (depTempF > 67 && depTempF <= 102) {
        toffDist = 1632;
      }
      if (depTempF > 102) {
        toffDist = 1768;
      }
      
    }
    return toffDist;
  },

  takeOffDistanceToClear50FeetObstacles: (depPress, depElev, depTemp) => {
    let depPressAlt = ((((Math.pow(depPress / 1013.25, 1 / 5.2559)) - 1) / -0.0000225577) / 0.3048) + depElev;
    let depTempF = (depTemp * 9 / 5) + 32;
    let toffDist = 0;

    if (depPressAlt <= 0) {
      toffDist = 1385;
      if (depTempF > 59 && depTempF <= 94) {
        toffDist = 1524;
      }
      if (depTempF > 94 && depTempF <= 129) {
        toffDist = 1663;
      }
      if (depTempF > 129) {
        toffDist = 1802;
      }
    } else if (depPressAlt > 0 && depPressAlt <= 2500) {
      toffDist = 1660;
      if (depTempF > 50 && depTempF <= 85) {
        toffDist = 1826;
      }
      if (depTempF > 85 && depTempF <= 120) {
        toffDist = 1992;
      }
      if (depTempF > 120) {
        toffDist = 2158;
      }
    } else if (depPressAlt > 2500 && depPressAlt <= 5000) {
      toffDist = 1985;
      if (depTempF > 41 && depTempF <= 76) {
        toffDist = 2184;
      }
      if (depTempF > 76 && depTempF <= 111) {
        toffDist = 2383;
      }
      if (depTempF > 146) {
        toffDist = 2582;
      }
    } else if (depPressAlt > 5000) {
      toffDist = 2440;
      if (depTempF > 32 && depTempF <= 67) {
        toffDist = 2684;
      }
      if (depTempF > 67 && depTempF <= 102) {
        toffDist = 2928;
      }
      if (depTempF > 102) {
        toffDist = 3172;
      }
    }

    return toffDist;
  },

  takeOffDistanceGrassRunway: (depPress, depElev, depTemp) => {
    let depPressAlt = ((((Math.pow(depPress / 1013.25, 1 / 5.2559)) - 1) / -0.0000225577) / 0.3048) + depElev;
    let depTempF = (depTemp * 9 / 5) + 32;
    let toffDist = 0;

    if (depPressAlt <= 0) {
      toffDist = 735 + (1385 * 0.07);
      if (depTempF > 59 && depTempF <= 94) {
        toffDist = 819 + (1524 * 0.07);
      }
      if (depTempF > 94 && depTempF <= 129) {
        toffDist = 882 + (1663 * 0.07);
      }
      if (depTempF > 129) {
        toffDist = 956 + (1802 * 0.07);
      }
    } else if (depPressAlt > 0 && depPressAlt <= 2500) {
      toffDist = 910 + (1660 * 0.07);
      if (depTempF > 50 && depTempF <= 85) {
        toffDist = 1001 + (1826 * 0.07);
      }
      if (depTempF > 85 && depTempF <= 120) {
        toffDist = 1092 + (1992 * 0.07);
      }
      if (depTempF > 120) {
        toffDist = 1183 + (2158 * 0.07);
      }
    } else if (depPressAlt > 2500 && depPressAlt <= 5000) {
      toffDist = 1115 + (1985 * 0.07);
      if (depTempF > 41 && depTempF <= 76) {
        toffDist = 1227 + (2184 * 0.07);
      }
      if (depTempF > 76 && depTempF <= 111) {
        toffDist = 1338 + (2383 * 0.07);
      }
      if (depTempF > 146) {
        toffDist = 1450 + (2582 * 0.07);
      }
    } else if (depPressAlt > 5000) {
      toffDist = 1360 + (2440 * 0.07);
      if (depTempF > 32 && depTempF <= 67) {
        toffDist = 1496 + (2648 * 0.07);
      }
      if (depTempF > 67 && depTempF <= 102) {
        toffDist = 1632 + (2928 * 0.07);
      }
      if (depTempF > 102) {
        toffDist = 1768 + (3172 * 0.07);
      }
    }

    return toffDist;
  },

  takeOffDistanceGrassRunwayToClear50FeetObstacles: (depPress, depElev, depTemp) => {
    let depPressAlt = ((((Math.pow(depPress / 1013.25, 1 / 5.2559)) - 1) / -0.0000225577) / 0.3048) + depElev;
    let depTempF = (depTemp * 9 / 5) + 32;
    let toffDist = 0;

    if (depPressAlt <= 0) {
      toffDist = 1385 + (1385 * 0.07);
      if (depTempF > 59 && depTempF <= 94) {
        toffDist = 1524 + (1524 * 0.07);
      }
      if (depTempF > 94 && depTempF <= 129) {
        toffDist = 1663 + (1663 * 0.07);
      }
      if (depTempF > 129) {
        toffDist = 1802 + (1802 * 0.07);
      }
    } else if (depPressAlt > 0 && depPressAlt <= 2500) {
      toffDist = 1660 + (1660 * 0.07);
      if (depTempF > 50 && depTempF <= 85) {
        toffDist = 1826 + (1826 * 0.07);
      }
      if (depTempF > 85 && depTempF <= 120) {
        toffDist = 1992 + (1992 * 0.07);
      }
      if (depTempF > 120) {
        toffDist = 2158 + (2158 * 0.07);
      }
    } else if (depPressAlt > 2500 && depPressAlt <= 5000) {
      toffDist = 1985 + (1985 * 0.07);
      if (depTempF > 41 && depTempF <= 76) {
        toffDist = 2184 + (2184 * 0.07);
      }
      if (depTempF > 76 && depTempF <= 111) {
        toffDist = 2383 + (2383 * 0.07);
      }
      if (depTempF > 146) {
        toffDist = 2582 + (2582 * 0.07);
      }
    } else if (depPressAlt > 5000) {
      toffDist = 2440 + (2440 * 0.07);
      if (depTempF > 32 && depTempF <= 67) {
        toffDist = 2684 + (2684 * 0.07);
      }
      if (depTempF > 67 && depTempF <= 102) {
        toffDist = 2928 + (2928 * 0.07);
      }
      if (depTempF > 102) {
        toffDist = 3172 + (3172 * 0.07);
      }
    }

    return toffDist;
  }
 
};

export default CalculateC150L;

