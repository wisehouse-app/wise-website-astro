
export interface Location {
    city: string;
    neighbourhood: string;
}
export interface Construction {
    name: string;
    layers: Layer[];
}
export interface Layer {
    thickness_m: number;
    material: string;
}
export type PropertySummary = {
    location?: Location;
    total_area_m2: number;
    rooms: Room[];
    constructions: Construction[];
    in_the_neighbourhood?: string[];
    nstoreys?: number;
    notes: string[];
    locale?: string;
    images?: string[];
};
export type RoomPurpose =
    | "Bathroom"
    | "Bedroom"
    | "Dining Room"
    | "Kitchen"
    | "Living Room"
    | "Office"
    | "Storage"
    | "Garage"
    | "Hallway"
    | "Laundry"
    | "Other";

export interface Room {
    name: string;
    area_m2: number;
    storey?: number;
    purposes?: RoomPurpose[];
}

export type Index = {
    listing_text?: string;
    price?: number;
    n_bedrooms?: number;
    n_bathrooms?: number;
    area_sqm?: number;
    land_area_sqm?:number;
    locations: string[];
    buy_rent: "buy" | "rent";
    property_type?: string;
    id: string;
    avatar?: string;
    associated_model?: string;
    description?: string;
    title?: string;
    canonical?: string;
    
};

export type PropertyData = {
    title?: string;
    index: Index;
    summary?: PropertySummary;
};
