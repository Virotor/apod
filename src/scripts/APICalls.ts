import { APOD } from "./interfaces/APOD"

const API_KEY = 'VmXiyyVr7cNHG7gSEY7X3LyZhcga9RXQmMddR88A'

const createURL = (startDate?: Date, endDate?: Date) => {
    if (startDate === endDate && startDate === undefined) {
        return `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`;
    }
    if (startDate !== undefined && endDate === undefined) {
        return `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${[
            startDate.getFullYear(),
            startDate.getMonth() + 1,
            startDate.getDate()
        ].join('-')
            }`;
    }
    if (startDate !== undefined && endDate !== undefined) {
        return `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&start_date=${[
            startDate.getFullYear(),
            startDate.getMonth() + 1,
            startDate.getDate()
        ].join('-')
            }&end_date=${[
                endDate.getFullYear(),
                endDate.getMonth() + 1,
                endDate.getDate()
            ].join('-')
            }`
    }
    return `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`;
}


export async function getAPODPeriod(startDate?: Date, endDate?: Date) : Promise<APOD[]>{
    const url = createURL(startDate, endDate);
    const response = await fetch(url)
    if (response.ok) {
        const data = await response.json()
        console.log(data as APOD)
        return data as APOD[];
    }
    else {
        return Promise.reject(new Error(`Bad request with start date ${startDate} and end date ${endDate}`))
    }

}

export async function getAPODOneDay(date? : Date) : Promise<APOD>{
    const url = createURL(date);
    const response = await fetch(url)
    if (response.ok) {
        const data = await response.json()
        console.log(data as APOD)
        return data as APOD;
    }
    else {
        return Promise.reject(new Error(`Bad request`))
    }

}