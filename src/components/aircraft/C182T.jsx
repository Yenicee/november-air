
const CalculateC182T = {
    takeOffDistance: function (depPress, depElev, depTemp, depWeight) {
        let depPressAlt = ((((Math.pow(depPress / 1013.25, 1 / 5.2559)) - 1) / -0.0000225577) / 0.3048) + depElev;
        let toffDist = 0;

        if (depWeight>2700 && depWeight<=3100){
            if (depPressAlt<=0){
                if (depTemp<=0){
                    toffDist=715;
                }
                if (depTemp>0 && depTemp<=10){
                    toffDist=765;
                }
                if (depTemp>10 && depTemp<=20){
                    toffDist=825;
                }
                if (depTemp>20 && depTemp<=30){
                    toffDist=885;
                }
                if (depTemp>30){
                    toffDist=945;
                }
            }
            if (depPressAlt>0 && depPressAlt<=1000){
                if (depTemp<=0){
                    toffDist=775;
                }
                if (depTemp>0 && depTemp<=10){
                    toffDist=835;
                }
                if (depTemp>10 && depTemp<=20){
                    toffDist=900;
                }
                if (depTemp>20 && depTemp<=30){
                    toffDist=965;
                }
                if (depTemp>30){
                    toffDist=1030;
                }
            }
            if (depPressAlt>1000 && depPressAlt<=2000){
                if (depTemp<=0){
                    toffDist=850;
                }
                if (depTemp>0 && depTemp<=10){
                    toffDist=915;
                }
                if (depTemp>10 && depTemp<=20){
                    toffDist=980;
                }
                if (depTemp>20 && depTemp<=30){
                    toffDist=1055;
                }
                if (depTemp>30){
                    toffDist=1130;
                }
            }
            if (depPressAlt>2000 && depPressAlt<=3000){
                if (depTemp<=0){
                    toffDist=925;
                }
                if (depTemp>0 && depTemp<=10){
                    toffDist=995;
                }
                if (depTemp>10 && depTemp<=20){
                    toffDist=1070;
                }
                if (depTemp>20 && depTemp<=30){
                    toffDist=1150;
                }
                if (depTemp>30){
                    toffDist=1235;
                }
            }
            if (depPressAlt>3000 && depPressAlt<=4000){
                if (depTemp<=0){
                    toffDist=1015;
                }
                if (depTemp>0 && depTemp<=10){
                    toffDist=1090;
                }
                if (depTemp>10 && depTemp<=20){
                    toffDist=1175;
                }
                if (depTemp>20 && depTemp<=30){
                    toffDist=1260;
                }
                if (depTemp>30){
                    toffDist=1355;
                }
            }
            if (depPressAlt>4000 && depPressAlt<=5000){
                if (depTemp<=0){
                    toffDist=1110;
                }
                if (depTemp>0 && depTemp<=10){
                    toffDist=1195;
                }
                if (depTemp>10 && depTemp<=20){
                    toffDist=1290;
                }
                if (depTemp>20 && depTemp<=30){
                    toffDist=1385;
                }
                if (depTemp>30){
                    toffDist=1485;
                }
            }
            if (depPressAlt>5000 && depPressAlt<=6000){
                if (depTemp<=0){
                    toffDist=1220;
                }
                if (depTemp>0 && depTemp<=10){
                    toffDist=1315;
                }
                if (depTemp>10 && depTemp<=20){
                    toffDist=1415;
                }
                if (depTemp>20 && depTemp<=30){
                    toffDist=1520;
                }
                if (depTemp>30){
                    toffDist=1635;
                }
            }
            if (depPressAlt>6000 && depPressAlt<=7000){
                if (depTemp<=0){
                    toffDist=1340;
                }
                if (depTemp>0 && depTemp<=10){
                    toffDist=1445;
                }
                if (depTemp>10 && depTemp<=20){
                    toffDist=1560;
                }
                if (depTemp>20){
                    toffDist=1675;
                }
            }
            if (depPressAlt>7000){
                if (depTemp<=0){
                    toffDist=1480;
                }
                if (depTemp>0 && depTemp<=10){
                    toffDist=1595;
                }
                if (depTemp>10){
                    toffDist=1720;
                }
            }
        }
        
        if (depWeight>2300 && depWeight<=2700){
            if (depPressAlt<=0){
                if (depTemp<=0){
                    toffDist=520;
                }
                if (depTemp>0 && depTemp<=10){
                    toffDist=560;
                }
                if (depTemp>10 && depTemp<=20){
                    toffDist=600;
                }
                if (depTemp>20 && depTemp<=30){
                    toffDist=645;
                }
                if (depTemp>30){
                    toffDist=690;
                }
            }
            if (depPressAlt>0 && depPressAlt<=1000){
                if (depTemp<=0){
                    toffDist=565;
                }
                if (depTemp>0 && depTemp<=10){
                    toffDist=610;
                }
                if (depTemp>10 && depTemp<=20){
                    toffDist=655;
                }
                if (depTemp>20 && depTemp<=30){
                    toffDist=700;
                }
                if (depTemp>30){
                    toffDist=750;
                }
            }
            if (depPressAlt>1000 && depPressAlt<=2000){
                if (depTemp<=0){
                    toffDist=615;
                }
                if (depTemp>0 && depTemp<=10){
                    toffDist=665;
                }
                if (depTemp>10 && depTemp<=20){
                    toffDist=710;
                }
                if (depTemp>20 && depTemp<=30){
                    toffDist=765;
                }
                if (depTemp>30){
                    toffDist=820;
                }
            }
            if (depPressAlt>2000 && depPressAlt<=3000){
                if (depTemp<=0){
                    toffDist=675;
                }
                if (depTemp>0 && depTemp<=10){
                    toffDist=725;
                }
                if (depTemp>10 && depTemp<=20){
                    toffDist=775;
                }
                if (depTemp>20 && depTemp<=30){
                    toffDist=835;
                }
                if (depTemp>30){
                    toffDist=895;
                }
            }
            if (depPressAlt>3000 && depPressAlt<=4000){
                if (depTemp<=0){
                    toffDist=735;
                }
                if (depTemp>0 && depTemp<=10){
                    toffDist=790;
                }
                if (depTemp>10 && depTemp<=20){
                    toffDist=850;
                }
                if (depTemp>20 && depTemp<=30){
                    toffDist=910;
                }
                if (depTemp>30){
                    toffDist=975;
                }
            }
            if (depPressAlt>4000 && depPressAlt<=5000){
                if (depTemp<=0){
                    toffDist=805;
                }
                if (depTemp>0 && depTemp<=10){
                    toffDist=865;
                }
                if (depTemp>10 && depTemp<=20){
                    toffDist=930;
                }
                if (depTemp>20 && depTemp<=30){
                    toffDist=1000;
                }
                if (depTemp>30){
                    toffDist=1070;
                }
            }
            if (depPressAlt>5000 && depPressAlt<=6000){
                if (depTemp<=0){
                    toffDist=880;
                }
                if (depTemp>0 && depTemp<=10){
                    toffDist=950;
                }
                if (depTemp>10 && depTemp<=20){
                    toffDist=1020;
                }
                if (depTemp>20 && depTemp<=30){
                    toffDist=1095;
                }
                if (depTemp>30){
                    toffDist=1175;
                }
            }
            if (depPressAlt>6000 && depPressAlt<=7000){
                if (depTemp<=0){
                    toffDist=965;
                }
                if (depTemp>0 && depTemp<=10){
                    toffDist=1040;
                }
                if (depTemp>10 && depTemp<=20){
                    toffDist=1120;
                }
                if (depTemp>20 && depTemp<=30){
                    toffDist=1200;
                }
                if (depTemp>30){
                    toffDist=1290;
                }
            }
            if (depPressAlt>7000){
                if (depTemp<=0){
                    toffDist=1060;
                }
                if (depTemp>0 && depTemp<=10){
                    toffDist=1145;
                }
                if (depTemp>10 && depTemp<=20){
                    toffDist=1230;
                }
                if (depTemp>20 && depTemp<=30){
                    toffDist=1320;
                }
                if (depTemp>30){
                    toffDist=1420;
                }
            }
        }
        if (depWeight<=2300){
            if (depPressAlt<=0){
                if (depTemp<=0){
                    toffDist=365;
                }
                if (depTemp>0 && depTemp<=10){
                    toffDist=390;
                }
                if (depTemp>10 && depTemp<=20){
                    toffDist=420;
                }
                if (depTemp>20 && depTemp<=30){
                    toffDist=450;
                }
                if (depTemp>30){
                    toffDist=480;
                }
            }
            if (depPressAlt>0 && depPressAlt<=1000){
                if (depTemp<=0){
                    toffDist=395;
                }
                if (depTemp>0 && depTemp<=10){
                    toffDist=425;
                }
                if (depTemp>10 && depTemp<=20){
                    toffDist=455;
                }
                if (depTemp>20 && depTemp<=30){
                    toffDist=490;
                }
                if (depTemp>30){
                    toffDist=520;
                }
            }
            if (depPressAlt>1000 && depPressAlt<=2000){
                if (depTemp<=0){
                    toffDist=430;
                }
                if (depTemp>0 && depTemp<=10){
                    toffDist=460;
                }
                if (depTemp>10 && depTemp<=20){
                    toffDist=495;
                }
                if (depTemp>20 && depTemp<=30){
                    toffDist=530;
                }
                if (depTemp>30){
                    toffDist=565;
                }
            }
            if (depPressAlt>2000 && depPressAlt<=3000){
                if (depTemp<=0){
                    toffDist=470;
                }
                if (depTemp>0 && depTemp<=10){
                    toffDist=505;
                }
                if (depTemp>10 && depTemp<=20){
                    toffDist=540;
                }
                if (depTemp>20 && depTemp<=30){
                    toffDist=580;
                }
                if (depTemp>30){
                    toffDist=620;
                }
            }
            if (depPressAlt>3000 && depPressAlt<=4000){
                if (depTemp<=0){
                    toffDist=510;
                }
                if (depTemp>0 && depTemp<=10){
                    toffDist=550;
                }
                if (depTemp>10 && depTemp<=20){
                    toffDist=590;
                }
                if (depTemp>20 && depTemp<=30){
                    toffDist=630;
                }
                if (depTemp>30){
                    toffDist=675;
                }
            }
            if (depPressAlt>4000 && depPressAlt<=5000){
                if (depTemp<=0){
                    toffDist=555;
                }
                if (depTemp>0 && depTemp<=10){
                    toffDist=600;
                }
                if (depTemp>10 && depTemp<=20){
                    toffDist=640;
                }
                if (depTemp>20 && depTemp<=30){
                    toffDist=690;
                }
                if (depTemp>30){
                    toffDist=735;
                }
            }
            if (depPressAlt>5000 && depPressAlt<=6000){
                if (depTemp<=0){
                    toffDist=610;
                }
                if (depTemp>0 && depTemp<=10){
                    toffDist=655;
                }
                if (depTemp>10 && depTemp<=20){
                    toffDist=700;
                }
                if (depTemp>20 && depTemp<=30){
                    toffDist=755;
                }
                if (depTemp>30){
                    toffDist=805;
                }
            }
            if (depPressAlt>6000 && depPressAlt<=7000){
                if (depTemp<=0){
                    toffDist=665;
                }
                if (depTemp>0 && depTemp<=10){
                    toffDist=715;
                }
                if (depTemp>10 && depTemp<=20){
                    toffDist=770;
                }
                if (depTemp>20 && depTemp<=30){
                    toffDist=825;
                }
                if (depTemp>30){
                    toffDist=885;
                }
            }
            if (depPressAlt>7000){
                if (depTemp<=0){
                    toffDist=730;
                }
                if (depTemp>0 && depTemp<=10){
                    toffDist=785;
                }
                if (depTemp>10 && depTemp<=20){
                    toffDist=845;
                }
                if (depTemp>20 && depTemp<=30){
                    toffDist=905;
                }
                if (depTemp>30){
                    toffDist=970;
                }
            }
        }
        return toffDist;
    },

   //segunda const
    takeOffDistanceToClear50FeetObstacles: function (depPress, depElev, depTemp, depWeight) {
        let depPressAlt = ((((Math.pow(depPress / 1013.25, 1 / 5.2559)) - 1) / -0.0000225577) / 0.3048) + depElev;
        let toffDist = 0;

        if (depWeight>2700 && depWeight<=3100){
            if (depPressAlt<=0){
                if (depTemp<=0){
                    toffDist=1365;
                }
                if (depTemp>0 && depTemp<=10){
                    toffDist=1460;
                }
                if (depTemp>10 && depTemp<=20){
                    toffDist=1570;
                }
                if (depTemp>20 && depTemp<=30){
                    toffDist=1680;
                }
                if (depTemp>30){
                    toffDist=1800;
                }
            }
            if (depPressAlt>0 && depPressAlt<=1000){
                if (depTemp<=0){
                    toffDist=1490;
                }
                if (depTemp>0 && depTemp<=10){
                    toffDist=1600;
                }
                if (depTemp>10 && depTemp<=20){
                    toffDist=1720;
                }
                if (depTemp>20 && depTemp<=30){
                    toffDist=1845;
                }
                if (depTemp>30){
                    toffDist=1980;
                }
            }
            if (depPressAlt>1000 && depPressAlt<=2000){
                if (depTemp<=0){
                    toffDist=1635;
                }
                if (depTemp>0 && depTemp<=10){
                    toffDist=1760;
                }
                if (depTemp>10 && depTemp<=20){
                    toffDist=1890;
                }
                if (depTemp>20 && depTemp<=30){
                    toffDist=2035;
                }
                if (depTemp>30){
                    toffDist=2190;
                }
            }
            if (depPressAlt>2000 && depPressAlt<=3000){
                if (depTemp<=0){
                    toffDist=1800;
                }
                if (depTemp>0 && depTemp<=10){
                    toffDist=1940;
                }
                if (depTemp>10 && depTemp<=20){
                    toffDist=2090;
                }
                if (depTemp>20 && depTemp<=30){
                    toffDist=2255;
                }
                if (depTemp>30){
                    toffDist=2435;
                }
            }
            if (depPressAlt>3000 && depPressAlt<=4000){
                if (depTemp<=0){
                    toffDist=1990;
                }
                if (depTemp>0 && depTemp<=10){
                    toffDist=2150;
                }
                if (depTemp>10 && depTemp<=20){
                    toffDist=2325;
                }
                if (depTemp>20 && depTemp<=30){
                    toffDist=2515;
                }
                if (depTemp>30){
                    toffDist=2720;
                }
            }
            if (depPressAlt>4000 && depPressAlt<=5000){
                if (depTemp<=0){
                    toffDist=2210;
                }
                if (depTemp>0 && depTemp<=10){
                    toffDist=2395;
                }
                if (depTemp>10 && depTemp<=20){
                    toffDist=2595;
                }
                if (depTemp>20 && depTemp<=30){
                    toffDist=2820;
                }
                if (depTemp>30){
                    toffDist=3070;
                }
            }
            if (depPressAlt>5000 && depPressAlt<=6000){
                if (depTemp<=0){
                    toffDist=2470;
                }
                if (depTemp>0 && depTemp<=10){
                    toffDist=2690;
                }
                if (depTemp>10 && depTemp<=20){
                    toffDist=2930;
                }
                if (depTemp>20 && depTemp<=30){
                    toffDist=3200;
                }
                if (depTemp>30){
                    toffDist=3510;
                }
            }
            if (depPressAlt>6000 && depPressAlt<=7000){
                if (depTemp<=0){
                    toffDist=2785;
                }
                if (depTemp>0 && depTemp<=10){
                    toffDist=3045;
                }
                if (depTemp>10 && depTemp<=20){
                    toffDist=3345;
                }
                if (depTemp>20){
                    toffDist=3685;
                }
            }
            if (depPressAlt>7000){
                if (depTemp<=0){
                    toffDist=3175;
                }
                if (depTemp>0 && depTemp<=10){
                    toffDist=3500;
                }
                if (depTemp>10){
                    toffDist=3880;
                }
            }
        }
        
        if (depWeight>2300 && depWeight<=2700){
            if (depPressAlt<=0){
                if (depTemp<=0){
                    toffDist=995;
                }
                if (depTemp>0 && depTemp<=10){
                    toffDist=1065;
                }
                if (depTemp>10 && depTemp<=20){
                    toffDist=1135;
                }
                if (depTemp>20 && depTemp<=30){
                    toffDist=1215;
                }
                if (depTemp>30){
                    toffDist=1295;
                }
            }
            if (depPressAlt>0 && depPressAlt<=1000){
                if (depTemp<=0){
                    toffDist=1080;
                }
                if (depTemp>0 && depTemp<=10){
                    toffDist=1155;
                }
                if (depTemp>10 && depTemp<=20){
                    toffDist=1235;
                }
                if (depTemp>20 && depTemp<=30){
                    toffDist=1320;
                }
                if (depTemp>30){
                    toffDist=1410;
                }
            }
            if (depPressAlt>1000 && depPressAlt<=2000){
                if (depTemp<=0){
                    toffDist=1180;
                }
                if (depTemp>0 && depTemp<=10){
                    toffDist=1260;
                }
                if (depTemp>10 && depTemp<=20){
                    toffDist=1350;
                }
                if (depTemp>20 && depTemp<=30){
                    toffDist=1445;
                }
                if (depTemp>30){
                    toffDist=1545;
                }
            }
            if (depPressAlt>2000 && depPressAlt<=3000){
                if (depTemp<=0){
                    toffDist=1285;
                }
                if (depTemp>0 && depTemp<=10){
                    toffDist=1380;
                }
                if (depTemp>10 && depTemp<=20){
                    toffDist=1480;
                }
                if (depTemp>20 && depTemp<=30){
                    toffDist=1585;
                }
                if (depTemp>30){
                    toffDist=1695;
                }
            }
            if (depPressAlt>3000 && depPressAlt<=4000){
                if (depTemp<=0){
                    toffDist=1410;
                }
                if (depTemp>0 && depTemp<=10){
                    toffDist=1510;
                }
                if (depTemp>10 && depTemp<=20){
                    toffDist=1625;
                }
                if (depTemp>20 && depTemp<=30){
                    toffDist=1740;
                }
                if (depTemp>30){
                    toffDist=1870;
                }
            }
            if (depPressAlt>4000 && depPressAlt<=5000){
                if (depTemp<=0){
                    toffDist=1550;
                }
                if (depTemp>0 && depTemp<=10){
                    toffDist=1665;
                }
                if (depTemp>10 && depTemp<=20){
                    toffDist=1790;
                }
                if (depTemp>20 && depTemp<=30){
                    toffDist=1920;
                }
                if (depTemp>30){
                    toffDist=2065;
                }
            }
            if (depPressAlt>5000 && depPressAlt<=6000){
                if (depTemp<=0){
                    toffDist=1705;
                }
                if (depTemp>0 && depTemp<=10){
                    toffDist=1840;
                }
                if (depTemp>10 && depTemp<=20){
                    toffDist=1980;
                }
                if (depTemp>20 && depTemp<=30){
                    toffDist=2135;
                }
                if (depTemp>30){
                    toffDist=2300;
                }
            }
            if (depPressAlt>6000 && depPressAlt<=7000){
                if (depTemp<=0){
                    toffDist=1890;
                }
                if (depTemp>0 && depTemp<=10){
                    toffDist=2040;
                }
                if (depTemp>10 && depTemp<=20){
                    toffDist=2205;
                }
                if (depTemp>20 && depTemp<=30){
                    toffDist=2380;
                }
                if (depTemp>30){
                    toffDist=2575;
                }
            }
            if (depPressAlt>7000){
                if (depTemp<=0){
                    toffDist=2100;
                }
                if (depTemp>0 && depTemp<=10){
                    toffDist=2275;
                }
                if (depTemp>10 && depTemp<=20){
                    toffDist=2465;
                }
                if (depTemp>20 && depTemp<=30){
                    toffDist=2675;
                }
                if (depTemp>30){
                    toffDist=2910;
                }
            }
        }
        if (depWeight<=2300){
            if (depPressAlt<=0){
                if (depTemp<=0){
                    toffDist=705;
                }
                if (depTemp>0 && depTemp<=10){
                    toffDist=750;
                }
                if (depTemp>10 && depTemp<=20){
                    toffDist=800;
                }
                if (depTemp>20 && depTemp<=30){
                    toffDist=850;
                }
                if (depTemp>30){
                    toffDist=905;
                }
            }
            if (depPressAlt>0 && depPressAlt<=1000){
                if (depTemp<=0){
                    toffDist=765;
                }
                if (depTemp>0 && depTemp<=10){
                    toffDist=815;
                }
                if (depTemp>10 && depTemp<=20){
                    toffDist=870;
                }
                if (depTemp>20 && depTemp<=30){
                    toffDist=925;
                }
                if (depTemp>30){
                    toffDist=985;
                }
            }
            if (depPressAlt>1000 && depPressAlt<=2000){
                if (depTemp<=0){
                    toffDist=830;
                }
                if (depTemp>0 && depTemp<=10){
                    toffDist=885;
                }
                if (depTemp>10 && depTemp<=20){
                    toffDist=940;
                }
                if (depTemp>20 && depTemp<=30){
                    toffDist=1005;
                }
                if (depTemp>30){
                    toffDist=1070;
                }
            }
            if (depPressAlt>2000 && depPressAlt<=3000){
                if (depTemp<=0){
                    toffDist=900;
                }
                if (depTemp>0 && depTemp<=10){
                    toffDist=960;
                }
                if (depTemp>10 && depTemp<=20){
                    toffDist=1025;
                }
                if (depTemp>20 && depTemp<=30){
                    toffDist=1090;
                }
                if (depTemp>30){
                    toffDist=1165;
                }
            }
            if (depPressAlt>3000 && depPressAlt<=4000){
                if (depTemp<=0){
                    toffDist=980;
                }
                if (depTemp>0 && depTemp<=10){
                    toffDist=1045;
                }
                if (depTemp>10 && depTemp<=20){
                    toffDist=1115;
                }
                if (depTemp>20 && depTemp<=30){
                    toffDist=1190;
                }
                if (depTemp>30){
                    toffDist=1270;
                }
            }
            if (depPressAlt>4000 && depPressAlt<=5000){
                if (depTemp<=0){
                    toffDist=1065;
                }
                if (depTemp>0 && depTemp<=10){
                    toffDist=1140;
                }
                if (depTemp>10 && depTemp<=20){
                    toffDist=1220;
                }
                if (depTemp>20 && depTemp<=30){
                    toffDist=1305;
                }
                if (depTemp>30){
                    toffDist=1390;
                }
            }
            if (depPressAlt>5000 && depPressAlt<=6000){
                if (depTemp<=0){
                    toffDist=1165;
                }
                if (depTemp>0 && depTemp<=10){
                    toffDist=1250;
                }
                if (depTemp>10 && depTemp<=20){
                    toffDist=1335;
                }
                if (depTemp>20 && depTemp<=30){
                    toffDist=1430;
                }
                if (depTemp>30){
                    toffDist=1530;
                }
            }
            if (depPressAlt>6000 && depPressAlt<=7000){
                if (depTemp<=0){
                    toffDist=1275;
                }
                if (depTemp>0 && depTemp<=10){
                    toffDist=1370;
                }
                if (depTemp>10 && depTemp<=20){
                    toffDist=1470;
                }
                if (depTemp>20 && depTemp<=30){
                    toffDist=1570;
                }
                if (depTemp>30){
                    toffDist=1685;
                }
            }
            if (depPressAlt>7000){
                if (depTemp<=0){
                    toffDist=1405;
                }
                if (depTemp>0 && depTemp<=10){
                    toffDist=1510;
                }
                if (depTemp>10 && depTemp<=20){
                    toffDist=1620;
                }
                if (depTemp>20 && depTemp<=30){
                    toffDist=1735;
                }
                if (depTemp>30){
                    toffDist=1865;
                }
            }
        }
        return toffDist;
    },
};

export default CalculateC182T;