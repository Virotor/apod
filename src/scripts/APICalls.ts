import dayjs, { Dayjs } from "dayjs";
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import { APOD } from "./interfaces/APOD"

const API_KEY = 'VmXiyyVr7cNHG7gSEY7X3LyZhcga9RXQmMddR88A'

const createURL = (startDate?: Dayjs, endDate?: Dayjs) => {
    if (startDate === endDate && startDate === undefined) {
        return `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`;
    }
    if (startDate !== undefined && endDate === undefined) {
        return `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${convertDate(startDate).format('YYYY-MM-DD')}`;
    }
    if (startDate !== undefined && endDate !== undefined) {
        return `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&start_date=${convertDate(startDate).format('YYYY-MM-DD')}&end_date=${convertDate(endDate).format('YYYY-MM-DD')}`
    }
    return `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`;
}

function convertDate(date: Dayjs): Dayjs {

    if (date.date() === dayjs().date()
        && date.month() === dayjs().month()
        && date.year() === dayjs().year()) {
        dayjs.extend(utc)
        dayjs.extend(timezone)
        const res = dayjs(date).tz('Europe/London')
        return res
    }
    else {
        return date;
    }
}


export async function getAPODPeriod(startDate?: Dayjs, endDate?: Dayjs): Promise<APOD[]> {

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

export async function getAPODOneDay(date?: Dayjs): Promise<APOD> {
    console.log(date)
    dayjs.extend(utc)
    dayjs.extend(timezone)
    console.log(dayjs.unix(date?.millisecond() as number));
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