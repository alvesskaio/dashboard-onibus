import { useState, useEffect, useMemo, useCallback } from 'react';
import type { BusData, BusRaw } from '../types/bus';
import { processRawData } from '../utils/helpers';

const DATA_URL =
    'https://raw.githubusercontent.com/alvaroriz/datascience_datasets/refs/heads/main/json_onibus_20260302_10000.json';

export interface Filters {
    linha: string;
    velMin: string;
    velMax: string;
    search: string;
}

export interface UseBusDataReturn {
    allData: BusData[];
    filteredData: BusData[];
    status: 'loading' | 'ok' | 'error';
    errorMsg: string;
    filters: Filters;
    setFilters: React.Dispatch<React.SetStateAction<Filters>>;
    resetFilters: () => void;
    linhas: string[];
}

const INITIAL_FILTERS: Filters = { linha: '', velMin: '', velMax: '', search: '' };

export function useBusData(): UseBusDataReturn {
    const [allData, setAllData] = useState<BusData[]>([]);
    const [status, setStatus] = useState<'loading' | 'ok' | 'error'>('loading');
    const [errorMsg, setErrorMsg] = useState('');
    const [filters, setFilters] = useState<Filters>(INITIAL_FILTERS);

    useEffect(() => {
        let cancelled = false;
        (async () => {
            try {
                const res = await fetch(DATA_URL);
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const raw: BusRaw[] = await res.json();
                if (!cancelled) {
                    setAllData(processRawData(raw));
                    setStatus('ok');
                }
            } catch (err) {
                if (!cancelled) {
                    setErrorMsg(err instanceof Error ? err.message : 'Erro desconhecido');
                    setStatus('error');
                }
            }
        })();
        return () => { cancelled = true; };
    }, []);

    const linhas = useMemo(() => {
        return [...new Set(allData.map((d) => d.linha))].sort((a, b) => {
            const na = parseInt(a), nb = parseInt(b);
            if (!isNaN(na) && !isNaN(nb)) return na - nb;
            return a.localeCompare(b);
        });
    }, [allData]);

    const filteredData = useMemo(() => {
        return allData.filter((d) => {
            if (filters.linha && d.linha !== filters.linha) return false;
            if (filters.velMin !== '' && d.velocidade < parseInt(filters.velMin)) return false;
            if (filters.velMax !== '' && d.velocidade > parseInt(filters.velMax)) return false;
            if (filters.search) {
                const hay = `${d.ordem} ${d.linha}`.toLowerCase();
                if (!hay.includes(filters.search.toLowerCase())) return false;
            }
            return true;
        });
    }, [allData, filters]);

    const resetFilters = useCallback(() => setFilters(INITIAL_FILTERS), []);

    return { allData, filteredData, status, errorMsg, filters, setFilters, resetFilters, linhas };
}
