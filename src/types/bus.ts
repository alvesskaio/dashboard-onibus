export interface BusRaw {
    ordem: string;
    latitude: string;
    longitude: string;
    datahora: string;
    velocidade: string;
    linha: string;
    datahoraenvio: string;
    datahoraservidor: string;
}

export interface BusData {
    ordem: string;
    linha: string;
    latitude: number;
    longitude: number;
    velocidade: number;
    datahora: Date;
    datahoraenvio: Date;
    datahoraservidor: Date;
    datahoraStr: string;
    dataStr: string;
    horaStr: string;
}

export type SpeedCategory = 'stopped' | 'slow' | 'normal' | 'fast' | 'very-fast';
