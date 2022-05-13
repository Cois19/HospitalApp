import { Photo } from "./photo";

export interface Equipment {
    id: number;
    username: string;
    photoUrl: string;
    age: number;
    knownAs: string;
    created: Date;
    lastActive: Date;
    department: string;
    description: string;
    howToUse: string;
    category: string;
    hospital: string;
    photos: Photo[];
}