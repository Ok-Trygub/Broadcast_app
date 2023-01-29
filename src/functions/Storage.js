const dbName = 'citiesGeoData';


export const getCitiesGeoposition = () => {
    return JSON.parse(localStorage.getItem(dbName));
}


const saveCitiesGeoposition = (geopositionsArr) => {
    localStorage.setItem(
        dbName,
        JSON.stringify(
            geopositionsArr)
    );
}


export const setCitiesGeoposition = (geoData) => {
    const existingItems = getCitiesGeoposition();

    const dataToSave = existingItems ? existingItems : [];
    dataToSave.push(geoData);

    saveCitiesGeoposition(dataToSave);
}


