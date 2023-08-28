// calculate.jsx

export function calculateDistance(latlng1, latlng2) {
    const R = 6371; // Radio de la Tierra en kilómetros
    const lat1 = latlng1.lat * (Math.PI / 180);
    const lon1 = latlng1.lng * (Math.PI / 180);
    const lat2 = latlng2.lat * (Math.PI / 180);
    const lon2 = latlng2.lng * (Math.PI / 180);

    const dLat = lat2 - lat1;
    const dLon = lon2 - lon1;

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1) * Math.cos(lat2) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c;
    return distance;
}

export function calculateBearing(latlng1, latlng2) {
    const lat1 = latlng1.lat * (Math.PI / 180);
    const lon1 = latlng1.lng * (Math.PI / 180);
    const lat2 = latlng2.lat * (Math.PI / 180);
    const lon2 = latlng2.lng * (Math.PI / 180);

    const y = Math.sin(lon2 - lon1) * Math.cos(lat2);
    const x = Math.cos(lat1) * Math.sin(lat2) -
        Math.sin(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1);

    let bearing = Math.atan2(y, x);
    bearing = (bearing * 180) / Math.PI; // Convertir a grados

    return (bearing + 360) % 360; // Asegurarse de que el rumbo esté en el rango de 0 a 360 grados
}


