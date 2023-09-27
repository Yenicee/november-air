// Función para obtener datos de una pierna del vuelo
function getLegData(legNumber) {
    const leg = {
        chPoint1: prompt(`FROM for LEG ${legNumber}`),
        chPoint2: prompt(`TO for LEG ${legNumber}`),
        altitude: parseFloat(prompt(`ALTITUDE OF LEG ${legNumber}`)),
        altimeterSetting: prompt(`ALTIMETER SETTING FOR LEG ${legNumber}`, 'QNE'),
        distance: parseFloat(prompt(`DISTANCE OF LEG ${legNumber}`)),
        trueCourse: parseFloat(prompt(`TRUE COURSE OF LEG ${legNumber}`)),
        pressure: parseFloat(prompt(`PRESSURE OF LEG ${legNumber}`)),
        temperature: parseFloat(prompt(`TEMPERATURE OF LEG ${legNumber}`)),
        windDirection: parseFloat(prompt(`WIND DIRECTION OF LEG ${legNumber}`)),
        windDirectionType: prompt(`Wind direction type for LEG ${legNumber}`, 'GEOGRAPHIC WIND'),
        windIntensity: parseFloat(prompt(`WIND INTENSITY OF LEG ${legNumber}`)),
        isogonicLine: parseFloat(prompt(`ISOGONIC LINE OF LEG ${legNumber}`)),
        magneticDeclination: prompt(`Magnetic declination for LEG ${legNumber}`, '+W'),
        rpmEngine: parseFloat(prompt(`RPM OF LEG ${legNumber}`))
    }

    return leg;



    function nav(depPress, depElev, depTemp, depWindDir, depWindInt, arrPress, arrElev, arrTemp, arrWindDir, arrWindInt) {
        // TOTAL DE LEGS
        let legs = parseInt(prompt("TOTAL LEGS"));
        let totalDist = parseFloat(prompt("TOTAL DISTANCE"));

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
            chPoint1[i] = prompt("DESDE");
            chPoint2[i] = prompt("HASTA");
        }

        for (let i = 0; i < legs; i++) {
            altitude[i] = parseFloat(prompt("ALTURA DE LA PIERNA " + (i + 1)));
            altimeterSetting[i] = prompt("AJUSTE DEL ALTÍMETRO PARA LA PIERNA " + (i + 1), "QNE");
        }

        for (let i = 0; i < legs; i++) {
            distance[i] = parseFloat(prompt("DISTANCIA DE LA PIERNA " + (i + 1)));
        }

        for (let i = 0; i < legs; i++) {
            trueCourse[i] = parseFloat(prompt("RUMBO VERDADERO DE LA PIERNA " + (i + 1)));
        }

        for (let i = 0; i < legs; i++) {
            pressure[i] = parseFloat(prompt("PRESIÓN DE LA PIERNA " + (i + 1)));
        }

        for (let i = 0; i < legs; i++) {
            temperature[i] = parseFloat(prompt("TEMPERATURA DE LA PIERNA " + (i + 1)));
        }

        for (let i = 0; i < legs; i++) {
            windDirection[i] = parseFloat(prompt("DIRECCIÓN DEL VIENTO DE LA PIERNA " + (i + 1)));
            windDirectionType[i] = prompt("Seleccione el tipo de viento para la PIENA " + (i + 1), "GEOGRAPHIC WIND");
        }
        for (let i = 0; i < legs; i++) {
            windIntensity[i] = parseFloat(prompt("INTENSIDAD DEL VIENTO DE LA PIERNA " + (i + 1)));
        }

        for (let i = 0; i < legs; i++) {
            isogonicLine[i] = parseFloat(prompt("LÍNEA ISOGÓNICA DE LA PIERNA " + (i + 1)));
        }

        for (let i = 0; i < legs; i++) {
            magneticDeclination[i] = prompt("Tipo de variación magnética para la PIERNA " + (i + 1), "-E");
        }

        for (let i = 0; i < legs; i++) {
            rpmEngine[i] = parseFloat(prompt("RPM DE LA ETAPA " + (i + 1)));
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
            if ("QNH".equals(altimeterSetting[0])) {
                pressAlt2 = (((((Math.pow(press2 / 1013.25, 1 / 5.2559)) - 1) / -0.0000225577) / 0.3048) + alt2);
            } else {
                pressAlt2 = alt2;
            }
            let pressAlt = (pressAlt1 + pressAlt2) / 2;
            let densityAlt1 = (154442.16 * (1 - (Math.pow(17.326 * (((1013.25 * Math.pow((1 - 0.0000225577 * (pressAlt1 / 3.281)), 5.2559)) / 33.864) / (459.67 + ((temp1 * 9 / 5 + 32)))), 0.235)))) - 0.0622272727273 * (154442.16 * (1 - (Math.pow(17.326 * (((1013.25 * Math.pow((1 - 0.0000225577 * (pressAlt1 / 3.281)), 5.2559)) / 33.864) / (459.67 + ((temp1 * 9 / 5 + 32)))), 0.235)))) + 16.681818181818;
            let densityAlt2 = (154442.16 * (1 - (Math.pow(17.326 * (((1013.25 * Math.pow((1 - 0.0000225577 * (pressAlt2 / 3.281)), 5.2559)) / 33.864) / (459.67 + ((temp2 * 9 / 5 + 32)))), 0.235)))) - 0.0622272727273 * (154442.16 * (1 - (Math.pow(17.326 * (((1013.25 * Math.pow((1 - 0.0000225577 * (pressAlt2 / 3.281)), 5.2559)) / 33.864) / (459.67 + ((temp2 * 9 / 5 + 32)))), 0.235)))) + 16.681818181818;
            let densityAlt = (densityAlt1 + densityAlt2) / 2;
            let wi = (wi1 + wi2) / 2;
            if ("-E".equals(magneticDeclination[0])) {
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
            if ("MAGNETIC WIND".equals(windDirectionType[0])) {
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
            let tas1 = cas1 / Math.sqrt(Math.pow(((1 - 0.0000225577 * ((densityAlt1) / 3.281))), 4.256));
            let tas2 = cas2 / Math.sqrt(Math.pow(((1 - 0.0000225577 * ((densityAlt2) / 3.281))), 4.256));
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
            if (wd1 < tc && wd1 < tc - 180) { wca1 = wca1 * -1; } //WCA 1
            if (wd1 < 180) { wa1 = wd1 + 180; } //GS 1
            if (wd1 >= 180) { wa1 = wd1 - 180; }
            if (wa1 < tc) { wa1 = tc - wa1; }
            if (wa1 > tc) { wa1 = wa1 - tc; }
            let gswca1 = wi1 / (tas1 / Math.sin(Math.toRadians(wa1)));
            gswca1 = Math.toDegrees(Math.asin(gswca1));
            let gs1 = 180 - gswca1 - wa1;
            gs1 = Math.sqrt((tas1 * tas1) + (wi1 * wi1) - (2 * tas1 * wi1 * Math.cos(Math.toRadians(gs1))));
            if (wd1 == tc + 180) { gs1 = wi1 + tas1; }
            if (wd1 == tc - 180) { gs1 = wi1 + tas1; } // GS 1
            let wa2 = 0; // WCA 2
            if (wd2 < tc) { wa2 = tc - wd2; }
            if (wd2 > tc) { wa2 = wd2 - tc; }
            let wca2 = wi2 / (tas2 / Math.sin(Math.toRadians(wa2)));
            wca2 = Math.toDegrees(Math.asin(wca2));
            if (wd2 < tc) { wca2 = wca2 * 1; }
            if (wd2 < tc && wd2 > tc - 180) { wca2 = wca2 * -1; }
            if (wd2 > tc) { wca2 = wca2 * 1; }
            if (wd2 < tc && wd2 < tc - 180) { wca2 = wca2 * -1; } //WCA 2
            if (wd2 < 180) { wa2 = wd2 + 180; } //GS 2
            if (wd2 >= 180) { wa2 = wd2 - 180; }
            if (wa2 < tc) { wa2 = tc - wa2; }
            if (wa2 > tc) { wa2 = wa2 - tc; }
            let gswca2 = wi2 / (tas2 / Math.sin(Math.toRadians(wa2)));
            gswca2 = Math.toDegrees(Math.asin(gswca2));
            let gs2 = 180 - gswca2 - wa2;
            gs2 = Math.sqrt((tas2 * tas2) + (wi2 * wi2) - (2 * tas2 * wi2 * Math.cos(Math.toRadians(gs2))));
            if (wd2 == tc + 180) { gs2 = wi2 + tas2; }
            if (wd2 == tc - 180) { gs2 = wi2 + tas2; } // GS 2
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
            let distCrusire = dist - distClimb;
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
            console.log("COMPASS DESVIATION 1 " + dev1);
            console.log("COMPASS DESVIATION 2 " + dev2);
            console.log("COMPASS HEADING 1 " + ch1);
            console.log("COMPASS HEADING 2 " + ch2);
            console.log("STANDAR TEMP 1 " + standarTemp1);
            console.log("STANDAR TEMP 2 " + standarTemp2);
            console.log("STANDAR TEMP " + standarTemp);
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
            console.log("CRUSIRE");
            console.log("CRUSIRE DISTANCE " + distCrusire);
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
        }

        //segunda parte para arreglar
        //CLIMB,CRUSIRE,DESCEND
        for (let i = 0; i < legs - 2; i++) {
            if (altitude[i] < altitude[i + 1]) {
                let temp1 = temperature[i], temp2 = temperature[i + 1];
                let press1 = pressure[i], press2 = pressure[i + 1];
                let alt1 = altitude[i], alt2 = altitude[i + 1];
                let wi1 = windIntensity[i], wi2 = windIntensity[i + 1];
                let isoLine = isogonicLine[i + 1];
                let wd1 = windDirection[i], wd2 = windDirection[i + 1];
                let tc = trueCourse[i + 1];
                let dist = distance[i + 1];
                let rpm = rpmEngine[i + 1];
            }
        }

        let press = (press1 + press2) / 2;
        let temp = (temp1 + temp2) / 2;
        let pressAlt1;
        if (altimeterSetting[i] === "QNH") {
            pressAlt1 = (((((Math.pow(press1 / 1013.25, 1 / 5.2559)) - 1) / -0.0000225577) / 0.3048) + alt1);
        } else {
            pressAlt1 = alt1;
        }
        let pressAlt2;
        if (altimeterSetting[i + 1] === "QNH") {
            pressAlt2 = (((((Math.pow(press2 / 1013.25, 1 / 5.2559)) - 1) / -0.0000225577) / 0.3048) + alt2);
        } else {
            pressAlt2 = alt2;
        }
        let pressAlt = (pressAlt1 + pressAlt2) / 2;
        let densityAlt1 = (154442.16 * (1 - (Math.pow(17.326 * (((1013.25 * Math.pow((1 - 0.0000225577 * (pressAlt1 / 3.281)), 5.2559)) / 33.864) / (459.67 + ((temp1 * 9 / 5 + 32)))), 0.235)))) - 0.0622272727273 * (154442.16 * (1 - (Math.pow(17.326 * (((1013.25 * Math.pow((1 - 0.0000225577 * (pressAlt1 / 3.281)), 5.2559)) / 33.864) / (459.67 + ((temp1 * 9 / 5 + 32)))), 0.235)))) + 16.681818181818;
        let densityAlt2 = (154442.16 * (1 - (Math.pow(17.326 * (((1013.25 * Math.pow((1 - 0.0000225577 * (pressAlt2 / 3.281)), 5.2559)) / 33.864) / (459.67 + ((temp2 * 9 / 5 + 32)))), 0.235)))) - 0.0622272727273 * (154442.16 * (1 - (Math.pow(17.326 * (((1013.25 * Math.pow((1 - 0.0000225577 * (pressAlt2 / 3.281)), 5.2559)) / 33.864) / (459.67 + ((temp2 * 9 / 5 + 32)))), 0.235)))) + 16.681818181818;
        let densityAlt = (densityAlt1 + densityAlt2) / 2;
        let wi = (wi1 + wi2) / 2;
        if (magneticDeclination[i + 1] === "-E") {
            isoLine = isoLine * -1;
        } else {
            isoLine = isoLine * 1;
        }
        if (windDirectionType[i] === "MAGNETIC WIND") {
            wd1 = wd1 - isoLine;
            if (wd1 > 360) {
                wd1 = wd1 - 360;
            } else if (wd1 < 0) {
                wd1 = 360 - (wd1 * -1);
            }
        } else {
            wd1 = wd1 + 0;
        }

        if (windDirectionType[i + 1] === "MAGNETIC WIND") {
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
        let tas1 = cas1 / Math.sqrt(Math.pow(((1 - 0.0000225577 * ((densityAlt1) / 3.281))), 4.256));
        let tas2 = cas2 / Math.sqrt(Math.pow(((1 - 0.0000225577 * ((densityAlt2) / 3.281))), 4.256));
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
        let wca1 = wi1 / (tas1 / Math.sin(Math.toRadians(wa1)));
        wca1 = Math.toDegrees(Math.asin(wca1));
        if (wd1 < tc) { wca1 = wca1 * 1; }
        if (wd1 < tc && wd1 > tc - 180) { wca1 = wca1 * -1; }
        if (wd1 > tc) { wca1 = wca1 * 1; }
        if (wd1 < tc && wd1 < tc - 180) { wca1 = wca1 * -1; } //WCA 1
        if (wd1 < 180) { wa1 = wd1 + 180; } //GS 1
        if (wd1 >= 180) { wa1 = wd1 - 180; }
        if (wa1 < tc) { wa1 = tc - wa1; }
        if (wa1 > tc) { wa1 = wa1 - tc; }
        let gswca1 = wi1 / (tas1 / Math.sin(Math.toRadians(wa1)));
        gswca1 = Math.toDegrees(Math.asin(gswca1));
        let gs1 = 180 - gswca1 - wa1;
        gs1 = Math.sqrt((tas1 * tas1) + (wi1 * wi1) - (2 * tas1 * wi1 * Math.cos(Math.toRadians(gs1))));
        if (wd1 == tc + 180) { gs1 = wi1 + tas1; }
        if (wd1 == tc - 180) { gs1 = wi1 + tas1; } //GS 1

        let wa2 = 0; // WCA 2
        if (wd2 < tc) { wa2 = tc - wd2; }
        if (wd2 > tc) { wa2 = wd2 - tc; }
        let wca2 = wi2 / (tas2 / Math.sin(Math.toRadians(wa2)));
        wca2 = Math.toDegrees(Math.asin(wca2));
        if (wd2 < tc) { wca2 = wca2 * 1; }
        if (wd2 < tc && wd2 > tc - 180) { wca2 = wca2 * -1; }
        if (wd2 > tc) { wca2 = wca2 * 1; }
        if (wd2 < tc && wd2 < tc - 180) { wca2 = wca2 * -1; } //WCA 2
        if (wd2 < 180) { wa2 = wd2 + 180; } //GS 2
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
        let eteClimb = (pressAlt2 - pressAlt1) / roc;
        let distClimb = eteClimb * gsClimb / 60;
        while (dist < distClimb) {
            dist = parseFloat(prompt("DIST MUST BE MORE THAN " + distClimb));
        }
        let distCrusire = dist - distClimb;
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
        let wca = 0; // WCA
        if (wd2 < tc) { wca = tc - wd2; }
        if (wd2 > tc) { wca = wd2 - tc; }
        wca = wi2 / (tas / Math.sin(Math.toRadians(wca)));
        wca = Math.toDegrees(Math.asin(wca));
        if (wd2 < tc) { wca = wca * 1; }
        if (wd2 < tc && wd2 > tc - 180) { wca = wca * -1; }
        if (wd2 > tc) { wca = wca * 1; }
        if (wd2 < tc && wd2 < tc - 180) { wca = wca * -1; } // WCA
        let wa;
        if (wd2 < 180) { wa = wd2 + 180; } // GS
        if (wd2 >= 180) { wa = wd2 - 180; }
        if (wa < tc) { wa = tc - wa; }
        if (wa > tc) { wa = wa - tc; }
        let gswca = wi2 / (tas / Math.sin(Math.toRadians(wca)));
        gswca = Math.toDegrees(Math.asin(gswca));
        let gs = 180 - gswca - wa;
        gs = Math.sqrt((tas * tas) + (wi2 * wi2) - (2 * tas * wi2 * Math.cos(Math.toRadians(gs))));

        if (wd2 == tc + 180) { gs = wi2 + tas; }
        if (wd2 == tc - 180) { gs = wi2 + tas; } //GS
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
        console.log("COMPASS DESVIATION 1 " + dev1);
        console.log("COMPASS DESVIATION 2 " + dev2);
        console.log("COMPASS HEADING 1 " + ch1);
        console.log("COMPASS HEADING 2 " + ch2);
        console.log("STANDAR TEMP 1 " + standarTemp1);
        console.log("STANDAR TEMP 2 " + standarTemp2);
        console.log("STANDAR TEMP " + standarTemp);
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

            if (altimeterSetting[i + 1] === "QNH") {
                pressAlt = (((((Math.pow(press / 1013.25, 1 / 5.2559)) - 1) / -0.0000225577) / 0.3048) + alt);
            } else {
                pressAlt = alt;
            }
            const densityAlt = (154442.16 * (1 - (Math.pow(17.326 * (((1013.25 * Math.pow((1 - 0.0000225577 * (pressAlt / 3.281)), 5.2559)) / 33.864) / (459.67 + ((temp * 9 / 5 + 32)))), 0.235)))) - 0.0622272727273 * (154442.16 * (1 - (Math.pow(17.326 * (((1013.25 * Math.pow((1 - 0.0000225577 * (pressAlt / 3.281)), 5.2559)) / 33.864) / (459.67 + ((temp * 9 / 5 + 32)))), 0.235)))) + 16.681818181818;
            if (magneticDeclination[i + 1] === "-E") {
                isoLine = isoLine * -1;
            } else {
                isoLine = isoLine * 1;
            }
            if (windDirectionType[i + 1] === "MAGNETIC WIND") {
                wd = wd - isoLine;
                if (wd > 360) {
                    wd = wd - 360;
                } else if (wd < 0) {
                    wd = 360 - (wd * -1);
                }
            } else {
                wd = wd + 0;
            }
            let mc = tc + isoLine;
            if (mc > 360) {
                mc = mc - 360;
            } else if (mc < 0) {
                mc = 360 - (mc * -1);
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
            if (wd < tc) { wca = wca * 1; }
            if (wd < tc && wd > tc - 180) { wca = wca * -1; }
            if (wd > tc) { wca = wca * 1; }
            if (wd < tc && wd < tc - 180) { wca = wca * -1; } //WCA
            if (wd < 180) { wa = wd + 180; } //GS
            if (wd >= 180) { wa = wd - 180; }
            if (wa < tc) { wa = tc - wa; }
            if (wa > tc) { wa = wa - tc; }
            let gswca = wi / (tas / Math.sin(Math.toRadians(wa)));
            gswca = Math.toDegrees(Math.asin(gswca));
            let gs = 180 - gswca - wa;
            gs = Math.sqrt((tas * tas) + (wi * wi) - (2 * tas * wi
                * Math.cos(Math.toRadians(gs))));
            if (wd == tc + 180) { gs = wi + tas; }
            if (wd == tc - 180) { gs = wi + tas; } //GS
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

            let ete = dist * 60 / gs;
            let fuel = ete * gph / 60;

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
            console.log("MAGNETIC HEADING  " + mh);
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

                let temp1 = temperature[i], temp2 = temperature[i + 1];
                let press1 = pressure[i], press2 = pressure[i + 1];
                let alt1 = altitude[i], alt2 = altitude[i + 1];
                let wi1 = windIntensity[i], wi2 = windIntensity[i + 1];
                let isoLine = isogonicLine[i + 1];
                let wd1 = windDirection[i], wd2 = windDirection[i + 1];
                let tc = trueCourse[i + 1];
                let dist = distance[i + 1];
                let rpm = rpmEngine[i + 1];

                let press = (press1 + press2) / 2;
                let temp = (temp1 + temp2) / 2;
                let pressAlt1;
                if (altimeterSetting[i] === "QNH") {
                    pressAlt1 = (((((Math.pow(press1 / 1013.25, 1 / 5.2559)) - 1) / -0.0000225577) / 0.3048) + alt1);
                } else {
                    pressAlt1 = alt1;
                }

                let pressAlt2;
                if (altimeterSetting[i + 1] === "QNH") {
                    pressAlt2 = (((((Math.pow(press2 / 1013.25, 1 / 5.2559)) - 1) / -0.0000225577) / 0.3048) + alt2);
                } else {
                    pressAlt2 = alt2;
                }
                let pressAlt = (pressAlt1 + pressAlt2) / 2;
                const densityAlt1 = (154442.16 * (1 - (Math.pow(17.326 * (((1013.25 * Math.pow((1 - 0.0000225577 * (pressAlt1 / 3.281)), 5.2559)) / 33.864) / (459.67 + ((temp1 * 9 / 5 + 32)))), 0.235)))) - 0.0622272727273 * (154442.16 * (1 - (Math.pow(17.326 * (((1013.25 * Math.pow((1 - 0.0000225577 * (pressAlt1 / 3.281)), 5.2559)) / 33.864) / (459.67 + ((temp1 * 9 / 5 + 32)))), 0.235)))) + 16.681818181818;
                const densityAlt2 = (154442.16 * (1 - (Math.pow(17.326 * (((1013.25 * Math.pow((1 - 0.0000225577 * (pressAlt2 / 3.281)), 5.2559)) / 33.864) / (459.67 + ((temp2 * 9 / 5 + 32)))), 0.235)))) - 0.0622272727273 * (154442.16 * (1 - (Math.pow(17.326 * (((1013.25 * Math.pow((1 - 0.0000225577 * (pressAlt2 / 3.281)), 5.2559)) / 33.864) / (459.67 + ((temp2 * 9 / 5 + 32)))), 0.235)))) + 16.681818181818;
                let densityAlt = (densityAlt1 + densityAlt2) / 2;
                let wi = (wi1 + wi2) / 2;
                if ("-E".equals(magneticDeclination[i + 1])) {
                    isoLine = isoLine * -1;
                } else {
                    isoLine = isoLine * 1;
                }
                if ("MAGNETIC WIND".equals(windDirectionType[i])) {
                    wd1 = wd1 - isoLine;
                    if (wd1 > 360) {
                        wd1 = wd1 - 360;
                    } else if (wd1 < 0) {
                        wd1 = 360 - (wd1 * -1);
                    }
                } else {
                    wd1 = wd1 + 0;
                }
                if (windDirectionType[i + 1] === "MAGNETIC WIND") {
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
                const standarTemp1 = -0.0036 * (pressAlt1 - ((((Math.pow((press1 / 1013.25), 1 / 5.2559)) - 1) / -0.0000225577) * 3.281)) + 59;
                const standarTemp2 = -0.0036 * (pressAlt2 - ((((Math.pow((press2 / 1013.25), 1 / 5.2559)) - 1) / -0.0000225577) * 3.281)) + 59;
                let standarTemp = (standarTemp1 + standarTemp2) / 2;
                const rod = parseFloat(prompt("TASA DE DESCENSO"));
                const tas1 = cas / Math.sqrt(Math.pow(((1 - 0.0000225577 * ((densityAlt1) / 3.281))), 4.256));
                const tas2 = cas / Math.sqrt(Math.pow(((1 - 0.0000225577 * ((densityAlt2) / 3.281))), 4.256));
                let eteDescend = (pressAlt1 - pressAlt2) / rod;
                let tasDescend = (tas1 + tas2) / 2;
                let fuelDescend = eteDescend * 4.5 / 60;
                let wa1 = 0; //WCA 1
                if (wd1 < tc) { wa1 = tc - wd1; }
                if (wd1 > tc) { wa1 = wd1 - tc; }
                let wca1 = wi1 / (tas1 / Math.sin(Math.toRadians(wa1)));
                wca1 = Math.toDegrees(Math.asin(wca1));
                if (wd1 < tc) { wca1 = wca1 * 1; }
                if (wd1 < tc && wd1 > tc - 180) { wca1 = wca1 * -1; }
                if (wd1 > tc) { wca1 = wca1 * 1; }
                if (wd1 < tc && wd1 < tc - 180) { wca1 = wca1 * -1; } //WCA 1
                if (wd1 < 180) { wa1 = wd1 + 180; } //GS 1
                if (wd1 >= 180) { wa1 = wd1 - 180; }
                if (wa1 < tc) { wa1 = tc - wa1; }
                if (wa1 > tc) { wa1 = wa1 - tc; }
                let gswca1 = wi1 / (tas1 / Math.sin(Math.toRadians(wa1)));
                gswca1 = Math.toDegrees(Math.asin(gswca1));
                let gs1 = 180 - gswca1 - wa1;
                gs1 = Math.sqrt((tas1 * tas1) + (wi1 * wi1) - (2 * tas1 * wi1 * Math.cos(Math.toRadians(gs1))));
                if (wd1 == tc + 180) { gs1 = wi1 + tas1; }
                if (wd1 == tc - 180) { gs1 = wi1 + tas1; } //GS 1
                let wa2 = 0; //WCA 2
                if (wd2 < tc) { wa2 = tc - wd2; }
                if (wd2 > tc) { wa2 = wd2 - tc; }
                let wca2 = wi2 / (tas2 / Math.sin(Math.toRadians(wa2)));
                wca2 = Math.toDegrees(Math.asin(wca2));
                if (wd2 < tc) { wca2 = wca2 * 1; }
                if (wd2 < tc && wd2 > tc - 180) { wca2 = wca2 * -1; }
                if (wd2 > tc) { wca2 = wca2 * 1; }
                if (wd2 < tc && wd2 < tc - 180) { wca2 = wca2 * -1; } //WCA 2
                if (wd2 < 180) { wa2 = wd2 + 180; } //GS 2
                if (wd2 >= 180) { wa2 = wd2 - 180; }
                if (wa2 < tc) { wa2 = tc - wa2; }
                if (wa2 > tc) { wa2 = wa2 - tc; }
                let gswca2 = wi2 / (tas2 / Math.sin(Math.toRadians(wa2)));
                gswca2 = Math.toDegrees(Math.asin(gswca2));
                let gs2 = 180 - gswca2 - wa2;
                gs2 = Math.sqrt((tas2 * tas2) + (wi2 * wi2) - (2 * tas2 * wi2 * Math.cos(Math.toRadians(gs2))));
                if (wd2 == tc + 180) { gs2 = wi2 + tas2; }
                if (wd2 == tc - 180) { gs2 = wi2 + tas2; } //GS 2        
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
                let wa = 0; //WCA 
                if (wd2 < tc) { wa = tc - wd2; }
                if (wd2 > tc) { wa = wd2 - tc; }
                let wca = wi2 / (tas / Math.sin(Math.toRadians(wa)));
                wca = Math.toDegrees(Math.asin(wca));
                if (wd2 < tc) { wca = wca * 1; }
                if (wd2 < tc && wd2 > tc - 180) { wca = wca * -1; }
                if (wd2 > tc) { wca = wca * 1; }
                if (wd2 < tc && wd2 < tc - 180) { wca = wca * -1; } //WCA
                if (wd2 < 180) { wa = wd2 + 180; } //GS
                if (wd2 >= 180) { wa = wd2 - 180; }
                if (wa < tc) { wa = tc - wa; }
                if (wa > tc) { wa = wa - tc; }
                let gswca = wi2 / (tas / Math.sin(Math.toRadians(wa)));
                gswca = Math.toDegrees(Math.asin(gswca));
                let gs = 180 - gswca - wa;
                gs = Math.sqrt((tas * tas) + (wi2 * wi2) - (2 * tas * wi2
                    * Math.cos(Math.toRadians(gs))));
                if (wd2 == tc + 180) { gs = wi2 + tas; }
                if (wd2 == tc - 180) { gs = wi2 + tas; } //GS
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


                //tercera parte
                //LAST DESCEND
                if (altitude[legs - 1] > arrAlt) {

                    let temp1 = temperature[legs - 1], temp2 = arrTemp;
                    let press1 = pressure[legs - 1], press2 = arrPress;
                    let alt1 = altitude[legs - 1], alt2 = arrAlt;
                    let wi1 = windIntensity[legs - 1], wi2 = arrWindInt;
                    let isoLine = isogonicLine[legs - 1];
                    let wd1 = windDirection[legs - 1], wd2 = arrWindDir;
                    let tc = trueCourse[legs - 1];
                    let dist = distance[legs - 1];
                    let rpm = rpmEngine[legs - 1];

                    let press = (press1 + press2) / 2;
                    let temp = (temp1 + temp2) / 2;
                    let pressAlt1;
                    if (altimeterSetting[legs - 1] === "QNH") {
                        pressAlt1 = (((((Math.pow(press1 / 1013.25, 1 / 5.2559)) - 1) / -0.0000225577) / 0.3048) + alt1);
                    } else {
                        pressAlt1 = alt1;
                    }
                    const pressAlt2 = (((((Math.pow(press2 / 1013.25, 1 / 5.2559)) - 1) / -0.0000225577) / 0.3048) + alt2);
                    const pressAlt = (pressAlt1 + pressAlt2) / 2;
                    const densityAlt1 = (154442.16 * (1 - (Math.pow(17.326 * (((1013.25 * Math.pow((1 - 0.0000225577 * (pressAlt1 / 3.281)), 5.2559)) / 33.864) / (459.67 + ((temp1 * 9 / 5 + 32)))), 0.235)))) - 0.0622272727273 * (154442.16 * (1 - (Math.pow(17.326 * (((1013.25 * Math.pow((1 - 0.0000225577 * (pressAlt1 / 3.281)), 5.2559)) / 33.864) / (459.67 + ((temp1 * 9 / 5 + 32)))), 0.235)))) + 16.681818181818;
                    const densityAlt2 = (154442.16 * (1 - (Math.pow(17.326 * (((1013.25 * Math.pow((1 - 0.0000225577 * (pressAlt2 / 3.281)), 5.2559)) / 33.864) / (459.67 + ((temp2 * 9 / 5 + 32)))), 0.235)))) - 0.0622272727273 * (154442.16 * (1 - (Math.pow(17.326 * (((1013.25 * Math.pow((1 - 0.0000225577 * (pressAlt2 / 3.281)), 5.2559)) / 33.864) / (459.67 + ((temp2 * 9 / 5 + 32)))), 0.235)))) + 16.681818181818;
                    let densityAlt = (densityAlt1 + densityAlt2) / 2;
                    let wi = (wi1 + wi2) / 2;
                    if (magneticDeclination[legs - 1] === "-E") {
                        isoLine = isoLine * -1;
                    } else {
                        isoLine = isoLine * 1;
                    }
                    if (windDirectionType[legs - 1] === "MAGNETIC WIND") {
                        wd1 = wd1 - isoLine;
                        if (wd1 > 360) {
                            wd1 = wd1 - 360;
                        } else if (wd1 < 0) {
                            wd1 = 360 - (wd1 * -1);
                        }
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
                let mc = tc + isoLine;
                if (mc > 360) {
                    mc = mc - 360;
                } else if (mc < 0) {
                    mc = 360 - (mc * -1);
                }
                let ias = parseFloat(prompt("IAS KT"));
                ias *= 1.151;
                let cas = 0;
                if (ias <= 90) {
                    cas = 0.9 * ias + 6;
                } else if (ias > 90 && ias <= 120) {
                    cas = ias - 3;
                } else if (ias >= 130) {
                    cas = ias - 2;
                }
                cas = cas / 1.151;
                const standarTemp1 = -0.0036 * (pressAlt1 - ((((Math.pow((press1 / 1013.25), 1 / 5.2559)) - 1) / -0.0000225577) * 3.281)) + 59;
                const standarTemp2 = -0.0036 * (pressAlt2 - ((((Math.pow((press2 / 1013.25), 1 / 5.2559)) - 1) / -0.0000225577) * 3.281)) + 59;
                const standarTemp = (standarTemp1 + standarTemp2) / 2;
                const tas1 = cas / Math.sqrt(Math.pow(((1 - 0.0000225577 * ((densityAlt1) / 3.281))), 4.256));
                const tas2 = cas / Math.sqrt(Math.pow(((1 - 0.0000225577 * ((densityAlt2) / 3.281))), 4.256));
                const tasDescend = (tas1 + tas2) / 2;
                const wa1 = 0; // WCA 1
                let wca1 = wi1 / (tas1 / Math.sin(Math.toRadians(wa1)));
                wca1 = Math.toDegrees(Math.asin(wca1));

                if (wd1 < tc) { wca1 = wca1 * 1; }
                if (wd1 < tc && wd1 > tc - 180) { wca1 = wca1 * -1; }
                if (wd1 > tc) { wca1 = wca1 * 1; }
                if (wd1 < tc && wd1 < tc - 180) { wca1 = wca1 * -1; } //WCA 1
                if (wd1 < 180) { wa1 = wd1 + 180; } //GS 1
                if (wd1 >= 180) { wa1 = wd1 - 180; }
                if (wa1 < tc) { wa1 = tc - wa1; }
                if (wa1 > tc) { wa1 = wa1 - tc; }
                let gswca1 = wi1 / (tas1 / Math.sin(Math.toRadians(wa1)));
                gswca1 = Math.toDegrees(Math.asin(gswca1));
                let gs1 = 180 - gswca1 - wa1;
                gs1 = Math.sqrt((tas1 * tas1) + (wi1 * wi1) - (2 * tas1 * wi1 * Math.cos(Math.toRadians(gs1))));
                if (wd1 == tc + 180) { gs1 = wi1 + tas1; }
                if (wd1 == tc - 180) { gs1 = wi1 + tas1; } //GS 1
                let wa2 = 0; //WCA 2
                if (wd2 < tc) { wa2 = tc - wd2; }
                if (wd2 > tc) { wa2 = wd2 - tc; }
                let wca2 = wi2 / (tas2 / Math.sin(Math.toRadians(wa2)));
                wca2 = Math.toDegrees(Math.asin(wca2));
                if (wd2 < tc) { wca2 = wca2 * 1; }
                if (wd2 < tc && wd2 > tc - 180) { wca2 = wca2 * -1; }
                if (wd2 > tc) { wca2 = wca2 * 1; }
                if (wd2 < tc && wd2 < tc - 180) { wca2 = wca2 * -1; } //WCA 2
                if (wd2 < 180) { wa2 = wd2 + 180; } //GS 2
                if (wd2 >= 180) { wa2 = wd2 - 180; }
                if (wa2 < tc) { wa2 = tc - wa2; }
                if (wa2 > tc) { wa2 = wa2 - tc; }
                let gswca2 = wi2 / (tas2 / Math.sin(Math.toRadians(wa2)));
                gswca2 = Math.toDegrees(Math.asin(gswca2));
                let gs2 = 180 - gswca2 - wa2;
                gs2 = Math.sqrt((tas2 * tas2) + (wi2 * wi2) - (2 * tas2 * wi2 * Math.cos(Math.toRadians(gs2))));
                if (wd2 == tc + 180) { gs2 = wi2 + tas2; }
                if (wd2 == tc - 180) { gs2 = wi2 + tas2; } //GS 2        
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
                while (dist < distDescend) {
                    dist = parseFloat(prompt("DIST MUST BE MORE THAN " + distDescend));
                }

                let distCrusire = dist - distDescend;
                let tas = 0, gph = 0;
                // LESS THAN 2500
                if (densityAlt1 <= 2500 && rpm <= 2700 && rpm > 2600) {
                    tas = (-0.0004 * densityAlt1 + 120) - (-0.05 * rpm + 135);
                    gph = (-0.00024 * densityAlt1 + 7.2) - (-0.008 * rpm + 21.6);
                }
                if (densityAlt1 <= 2500 && rpm <= 2600 && rpm > 2500) {
                    tas = (-0.0004 * densityAlt1 + 115) - (-0.06 * rpm + 156);
                    gph = (-0.0002 * densityAlt1 + 6.3) - (-0.007 * rpm + 18.2);
                }
                if (densityAlt1 <= 2500 && rpm <= 2500 && rpm > 2400) {
                    tas = (-0.0004 * densityAlt1 + 109) - (-0.05 * rpm + 125);
                    gph = (-0.00012 * densityAlt1 + 5.4) - (-0.005 * rpm + 12.5);
                }
                if (densityAlt1 <= 2500 && rpm <= 2400 && rpm > 2300) {
                    tas = (-0.0008 * densityAlt1 + 105) - (-0.07 * rpm + 168);
                    gph = (-0.00012 * densityAlt1 + 4.9) - (-0.005 * rpm + 12);
                }
                if (densityAlt1 <= 2500 && rpm <= 2300 && rpm > 2200) {
                    tas = (-0.0012 * densityAlt1 + 99) - (-0.07 * rpm + 161);
                    gph = (-0.00012 * densityAlt1 + 4.4) - (-0.005 * rpm + 11.5);
                }
                if (densityAlt1 <= 2500 && rpm <= 2200 && rpm > 2100) {
                    tas = (-0.002 * densityAlt1 + 94) - (-0.1 * rpm + 220);
                    gph = (-0.00008 * densityAlt1 + 3.8) - (-0.004 * rpm + 8.8);
                }
                if (densityAlt1 <= 2500 && rpm <= 2100) {
                    tas = (-0.002 * densityAlt1 + 94) - (-0.1 * rpm + 220);
                    gph = (-0.00008 * densityAlt1 + 3.8) - (-0.004 * rpm + 8.8);
                }
                // FROM 2500 TO 5000
                if (densityAlt1 <= 5000 && densityAlt1 > 2500 && rpm <= 2700 && rpm > 2600) {
                    tas = (-0.0004 * densityAlt1 + 120) - (-0.05 * rpm + 135);
                    gph = (-0.00024 * densityAlt1 + 7.2) - (-0.007 * rpm + 18.9);
                }
                if (densityAlt1 <= 5000 && densityAlt1 > 2500 && rpm <= 2600 && rpm > 2500) {
                    tas = (-0.0004 * densityAlt1 + 115) - (-0.06 * rpm + 156);
                    gph = (-0.0002 * densityAlt1 + 6.3) - (-0.005 * rpm + 13);
                }
                if (densityAlt1 <= 5000 && densityAlt1 > 2500 && rpm <= 2500 && rpm > 2400) {
                    tas = (-0.0004 * densityAlt1 + 109) - (-0.06 * rpm + 150);
                    gph = (-0.00012 * densityAlt1 + 5.4) - (-0.005 * rpm + 12.5);
                }
                if (densityAlt1 <= 5000 && densityAlt1 > 2500 && rpm <= 2400 && rpm > 2300) {
                    tas = (-0.0008 * densityAlt1 + 105) - (-0.08 * rpm + 192);
                    gph = (-0.00012 * densityAlt1 + 4.9) - (-0.005 * rpm + 12);
                }
                if (densityAlt1 <= 5000 && densityAlt1 > 2500 && rpm <= 2300 && rpm > 2200) {
                    tas = (-0.0012 * densityAlt1 + 99) - (-0.09 * rpm + 207);
                    gph = (-0.00012 * densityAlt1 + 4.4) - (-0.004 * rpm + 9.2);
                }
                if (densityAlt1 <= 5000 && densityAlt1 > 2500 && rpm <= 2200 && rpm > 2100) {
                    tas = (-0.002 * densityAlt1 + 94) - (-0.13 * rpm + 286);
                    gph = (-0.00008 * densityAlt1 + 3.8) - (-0.004 * rpm + 8.8);
                }
                if (densityAlt1 <= 5000 && densityAlt1 > 2500 && rpm <= 2100) {
                    tas = (-0.002 * densityAlt1 + 94) - (-0.13 * rpm + 286);
                    gph = (-0.00008 * densityAlt1 + 3.8) - (-0.004 * rpm + 8.8);
                }
                // FROM 5000 TO 7500
                if (densityAlt1 <= 7500 && densityAlt1 > 5000 && rpm <= 2700 && rpm > 2600) {
                    tas = (-0.0004 * densityAlt1 + 120) - (-0.06 * rpm + 162);
                    gph = (-0.0002 * densityAlt1 + 7) - (-0.006 * rpm + 16.2);
                }
                if (densityAlt1 <= 7500 && densityAlt1 > 5000 && rpm <= 2600 && rpm > 2500) {
                    tas = (-0.0008 * densityAlt1 + 117) - (-0.06 * rpm + 156);
                    gph = (-0.00016 * densityAlt1 + 6.1) - (-0.005 * rpm + 13);
                }
                if (densityAlt1 <= 7500 && densityAlt1 > 5000 && rpm <= 2500 && rpm > 2400) {
                    tas = (-0.0008 * densityAlt1 + 111) - (-0.07 * rpm + 175);
                    gph = (-0.00016 * densityAlt1 + 5.6) - (-0.004 * rpm + 10);
                }
                if (densityAlt1 <= 7500 && densityAlt1 > 5000 && rpm <= 2400 && rpm > 2300) {
                    tas = (-0.0012 * densityAlt1 + 107) - (-0.09 * rpm + 216);
                    gph = (-0.00012 * densityAlt1 + 4.9) - (-0.004 * rpm + 9.6);
                }
                if (densityAlt1 <= 7500 && densityAlt1 > 5000 && rpm <= 2300 && rpm > 2200) {
                    tas = (-0.0016 * densityAlt1 + 101) - (-0.12 * rpm + 276);
                    gph = (-0.00008 * densityAlt1 + 4.2) - (-0.004 * rpm + 9.2);
                }
                if (densityAlt1 <= 7500 && densityAlt1 > 5000 && rpm <= 2200) {
                    tas = (-0.0016 * densityAlt1 + 101) - (-0.12 * rpm + 276);
                    gph = (-0.00008 * densityAlt1 + 4.2) - (-0.004 * rpm + 9.2);
                }
                // FROM 7500 TO 10000
                if (densityAlt1 <= 10000 && densityAlt1 > 7500 && rpm <= 2700 && rpm > 2600) {
                    tas = (-0.0004 * densityAlt1 + 120) - (-0.07 * rpm + 189);
                    gph = (-0.00016 * densityAlt1 + 6.7) - (-0.005 * rpm + 13.5);
                }
                if (densityAlt1 <= 10000 && densityAlt1 > 7500 && rpm <= 2600 && rpm > 2500) {
                    tas = (-0.0008 * densityAlt1 + 117) - (-0.07 * rpm + 182);
                    gph = (-0.00012 * densityAlt1 + 5.8) - (-0.005 * rpm + 13);
                }
                if (densityAlt1 <= 10000 && densityAlt1 > 7500 && rpm <= 2500 && rpm > 2400) {
                    tas = (-0.0012 * densityAlt1 + 114) - (-0.09 * rpm + 225);
                    gph = (-0.00012 * densityAlt1 + 5.3) - (-0.004 * rpm + 10);
                }
                if (densityAlt1 <= 10000 && densityAlt1 > 7500 && rpm <= 2400 && rpm > 2300) {
                    tas = (-0.002 * densityAlt1 + 113) - (-0.11 * rpm + 264);
                    gph = (-0.00012 * densityAlt1 + 4.9) - (-0.004 * rpm + 9.6);
                }
                if (densityAlt1 <= 10000 && densityAlt1 > 7500 && rpm <= 2300) {
                    tas = (-0.002 * densityAlt1 + 113) - (-0.11 * rpm + 264);
                    gph = (-0.00012 * densityAlt1 + 4.9) - (-0.004 * rpm + 9.6);
                }
                // FROM 10000 TO 12500
                if (densityAlt1 <= 12500 && densityAlt1 > 10000 && rpm <= 2600 && rpm > 2500) {
                    tas = (-0.0012 * densityAlt1 + 121) - (-0.09 * rpm + 234);
                    gph = (-0.00012 * densityAlt1 + 5.8) - (-0.004 * rpm + 10.4);
                }
                if (densityAlt1 <= 12500 && densityAlt1 > 10000 && rpm <= 2500 && rpm > 2400) {
                    tas = (-0.002 * densityAlt1 + 122) - (-0.09 * rpm + 225);
                    gph = (-0.00008 * densityAlt1 + 4.9) - (-0.004 * rpm + 10);
                }
                if (densityAlt1 <= 12500 && densityAlt1 > 10000 && rpm <= 2400) {
                    tas = (-0.002 * densityAlt1 + 122) - (-0.09 * rpm + 225);
                    gph = (-0.00008 * densityAlt1 + 4.9) - (-0.004 * rpm + 10);
                }
                // ABOVE 12500
                if (densityAlt1 > 12500 && rpm <= 2600 && rpm > 2500) {
                    tas = (-0.0012 * densityAlt1 + 121) - (-0.09 * rpm + 234);
                    gph = (-0.00012 * densityAlt1 + 5.8) - (-0.004 * rpm + 10.4);
                }
                if (densityAlt1 > 12500 && rpm <= 2500 && rpm > 2400) {
                    tas = (-0.002 * densityAlt1 + 122) - (-0.09 * rpm + 225);
                    gph = (-0.00008 * densityAlt1 + 4.9) - (-0.004 * rpm + 10);
                }
                if (densityAlt1 > 12500 && rpm <= 2400) {
                    tas = (-0.002 * densityAlt1 + 122) - (-0.09 * rpm + 225);
                    gph = (-0.00008 * densityAlt1 + 4.9) - (-0.004 * rpm + 10);
                }
                tas = tas / 1.151;
                let wa = 0; //WCA 
                if (wd1 < tc) { wa = tc - wd1; }
                if (wd1 > tc) { wa = wd1 - tc; }
                let wca = wi1 / (tas / Math.sin(Math.toRadians(wa)));
                wca = Math.toDegrees(Math.asin(wca));
                if (wd1 < tc) { wca = wca * 1; }
                if (wd1 < tc && wd1 > tc - 180) { wca = wca * -1; }
                if (wd1 > tc) { wca = wca * 1; }
                if (wd1 < tc && wd1 < tc - 180) { wca = wca * -1; } //WCA
                if (wd1 < 180) { wa = wd1 + 180; } //GS
                if (wd1 >= 180) { wa = wd1 - 180; }
                if (wa < tc) { wa = tc - wa; }
                if (wa > tc) { wa = wa - tc; }
                let gswca = wi1 / (tas / Math.sin(Math.toRadians(wa)));
                gswca = Math.toDegrees(Math.asin(gswca));
                let gs = 180 - gswca - wa;
                gs = Math.sqrt((tas * tas) + (wi1 * wi1) - (2 * tas * wi1
                    * Math.cos(Math.toRadians(gs))));
                if (wd1 == tc + 180) { gs = wi1 + tas; }
                if (wd1 == tc - 180) { gs = wi1 + tas; } //GS
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
            }
            console.log("");
            console.log("DESCEND");
            console.log("FROM " + chPoint1[legs - 1]);
            console.log("TO " + chPoint2[legs - 1]);
            console.log("ALTITUDE " + altitude[legs - 1]);
            console.log("ALTIMETER SETTING " + altimeterSetting[legs - 1]);
            console.log("PRESSURE " + pressure[legs - 1]);
            console.log("TEMPERATURE " + temperature[legs - 1]);
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
            console.log("WIND DIRECTION " + windDirection[legs - 1]);
            console.log("WIND DIRECTION TYPE " + windDirectionType[legs - 1]);
            console.log("WIND INTENSITY " + windIntensity[legs - 1]);
            console.log("TRUE COURSE " + trueCourse[legs - 1]);
            console.log("WCA 1 " + wca1);
            console.log("WCA 2 " + wca2);
            console.log("GROUND SPEED 1 " + gs1);
            console.log("GROUND SPEED 2 " + gs2);
            console.log("GROUND SPEED " + gsDescend);
            console.log("TRUE HEADING 1 " + th1);
            console.log("TRUE HEADING 2 " + th2);
            console.log("ISOGONIC LINE " + isogonicLine[legs - 1]);
            console.log("MAGNETIC DECLINATION " + magneticDeclination[legs - 1]);
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
            console.log("DISTANCE " + distance[legs - 1]);
            console.log("");
            console.log("CRUSIRE");
            console.log("CRUSIRE DISTANCE " + distCrusire);
            console.log("RPM " + rpmEngine[legs - 1]);
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
        
        return depElev;
    


