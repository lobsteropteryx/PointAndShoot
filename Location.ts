import * as ExpoLocation from 'expo-location';

type Location = {
    x: number,
    y: number,
    heading: number
}

type Heading = {
    accuracy: number,
    magneticHeading: number,
    trueHeading: number
}

async function IsAuthorized(): Promise<boolean> {
    let { status } = await ExpoLocation.requestForegroundPermissionsAsync();
    return status === 'granted';
}

async function GetLocation(): Promise<Location> {
    const location = await ExpoLocation.getCurrentPositionAsync();
    return {
        x: location.coords.longitude,
        y: location.coords.latitude,
        heading: 0
    }
} 

async function GetHeading(): Promise<Heading> {
    const heading = await ExpoLocation.getHeadingAsync();
    return {
        accuracy: heading.accuracy,
        magneticHeading: heading.magHeading,
        trueHeading: heading.trueHeading
    }
} 

export {Location, Heading, IsAuthorized, GetLocation, GetHeading}