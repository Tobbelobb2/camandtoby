import internal from "stream";
import { Timestamp } from "firebase/firestore/lite";

export enum person{
    toby,
    cam
}


export interface WatchedMovie{
    title: string;
    recommendedBy: person
    tobysRating: number,
    camsRating: number,
    dateWatched: Timestamp
}