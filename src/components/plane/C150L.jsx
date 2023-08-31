

const CalculateC150L = (depPress, depElev, depTemp) => {
    let depPressAlt = ((((Math.pow(depPress / 1013.25, 1 / 5.2559)) - 1) / -0.0000225577) / 0.3048) + depElev;
    let toffDist;
  
    if (depPressAlt <= 0) {
      toffDist = 1385;
      if (depTemp > 59 && depTemp <= 94) {
        toffDist = 1524;
      }
      if (depTemp > 94 && depTemp <= 129) {
        toffDist = 1663;
      }
      if (depTemp > 129) {
        toffDist = 1802;
      }
    } else if (depPressAlt > 0 && depPressAlt <= 2500) {
      toffDist = 1660;
      if (depTemp > 50 && depTemp <= 85) {
        toffDist = 1826;
      }
      if (depTemp > 85 && depTemp <= 120) {
        toffDist = 1992;
      }
      if (depTemp > 120) {
        toffDist = 2158;
      }
    } else if (depPressAlt > 2500 && depPressAlt <= 5000) {
      toffDist = 1985;
      if (depTemp > 41 && depTemp <= 76) {
        toffDist = 2184;
      }
      if (depTemp > 76 && depTemp <= 111) {
        toffDist = 2383;
      }
      if (depTemp > 146) {
        toffDist = 2582;
      }
    } else if (depPressAlt > 5000) {
      toffDist = 2440;
      if (depTemp > 32 && depTemp <= 67) {
        toffDist = 2684;
      }
      if (depTemp > 67 && depTemp <= 102) {
        toffDist = 2928;
      }
      if (depTemp > 102) {
        toffDist = 3172;
      }
    }
  
    alert("Take Off Distance: " + toffDist);
    return depPressAlt;
  };

export default CalculateC150L;