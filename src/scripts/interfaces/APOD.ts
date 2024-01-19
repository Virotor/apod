export interface APOD {
    resource: {
        image_set: "apod"
    },
    concept_tags: boolean,
    service_version : string,
    date: Date,
    title: string,
    hdurl: string,
    explanation: string,
    concepts: string[],
    media_type : string
}