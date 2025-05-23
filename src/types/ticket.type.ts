export type TApiResponse = {
    success: boolean;
    message: string;
    data: TData[];
};

export type TData = {
    trainName: string;
    departureDateTime: string;
    arrivalDateTime: string;
    travelTime: string;
    originCity: string;
    destinationCity: string;
    seats: TSeat[];
};

export type TSeat = {
    class: string;
    fare: string;
    seatCount: number;
};
