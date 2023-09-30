function nav(depPress, depElev, depTemp, depWindDir, depWindInt, arrPress, arrElev, arrTemp, arrWindDir, arrWindInt) {

    // TOTAL LEGS
    let legs = parseInt(prompt("TOTAL LEGS"));
    let totalDist = parseFloat(prompt("TOTAL DISTANCE"));

    // INPUTS
    let chPoint1 = new Array(legs);
    let chPoint2 = new Array(legs);
    let altitude = new Array(legs);
    let altimeterSetting = new Array(legs);
    let distance = new Array(legs);
    let trueCourse = new Array(legs);
    let pressure = new Array(legs);
    let temperature = new Array(legs);
    let windDirection = new Array(legs);
    let windDirectionType = new Array(legs);
    let windIntensity = new Array(legs);
    let isogonicLine = new Array(legs);
    let magneticDeclination = new Array(legs);
    let rpmEngine = new Array(legs);

    //FILL INPUTS
    let depAlt = depElev;
    let arrAlt = arrElev;

    for (let i = 0; i < legs; i++) {
        chPoint1[i] = prompt("FROM");
        chPoint2[i] = prompt("TO");
    }

    for (let i = 0; i < legs; i++) {
        altitude[i] = parseFloat(prompt("ALT OF LEG " + (i + 1)));
        altimeterSetting[i] = prompt("ALTIMETER SETTING FOR LEG " + (i + 1), "QNE");
    }

    for (let i = 0; i < legs; i++) {
        distance[i] = parseFloat(prompt("DIST OF LEG " + (i + 1)));
    }

    for (let i = 0; i < legs; i++) {
        trueCourse[i] = parseFloat(prompt("TRUE COURSE OF LEG " + (i + 1)));
    }

    for (let i = 0; i < legs; i++) {
        pressure[i] = parseFloat(prompt("PRESSURE OF LEG " + (i + 1)));
    }

    for (let i = 0; i < legs; i++) {
        temperature[i] = parseFloat(prompt("TEMPERATURE OF LEG " + (i + 1)));
    }

    for (let i = 0; i < legs; i++) {
        windDirection[i] = parseFloat(prompt("WIND DIRECTION OF LEG " + (i + 1)));
        windDirectionType[i] = prompt("Seleccione el tipo de viento para el tramo " + (i + 1), "GEOGRAPHIC WIND");
    }

    for (let i = 0; i < legs; i++) {
        windIntensity[i] = parseFloat(prompt("WIND INTENSITY OF LEG " + (i + 1)));
    }

    for (let i = 0; i < legs; i++) {
        isogonicLine[i] = parseFloat(prompt("ISOGONIC LINE OF LEG " + (i + 1)));
    }

    for (let i = 0; i < legs; i++) {
        magneticDeclination[i] = prompt("Type of magnetic variation for the section " + (i + 1), "+W");
    }

    for (let i = 0; i < legs; i++) {
        rpmEngine[i] = parseFloat(prompt("RPM OF LEG " + (i + 1)));
    }


    //FIRST CLIMB
    if (depAlt < altitude[0]) {
        let temp1 = depTemp, temp2 = temperature[0];
        let press1 = depPress, press2 = pressure[0];
        let alt1 = depAlt, alt2 = altitude[0];
        let wi1 = depWindInt, wi2 = windIntensity[0];
        let isoLine = isogonicLine[0];
        let wd1 = depWindDir, wd2 = windDirection[0];
        let tc = trueCourse[0];
        let dist = distance[0];
        let rpm = rpmEngine[0];

        let press = (press1 + press2) / 2;
        let temp = (temp1 + temp2) / 2;
        let pressAlt1;
        pressAlt1 = (((((Math.pow(press1 / 1013.25, 1 / 5.2559)) - 1) / -0.0000225577) / 0.3048) + alt1);
        let pressAlt2;
        if ("QNH" === alimeterSetting[0]) {
            pressAlt2 = (((((Math.pow(press2 / 1013.25, 1 / 5.2559)) - 1) / -0.0000225577) / 0.3048) + alt2);
        } else {
            pressAlt2 = alt2;
        }
        let pressAlt = (pressAlt1 + pressAlt2) / 2;
        let densityAlt1 = (154442.16 * (1 - (Math.pow(17.326 * (((1013.25 * Math.pow((1 - 0.0000225577 * (pressAlt1 / 3.281)), 5.2559)) / 33.864) / (459.67 + ((temp1 * 9 / 5 + 32)))), 0.235)))) - 0.0622272727273 * (154442.16 * (1 - (Math.pow(17.326 * (((1013.25 * Math.pow((1 - 0.0000225577 * (pressAlt1 / 3.281)), 5.2559)) / 33.864) / (459.67 + ((temp1 * 9 / 5 + 32)))), 0.235)))) + 16.681818181818;
        let densityAlt2 = (154442.16 * (1 - (Math.pow(17.326 * (((1013.25 * Math.pow((1 - 0.0000225577 * (pressAlt2 / 3.281)), 5.2559)) / 33.864) / (459.67 + ((temp2 * 9 / 5 + 32)))), 0.235)))) - 0.0622272727273 * (154442.16 * (1 - (Math.pow(17.326 * (((1013.25 * Math.pow((1 - 0.0000225577 * (pressAlt2 / 3.281)), 5.2559)) / 33.864) / (459.67 + ((temp2 * 9 / 5 + 32)))), 0.235)))) + 16.681818181818;
        let densityAlt = (densityAlt1 + densityAlt2) / 2;
        let wi = (wi1 + wi2) / 2;
        if ("-E" === magneticDeclination[0]) {
            isoLine = isoLine * -1;
        } else {
            isoLine = isoLine * 1;
        }
        wd1 = wd1 - isoLine;
        if (wd1 > 360) {
            wd1 = wd1 - 360;
        } else if (wd1 < 0) {
            wd1 = 360 - (wd1 * -1);
        }
        if ("MAGNETIC WIND" === windDirectionType[0]) {
            wd2 = wd2 - isoLine;
            if (wd2 > 360) {
                wd2 = wd2 - 360;
            } else if (wd2 < 0) {
                wd2 = 360 - (wd2 * -1);
            }
        } else {
            wd2 = wd2 + 0;
        }
        let mc = tc + isoLine;
        if (mc > 360) {
            mc = mc - 360;
        } else if (mc < 0) {
            mc = 360 - (mc * -1);
        }
        let ias1 = -0.0006 * pressAlt1 + 76;
        let ias2 = -0.0006 * pressAlt2 + 76;
        let ias = (ias1 + ias2) / 2;
        let cas1 = (0.9 * ias1 + 6) / 1.151;
        let cas2 = (0.9 * ias2 + 6) / 1.151;
        let cas = (cas1 + cas2) / 2;
        let standarTemp1 = -0.0036 * (pressAlt1 - ((((Math.pow((press1 / 1013.25), 1 / 5.2559)) - 1) / -0.0000225577) * 3.281)) + 59;
        let standarTemp2 = -0.0036 * (pressAlt2 - ((((Math.pow((press2 / 1013.25), 1 / 5.2559)) - 1) / -0.0000225577) * 3.281)) + 59;
        let standarTemp = (standarTemp1 + standarTemp2) / 2;
        let temp1F = (temp1 * 9 / 5 + 32);
        let temp2F = (temp2 * 9 / 5 + 32);
        let roc1 = 0;
    }

    if (pressAlt1 <= 5000) {
        roc1 = -0.046 * pressAlt1 + 670;
        if (temp1F > standarTemp1) {
            roc1 = roc1 - ((temp1F - standarTemp1) / 10) * 15;
        }
    } else {
        roc1 = -0.044 * pressAlt1 + 660;
        if (temp1F > standarTemp1) {
            roc1 = roc1 - ((temp1F - standarTemp1) / 10) * 15;
        }
    }
    let roc2 = 0;
    if (pressAlt2 <= 5000) {
        roc2 = -0.046 * pressAlt2 + 670;
        if (temp2F > standarTemp2) {
            roc2 = roc2 - ((temp2F - standarTemp2) / 10) * 15;
        }
    } else {
        roc2 = -0.044 * pressAlt2 + 660;
        if (temp2F > standarTemp2) {
            roc2 = roc2 - ((temp2F - standarTemp2) / 10) * 15;
        }
    }
    let roc = (roc1 + roc2) / 2;
    let tas1 = cas1 / Math.sqrt(Math.pow((1 - 0.0000225577 * (densityAlt1 / 3.281)), 4.256));
    let tas2 = cas2 / Math.sqrt(Math.pow((1 - 0.0000225577 * (densityAlt2 / 3.281)), 4.256));
    let tasClimb = (tas1 + tas2) / 2;
    let fuelClimb1 = 0;
    if (pressAlt1 <= 5000) {
        fuelClimb1 = 0.0002 * pressAlt1;
    } else {
        fuelClimb1 = 0.00028 * pressAlt1 - 0.4;
    }
    let fuelClimb2 = 0;
    if (pressAlt2 <= 5000) {
        fuelClimb2 = 0.0002 * pressAlt2;
    } else {
        fuelClimb2 = 0.00028 * pressAlt2 - 0.4;
    }
    let fuelClimb = fuelClimb2 - fuelClimb1 + 0.6;
    let wa1 = 0; // WCA 1
    if (wd1 < tc) {
        wa1 = tc - wd1;
    }
    if (wd1 > tc) {
        wa1 = wd1 - tc;
    }
    let wca1 = wi1 / (tas1 / Math.sin(Math.radians(wa1)));
    wca1 = Math.degrees(Math.asin(wca1));
    if (wd1 < tc) {
        wca1 = wca1 * 1;
    }
    if (wd1 < tc && wd1 > tc - 180) {
        wca1 = wca1 * -1;
    }
    if (wd1 > tc) {
        wca1 = wca1 * 1;
    }
    if (wd1 < tc && wd1 < tc - 180) {
        wca1 = wca1 * -1; // WCA 1
    }
    if (wd1 < 180) {
        wa1 = wd1 + 180;
    } // GS 1
    if (wd1 >= 180) {
        wa1 = wd1 - 180;
    }
    if (wa1 < tc) {
        wa1 = tc - wa1;
    }
    if (wa1 > tc) {
        wa1 = wa1 - tc;
    }
    let gswca1 = wi1 / (tas1 / Math.sin(Math.radians(wa1)));
    gswca1 = Math.degrees(Math.asin(gswca1));
    let gs1 = 180 - gswca1 - wa1;
    gs1 = Math.sqrt(tas1 * tas1 + wi1 * wi1 - 2 * tas1 * wi1 * Math.cos(Math.radians(gs1)));
    if (wd1 == tc + 180) {
        gs1 = wi1 + tas1;
    }
    if (wd1 == tc - 180) {
        gs1 = wi1 + tas1; // GS 1
    }
    let wa2 = 0; // WCA 2
    if (wd2 < tc) {
        wa2 = tc - wd2;
    }
    if (wd2 > tc) {
        wa2 = wd2 - tc;
    }
    let wca2 = wi2 / (tas2 / Math.sin(Math.radians(wa2)));
    wca2 = Math.degrees(Math.asin(wca2));
    if (wd2 < tc) {
        wca2 = wca2 * 1;
    }
    if (wd2 < tc && wd2 > tc - 180) {
        wca2 = wca2 * -1;
    }
    if (wd2 > tc) {
        wca2 = wca2 * 1;
    }
    if (wd2 < tc && wd2 < tc - 180) {
        wca2 = wca2 * -1; // WCA 2
    }
    if (wd2 < 180) {
        wa2 = wd2 + 180;
    } // GS 2
    if (wd2 >= 180) {
        wa2 = wd2 - 180;
    }
    if (wa2 < tc) {
        wa2 = tc - wa2;
    }
    if (wa2 > tc) {
        wa2 = wa2 - tc;
    }
    let gswca2 = wi2 / (tas2 / Math.sin(Math.radians(wa2)));
    gswca2 = Math.degrees(Math.asin(gswca2));
    let gs2 = 180 - gswca2 - wa2;
    gs2 = Math.sqrt(tas2 * tas2 + wi2 * wi2 - 2 * tas2 * wi2 * Math.cos(Math.radians(gs2)));
    if (wd2 == tc + 180) {
        gs2 = wi2 + tas2;
    }
    if (wd2 == tc - 180) {
        gs2 = wi2 + tas2; // GS 2
    }
    let gsClimb = (gs1 + gs2) / 2;
    let th1 = tc + wca1;
    if (th1 > 360) {
        th1 = th1 - 360;
    } else if (th1 < 0) {
        th1 = 360 - (th1 * -1);
    }

    let th2 = tc + wca2;
    if (th2 > 360) {
        th2 = th2 - 360;
    } else if (th2 < 0) {
        th2 = 360 - (th2 * -1);
    }

    let mh1 = tc + wca1 + isoLine;
    if (mh1 > 360) {
        mh1 = mh1 - 360;
    } else if (mh1 < 0) {
        mh1 = 360 - (mh1 * -1);
    }

    let mh2 = tc + wca2 + isoLine;
    if (mh2 > 360) {
        mh2 = mh2 - 360;
    } else if (mh2 < 0) {
        mh2 = 360 - (mh2 * -1);
    }

    let dev1 = 0;
    let dev2 = 0;

    let ch1 = mh1 + dev1;
    if (ch1 > 360) {
        ch1 = ch1 - 360;
    } else if (ch1 < 0) {
        ch1 = 360 - (ch1 * -1);
    }

    let ch2 = mh2 + dev2;
    if (ch2 > 360) {
        ch2 = ch2 - 360;
    } else if (ch2 < 0) {
        ch2 = 360 - (ch2 * -1);
    }

    let eteClimb = (pressAlt2 - pressAlt1) / roc;
    let distClimb = eteClimb * gsClimb / 60;

    while (dist < distClimb) {
        dist = parseFloat(prompt("DIST MUST BE MORE THAN " + distClimb));
    }

    let distCruise = dist - distClimb;
    let tas = 0, gph = 0;

    // LESS THAN 2500
    if (densityAlt2 <= 2500 && rpm <= 2700 && rpm > 2600) {
        tas = (-0.0004 * densityAlt2 + 120) - (-0.05 * rpm + 135);
        gph = (-0.00024 * densityAlt2 + 7.2) - (-0.008 * rpm + 21.6);
    }
    if (densityAlt2 <= 2500 && rpm <= 2600 && rpm > 2500) {
        tas = (-0.0004 * densityAlt2 + 115) - (-0.06 * rpm + 156);
        gph = (-0.0002 * densityAlt2 + 6.3) - (-0.007 * rpm + 18.2);
    }
    if (densityAlt2 <= 2500 && rpm <= 2500 && rpm > 2400) {
        tas = (-0.0004 * densityAlt2 + 109) - (-0.05 * rpm + 125);
        gph = (-0.00012 * densityAlt2 + 5.4) - (-0.005 * rpm + 12.5);
    }
    if (densityAlt2 <= 2500 && rpm <= 2400 && rpm > 2300) {
        tas = (-0.0008 * densityAlt2 + 105) - (-0.07 * rpm + 168);
        gph = (-0.00012 * densityAlt2 + 4.9) - (-0.005 * rpm + 12);
    }
    if (densityAlt2 <= 2500 && rpm <= 2300 && rpm > 2200) {
        tas = (-0.0012 * densityAlt2 + 99) - (-0.07 * rpm + 161);
        gph = (-0.00012 * densityAlt2 + 4.4) - (-0.005 * rpm + 11.5);
    }
    if (densityAlt2 <= 2500 && rpm <= 2200 && rpm > 2100) {
        tas = (-0.002 * densityAlt2 + 94) - (-0.1 * rpm + 220);
        gph = (-0.00008 * densityAlt2 + 3.8) - (-0.004 * rpm + 8.8);
    }
    if (densityAlt2 <= 2500 && rpm <= 2100) {
        tas = (-0.002 * densityAlt2 + 94) - (-0.1 * rpm + 220);
        gph = (-0.00008 * densityAlt2 + 3.8) - (-0.004 * rpm + 8.8);
    }
    // FROM 2500 TO 5000
    if (densityAlt2 <= 5000 && densityAlt2 > 2500 && rpm <= 2700 && rpm > 2600) {
        tas = (-0.0004 * densityAlt2 + 120) - (-0.05 * rpm + 135);
        gph = (-0.00024 * densityAlt2 + 7.2) - (-0.007 * rpm + 18.9);
    }
    if (densityAlt2 <= 5000 && densityAlt2 > 2500 && rpm <= 2600 && rpm > 2500) {
        tas = (-0.0004 * densityAlt2 + 115) - (-0.06 * rpm + 156);
        gph = (-0.0002 * densityAlt2 + 6.3) - (-0.005 * rpm + 13);
    }
    if (densityAlt2 <= 5000 && densityAlt2 > 2500 && rpm <= 2500 && rpm > 2400) {
        tas = (-0.0004 * densityAlt2 + 109) - (-0.06 * rpm + 150);
        gph = (-0.00012 * densityAlt2 + 5.4) - (-0.005 * rpm + 12.5);
    }
    if (densityAlt2 <= 5000 && densityAlt2 > 2500 && rpm <= 2400 && rpm > 2300) {
        tas = (-0.0008 * densityAlt2 + 105) - (-0.08 * rpm + 192);
        gph = (-0.00012 * densityAlt2 + 4.9) - (-0.005 * rpm + 12);
    }
    if (densityAlt2 <= 5000 && densityAlt2 > 2500 && rpm <= 2300 && rpm > 2200) {
        tas = (-0.0012 * densityAlt2 + 99) - (-0.09 * rpm + 207);
        gph = (-0.00012 * densityAlt2 + 4.4) - (-0.004 * rpm + 9.2);
    }
    if (densityAlt2 <= 5000 && densityAlt2 > 2500 && rpm <= 2200 && rpm > 2100) {
        tas = (-0.002 * densityAlt2 + 94) - (-0.13 * rpm + 286);
        gph = (-0.00008 * densityAlt2 + 3.8) - (-0.004 * rpm + 8.8);
    }
    if (densityAlt2 <= 5000 && densityAlt2 > 2500 && rpm <= 2100) {
        tas = (-0.002 * densityAlt2 + 94) - (-0.13 * rpm + 286);
        gph = (-0.00008 * densityAlt2 + 3.8) - (-0.004 * rpm + 8.8);
    }

    // FROM 5000 TO 7500
    if (densityAlt2 <= 7500 && densityAlt2 > 5000 && rpm <= 2700 && rpm > 2600) {
        tas = (-0.0004 * densityAlt2 + 120) - (-0.06 * rpm + 162);
        gph = (-0.0002 * densityAlt2 + 7) - (-0.006 * rpm + 16.2);
    }
    if (densityAlt2 <= 7500 && densityAlt2 > 5000 && rpm <= 2600 && rpm > 2500) {
        tas = (-0.0008 * densityAlt2 + 117) - (-0.06 * rpm + 156);
        gph = (-0.00016 * densityAlt2 + 6.1) - (-0.005 * rpm + 13);
    }
    if (densityAlt2 <= 7500 && densityAlt2 > 5000 && rpm <= 2500 && rpm > 2400) {
        tas = (-0.0008 * densityAlt2 + 111) - (-0.07 * rpm + 175);
        gph = (-0.00016 * densityAlt2 + 5.6) - (-0.004 * rpm + 10);
    }
    if (densityAlt2 <= 7500 && densityAlt2 > 5000 && rpm <= 2400 && rpm > 2300) {
        tas = (-0.0012 * densityAlt2 + 107) - (-0.09 * rpm + 216);
        gph = (-0.00012 * densityAlt2 + 4.9) - (-0.004 * rpm + 9.6);
    }
    if (densityAlt2 <= 7500 && densityAlt2 > 5000 && rpm <= 2300 && rpm > 2200) {
        tas = (-0.0016 * densityAlt2 + 101) - (-0.12 * rpm + 276);
        gph = (-0.00008 * densityAlt2 + 4.2) - (-0.004 * rpm + 9.2);
    }
    if (densityAlt2 <= 7500 && densityAlt2 > 5000 && rpm <= 2200) {
        tas = (-0.0016 * densityAlt2 + 101) - (-0.12 * rpm + 276);
        gph = (-0.00008 * densityAlt2 + 4.2) - (-0.004 * rpm + 9.2);
    }
    // FROM 7500 TO 10000
    if (densityAlt2 <= 10000 && densityAlt2 > 7500 && rpm <= 2700 && rpm > 2600) {
        tas = (-0.0004 * densityAlt2 + 120) - (-0.07 * rpm + 189);
        gph = (-0.00016 * densityAlt2 + 6.7) - (-0.005 * rpm + 13.5);
    }
    if (densityAlt2 <= 10000 && densityAlt2 > 7500 && rpm <= 2600 && rpm > 2500) {
        tas = (-0.0008 * densityAlt2 + 117) - (-0.07 * rpm + 182);
        gph = (-0.00012 * densityAlt2 + 5.8) - (-0.005 * rpm + 13);
    }
    if (densityAlt2 <= 10000 && densityAlt2 > 7500 && rpm <= 2500 && rpm > 2400) {
        tas = (-0.0012 * densityAlt2 + 114) - (-0.09 * rpm + 225);
        gph = (-0.00012 * densityAlt2 + 5.3) - (-0.004 * rpm + 10);
    }
    if (densityAlt2 <= 10000 && densityAlt2 > 7500 && rpm <= 2400 && rpm > 2300) {
        tas = (-0.002 * densityAlt2 + 113) - (-0.11 * rpm + 264);
        gph = (-0.00012 * densityAlt2 + 4.9) - (-0.004 * rpm + 9.6);
    }
    if (densityAlt2 <= 10000 && densityAlt2 > 7500 && rpm <= 2300) {
        tas = (-0.002 * densityAlt2 + 113) - (-0.11 * rpm + 264);
        gph = (-0.00012 * densityAlt2 + 4.9) - (-0.004 * rpm + 9.6);
    }
    // FROM 10000 TO 12500
    if (densityAlt2 <= 12500 && densityAlt2 > 10000 && rpm <= 2600 && rpm > 2500) {
        tas = (-0.0012 * densityAlt2 + 121) - (-0.09 * rpm + 234);
        gph = (-0.00012 * densityAlt2 + 5.8) - (-0.004 * rpm + 10.4);
    }
    if (densityAlt2 <= 12500 && densityAlt2 > 10000 && rpm <= 2500 && rpm > 2400) {
        tas = (-0.002 * densityAlt2 + 122) - (-0.09 * rpm + 225);
        gph = (-0.00008 * densityAlt2 + 4.9) - (-0.004 * rpm + 10);
    }
    if (densityAlt2 <= 12500 && densityAlt2 > 10000 && rpm <= 2400) {
        tas = (-0.002 * densityAlt2 + 122) - (-0.09 * rpm + 225);
        gph = (-0.00008 * densityAlt2 + 4.9) - (-0.004 * rpm + 10);
    }
    // ABOVE 12500
    if (densityAlt2 > 12500 && rpm <= 2600 && rpm > 2500) {
        tas = (-0.0012 * densityAlt2 + 121) - (-0.09 * rpm + 234);
        gph = (-0.00012 * densityAlt2 + 5.8) - (-0.004 * rpm + 10.4);
    }
    if (densityAlt2 > 12500 && rpm <= 2500 && rpm > 2400) {
        tas = (-0.002 * densityAlt2 + 122) - (-0.09 * rpm + 225);
        gph = (-0.00008 * densityAlt2 + 4.9) - (-0.004 * rpm + 10);
    }
    if (densityAlt2 > 12500 && rpm <= 2400) {
        tas = (-0.002 * densityAlt2 + 122) - (-0.09 * rpm + 225);
        gph = (-0.00008 * densityAlt2 + 4.9) - (-0.004 * rpm + 10);
    }
    tas = tas / 1.151;

    let wa = 0; //WCA
    if (wd2 < tc) { wa = tc - wd2; }
    if (wd2 > tc) { wa = wd2 - tc; }
    let wca = wi2 / (tas / Math.sin(Math.radians(wa)));
    wca = Math.degrees(Math.asin(wca));
    if (wd2 < tc) { wca = wca * 1; }
    if (wd2 < tc && wd2 > tc - 180) { wca = wca * -1; }
    if (wd2 > tc) { wca = wca * 1; }
    if (wd2 < tc && wd2 < tc - 180) { wca = wca * -1; } //WCA
    if (wd2 < 180) { wa = wd2 + 180; } //GS
    if (wd2 >= 180) { wa = wd2 - 180; }
    if (wa < tc) { wa = tc - wa; }
    if (wa > tc) { wa = wa - tc; }
    let gswca = wi2 / (tas / Math.sin(Math.radians(wa)));
    gswca = Math.degrees(Math.asin(gswca));
    let gs = 180 - gswca - wa;
    gs = Math.sqrt((tas * tas) + (wi2 * wi2) - (2 * tas * wi2 * Math.cos(Math.radians(gs))));
    if (wd2 == tc + 180) { gs = wi2 + tas; }
    if (wd2 == tc - 180) { gs = wi2 + tas; } //GS
    let th = tc + wca;
    if (th > 360) {
        th = th - 360;
    } else if (th < 0) {
        th = 360 - (-1 * th);
    }
    let mh = tc + wca + isoLine;
    if (mh > 360) {
        mh = mh - 360;
    } else if (mh < 0) {
        mh = 360 - (-1 * mh);
    }
    let dev = 0;
    let ch = mh + dev;
    if (ch > 360) {
        ch = ch - 360;
    } else if (ch < 0) {
        ch = 360 - (-1 * ch);
    }
    let ete = distCrusire * 60 / gs;
    let fuel = ete * gph / 60;

    console.log("");
    console.log("CLIMB");
    console.log("FROM " + chPoint1[0]);
    console.log("TO " + chPoint2[0]);
    console.log("ALTITUDE " + altitude[0]);
    console.log("ALTIMETER SETTING " + altimeterSetting[0]);
    console.log("PRESSURE " + pressure[0]);
    console.log("TEMPERATURE " + temperature[0]);
    console.log("PRESSURE ALTITUDE 1 " + pressAlt1);
    console.log("PRESSURE ALTITUDE 2 " + pressAlt2);
    console.log("PRESSURE ALTITUDE " + pressAlt);
    console.log("DENSITY ALTITUDE 1 " + densityAlt1);
    console.log("DENSITY ALTITUDE 2 " + densityAlt2);
    console.log("DENSITY ALTITUDE " + densityAlt);
    console.log("IAS 1 " + ias1);
    console.log("IAS 2 " + ias2);
    console.log("IAS " + ias);
    console.log("CAS 1 " + cas1);
    console.log("CAS 2 " + cas2);
    console.log("CAS " + cas);
    console.log("TAS 1 " + tas1);
    console.log("TAS 2 " + tas2);
    console.log("TAS CLIMB " + tasClimb);
    console.log("WIND DIRECTION 1 " + wd1);
    console.log("WIND DIRECTION 2 " + wd2);
    console.log("WIND DIRECTION TYPE 2 " + windDirectionType[0]);
    console.log("WIND INTENSITY " + windIntensity[0]);
    console.log("TRUE COURSE " + trueCourse[0]);
    console.log("WCA 1 " + wca1);
    console.log("WCA 2 " + wca2);
    console.log("GROUND SPEED 1 " + gs1);
    console.log("GROUND SPEED 2 " + gs2);
    console.log("GROUND SPEED " + gsClimb);
    console.log("TRUE HEADING 1 " + th1);
    console.log("TRUE HEADING 2 " + th2);
    console.log("ISOGONIC LINE " + isogonicLine[0]);
    console.log("MAGNETIC DECLINATION " + magneticDeclination[0]);
    console.log("MC " + mc);
    console.log("MAGNETIC HEADING 1 " + mh1);
    console.log("MAGNETIC HEADING 2 " + mh2);
    console.log("COMPASS DEVIATION 1 " + dev1);
    console.log("COMPASS DEVIATION 2 " + dev2);
    console.log("COMPASS HEADING 1 " + ch1);
    console.log("COMPASS HEADING 2 " + ch2);
    console.log("STANDARD TEMP 1 " + standarTemp1);
    console.log("STANDARD TEMP 2 " + standarTemp2);
    console.log("STANDARD TEMP " + standarTemp);
    console.log("ROC 1 " + roc1);
    console.log("ROC 2 " + roc2);
    console.log("ROC " + roc);
    console.log("TIME TO CLIMB " + eteClimb);
    console.log("FUEL TO CLIMB 1 " + fuelClimb1);
    console.log("FUEL TO CLIMB 2 " + fuelClimb2);
    console.log("FUEL TO CLIMB " + fuelClimb);
    console.log("CLIMB DISTANCE " + distClimb);
    console.log("DISTANCE " + distance[0]);
    console.log("");
    console.log("CRUISE");
    console.log("CRUISE DISTANCE " + distCruise);
    console.log("RPM " + rpmEngine[0]);
    console.log("TAS " + tas);
    console.log("GPH " + gph);
    console.log("WCA " + wca);
    console.log("GS " + gs);
    console.log("TH " + th);
    console.log("MH " + mh);
    console.log("DEV " + dev);
    console.log("CH " + ch);
    console.log("ETE " + ete);
    console.log("FUEL " + fuel);
    console.log("");


    // CLIMB, CRUISE, DESCEND
    for (let i = 0; i < legs - 2; i++) {
        if (altitude[i] < altitude[i + 1]) {

            let temp1 = temperature[i],
                temp2 = temperature[i + 1];
            let press1 = pressure[i],
                press2 = pressure[i + 1];
            let alt1 = altitude[i],
                alt2 = altitude[i + 1];
            let wi1 = windIntensity[i],
                wi2 = windIntensity[i + 1];
            let isoLine = isogonicLine[i + 1];
            let wd1 = windDirection[i],
                wd2 = windDirection[i + 1];
            let tc = trueCourse[i + 1];
            let dist = distance[i + 1];
            let rpm = rpmEngine[i + 1];

            let press = (press1 + press2) / 2;
            let temp = (temp1 + temp2) / 2;
            let pressAlt1;
            if ("QNH" === altimeterSetting[i]) {
                pressAlt1 = (((((Math.pow(press1 / 1013.25, 1 / 5.2559)) - 1) / -0.0000225577) / 0.3048) + alt1);
            } else {
                pressAlt1 = alt1;
            }
            let pressAlt2;
            if ("QNH" === altimeterSetting[i + 1]) {
                pressAlt2 = (((((Math.pow(press2 / 1013.25, 1 / 5.2559)) - 1) / -0.0000225577) / 0.3048) + alt2);
            } else {
                pressAlt2 = alt2;
            }
            let pressAlt = (pressAlt1 + pressAlt2) / 2;
            let densityAlt1 = (154442.16 * (1 - (Math.pow(17.326 * (((1013.25 * Math.pow((1 - 0.0000225577 * (pressAlt1 / 3.281)), 5.2559)) / 33.864) / (459.67 + ((temp1 * 9 / 5 + 32))), 0.235)))) - 0.0622272727273 * (154442.16 * (1 - (Math.pow(17.326 * (((1013.25 * Math.pow((1 - 0.0000225577 * (pressAlt1 / 3.281)), 5.2559)) / 33.864) / (459.67 + ((temp1 * 9 / 5 + 32))), 0.235)))) + 16.681818181818;
            let densityAlt2 = (154442.16 * (1 - (Math.pow(17.326 * (((1013.25 * Math.pow((1 - 0.0000225577 * (pressAlt2 / 3.281)), 5.2559)) / 33.864) / (459.67 + ((temp2 * 9 / 5 + 32))), 0.235)))) - 0.0622272727273 * (154442.16 * (1 - (Math.pow(17.326 * (((1013.25 * Math.pow((1 - 0.0000225577 * (pressAlt2 / 3.281)), 5.2559)) / 33.864) / (459.67 + ((temp2 * 9 / 5 + 32))), 0.235)))) + 16.681818181818;
            let densityAlt = (densityAlt1 + densityAlt2) / 2;
            let wi = (wi1 + wi2) / 2;

            if ("-E" === magneticDeclination[i + 1]) {
                isoLine = isoLine * -1;
            } else {
                isoLine = isoLine * 1;
            }
            if ("MAGNETIC WIND" === windDirectionType[i]) {
                wd1 = wd1 - isoLine;
                if (wd1 > 360) {
                    wd1 = wd1 - 360;
                } else if (wd1 < 0) {
                    wd1 = 360 - (wd1 * -1);
                }
            } else {
                wd1 = wd1 + 0;
            }
            if ("MAGNETIC WIND" === windDirectionType[i + 1]) {
                wd2 = wd2 - isoLine;
                if (wd2 > 360) {
                    wd2 = wd2 - 360;
                } else if (wd2 < 0) {
                    wd2 = 360 - (wd2 * -1);
                }
            } else {
                wd2 = wd2 + 0;
            }
            let mc = tc + isoLine;
            if (mc > 360) {
                mc = mc - 360;
            } else if (mc < 0) {
                mc = 360 - (mc * -1);
            }
            let ias1 = -0.0006 * pressAlt1 + 76;
            let ias2 = -0.0006 * pressAlt2 + 76;
            let ias = (ias1 + ias2) / 2;
            let cas1 = (0.9 * ias1 + 6) / 1.151;
            let cas2 = (0.9 * ias2 + 6) / 1.151;
            let cas = (cas1 + cas2) / 2;
            let standarTemp1 = -0.0036 * (pressAlt1 - ((((Math.pow((press1 / 1013.25), 1 / 5.2559)) - 1) / -0.0000225577) * 3.281)) + 59;
            let standarTemp2 = -0.0036 * (pressAlt2 - ((((Math.pow((press2 / 1013.25), 1 / 5.2559)) - 1) / -0.0000225577) * 3.281)) + 59;
            let standarTemp = (standarTemp1 + standarTemp2) / 2;
            let temp1F = (temp1 * 9 / 5 + 32);
            let temp2F = (temp2 * 9 / 5 + 32);
            let roc1 = 0;
            if (pressAlt1 <= 5000) {
                roc1 = -0.046 * pressAlt1 + 670;
                if (temp1F > standarTemp1) {
                    roc1 = roc1 - (((temp1F - standarTemp1) / 10) * 15);
                }
            } else {
                roc1 = -0.044 * pressAlt1 + 660;
                if (temp1F > standarTemp1) {
                    roc1 = roc1 - (((temp1F - standarTemp1) / 10) * 15);
                }
            }

            let roc2 = 0;
            if (pressAlt2 <= 5000) {
                roc2 = -0.046 * pressAlt2 + 670;
                if (temp2F > standarTemp2) {
                    roc2 = roc2 - (((temp2F - standarTemp2) / 10) * 15);
                }
            } else {
                roc2 = -0.044 * pressAlt2 + 660;
                if (temp2F > standarTemp2) {
                    roc2 = roc2 - (((temp2F - standarTemp2) / 10) * 15);
                }
            }

            let roc = (roc1 + roc2) / 2;
            let tas1 = cas1 / Math.sqrt(Math.pow((1 - 0.0000225577 * (densityAlt1 / 3.281)), 4.256));
            let tas2 = cas2 / Math.sqrt(Math.pow((1 - 0.0000225577 * (densityAlt2 / 3.281)), 4.256));
            let tasClimb = (tas1 + tas2) / 2;
            let fuelClimb1 = 0;

            if (pressAlt1 <= 5000) {
                fuelClimb1 = 0.0002 * pressAlt1;
            } else {
                fuelClimb1 = 0.00028 * pressAlt1 - 0.4;
            }

            let fuelClimb2 = 0;
            if (pressAlt2 <= 5000) {
                fuelClimb2 = 0.0002 * pressAlt2;
            } else {
                fuelClimb2 = 0.00028 * pressAlt2 - 0.4;
            }
            let fuelClimb = (fuelClimb2 - fuelClimb1 + 0.6);
            let wa1 = 0; // WCA 1

            if (wd1 < tc) { wa1 = tc - wd1; }
            if (wd1 > tc) { wa1 = wd1 - tc; }

            let wca1 = wi1 / (tas1 / Math.sin(Math.toRadians(wa1)));
            wca1 = Math.toDegrees(Math.asin(wca1));
            if (wd1 < tc) { wca1 = wca1 * 1; }
            if (wd1 < tc && wd1 > tc - 180) { wca1 = wca1 * -1; }
            if (wd1 > tc) { wca1 = wca1 * 1; }
            if (wd1 < tc && wd1 < tc - 180) { wca1 = wca1 * -1; } // WCA 1
            if (wd1 < 180) { wa1 = wd1 + 180; } // GS 1
            if (wd1 >= 180) { wa1 = wd1 - 180; }
            if (wa1 < tc) { wa1 = tc - wa1; }
            if (wa1 > tc) { wa1 = wa1 - tc; }
            let gswca1 = wi1 / (tas1 / Math.sin(Math.toRadians(wa1)));
            gswca1 = Math.toDegrees(Math.asin(gswca1));
            let gs1 = 180 - gswca1 - wa1;
            gs1 = Math.sqrt((tas1 * tas1) + (wi1 * wi1) - (2 * tas1 * wi1 * Math.cos(Math.toRadians(gs1))));
            if (wd1 === tc + 180) { gs1 = wi1 + tas1; }
            if (wd1 === tc - 180) { gs1 = wi1 + tas1; } // GS 1


            let wa2 = 0; // WCA 2
            if (wd2 < tc) { wa2 = tc - wd2; }
            if (wd2 > tc) { wa2 = wd2 - tc; }
            let wca2 = wi2 / (tas2 / Math.sin(Math.toRadians(wa2)));
            wca2 = Math.toDegrees(Math.asin(wca2));
            if (wd2 < tc) { wca2 = wca2 * 1; }
            if (wd2 < tc && wd2 > tc - 180) { wca2 = wca2 * -1; }
            if (wd2 > tc) { wca2 = wca2 * 1; }
            if (wd2 < tc && wd2 < tc - 180) { wca2 = wca2 * -1; } // WCA 2
            if (wd2 < 180) { wa2 = wd2 + 180; } // GS 2
            if (wd2 >= 180) { wa2 = wd2 - 180; }
            if (wa2 < tc) { wa2 = tc - wa2; }
            if (wa2 > tc) { wa2 = wa2 - tc; }
            let gswca2 = wi2 / (tas2 / Math.sin(Math.toRadians(wa2)));
            gswca2 = Math.toDegrees(Math.asin(gswca2));
            let gs2 = 180 - gswca2 - wa2;
            gs2 = Math.sqrt((tas2 * tas2) + (wi2 * wi2) - (2 * tas2 * wi2 * Math.cos(Math.toRadians(gs2))));
            if (wd2 === tc + 180) { gs2 = wi2 + tas2; }
            if (wd2 === tc - 180) { gs2 = wi2 + tas2; } // GS 2
            let gsClimb = (gs1 + gs2) / 2;
            let th1 = tc + wca1;

            if (th1 > 360) {
                th1 = th1 - 360;
            } else if (th1 < 0) {
                th1 = 360 - (th1 * -1);
            }

            let th2 = tc + wca2;
            if (th2 > 360) {
                th2 = th2 - 360;
            } else if (th2 < 0) {
                th2 = 360 - (th2 * -1);
            }
            let mh1 = tc + wca1 + isoLine;
            if (mh1 > 360) {
                mh1 = mh1 - 360;
            } else if (mh1 < 0) {
                mh1 = 360 - (mh1 * -1);
            }
            let mh2 = tc + wca2 + isoLine;
            if (mh2 > 360) {
                mh2 = mh2 - 360;
            } else if (mh2 < 0) {
                mh2 = 360 - (mh2 * -1);
            }
            let dev1 = 0;
            let dev2 = 0;
            let ch1 = mh1 + dev1;
            if (ch1 > 360) {
                ch1 = ch1 - 360;
            } else if (ch1 < 0) {
                ch1 = 360 - (ch1 * -1);
            }
            let ch2 = mh2 + dev2;
            if (ch2 > 360) {
                ch2 = ch2 - 360;
            } else if (ch2 < 0) {
                ch2 = 360 - (ch2 * -1);
            }
            let eteClimb = ((pressAlt2 - pressAlt1)) / roc;
            let distClimb = eteClimb * gsClimb / 60;

            while (dist < distClimb) {
                dist = parseFloat(prompt("DIST MUST BE MORE THAN " + distClimb));
            }

            let distCrusire = dist - distClimb;
            let tas = 0;
            let gph = 0;

            // LESS THAN 2500
            if (densityAlt2 <= 2500 && rpm <= 2700 && rpm > 2600) {
                tas = (-0.0004 * densityAlt2 + 120) - (-0.05 * rpm + 135);
                gph = (-0.00024 * densityAlt2 + 7.2) - (-0.008 * rpm + 21.6);
            }
            if (densityAlt2 <= 2500 && rpm <= 2600 && rpm > 2500) {
                tas = (-0.0004 * densityAlt2 + 115) - (-0.06 * rpm + 156);
                gph = (-0.0002 * densityAlt2 + 6.3) - (-0.007 * rpm + 18.2);
            }
            if (densityAlt2 <= 2500 && rpm <= 2500 && rpm > 2400) {
                tas = (-0.0004 * densityAlt2 + 109) - (-0.05 * rpm + 125);
                gph = (-0.00012 * densityAlt2 + 5.4) - (-0.005 * rpm + 12.5);
            }
            if (densityAlt2 <= 2500 && rpm <= 2400 && rpm > 2300) {
                tas = (-0.0008 * densityAlt2 + 105) - (-0.07 * rpm + 168);
                gph = (-0.00012 * densityAlt2 + 4.9) - (-0.005 * rpm + 12);
            }
            if (densityAlt2 <= 2500 && rpm <= 2300 && rpm > 2200) {
                tas = (-0.0012 * densityAlt2 + 99) - (-0.07 * rpm + 161);
                gph = (-0.00012 * densityAlt2 + 4.4) - (-0.005 * rpm + 11.5);
            }
            if (densityAlt2 <= 2500 && rpm <= 2200 && rpm > 2100) {
                tas = (-0.002 * densityAlt2 + 94) - (-0.1 * rpm + 220);
                gph = (-0.00008 * densityAlt2 + 3.8) - (-0.004 * rpm + 8.8);
            }
            if (densityAlt2 <= 2500 && rpm <= 2100) {
                tas = (-0.002 * densityAlt2 + 94) - (-0.1 * rpm + 220);
                gph = (-0.00008 * densityAlt2 + 3.8) - (-0.004 * rpm + 8.8);
            }
            // FROM 2500 TO 5000
            if (densityAlt2 <= 5000 && densityAlt2 > 2500 && rpm <= 2700 && rpm > 2600) {
                tas = (-0.0004 * densityAlt2 + 120) - (-0.05 * rpm + 135);
                gph = (-0.00024 * densityAlt2 + 7.2) - (-0.007 * rpm + 18.9);
            }
            if (densityAlt2 <= 5000 && densityAlt2 > 2500 && rpm <= 2600 && rpm > 2500) {
                tas = (-0.0004 * densityAlt2 + 115) - (-0.06 * rpm + 156);
                gph = (-0.0002 * densityAlt2 + 6.3) - (-0.005 * rpm + 13);
            }
            if (densityAlt2 <= 5000 && densityAlt2 > 2500 && rpm <= 2500 && rpm > 2400) {
                tas = (-0.0004 * densityAlt2 + 109) - (-0.06 * rpm + 150);
                gph = (-0.00012 * densityAlt2 + 5.4) - (-0.005 * rpm + 12.5);
            }
            if (densityAlt2 <= 5000 && densityAlt2 > 2500 && rpm <= 2400 && rpm > 2300) {
                tas = (-0.0008 * densityAlt2 + 105) - (-0.08 * rpm + 192);
                gph = (-0.00012 * densityAlt2 + 4.9) - (-0.005 * rpm + 12);
            }
            if (densityAlt2 <= 5000 && densityAlt2 > 2500 && rpm <= 2300 && rpm > 2200) {
                tas = (-0.0012 * densityAlt2 + 99) - (-0.09 * rpm + 207);
                gph = (-0.00012 * densityAlt2 + 4.4) - (-0.004 * rpm + 9.2);
            }
            if (densityAlt2 <= 5000 && densityAlt2 > 2500 && rpm <= 2200 && rpm > 2100) {
                tas = (-0.002 * densityAlt2 + 94) - (-0.13 * rpm + 286);
                gph = (-0.00008 * densityAlt2 + 3.8) - (-0.004 * rpm + 8.8);
            }
            if (densityAlt2 <= 5000 && densityAlt2 > 2500 && rpm <= 2100) {
                tas = (-0.002 * densityAlt2 + 94) - (-0.13 * rpm + 286);
                gph = (-0.00008 * densityAlt2 + 3.8) - (-0.004 * rpm + 8.8);
            }
            // FROM 5000 TO 7500
            if (densityAlt2 <= 7500 && densityAlt2 > 5000 && rpm <= 2700 && rpm > 2600) {
                tas = (-0.0004 * densityAlt2 + 120) - (-0.06 * rpm + 162);
                gph = (-0.0002 * densityAlt2 + 7) - (-0.006 * rpm + 16.2);
            }
            if (densityAlt2 <= 7500 && densityAlt2 > 5000 && rpm <= 2600 && rpm > 2500) {
                tas = (-0.0008 * densityAlt2 + 117) - (-0.06 * rpm + 156);
                gph = (-0.00016 * densityAlt2 + 6.1) - (-0.005 * rpm + 13);
            }
            if (densityAlt2 <= 7500 && densityAlt2 > 5000 && rpm <= 2500 && rpm > 2400) {
                tas = (-0.0008 * densityAlt2 + 111) - (-0.07 * rpm + 175);
                gph = (-0.00016 * densityAlt2 + 5.6) - (-0.004 * rpm + 10);
            }
            if (densityAlt2 <= 7500 && densityAlt2 > 5000 && rpm <= 2400 && rpm > 2300) {
                tas = (-0.0012 * densityAlt2 + 107) - (-0.09 * rpm + 216);
                gph = (-0.00012 * densityAlt2 + 4.9) - (-0.004 * rpm + 9.6);
            }
            if (densityAlt2 <= 7500 && densityAlt2 > 5000 && rpm <= 2300 && rpm > 2200) {
                tas = (-0.0016 * densityAlt2 + 101) - (-0.12 * rpm + 276);
                gph = (-0.00008 * densityAlt2 + 4.2) - (-0.004 * rpm + 9.2);
            }
            if (densityAlt2 <= 7500 && densityAlt2 > 5000 && rpm <= 2200) {
                tas = (-0.0016 * densityAlt2 + 101) - (-0.12 * rpm + 276);
                gph = (-0.00008 * densityAlt2 + 4.2) - (-0.004 * rpm + 9.2);
            }
            // FROM 7500 TO 10000
            if (densityAlt2 <= 10000 && densityAlt2 > 7500 && rpm <= 2700 && rpm > 2600) {
                tas = (-0.0004 * densityAlt2 + 120) - (-0.07 * rpm + 189);
                gph = (-0.00016 * densityAlt2 + 6.7) - (-0.005 * rpm + 13.5);
            }
            if (densityAlt2 <= 10000 && densityAlt2 > 7500 && rpm <= 2600 && rpm > 2500) {
                tas = (-0.0008 * densityAlt2 + 117) - (-0.07 * rpm + 182);
                gph = (-0.00012 * densityAlt2 + 5.8) - (-0.005 * rpm + 13);
            }
            if (densityAlt2 <= 10000 && densityAlt2 > 7500 && rpm <= 2500 && rpm > 2400) {
                tas = (-0.0012 * densityAlt2 + 114) - (-0.09 * rpm + 225);
                gph = (-0.00012 * densityAlt2 + 5.3) - (-0.004 * rpm + 10);
            }
            if (densityAlt2 <= 10000 && densityAlt2 > 7500 && rpm <= 2400 && rpm > 2300) {
                tas = (-0.002 * densityAlt2 + 113) - (-0.11 * rpm + 264);
                gph = (-0.00012 * densityAlt2 + 4.9) - (-0.004 * rpm + 9.6);
            }
            if (densityAlt2 <= 10000 && densityAlt2 > 7500 && rpm <= 2300) {
                tas = (-0.002 * densityAlt2 + 113) - (-0.11 * rpm + 264);
                gph = (-0.00012 * densityAlt2 + 4.9) - (-0.004 * rpm + 9.6);
            }
            // FROM 10000 TO 12500
            if (densityAlt2 <= 12500 && densityAlt2 > 10000 && rpm <= 2600 && rpm > 2500) {
                tas = (-0.0012 * densityAlt2 + 121) - (-0.09 * rpm + 234);
                gph = (-0.00012 * densityAlt2 + 5.8) - (-0.004 * rpm + 10.4);
            }
            if (densityAlt2 <= 12500 && densityAlt2 > 10000 && rpm <= 2500 && rpm > 2400) {
                tas = (-0.002 * densityAlt2 + 122) - (-0.09 * rpm + 225);
                gph = (-0.00008 * densityAlt2 + 4.9) - (-0.004 * rpm + 10);
            }
            if (densityAlt2 <= 12500 && densityAlt2 > 10000 && rpm <= 2400) {
                tas = (-0.002 * densityAlt2 + 122) - (-0.09 * rpm + 225);
                gph = (-0.00008 * densityAlt2 + 4.9) - (-0.004 * rpm + 10);
            }
            // ABOVE 12500
            if (densityAlt2 > 12500 && rpm <= 2600 && rpm > 2500) {
                tas = (-0.0012 * densityAlt2 + 121) - (-0.09 * rpm + 234);
                gph = (-0.00012 * densityAlt2 + 5.8) - (-0.004 * rpm + 10.4);
            }
            if (densityAlt2 > 12500 && rpm <= 2500 && rpm > 2400) {
                tas = (-0.002 * densityAlt2 + 122) - (-0.09 * rpm + 225);
                gph = (-0.00008 * densityAlt2 + 4.9) - (-0.004 * rpm + 10);
            }
            if (densityAlt2 > 12500 && rpm <= 2400) {
                tas = (-0.002 * densityAlt2 + 122) - (-0.09 * rpm + 225);
                gph = (-0.00008 * densityAlt2 + 4.9) - (-0.004 * rpm + 10);
            }
            tas = tas / 1.151;

            let wa = 0; // WCA
            if (wd2 < tc) { wa = tc - wd2; }
            if (wd2 > tc) { wa = wd2 - tc; }
            let wca = wi2 / (tas / Math.sin(Math.toRadians(wa)));
            wca = Math.toDegrees(Math.asin(wca));
            if (wd2 < tc) { wca = wca * 1; }
            if (wd2 < tc && wd2 > tc - 180) { wca = wca * -1; }
            if (wd2 > tc) { wca = wca * 1; }
            if (wd2 < tc && wd2 < tc - 180) { wca = wca * -1; } // WCA
            if (wd2 < 180) { wa = wd2 + 180; } // GS
            if (wd2 >= 180) { wa = wd2 - 180; }
            if (wa < tc) { wa = tc - wa; }
            if (wa > tc) { wa = wa - tc; }
            let gswca = wi2 / (tas / Math.sin(Math.toRadians(wa)));
            gswca = Math.toDegrees(Math.asin(gswca));
            let gs = 180 - gswca - wa;
            gs = Math.sqrt((tas * tas) + (wi2 * wi2) - (2 * tas * wi2 * Math.cos(Math.toRadians(gs))));
            if (wd2 === tc + 180) { gs = wi2 + tas; }
            if (wd2 === tc - 180) { gs = wi2 + tas; } // GS
            let th = tc + wca;
            if (th > 360) {
                th = th - 360;
            } else if (th < 0) {
                th = 360 - (th * -1);
            }
            let mh = tc + wca + isoLine;
            if (mh > 360) {
                mh = mh - 360;
            } else if (mh < 0) {
                mh = 360 - (mh * -1);
            }
            let dev = 0;
            let ch = mh + dev;
            if (ch > 360) {
                ch = ch - 360;
            } else if (ch < 0) {
                ch = 360 - (ch * -1);
            }
            let ete = distCrusire * 60 / gs;
            let fuel = ete * gph / 60;


            console.log("");
            console.log("CLIMB");
            console.log("FROM " + chPoint1[i + 1]);
            console.log("TO " + chPoint2[i + 1]);
            console.log("ALTITUDE " + altitude[i + 1]);
            console.log("ALTIMETER SETTING " + altimeterSetting[i + 1]);
            console.log("PRESSURE " + pressure[i + 1]);
            console.log("TEMPERATURE " + temperature[i + 1]);
            console.log("PRESSURE ALTITUDE 1 " + pressAlt1);
            console.log("PRESSURE ALTITUDE 2 " + pressAlt2);
            console.log("PRESSURE ALTITUDE " + pressAlt);
            console.log("DENSITY ALTITUDE 1 " + densityAlt1);
            console.log("DENSITY ALTITUDE 2 " + densityAlt2);
            console.log("DENSITY ALTITUDE " + densityAlt);
            console.log("IAS 1 " + ias1);
            console.log("IAS 2 " + ias2);
            console.log("IAS " + ias);
            console.log("CAS 1 " + cas1);
            console.log("CAS 2 " + cas2);
            console.log("CAS " + cas);
            console.log("TAS 1 " + tas1);
            console.log("TAS 2 " + tas2);
            console.log("TAS CLIMB " + tasClimb);
            console.log("WIND DIRECTION " + windDirection[i + 1]);
            console.log("WIND DIRECTION TYPE " + windDirectionType[i + 1]);
            console.log("WIND INTENSITY " + windIntensity[i + 1]);
            console.log("TRUE COURSE " + trueCourse[i + 1]);
            console.log("WCA 1 " + wca1);
            console.log("WCA 2 " + wca2);
            console.log("GROUND SPEED 1 " + gs1);
            console.log("GROUND SPEED 2 " + gs2);
            console.log("GROUND SPEED " + gsClimb);
            console.log("TRUE HEADING 1 " + th1);
            console.log("TRUE HEADING 2 " + th2);
            console.log("ISOGONIC LINE " + isogonicLine[i + 1]);
            console.log("MAGNETIC DECLINATION " + magneticDeclination[i + 1]);
            console.log("MC " + mc);
            console.log("MAGNETIC HEADING 1 " + mh1);
            console.log("MAGNETIC HEADING 2 " + mh2);
            console.log("COMPASS DEVIATION 1 " + dev1);
            console.log("COMPASS DEVIATION 2 " + dev2);
            console.log("COMPASS HEADING 1 " + ch1);
            console.log("COMPASS HEADING 2 " + ch2);
            console.log("STANDARD TEMP 1 " + standarTemp1);
            console.log("STANDARD TEMP 2 " + standarTemp2);
            console.log("STANDARD TEMP " + standarTemp);
            console.log("ROC 1 " + roc1);
            console.log("ROC 2 " + roc2);
            console.log("ROC " + roc);
            console.log("TIME TO CLIMB " + eteClimb);
            console.log("FUEL TO CLIMB 1 " + fuelClimb1);
            console.log("FUEL TO CLIMB 2 " + fuelClimb2);
            console.log("FUEL TO CLIMB " + fuelClimb);
            console.log("CLIMB DISTANCE " + distClimb);
            console.log("DISTANCE " + distance[i + 1]);
            console.log("");
            console.log("CRUISE");
            console.log("CRUISE DISTANCE " + distCrusire);
            console.log("RPM " + rpmEngine[i + 1]);
            console.log("TAS " + tas);
            console.log("GPH " + gph);
            console.log("WCA " + wca);
            console.log("GS " + gs);
            console.log("TH " + th);
            console.log("MH " + mh);
            console.log("DEV " + dev);
            console.log("CH " + ch);
            console.log("ETE " + ete);
            console.log("FUEL " + fuel);
            console.log("");
        }

        if (altitude[i] == altitude[i + 1]) {

            let temp = temperature[i + 1];
            let press = pressure[i + 1];
            let alt = altitude[i + 1];
            let wi = windIntensity[i + 1];
            let isoLine = isogonicLine[i + 1];
            let wd = windDirection[i + 1];
            let tc = trueCourse[i + 1];
            let dist = distance[i + 1];
            let rpm = rpmEngine[i + 1];


            let pressAlt;
            if ("QNH" === altimeterSetting[i + 1]) {
                pressAlt =
                    ((((Math.pow(press / 1013.25, 1 / 5.2559)) - 1) / -0.0000225577) / 0.3048) + alt;
            } else {
                pressAlt = alt;
            }

            let densityAlt =
                154442.16 *
                (1 -
                    Math.pow(
                        17.326 *
                        (((1013.25 *
                            Math.pow(1 - 0.0000225577 * (pressAlt / 3.281), 5.2559)) /
                            33.864) /
                            (459.67 + (temp * 9 / 5 + 32))),
                        0.235
                    )) -
                0.0622272727273 *
                (154442.16 *
                    (1 -
                        Math.pow(
                            17.326 *
                            (((1013.25 *
                                Math.pow(1 - 0.0000225577 * (pressAlt / 3.281), 5.2559)) /
                                33.864) /
                                (459.67 + (temp * 9 / 5 + 32))),
                            0.235
                        ))) +
                16.681818181818;

            if ("-E" === magneticDeclination[i + 1]) {
                isoLine = isoLine * -1;
            } else {
                isoLine = isoLine * 1;
            }

            if ("MAGNETIC WIND" === windDirectionType[i + 1]) {
                wd = wd - isoLine;
                if (wd > 360) {
                    wd = wd - 360;
                } else if (wd < 0) {
                    wd = 360 - (-wd);
                }
            } else {
                wd = wd + 0;
            }

            let mc = tc + isoLine;
            if (mc > 360) {
                mc = mc - 360;
            } else if (mc < 0) {
                mc = 360 - (-mc);
            }

            let tas = 0, gph = 0;

            // LESS THAN 2500
            if (densityAlt <= 2500 && rpm <= 2700 && rpm > 2600) {
                tas = (-0.0004 * densityAlt + 120) - (-0.05 * rpm + 135);
                gph = (-0.00024 * densityAlt + 7.2) - (-0.008 * rpm + 21.6);
            }
            if (densityAlt <= 2500 && rpm <= 2600 && rpm > 2500) {
                tas = (-0.0004 * densityAlt + 115) - (-0.06 * rpm + 156);
                gph = (-0.0002 * densityAlt + 6.3) - (-0.007 * rpm + 18.2);
            }
            if (densityAlt <= 2500 && rpm <= 2500 && rpm > 2400) {
                tas = (-0.0004 * densityAlt + 109) - (-0.05 * rpm + 125);
                gph = (-0.00012 * densityAlt + 5.4) - (-0.005 * rpm + 12.5);
            }
            if (densityAlt <= 2500 && rpm <= 2400 && rpm > 2300) {
                tas = (-0.0008 * densityAlt + 105) - (-0.07 * rpm + 168);
                gph = (-0.00012 * densityAlt + 4.9) - (-0.005 * rpm + 12);
            }
            if (densityAlt <= 2500 && rpm <= 2300 && rpm > 2200) {
                tas = (-0.0012 * densityAlt + 99) - (-0.07 * rpm + 161);
                gph = (-0.00012 * densityAlt + 4.4) - (-0.005 * rpm + 11.5);
            }
            if (densityAlt <= 2500 && rpm <= 2200 && rpm > 2100) {
                tas = (-0.002 * densityAlt + 94) - (-0.1 * rpm + 220);
                gph = (-0.00008 * densityAlt + 3.8) - (-0.004 * rpm + 8.8);
            }
            if (densityAlt <= 2500 && rpm <= 2100) {
                tas = (-0.002 * densityAlt + 94) - (-0.1 * rpm + 220);
                gph = (-0.00008 * densityAlt + 3.8) - (-0.004 * rpm + 8.8);
            }
            // FROM 2500 TO 5000
            if (densityAlt <= 5000 && densityAlt > 2500 && rpm <= 2700 && rpm > 2600) {
                tas = (-0.0004 * densityAlt + 120) - (-0.05 * rpm + 135);
                gph = (-0.00024 * densityAlt + 7.2) - (-0.007 * rpm + 18.9);
            }
            if (densityAlt <= 5000 && densityAlt > 2500 && rpm <= 2600 && rpm > 2500) {
                tas = (-0.0004 * densityAlt + 115) - (-0.06 * rpm + 156);
                gph = (-0.0002 * densityAlt + 6.3) - (-0.005 * rpm + 13);
            }
            if (densityAlt <= 5000 && densityAlt > 2500 && rpm <= 2500 && rpm > 2400) {
                tas = (-0.0004 * densityAlt + 109) - (-0.06 * rpm + 150);
                gph = (-0.00012 * densityAlt + 5.4) - (-0.005 * rpm + 12.5);
            }
            if (densityAlt <= 5000 && densityAlt > 2500 && rpm <= 2400 && rpm > 2300) {
                tas = (-0.0008 * densityAlt + 105) - (-0.08 * rpm + 192);
                gph = (-0.00012 * densityAlt + 4.9) - (-0.005 * rpm + 12);
            }
            if (densityAlt <= 5000 && densityAlt > 2500 && rpm <= 2300 && rpm > 2200) {
                tas = (-0.0012 * densityAlt + 99) - (-0.09 * rpm + 207);
                gph = (-0.00012 * densityAlt + 4.4) - (-0.004 * rpm + 9.2);
            }
            if (densityAlt <= 5000 && densityAlt > 2500 && rpm <= 2200 && rpm > 2100) {
                tas = (-0.002 * densityAlt + 94) - (-0.13 * rpm + 286);
                gph = (-0.00008 * densityAlt + 3.8) - (-0.004 * rpm + 8.8);
            }
            if (densityAlt <= 5000 && densityAlt > 2500 && rpm <= 2100) {
                tas = (-0.002 * densityAlt + 94) - (-0.13 * rpm + 286);
                gph = (-0.00008 * densityAlt + 3.8) - (-0.004 * rpm + 8.8);
            }
            // FROM 5000 TO 7500
            if (densityAlt <= 7500 && densityAlt > 5000 && rpm <= 2700 && rpm > 2600) {
                tas = (-0.0004 * densityAlt + 120) - (-0.06 * rpm + 162);
                gph = (-0.0002 * densityAlt + 7) - (-0.006 * rpm + 16.2);
            }
            if (densityAlt <= 7500 && densityAlt > 5000 && rpm <= 2600 && rpm > 2500) {
                tas = (-0.0008 * densityAlt + 117) - (-0.06 * rpm + 156);
                gph = (-0.00016 * densityAlt + 6.1) - (-0.005 * rpm + 13);
            }
            if (densityAlt <= 7500 && densityAlt > 5000 && rpm <= 2500 && rpm > 2400) {
                tas = (-0.0008 * densityAlt + 111) - (-0.07 * rpm + 175);
                gph = (-0.00016 * densityAlt + 5.6) - (-0.004 * rpm + 10);
            }
            if (densityAlt <= 7500 && densityAlt > 5000 && rpm <= 2400 && rpm > 2300) {
                tas = (-0.0012 * densityAlt + 107) - (-0.09 * rpm + 216);
                gph = (-0.00012 * densityAlt + 4.9) - (-0.004 * rpm + 9.6);
            }
            if (densityAlt <= 7500 && densityAlt > 5000 && rpm <= 2300 && rpm > 2200) {
                tas = (-0.0016 * densityAlt + 101) - (-0.12 * rpm + 276);
                gph = (-0.00008 * densityAlt + 4.2) - (-0.004 * rpm + 9.2);
            }
            if (densityAlt <= 7500 && densityAlt > 5000 && rpm <= 2200) {
                tas = (-0.0016 * densityAlt + 101) - (-0.12 * rpm + 276);
                gph = (-0.00008 * densityAlt + 4.2) - (-0.004 * rpm + 9.2);
            }
            // FROM 7500 TO 10000
            if (densityAlt <= 10000 && densityAlt > 7500 && rpm <= 2700 && rpm > 2600) {
                tas = (-0.0004 * densityAlt + 120) - (-0.07 * rpm + 189);
                gph = (-0.00016 * densityAlt + 6.7) - (-0.005 * rpm + 13.5);
            }
            if (densityAlt <= 10000 && densityAlt > 7500 && rpm <= 2600 && rpm > 2500) {
                tas = (-0.0008 * densityAlt + 117) - (-0.07 * rpm + 182);
                gph = (-0.00012 * densityAlt + 5.8) - (-0.005 * rpm + 13);
            }
            if (densityAlt <= 10000 && densityAlt > 7500 && rpm <= 2500 && rpm > 2400) {
                tas = (-0.0012 * densityAlt + 114) - (-0.09 * rpm + 225);
                gph = (-0.00012 * densityAlt + 5.3) - (-0.004 * rpm + 10);
            }
            if (densityAlt <= 10000 && densityAlt > 7500 && rpm <= 2400 && rpm > 2300) {
                tas = (-0.002 * densityAlt + 113) - (-0.11 * rpm + 264);
                gph = (-0.00012 * densityAlt + 4.9) - (-0.004 * rpm + 9.6);
            }
            if (densityAlt <= 10000 && densityAlt > 7500 && rpm <= 2300) {
                tas = (-0.002 * densityAlt + 113) - (-0.11 * rpm + 264);
                gph = (-0.00012 * densityAlt + 4.9) - (-0.004 * rpm + 9.6);
            }
            // FROM 10000 TO 12500
            if (densityAlt <= 12500 && densityAlt > 10000 && rpm <= 2600 && rpm > 2500) {
                tas = (-0.0012 * densityAlt + 121) - (-0.09 * rpm + 234);
                gph = (-0.00012 * densityAlt + 5.8) - (-0.004 * rpm + 10.4);
            }
            if (densityAlt <= 12500 && densityAlt > 10000 && rpm <= 2500 && rpm > 2400) {
                tas = (-0.002 * densityAlt + 122) - (-0.09 * rpm + 225);
                gph = (-0.00008 * densityAlt + 4.9) - (-0.004 * rpm + 10);
            }
            if (densityAlt <= 12500 && densityAlt > 10000 && rpm <= 2400) {
                tas = (-0.002 * densityAlt + 122) - (-0.09 * rpm + 225);
                gph = (-0.00008 * densityAlt + 4.9) - (-0.004 * rpm + 10);
            }
            // ABOVE 12500
            if (densityAlt > 12500 && rpm <= 2600 && rpm > 2500) {
                tas = (-0.0012 * densityAlt + 121) - (-0.09 * rpm + 234);
                gph = (-0.00012 * densityAlt + 5.8) - (-0.004 * rpm + 10.4);
            }
            if (densityAlt > 12500 && rpm <= 2500 && rpm > 2400) {
                tas = (-0.002 * densityAlt + 122) - (-0.09 * rpm + 225);
                gph = (-0.00008 * densityAlt + 4.9) - (-0.004 * rpm + 10);
            }
            if (densityAlt > 12500 && rpm <= 2400) {
                tas = (-0.002 * densityAlt + 122) - (-0.09 * rpm + 225);
                gph = (-0.00008 * densityAlt + 4.9) - (-0.004 * rpm + 10);
            }
            tas = tas / 1.151;

            let wa = 0; // WCA
            if (wd < tc) {
                wa = tc - wd;
            }
            if (wd > tc) {
                wa = wd - tc;
            }
            let wca = wi / (tas / Math.sin(Math.toRadians(wa)));
            wca = Math.toDegrees(Math.asin(wca));
            if (wd < tc) {
                wca = wca * 1;
            }
            if (wd < tc && wd > tc - 180) {
                wca = wca * -1;
            }
            if (wd > tc) {
                wca = wca * 1;
            }
            if (wd < tc && wd < tc - 180) {
                wca = wca * -1; // WCA
            }
            if (wd < 180) {
                wa = wd + 180; // GS
            }
            if (wd >= 180) {
                wa = wd - 180;
            }
            if (wa < tc) {
                wa = tc - wa;
            }
            if (wa > tc) {
                wa = wa - tc;
            }
            let gswca = wi / (tas / Math.sin(Math.toRadians(wa)));
            gswca = Math.toDegrees(Math.asin(gswca));
            let gs = 180 - gswca - wa;
            gs = Math.sqrt(tas * tas + wi * wi - 2 * tas * wi * Math.cos(Math.toRadians(gs)));
            if (wd === tc + 180) {
                gs = wi + tas;
            }
            if (wd === tc - 180) {
                gs = wi + tas; // GS
            }
            let th = tc + wca;
            if (th > 360) {
                th = th - 360;
            } else if (th < 0) {
                th = 360 - (-th);
            }
            let mh = tc + wca + isoLine;
            if (mh > 360) {
                mh = mh - 360;
            } else if (mh < 0) {
                mh = 360 - (-mh);
            }
            let dev = 0;
            let ch = mh + dev;
            if (ch > 360) {
                ch = ch - 360;
            } else if (ch < 0) {
                ch = 360 - (-ch);
            }
            let ete = (dist * 60) / gs;
            let fuel = (ete * gph) / 60;


            console.log("");
            console.log("CRUSIRE");
            console.log("FROM " + chPoint1[i + 1]);
            console.log("TO " + chPoint2[i + 1]);
            console.log("ALTITUDE " + altitude[i + 1]);
            console.log("ALTIMETER SETTING " + altimeterSetting[i + 1]);
            console.log("PRESSURE " + pressure[i + 1]);
            console.log("TEMPERATURE " + temperature[i + 1]);
            console.log("PRESSURE ALTITUDE " + pressAlt);
            console.log("DENSITY ALTITUDE " + densityAlt);
            console.log("TAS " + tas);
            console.log("WIND DIRECTION " + windDirection[i + 1]);
            console.log("WIND DIRECTION TYPE " + windDirectionType[i + 1]);
            console.log("WIND INTENSITY " + windIntensity[i + 1]);
            console.log("TRUE COURSE " + trueCourse[i + 1]);
            console.log("WCA " + wca);
            console.log("GROUND SPEED " + gs);
            console.log("TRUE HEADING " + th);
            console.log("ISOGONIC LINE " + isogonicLine[i + 1]);
            console.log("MAGNETIC DECLINATION " + magneticDeclination[i + 1]);
            console.log("MC " + mc);
            console.log("MAGNETIC HEADING " + mh);
            console.log("COMPASS DESVIATION " + dev);
            console.log("COMPASS HEADING " + ch);
            console.log("DISTANCE " + distance[i + 1]);
            console.log("");
            console.log("CRUSIRE");
            console.log("RPM " + rpmEngine[i + 1]);
            console.log("TAS " + tas);
            console.log("GPH " + gph);
            console.log("WCA " + wca);
            console.log("GS " + gs);
            console.log("TH " + th);
            console.log("MH " + mh);
            console.log("DEV " + dev);
            console.log("CH " + ch);
            console.log("ETE " + ete);
            console.log("FUEL " + fuel);
            console.log("");
        }

        if (altitude[i] > altitude[i + 1]) {

            let temp1 = temperature[i];
            let temp2 = temperature[i + 1];
            let press1 = pressure[i];
            let press2 = pressure[i + 1];
            let alt1 = altitude[i];
            let alt2 = altitude[i + 1];
            let wi1 = windIntensity[i];
            let wi2 = windIntensity[i + 1];
            let isoLine = isogonicLine[i + 1];
            let wd1 = windDirection[i];
            let wd2 = windDirection[i + 1];
            let tc = trueCourse[i + 1];
            let dist = distance[i + 1];
            let rpm = rpmEngine[i + 1];

            let press = (press1 + press2) / 2;
            let temp = (temp1 + temp2) / 2;
            let pressAlt1;

            if ("QNH" === altimeterSetting[i]) {
                pressAlt1 = (((Math.pow(press1 / 1013.25, 1 / 5.2559) - 1) / -0.0000225577) / 0.3048) + alt1;
            } else {
                pressAlt1 = alt1;
            }

            let pressAlt2;
            if ("QNH" === altimeterSetting[i + 1]) {
                pressAlt2 = (((Math.pow(press2 / 1013.25, 1 / 5.2559) - 1) / -0.0000225577) / 0.3048) + alt2;
            } else {
                pressAlt2 = alt2;
            }

            let pressAlt = (pressAlt1 + pressAlt2) / 2;

            let densityAlt1 = (154442.16 * (1 - (Math.pow(17.326 * (((1013.25 * Math.pow((1 - 0.0000225577 * (pressAlt1 / 3.281)), 5.2559)) / 33.864) / (459.67 + ((temp1 * 9 / 5 + 32)))), 0.235)))) - 0.0622272727273 * (154442.16 * (1 - (Math.pow(17.326 * (((1013.25 * Math.pow((1 - 0.0000225577 * (pressAlt1 / 3.281)), 5.2559)) / 33.864) / (459.67 + ((temp1 * 9 / 5 + 32)))), 0.235)))) + 16.681818181818;

            let densityAlt2 = (154442.16 * (1 - (Math.pow(17.326 * (((1013.25 * Math.pow((1 - 0.0000225577 * (pressAlt2 / 3.281)), 5.2559)) / 33.864) / (459.67 + ((temp2 * 9 / 5 + 32)))), 0.235)))) - 0.0622272727273 * (154442.16 * (1 - (Math.pow(17.326 * (((1013.25 * Math.pow((1 - 0.0000225577 * (pressAlt2 / 3.281)), 5.2559)) / 33.864) / (459.67 + ((temp2 * 9 / 5 + 32)))), 0.235)))) + 16.681818181818;

            let densityAlt = (densityAlt1 + densityAlt2) / 2;

            let wi = (wi1 + wi2) / 2;

            if ("-E" === magneticDeclination[i + 1]) {
                isoLine = isoLine * -1;
            } else {
                isoLine = isoLine * 1;
            }

            if ("MAGNETIC WIND" === windDirectionType[i]) {
                wd1 = wd1 - isoLine;
                if (wd1 > 360) {
                    wd1 = wd1 - 360;
                } else if (wd1 < 0) {
                    wd1 = 360 - (wd1 * -1);
                }
            } else {
                wd1 = wd1 + 0;
            }

            if ("MAGNETIC WIND" === windDirectionType[i + 1]) {
                wd2 = wd2 - isoLine;
                if (wd2 > 360) {
                    wd2 = wd2 - 360;
                } else if (wd2 < 0) {
                    wd2 = 360 - (wd2 * -1);
                }
            } else {
                wd2 = wd2 + 0;
            }

            let mc = tc + isoLine;
            if (mc > 360) {
                mc = mc - 360;
            } else if (mc < 0) {
                mc = 360 - (mc * -1);
            }

            let ias = parseFloat(prompt("IAS KT"));
            ias = ias * 1.151;

            let cas = 0;
            if (ias <= 90) {
                cas = (0.9 * ias + 6);
            } else if (ias > 90 && ias <= 120) {
                cas = ias - 3;
            } else if (ias >= 130) {
                cas = ias - 2;
            }
            cas = cas / 1.151;

            let standarTemp1 = -0.0036 * (pressAlt1 - (((Math.pow((press1 / 1013.25), 1 / 5.2559) - 1) / -0.0000225577) * 3.281)) + 59;
            let standarTemp2 = -0.0036 * (pressAlt2 - (((Math.pow((press2 / 1013.25), 1 / 5.2559) - 1) / -0.0000225577) * 3.281)) + 59;
            let standarTemp = (standarTemp1 + standarTemp2) / 2;
            let rod = parseFloat(prompt("RATE OF DESCEND"));
            let tas1 = cas / Math.sqrt(Math.pow(((1 - 0.0000225577 * (densityAlt1 / 3.281))), 4.256));
            let tas2 = cas / Math.sqrt(Math.pow(((1 - 0.0000225577 * (densityAlt2 / 3.281))), 4.256));
            let eteDescend = (pressAlt1 - pressAlt2) / rod;
            let tasDescend = (tas1 + tas2) / 2;
            let fuelDescend = eteDescend * 4.5 / 60;
            let wa1 = 0; // WCA 1

            if (wd1 < tc) {
                wa1 = tc - wd1;
            }

            if (wd1 > tc) {
                wa1 = wd1 - tc;
            }

            let wca1 = wi1 / (tas1 / Math.sin(Math.radians(wa1)));
            wca1 = Math.degrees(Math.asin(wca1));

            if (wd1 < tc) {
                wca1 = wca1 * 1;
            }

            if (wd1 < tc && wd1 > tc - 180) {
                wca1 = wca1 * -1;
            }

            if (wd1 > tc) {
                wca1 = wca1 * 1;
            }

            if (wd1 < tc && wd1 < tc - 180) {
                wca1 = wca1 * -1;
            }

            if (wd1 < 180) {
                wa1 = wd1 + 180;
            }

            if (wd1 >= 180) {
                wa1 = wd1 - 180;
            }

            if (wa1 < tc) {
                wa1 = tc - wa1;
            }

            if (wa1 > tc) {
                wa1 = wa1 - tc;
            }

            let gswca1 = wi1 / (tas1 / Math.sin(Math.radians(wa1)));
            gswca1 = Math.degrees(Math.asin(gswca1));
            let gs1 = 180 - gswca1 - wa1;
            gs1 = Math.sqrt((tas1 * tas1) + (wi1 * wi1) - (2 * tas1 * wi1 * Math.cos(Math.radians(gs1))));

            if (wd1 === tc + 180) {
                gs1 = wi1 + tas1;
            }

            if (wd1 === tc - 180) {
                gs1 = wi1 + tas1;
            }

            let wa2 = 0; // WCA 2

            if (wd2 < tc) {
                wa2 = tc - wd2;
            }

            if (wd2 > tc) {
                wa2 = wd2 - tc;
            }

            let wca2 = wi2 / (tas2 / Math.sin(Math.radians(wa2)));
            wca2 = Math.degrees(Math.asin(wca2));

            if (wd2 < tc) { wca2 = wca2 * 1; }
            if (wd2 < tc && wd2 > tc - 180) { wca2 = wca2 * -1; }
            if (wd2 > tc) { wca2 = wca2 * 1; }
            if (wd2 < tc && wd2 < tc - 180) { wca2 = wca2 * -1; } //WCA 2
            if (wd2 < 180) { wa2 = wd2 + 180; } //GS 2
            if (wd2 >= 180) { wa2 = wd2 - 180; }
            if (wa2 < tc) { wa2 = tc - wa2; }
            if (wa2 > tc) { wa2 = wa2 - tc; }

            let gswca2 = wi2 / (tas2 / Math.sin(Math.radians(wa2)));
            gswca2 = Math.degrees(Math.asin(gswca2));
            let gs2 = 180 - gswca2 - wa2;
            gs2 = Math.sqrt((tas2 * tas2) + (wi2 * wi2) - (2 * tas2 * wi2 * Math.cos(Math.radians(gs2))));

            if (wd2 === tc + 180) {
                gs2 = wi2 + tas2;
            }

            if (wd2 === tc - 180) {
                gs2 = wi2 + tas2;
            }

            let gsDescend = (gs1 + gs2) / 2;

            let th1 = tc + wca1;
            if (th1 > 360) {
                th1 = th1 - 360;
            } else if (th1 < 0) {
                th1 = 360 - (th1 * -1);
            }

            let th2 = tc + wca2;
            if (th2 > 360) {
                th2 = th2 - 360;
            } else if (th2 < 0) {
                th2 = 360 - (th2 * -1);
            }

            let mh1 = tc + wca1 + isoLine;
            if (mh1 > 360) {
                mh1 = mh1 - 360;
            } else if (mh1 < 0) {
                mh1 = 360 - (mh1 * -1);
            }

            let mh2 = tc + wca2 + isoLine;
            if (mh2 > 360) {
                mh2 = mh2 - 360;
            } else if (mh2 < 0) {
                mh2 = 360 - (mh2 * -1);
            }

            let dev1 = 0;
            let dev2 = 0;
            let ch1 = mh1 + dev1;
            if (ch1 > 360) {
                ch1 = ch1 - 360;
            } else if (ch1 < 0) {
                ch1 = 360 - (ch1 * -1);
            }

            let ch2 = mh2 + dev2;
            if (ch2 > 360) {
                ch2 = ch2 - 360;
            } else if (ch2 < 0) {
                ch2 = 360 - (ch2 * -1);
            }

            let distDescend = eteDescend * gsDescend / 60;
            let dist = 0;

            while (dist < distDescend) {
                dist = parseFloat(prompt("DIST MUST BE MORE THAN " + distDescend));
            }

            let distCrusire = dist - distDescend;
            let tas = 0, gph = 0;

            // LESS THAN 2500
            if (densityAlt2 <= 2500 && rpm <= 2700 && rpm > 2600) {
                tas = (-0.0004 * densityAlt2 + 120) - (-0.05 * rpm + 135);
                gph = (-0.00024 * densityAlt2 + 7.2) - (-0.008 * rpm + 21.6);
            }
            if (densityAlt2 <= 2500 && rpm <= 2600 && rpm > 2500) {
                tas = (-0.0004 * densityAlt2 + 115) - (-0.06 * rpm + 156);
                gph = (-0.0002 * densityAlt2 + 6.3) - (-0.007 * rpm + 18.2);
            }
            if (densityAlt2 <= 2500 && rpm <= 2500 && rpm > 2400) {
                tas = (-0.0004 * densityAlt2 + 109) - (-0.05 * rpm + 125);
                gph = (-0.00012 * densityAlt2 + 5.4) - (-0.005 * rpm + 12.5);
            }
            if (densityAlt2 <= 2500 && rpm <= 2400 && rpm > 2300) {
                tas = (-0.0008 * densityAlt2 + 105) - (-0.07 * rpm + 168);
                gph = (-0.00012 * densityAlt2 + 4.9) - (-0.005 * rpm + 12);
            }
            if (densityAlt2 <= 2500 && rpm <= 2300 && rpm > 2200) {
                tas = (-0.0012 * densityAlt2 + 99) - (-0.07 * rpm + 161);
                gph = (-0.00012 * densityAlt2 + 4.4) - (-0.005 * rpm + 11.5);
            }
            if (densityAlt2 <= 2500 && rpm <= 2200 && rpm > 2100) {
                tas = (-0.002 * densityAlt2 + 94) - (-0.1 * rpm + 220);
                gph = (-0.00008 * densityAlt2 + 3.8) - (-0.004 * rpm + 8.8);
            }
            if (densityAlt2 <= 2500 && rpm <= 2100) {
                tas = (-0.002 * densityAlt2 + 94) - (-0.1 * rpm + 220);
                gph = (-0.00008 * densityAlt2 + 3.8) - (-0.004 * rpm + 8.8);
            }
            // FROM 2500 TO 5000
            if (densityAlt2 <= 5000 && densityAlt2 > 2500 && rpm <= 2700 && rpm > 2600) {
                tas = (-0.0004 * densityAlt2 + 120) - (-0.05 * rpm + 135);
                gph = (-0.00024 * densityAlt2 + 7.2) - (-0.007 * rpm + 18.9);
            }
            if (densityAlt2 <= 5000 && densityAlt2 > 2500 && rpm <= 2600 && rpm > 2500) {
                tas = (-0.0004 * densityAlt2 + 115) - (-0.06 * rpm + 156);
                gph = (-0.0002 * densityAlt2 + 6.3) - (-0.005 * rpm + 13);
            }
            if (densityAlt2 <= 5000 && densityAlt2 > 2500 && rpm <= 2500 && rpm > 2400) {
                tas = (-0.0004 * densityAlt2 + 109) - (-0.06 * rpm + 150);
                gph = (-0.00012 * densityAlt2 + 5.4) - (-0.005 * rpm + 12.5);
            }
            if (densityAlt2 <= 5000 && densityAlt2 > 2500 && rpm <= 2400 && rpm > 2300) {
                tas = (-0.0008 * densityAlt2 + 105) - (-0.08 * rpm + 192);
                gph = (-0.00012 * densityAlt2 + 4.9) - (-0.005 * rpm + 12);
            }
            if (densityAlt2 <= 5000 && densityAlt2 > 2500 && rpm <= 2300 && rpm > 2200) {
                tas = (-0.0012 * densityAlt2 + 99) - (-0.09 * rpm + 207);
                gph = (-0.00012 * densityAlt2 + 4.4) - (-0.004 * rpm + 9.2);
            }
            if (densityAlt2 <= 5000 && densityAlt2 > 2500 && rpm <= 2200 && rpm > 2100) {
                tas = (-0.002 * densityAlt2 + 94) - (-0.13 * rpm + 286);
                gph = (-0.00008 * densityAlt2 + 3.8) - (-0.004 * rpm + 8.8);
            }
            if (densityAlt2 <= 5000 && densityAlt2 > 2500 && rpm <= 2100) {
                tas = (-0.002 * densityAlt2 + 94) - (-0.13 * rpm + 286);
                gph = (-0.00008 * densityAlt2 + 3.8) - (-0.004 * rpm + 8.8);
            }
            // FROM 5000 TO 7500
            if (densityAlt2 <= 7500 && densityAlt2 > 5000 && rpm <= 2700 && rpm > 2600) {
                tas = (-0.0004 * densityAlt2 + 120) - (-0.06 * rpm + 162);
                gph = (-0.0002 * densityAlt2 + 7) - (-0.006 * rpm + 16.2);
            }
            if (densityAlt2 <= 7500 && densityAlt2 > 5000 && rpm <= 2600 && rpm > 2500) {
                tas = (-0.0008 * densityAlt2 + 117) - (-0.06 * rpm + 156);
                gph = (-0.00016 * densityAlt2 + 6.1) - (-0.005 * rpm + 13);
            }
            if (densityAlt2 <= 7500 && densityAlt2 > 5000 && rpm <= 2500 && rpm > 2400) {
                tas = (-0.0008 * densityAlt2 + 111) - (-0.07 * rpm + 175);
                gph = (-0.00016 * densityAlt2 + 5.6) - (-0.004 * rpm + 10);
            }
            if (densityAlt2 <= 7500 && densityAlt2 > 5000 && rpm <= 2400 && rpm > 2300) {
                tas = (-0.0012 * densityAlt2 + 107) - (-0.09 * rpm + 216);
                gph = (-0.00012 * densityAlt2 + 4.9) - (-0.004 * rpm + 9.6);
            }
            if (densityAlt2 <= 7500 && densityAlt2 > 5000 && rpm <= 2300 && rpm > 2200) {
                tas = (-0.0016 * densityAlt2 + 101) - (-0.12 * rpm + 276);
                gph = (-0.00008 * densityAlt2 + 4.2) - (-0.004 * rpm + 9.2);
            }
            if (densityAlt2 <= 7500 && densityAlt2 > 5000 && rpm <= 2200) {
                tas = (-0.0016 * densityAlt2 + 101) - (-0.12 * rpm + 276);
                gph = (-0.00008 * densityAlt2 + 4.2) - (-0.004 * rpm + 9.2);
            }
            // FROM 7500 TO 10000
            if (densityAlt2 <= 10000 && densityAlt2 > 7500 && rpm <= 2700 && rpm > 2600) {
                tas = (-0.0004 * densityAlt2 + 120) - (-0.07 * rpm + 189);
                gph = (-0.00016 * densityAlt2 + 6.7) - (-0.005 * rpm + 13.5);
            }
            if (densityAlt2 <= 10000 && densityAlt2 > 7500 && rpm <= 2600 && rpm > 2500) {
                tas = (-0.0008 * densityAlt2 + 117) - (-0.07 * rpm + 182);
                gph = (-0.00012 * densityAlt2 + 5.8) - (-0.005 * rpm + 13);
            }
            if (densityAlt2 <= 10000 && densityAlt2 > 7500 && rpm <= 2500 && rpm > 2400) {
                tas = (-0.0012 * densityAlt2 + 114) - (-0.09 * rpm + 225);
                gph = (-0.00012 * densityAlt2 + 5.3) - (-0.004 * rpm + 10);
            }
            if (densityAlt2 <= 10000 && densityAlt2 > 7500 && rpm <= 2400 && rpm > 2300) {
                tas = (-0.002 * densityAlt2 + 113) - (-0.11 * rpm + 264);
                gph = (-0.00012 * densityAlt2 + 4.9) - (-0.004 * rpm + 9.6);
            }
            if (densityAlt2 <= 10000 && densityAlt2 > 7500 && rpm <= 2300) {
                tas = (-0.002 * densityAlt2 + 113) - (-0.11 * rpm + 264);
                gph = (-0.00012 * densityAlt2 + 4.9) - (-0.004 * rpm + 9.6);
            }
            // FROM 10000 TO 12500
            if (densityAlt2 <= 12500 && densityAlt2 > 10000 && rpm <= 2600 && rpm > 2500) {
                tas = (-0.0012 * densityAlt2 + 121) - (-0.09 * rpm + 234);
                gph = (-0.00012 * densityAlt2 + 5.8) - (-0.004 * rpm + 10.4);
            }
            if (densityAlt2 <= 12500 && densityAlt2 > 10000 && rpm <= 2500 && rpm > 2400) {
                tas = (-0.002 * densityAlt2 + 122) - (-0.09 * rpm + 225);
                gph = (-0.00008 * densityAlt2 + 4.9) - (-0.004 * rpm + 10);
            }
            if (densityAlt2 <= 12500 && densityAlt2 > 10000 && rpm <= 2400) {
                tas = (-0.002 * densityAlt2 + 122) - (-0.09 * rpm + 225);
                gph = (-0.00008 * densityAlt2 + 4.9) - (-0.004 * rpm + 10);
            }
            // ABOVE 12500
            if (densityAlt2 > 12500 && rpm <= 2600 && rpm > 2500) {
                tas = (-0.0012 * densityAlt2 + 121) - (-0.09 * rpm + 234);
                gph = (-0.00012 * densityAlt2 + 5.8) - (-0.004 * rpm + 10.4);
            }
            if (densityAlt2 > 12500 && rpm <= 2500 && rpm > 2400) {
                tas = (-0.002 * densityAlt2 + 122) - (-0.09 * rpm + 225);
                gph = (-0.00008 * densityAlt2 + 4.9) - (-0.004 * rpm + 10);
            }
            if (densityAlt2 > 12500 && rpm <= 2400) {
                tas = (-0.002 * densityAlt2 + 122) - (-0.09 * rpm + 225);
                gph = (-0.00008 * densityAlt2 + 4.9) - (-0.004 * rpm + 10);
            }
            tas = tas / 1.151;

            let wa = 0; // WCA
            if (wd2 < tc) {
                wa = tc - wd2;
            }

            if (wd2 > tc) {
                wa = wd2 - tc;
            }

            let wca = wi2 / (tas / Math.sin(Math.radians(wa)));
            wca = Math.degrees(Math.asin(wca));

            if (wd2 < tc) {
                wca = wca * 1;
            }

            if (wd2 < tc && wd2 > tc - 180) {
                wca = wca * -1;
            }

            if (wd2 > tc) {
                wca = wca * 1;
            }

            if (wd2 < tc && wd2 < tc - 180) {
                wca = wca * -1;
            }

            if (wd2 < 180) {
                wa = wd2 + 180;
            }

            if (wd2 >= 180) {
                wa = wd2 - 180;
            }

            if (wa < tc) {
                wa = tc - wa;
            }

            if (wa > tc) {
                wa = wa - tc;
            }

            let gswca = wi2 / (tas / Math.sin(Math.radians(wa)));
            gswca = Math.degrees(Math.asin(gswca));
            let gs = 180 - gswca - wa;
            gs = Math.sqrt((tas * tas) + (wi2 * wi2) - (2 * tas * wi2 * Math.cos(Math.radians(gs))));

            if (wd2 === tc + 180) {
                gs = wi2 + tas;
            }

            if (wd2 === tc - 180) {
                gs = wi2 + tas;
            }

            let th = tc + wca;
            if (th > 360) {
                th = th - 360;
            } else if (th < 0) {
                th = 360 - (th * -1);
            }

            let mh = tc + wca + isoLine;
            if (mh > 360) {
                mh = mh - 360;
            } else if (mh < 0) {
                mh = 360 - (mh * -1);
            }

            let dev = 0;
            let ch = mh + dev;
            if (ch > 360) {
                ch = ch - 360;
            } else if (ch < 0) {
                ch = 360 - (ch * -1);
            }

            let ete = distCrusire * 60 / gs;
            let fuel = ete * gph / 60;


            console.log("");
            console.log("DESCEND");
            console.log("FROM " + chPoint1[i + 1]);
            console.log("TO " + chPoint2[i + 1]);
            console.log("ALTITUDE " + altitude[i + 1]);
            console.log("ALTIMETER SETTING " + altimeterSetting[i + 1]);
            console.log("PRESSURE " + pressure[i + 1]);
            console.log("TEMPERATURE " + temperature[i + 1]);
            console.log("PRESSURE ALTITUDE 1 " + pressAlt1);
            console.log("PRESSURE ALTITUDE 2 " + pressAlt2);
            console.log("PRESSURE ALTITUDE " + pressAlt);
            console.log("DENSITY ALTITUDE 1 " + densityAlt1);
            console.log("DENSITY ALTITUDE 2 " + densityAlt2);
            console.log("DENSITY ALTITUDE " + densityAlt);
            console.log("IAS " + ias);
            console.log("CAS " + cas);
            console.log("TAS 1 " + tas1);
            console.log("TAS 2 " + tas2);
            console.log("TAS DESCEND " + tasDescend);
            console.log("WIND DIRECTION " + windDirection[i + 1]);
            console.log("WIND DIRECTION TYPE " + windDirectionType[i + 1]);
            console.log("WIND INTENSITY " + windIntensity[i + 1]);
            console.log("TRUE COURSE " + trueCourse[i + 1]);
            console.log("WCA 1 " + wca1);
            console.log("WCA 2 " + wca2);
            console.log("GROUND SPEED 1 " + gs1);
            console.log("GROUND SPEED 2 " + gs2);
            console.log("GROUND SPEED " + gsDescend);
            console.log("TRUE HEADING 1 " + th1);
            console.log("TRUE HEADING 2 " + th2);
            console.log("ISOGONIC LINE " + isogonicLine[i + 1]);
            console.log("MAGNETIC DECLINATION " + magneticDeclination[i + 1]);
            console.log("MC " + mc);
            console.log("MAGNETIC HEADING 1 " + mh1);
            console.log("MAGNETIC HEADING 2 " + mh2);
            console.log("COMPASS DESVIATION 1 " + dev1);
            console.log("COMPASS DESVIATION 2 " + dev2);
            console.log("COMPASS HEADING 1 " + ch1);
            console.log("COMPASS HEADING 2 " + ch2);
            console.log("STANDAR TEMP 1 " + standarTemp1);
            console.log("STANDAR TEMP 2 " + standarTemp2);
            console.log("STANDAR TEMP " + standarTemp);
            console.log("ROD " + rod);
            console.log("TIME TO DESCEND " + eteDescend);
            console.log("FUEL TO DESCEND " + fuelDescend);
            console.log("DISTANCE TO DESCEND " + distDescend);
            console.log("DISTANCE " + distance[i + 1]);
            console.log("");
            console.log("CRUSIRE");
            console.log("CRUSIRE DISTANCE " + distCrusire);
            console.log("RPM " + rpmEngine[i + 1]);
            console.log("TAS " + tas);
            console.log("GPH " + gph);
            console.log("WCA " + wca);
            console.log("GS " + gs);
            console.log("TH " + th);
            console.log("MH " + mh);
            console.log("DEV " + dev);
            console.log("CH " + ch);
            console.log("ETE " + ete);
            console.log("FUEL " + fuel);
            console.log("");

        }
    }

    //LAST DESCEND
    if (altitude[legs - 1] > arrAlt) {
        let temp1 = temperature[legs - 1],
            temp2 = arrTemp;
        let press1 = pressure[legs - 1],
            press2 = arrPress;
        let alt1 = altitude[legs - 1],
            alt2 = arrAlt;
        let wi1 = windIntensity[legs - 1],
            wi2 = arrWindInt;
        let isoLine = isogonicLine[legs - 1];
        let wd1 = windDirection[legs - 1],
            wd2 = arrWindDir;
        let tc = trueCourse[legs - 1];
        let dist = distance[legs - 1];
        let rpm = rpmEngine[legs - 1];

        let press = (press1 + press2) / 2;
        let temp = (temp1 + temp2) / 2;
        let pressAlt1;
        if (altimeterSetting[legs - 1] === "QNH") {
            pressAlt1 =
                ((((Math.pow(press1 / 1013.25, 1 / 5.2559)) - 1) / -0.0000225577) / 0.3048) + alt1;
        } else {
            pressAlt1 = alt1;
        }
        let pressAlt2 =
            ((((Math.pow(press2 / 1013.25, 1 / 5.2559)) - 1) / -0.0000225577) / 0.3048) + alt2;
        let pressAlt = (pressAlt1 + pressAlt2) / 2;
        let densityAlt1 =
            (154442.16 * (1 - (Math.pow(17.326 * (((1013.25 * Math.pow((1 - 0.0000225577 * (pressAlt1 / 3.281)), 5.2559)) / 33.864) / (459.67 + ((temp1 * 9 / 5 + 32)))), 0.235)))) - 0.0622272727273 * (154442.16 * (1 - (Math.pow(17.326 * (((1013.25 * Math.pow((1 - 0.0000225577 * (pressAlt1 / 3.281)), 5.2559)) / 33.864) / (459.67 + ((temp1 * 9 / 5 + 32)))), 0.235)))) + 16.681818181818;
        let densityAlt2 =
            (154442.16 * (1 - (Math.pow(17.326 * (((1013.25 * Math.pow((1 - 0.0000225577 * (pressAlt2 / 3.281)), 5.2559)) / 33.864) / (459.67 + ((temp2 * 9 / 5 + 32)))), 0.235)))) - 0.0622272727273 * (154442.16 * (1 - (Math.pow(17.326 * (((1013.25 * Math.pow((1 - 0.0000225577 * (pressAlt2 / 3.281)), 5.2559)) / 33.864) / (459.67 + ((temp2 * 9 / 5 + 32)))), 0.235)))) + 16.681818181818;
        let densityAlt = (densityAlt1 + densityAlt2) / 2;
        let wi = (wi1 + wi2) / 2;
        if ("-E" === magneticDeclination[legs - 1]) {
            isoLine = isoLine * -1;
        } else {
            isoLine = isoLine * 1;
        }
        if ("MAGNETIC WIND" === windDirectionType[legs - 1]) {
            wd1 = wd1 - isoLine;
            if (wd1 > 360) {
                wd1 = wd1 - 360;
            } else if (wd1 < 0) {
                wd1 = 360 - (wd1 * -1);
            }
        } else {
            wd1 = wd1 + 0;
        }
        wd2 = wd2 - isoLine;
        if (wd2 > 360) {
            wd2 = wd2 - 360;
        } else if (wd2 < 0) {
            wd2 = 360 - (wd2 * -1);
        }
        mc = tc + isoLine;
        if (mc > 360) {
            mc = mc - 360;
        } else if (mc < 0) {
            mc = 360 - (mc * -1);
        }
        let ias = parseFloat(prompt("IAS KT"));
        ias = ias * 1.151;
        let cas = 0;
        if (ias <= 90) {
            cas = (0.9 * ias + 6);
        } else if (ias > 90 && ias <= 120) {
            cas = ias - 3;
        } else if (ias >= 130) {
            cas = ias - 2;
        }
        cas = cas / 1.151;
        let standarTemp1 = -0.0036 * (pressAlt1 - ((((Math.pow((press1 / 1013.25), 1 / 5.2559)) - 1) / -0.0000225577) * 3.281)) + 59;
        let standarTemp2 = -0.0036 * (pressAlt2 - ((((Math.pow((press2 / 1013.25), 1 / 5.2559)) - 1) / -0.0000225577) * 3.281)) + 59;
        let standarTemp = (standarTemp1 + standarTemp2) / 2;
        let rod = parseFloat(prompt("RATE OF DESCEND"));
        let tas1 = cas / ((standarTemp + 459.67) / 519.67);
        let tas2 = cas / ((standarTemp + 459.67) / 519.67);
        let tas = (tas1 + tas2) / 2;
        let rod1 = (-(Math.sqrt(Math.pow(tas * 1.68781, 2) - Math.pow(tas * 1.68781 - 2 * rod * (press / 1013.25) * 100, 2) + 0.00000973356) - tas * 1.68781 + 2 * rod * (press / 1013.25) * 100) / (0.0000194671));
        let rod2 = (-(Math.sqrt(Math.pow(tas * 1.68781, 2) - Math.pow(tas * 1.68781 - 2 * rod * (press / 1013.25) * 100, 2) + 0.00000973356) - tas * 1.68781 + 2 * rod * (press / 1013.25) * 100) / (0.0000194671));
        let rodcalc = (rod1 + rod2) / 2;
        let pressureAlt1 = ((((Math.pow(press1 / 1013.25, 1 / 5.2559)) - 1) / -0.0000225577) / 0.3048);
        let pressureAlt2 = ((((Math.pow(press2 / 1013.25, 1 / 5.2559)) - 1) / -0.0000225577) / 0.3048);
        let pressureAlt = (pressureAlt1 + pressureAlt2) / 2;
        let T1 = temp1 + 273.15;
        let T2 = temp2 + 273.15;
        let T = (T1 + T2) / 2;
        let vel = parseFloat(prompt("IAS KT"));
        vel = vel * 1.94384;
        let ajustedVel = (vel * Math.pow((T / 288.15), 0.5));
        let rodT = ((rodcalc * 60) / 1013.25) * (288.15 / T);
        let distT = ((dist * 60) / 1013.25) * (288.15 / T);
        let totalRod = rodT + distT;
        let cht1 = parseFloat(prompt("NORMALIZED TEMPERATURE"));
        let cht2 = parseFloat(prompt("NORMALIZED TEMPERATURE"));
        let cht = (cht1 + cht2) / 2;
        let v = (pressAlt * totalRod * 3.281) / (cht * 33.864);
        let casFinal = (Math.pow(((v * 2 * cht * 33.864) / (pressAlt * 3.281)), 0.5) * 1.94384);
        alert("VA CAS IS: " + casFinal.toFixed(1) + " KTS");
        let des100 = (casFinal * 1.94384) / 100;
        let des60 = des100 * 0.6;
        let descentRate = (des60 / (1 - (0.009 * des60)));
        let descentAltitude = (descentRate / 60) * pressAlt;
        let ftAltitude = Math.round(pressAlt * 3.281);
        let finalDescentAltitude = ftAltitude - descentAltitude;
        let sign = (rodcalc > 0) ? "+" : "-";
        let chtFinal = (cht1 * 33.864 + cht2 * 33.864) / 2;
        let totalEnergyLoss = (cht * 33.864 * descentAltitude) / (chtFinal * 33.864);
        let ambientAltitude1 = (pressAlt1 * 3.281) - descentAltitude;
        let ambientAltitude2 = (pressAlt2 * 3.281) - descentAltitude;
        let ambientAltitude = (ambientAltitude1 + ambientAltitude2) / 2;
        let energyLossCorrection = (ambientAltitude - totalEnergyLoss) / 60;
        let wind = (wi1 + wi2) / 2;
        let wd = (wd1 + wd2) / 2;
        if (windDirectionType[legs - 1] === "MAGNETIC WIND") {
            wd = wd + isoLine;
            if (wd > 360) {
                wd = wd - 360;
            } else if (wd < 0) {
                wd = 360 - (wd * -1);
            }
        } else {
            wd = wd + 0;
        }
        let wc = ((wind / 1.94384) / (tas * 1.94384)) * 60;
        let wdWind = wd - wd;
        if (wdWind < -180) {
            wdWind = wdWind + 360;
        } else if (wdWind > 180) {
            wdWind = wdWind - 360;
        }
        let wdR = wdWind + 90;
        if (wdR < 0) {
            wdR = wdR + 360;
        } else if (wdR > 360) {
            wdR = wdR - 360;
        }
        let wdWindFinal = wdR - wdR;
        if (wdWindFinal < -180) {
            wdWindFinal = wdWindFinal + 360;
        } else if (wdWindFinal > 180) {
            wdWindFinal = wdWindFinal - 360;
        }
        let ws = (wind * Math.pow((T / 288.15), 0.5)) / 1.68781;
        let wd1Final = (windDirectionType[legs - 1] === "MAGNETIC WIND") ? wdWind : wdWindFinal;
        let tasFinal = (vel * Math.pow((T / 288.15), 0.5));
        let oeatAltitude = ftAltitude - (descentRate / 60) * (ambientAltitude + energyLossCorrection);
        if (oeatAltitude < depElev) {
            oeatAltitude = depElev;
        }
        alert("OEAT ALTITUDE IS: " + oeatAltitude.toFixed(1) + " FT");
        let rrr = parseFloat(prompt("RRR"));
        let trueAirspeed = parseFloat(prompt("TRUE AIRSPEED"));
        trueAirspeed = trueAirspeed * 1.94384;
        let feetClimbed = finalDescentAltitude - oeatAltitude;
        let feetRate = feetClimbed / (totalEnergyLoss / 60);
        let altitudeRate = ((finalDescentAltitude - oeatAltitude) / (totalEnergyLoss / 60)) + 500;
        let altitudeRequired = 0.5 * totalEnergyLoss;
        let ftRate = feetClimbed / (totalEnergyLoss / 60);
        let machDescent = (1.68781 * casFinal) / tasFinal;
        let kelvinTemp = temp1 + 273.15;
        let totalHeatEnergyLoss = (chtFinal * 33.864 * descentAltitude) / (cht * 33.864);
        let knot1000Ft = totalEnergyLoss * 1.94384;
        let neededTotalEnergy = (0.5 * (tasFinal * 1.68781) * (tasFinal * 1.68781) - 0.5 * (casFinal * 1.68781) * (casFinal * 1.68781)) * (1000 / (1013.25 - press));
        let burnDistance = Math.pow(neededTotalEnergy / (knot1000Ft * 1.688), 2);
        let hcr = 1.6822 * (casFinal - rrr) + 0.0012 * burnDistance + 4.4 * machDescent - 2.3336 * (kelvinTemp - 288.15) + 0.000074 * (casFinal - rrr) * (casFinal - rrr) + 0.026 * (chtFinal - cht) + 0.01 * (fts + pressAlt1) + 0.00174 * (totalHeatEnergyLoss * 1.94384);
        let lcr = 1.6822 * (casFinal - rrr) + 0.0012 * burnDistance + 4.4 * machDescent - 2.3336 * (kelvinTemp - 288.15) + 0.000074 * (casFinal - rrr) * (casFinal - rrr) + 0.026 * (chtFinal - cht) + 0.01 * (fts + pressAlt2) + 0.00174 * (totalHeatEnergyLoss * 1.94384);
        let curveAltitude = ((pressAlt1 * hcr + pressAlt2 * lcr) / (hcr + lcr));
        let burnDistanceT = Math.pow((neededTotalEnergy + curveAltitude * 1.74) / (knot1000Ft * 1.688), 2);
        let velDescent = Math.pow(((burnDistance + burnDistanceT) / 4), 0.5);
        let voDescent = Math.pow(((burnDistance + burnDistanceT) / 2), 0.5);
        let vDescent = Math.pow(((burnDistance + burnDistanceT) / 4), 0.5) * 1.94384;
        let vo2Descent = Math.pow(((burnDistance + burnDistanceT) / 2), 0.5) * 1.94384;
        let feDescent = Math.pow((2 * neededTotalEnergy / 1.74), 0.5);
        let ff = 1.17;
        let fsDescent = (feDescent * ff) / 2;
        let fsDescentFinal = fsDescent + fsDescent;
        if (velDescent < 0) {
            voDescent = 0;
            vDescent = 0;
            vo2Descent = 0;
            velDescent = 0;
            feDescent = 0;
            fsDescent = 0;
            fsDescentFinal = 0;
        }

        alert("TOP OF DESCENT (TOD) = " + voDescent.toFixed(0) + " FT");
        alert("RATE OF DESCENT = " + vDescent.toFixed(0) + " FT/MIN");
        alert("BEGIN DESCENT (TOD) = " + velDescent.toFixed(0) + " KT");
        alert("BOTTOM OF DESCENT (TOD) = " + vo2Descent.toFixed(0) + " FT");
        alert("TOD FUEL FLOW = " + fsDescentFinal.toFixed(0) + " KG/HR");
        let fn = parseFloat(prompt("FN"));
        let ef = parseFloat(prompt("EF"));
        ef = ef * 2.2;
        let df = parseFloat(prompt("DF"));
        df = df * 2.2;
        let dh = parseFloat(prompt("DH"));
        let totalDescent = vo2Descent - voDescent;
        let rateOfDescent = vDescent;
        let fn1 = fn - ef;
        let fn2 = fn - ef - df;
        let fn3 = fn - ef - df - dh;
        let fn4 = fn - ef - df - dh - fsDescentFinal;
        let powerAltitude = voDescent;
        let constantRate = vo2Descent;
        let constantSpeed = velDescent;
        let inThrust = fn1;
        let reduceThrust = fn2;
        let flapsExtended = fn3;
        let landingConfig = fn4;
        let setAltitude = voDescent;
        let setSpeed = velDescent;
        let missedApp = vo2Descent;
        if (totalDescent <= 0) {
            totalDescent = 0;
            rateOfDescent = 0;
            fn1 = 0;
            fn2 = 0;
            fn3 = 0;
            fn4 = 0;
            powerAltitude = 0;
            constantRate = 0;
            constantSpeed = 0;
            inThrust = 0;
            reduceThrust = 0;
            flapsExtended = 0;
            landingConfig = 0;
            setAltitude = 0;
            setSpeed = 0;
            missedApp = 0;
        }
        let chart = "POWER ALTITUDE " + powerAltitude.toFixed(0) + " FT\n";
        chart += "CONSTANT RATE " + constantRate.toFixed(0) + " FT\n";
        chart += "CONSTANT SPEED " + constantSpeed.toFixed(0) + " KT\n";
        chart += "IN THRUST " + inThrust.toFixed(0) + " KG/HR\n";
        chart += "REDUCE THRUST " + reduceThrust.toFixed(0) + " KG/HR\n";
        chart += "FLAPS EXTENDED " + flapsExtended.toFixed(0) + " KG/HR\n";
        chart += "LANDING CONFIG " + landingConfig.toFixed(0) + " KG/HR\n";
        chart += "SET ALTITUDE " + setAltitude.toFixed(0) + " FT\n";
        chart += "SET SPEED " + setSpeed.toFixed(0) + " KT\n";
        chart += "MISSED APP " + missedApp.toFixed(0) + " FT\n";
        alert(chart);
        let displacementAltitude1 = (((Math.pow((pressAlt1 / 1013.25), (1 / 5.2559)) - 1) / -0.0000225577) / 0.3048);
        let displacementAltitude2 = (((Math.pow((pressAlt2 / 1013.25), (1 / 5.2559)) - 1) / -0.0000225577) / 0.3048);
        let displacementAltitude = (displacementAltitude1 + displacementAltitude2) / 2;
        let distanceFinal = (pressureAlt * 3.281 - finalDescentAltitude + displacementAltitude);
        let reducedThrustAltitude1 = (((Math.pow((pressAlt1 / 1013.25), (1 / 5.2559)) - 1) / -0.0000225577) / 0.3048);
        let reducedThrustAltitude2 = (((Math.pow((pressAlt2 / 1013.25), (1 / 5.2559)) - 1) / -0.0000225577) / 0.3048);
        let reducedThrustAltitude = (reducedThrustAltitude1 + reducedThrustAltitude2) / 2;
        let reducedThrustDistance = (pressureAlt * 3.281 - finalDescentAltitude + reducedThrustAltitude);
        let finalReducedThrustAltitude = displacementAltitude1 - reducedThrustAltitude2;
        let landConfigAltitude1 = (((Math.pow((pressAlt1 / 1013.25), (1 / 5.2559)) - 1) / -0.0000225577) / 0.3048);
        let landConfigAltitude2 = (((Math.pow((pressAlt2 / 1013.25), (1 / 5.2559)) - 1) / -0.0000225577) / 0.3048);
        let landConfigAltitude = (landConfigAltitude1 + landConfigAltitude2) / 2;
        let landConfigDistance = (pressureAlt * 3.281 - finalDescentAltitude + landConfigAltitude);
        let finalLandConfigAltitude = displacementAltitude1 - landConfigAltitude2;
        let setAltitude1 = (((Math.pow((pressAlt1 / 1013.25), (1 / 5.2559)) - 1) / -0.0000225577) / 0.3048);
        let setAltitude2 = (((Math.pow((pressAlt2 / 1013.25), (1 / 5.2559)) - 1) / -0.0000225577) / 0.3048);
        let setAltitude = (setAltitude1 + setAltitude2) / 2;
        let setDistance = (pressureAlt * 3.281 - finalDescentAltitude + setAltitude);
        let finalSetAltitude = displacementAltitude1 - setAltitude2;
        let missedAppAltitude1 = (((Math.pow((pressAlt1 / 1013.25), (1 / 5.2559)) - 1) / -0.0000225577) / 0.3048);
        let missedAppAltitude2 = (((Math.pow((pressAlt2 / 1013.25), (1 / 5.2559)) - 1) / -0.0000225577) / 0.3048);
        let missedAppAltitude = (missedAppAltitude1 + missedAppAltitude2) / 2;
        let missedAppDistance = (pressureAlt * 3.281 - finalDescentAltitude + missedAppAltitude);
        let finalMissedAppAltitude = displacementAltitude1 - missedAppAltitude2;
        alert("DISPLACEMENT ALTITUDE " + displacementAltitude.toFixed(0) + " FT\n");
        alert("DISPLACEMENT DISTANCE " + distanceFinal.toFixed(0) + " FT\n");
        alert("REDUCED THRUST ALTITUDE " + reducedThrustAltitude.toFixed(0) + " FT\n");
        alert("REDUCED THRUST DISTANCE " + reducedThrustDistance.toFixed(0) + " FT\n");
        alert("FINAL REDUCED THRUST ALTITUDE " + finalReducedThrustAltitude.toFixed(0) + " FT\n");
        alert("LAND CONFIG ALTITUDE " + landConfigAltitude.toFixed(0) + " FT\n");
        alert("LAND CONFIG DISTANCE " + landConfigDistance.toFixed(0) + " FT\n");
        alert("FINAL LAND CONFIG ALTITUDE " + finalLandConfigAltitude.toFixed(0) + " FT\n");
        alert("SET ALTITUDE " + setAltitude.toFixed(0) + " FT\n");
        alert("SET DISTANCE " + setDistance.toFixed(0) + " FT\n");
        alert("FINAL SET ALTITUDE " + finalSetAltitude.toFixed(0) + " FT\n");
        alert("MISSED APP ALTITUDE " + missedAppAltitude.toFixed(0) + " FT\n");
        alert("MISSED APP DISTANCE " + missedAppDistance.toFixed(0) + " FT\n");
        alert("FINAL MISSED APP ALTITUDE " + finalMissedAppAltitude.toFixed(0) + " FT\n");
    } else {
        alert("THE FINAL ALTITUDE SHOULD BE LESS THAN THE INITIAL ALTITUDE");
    }
}

calcularDescenso(
    legs,
    altitude,
    arrAlt,
    temperature,
    pressure,
    arrTemp,
    arrPress,
    altitude,
    arrAlt,
    windIntensity,
    arrWindInt,
    isogonicLine,
    windDirection,
    arrWindDir,
    trueCourse,
    distance,
    rpmEngine,
    altimeterSetting,
    magneticDeclination,
    windDirectionType,
    chPoint1,
    chPoint2,
    depElev
);