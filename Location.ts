import * as ExpoLocation from 'expo-location';

type Location = {
    x: number,
    y: number,
    heading: number | null
}

async function IsAuthorized(): Promise<boolean> {
    let { status } = await ExpoLocation.requestForegroundPermissionsAsync();
    return status === 'granted';
}

async function GetLocation(): Promise<Location> {
    const location = await ExpoLocation.getCurrentPositionAsync({});
    return {
        x: location.coords.longitude,
        y: location.coords.latitude,
        heading: location.coords.heading
    }
} 

export {Location, IsAuthorized, GetLocation}