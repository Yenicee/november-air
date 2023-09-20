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
  },

  //CONST DE PARA CALCULAR EL LANDING

  landingDistance: (arrPress, arrElev, arrTemp) => {
    let arrPressAlt = ((((Math.pow(arrPress / 1013.25, 1 / 5.2559)) - 1) / -0.0000225577) / 0.3048) + arrElev;
    let depTempF = (arrTemp * 9 / 5) + 32;
    let lndDist = 0;

    if (arrPressAlt <= 0) {
      lndDist = 445;

      if (depTempF > 59 && depTempF <= 119) {
        lndDist = 490;
      }
      if (depTempF > 119 && depTempF <= 179) {
        lndDist = 535;
      }
    }
    else if (arrPressAlt > 0 && arrPressAlt <= 2500) {
      lndDist = 470;
      if (depTempF > 50 && depTempF <= 110) {
        lndDist = 517;
      }
      if (depTempF > 110 && depTempF <= 170) {
        lndDist = 564;
      }
    }
    else if (arrPressAlt > 2500 && arrPressAlt <= 5000) {
      lndDist = 495;
      if (depTempF > 41 && depTempF <= 101) {
        lndDist = 545;
      }
      if (depTempF > 101 && depTempF <= 161) {
        lndDist = 595;
      }
    }
    else if (arrPressAlt > 5000) {
      lndDist = 520;
      if (depTempF > 32 && depTempF <= 92) {
        lndDist = 572;
      }
      if (depTempF > 92 && depTempF <= 152) {
        lndDist = 624;
      }
    }
    return lndDist;
  },

  landingDistanceToClear50FeetObstacles: (arrPress, arrElev, arrTemp) => {
    let arrPressAlt = ((((Math.pow(arrPress / 1013.25, 1 / 5.2559)) - 1) / -0.0000225577) / 0.3048) + arrElev;
    let depTempF = (arrTemp * 9 / 5) + 32;
    let lndDist = 0;

    if (arrPressAlt <= 0) {
      lndDist = 1075;

      if (depTempF > 59 && depTempF <= 119) {
        lndDist = 1183;
      }
      if (depTempF > 119 && depTempF <= 179) {
        lndDist = 1291;
      }
    }
    else if (arrPressAlt > 0 && arrPressAlt <= 2500) {
      lndDist = 1135;
      if (depTempF > 50 && depTempF <= 110) {
        lndDist = 1249;
      }
      if (depTempF > 110 && depTempF <= 170) {
        lndDist = 1363;
      }
    }
    else if (arrPressAlt > 2500 && arrPressAlt <= 5000) {
      lndDist = 1195;
      if (depTempF > 41 && depTempF <= 101) {
        lndDist = 1315;
      }
      if (depTempF > 101 && depTempF <= 161) {
        lndDist = 1435;
      }
    }
    else if (arrPressAlt > 5000) {
      lndDist = 1255;
      if (depTempF > 32 && depTempF <= 92) {
        lndDist = 1381;
      }
      if (depTempF > 92 && depTempF <= 152) {
        lndDist = 1507;
      }
    }
    return lndDist;
  },

  landingDistanceGrassRunway: (arrPress, arrElev, arrTemp) => {
    let arrPressAlt = ((((Math.pow(arrPress / 1013.25, 1 / 5.2559)) - 1) / -0.0000225577) / 0.3048) + arrElev;
    let depTempF = (arrTemp * 9 / 5) + 32;
    let lndDist = 0;

    if (arrPressAlt <= 0) {
      lndDist = 445 + (1075 * 0.20);

      if (depTempF > 59 && depTempF <= 119) {
        lndDist = 490 + (1183 * 0.20);
      }
      if (depTempF > 119 && depTempF <= 179) {
        lndDist = 535 + (1291 * 0.20);
      }
    }
    else if (arrPressAlt > 0 && arrPressAlt <= 2500) {
      lndDist = 470 + (1135 * 0.20);
      if (depTempF > 50 && depTempF <= 110) {
        lndDist = 517 + (1249 * 0.20);
      }
      if (depTempF > 110 && depTempF <= 170) {
        lndDist = 564 + (1363 * 0.20);
      }
    }
    else if (arrPressAlt > 2500 && arrPressAlt <= 5000) {
      lndDist = 495 + (1195 * 0.20);
      if (depTempF > 41 && depTempF <= 101) {
        lndDist = 545 + (1315 * 0.20);
      }
      if (depTempF > 101 && depTempF <= 161) {
        lndDist = 595 + (1435 * 0.20);
      }
    }
    else if (arrPressAlt > 5000) {
      lndDist = 520 + (1255 * 0.20);
      if (depTempF > 32 && depTempF <= 92) {
        lndDist = 572 + (1381 * 0.20);
      }
      if (depTempF > 92 && depTempF <= 152) {
        lndDist = 624 + (1507 * 0.20);
      }
    }
    return lndDist;
  },

  landingDistanceGrassRunwayToClear50FeetObstacles: (arrPress, arrElev, arrTemp) => {
    let arrPressAlt = ((((Math.pow(arrPress / 1013.25, 1 / 5.2559)) - 1) / -0.0000225577) / 0.3048) + arrElev;
    let depTempF = (arrTemp * 9 / 5) + 32;
    let lndDist = 0;

    if (arrPressAlt <= 0) {
      lndDist = 1075 + (1075 * 0.20);

      if (depTempF > 59 && depTempF <= 119) {
        lndDist = 1183 + (1183 * 0.20);
      }
      if (depTempF > 119 && depTempF <= 179) {
        lndDist = 1291 + (1291 * 0.20);
      }
    }
    else if (arrPressAlt > 0 && arrPressAlt <= 2500) {
      lndDist = 1135 + (1135 * 0.20);
      if (depTempF > 50 && depTempF <= 110) {
        lndDist = 1249 + (1249 * 0.20);
      }
      if (depTempF > 110 && depTempF <= 170) {
        lndDist = 1363 + (1363 * 0.20);
      }
    }
    else if (arrPressAlt > 2500 && arrPressAlt <= 5000) {
      lndDist = 1195 + (1195 * 0.20);
      if (depTempF > 41 && depTempF <= 101) {
        lndDist = 1315 + (1315 * 0.20);
      }
      if (depTempF > 101 && depTempF <= 161) {
        lndDist = 1435 + (1435 * 0.20);
      }
    }
    else if (arrPressAlt > 5000) {
      lndDist = 1255 + (1255 * 0.20);
      if (depTempF > 32 && depTempF <= 92) {
        lndDist = 1381 + (1381 * 0.20);
      }
      if (depTempF > 92 && depTempF <= 152) {
        lndDist = 1507 + (1507 * 0.20);
      }
    }
    return lndDist;
  },

};


export default CalculateC150L;
