// src/services/geolocation.ts
interface GeolocationData {
    country: string;
    city: string;
    region: string;
    latitude: number;
    longitude: number;
  }
  
  export async function getGeolocation(ip: string): Promise<GeolocationData | null> {
    try {
      // Using ipapi.co for geolocation (free tier available)
      const response = await fetch(`https://ipapi.co/${ip}/json/`);
      const data = await response.json();
  
      if (data.error) {
        throw new Error(data.error);
      }
  
      return {
        country: data.country_name,
        city: data.city,
        region: data.region,
        latitude: data.latitude,
        longitude: data.longitude,
      };
    } catch (error) {
      console.error('Error fetching geolocation:', error);
      return null;
    }
  }