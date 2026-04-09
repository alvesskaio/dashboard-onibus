import Header from './components/Header';
import StatsGrid from './components/StatsGrid';
import Filters from './components/Filters';
import BusMap from './components/BusMap';
import SpeedChart from './components/SpeedChart';
import TopLinesChart from './components/TopLinesChart';
import DataTable from './components/DataTable';
import { useBusData } from './hooks/useBusData';

export default function App() {
  const { allData, filteredData, status, errorMsg, filters, setFilters, resetFilters, linhas } =
    useBusData();

  return (
    <div className="min-h-screen">
      <Header status={status} count={allData.length} errorMsg={errorMsg} />

      <main className="max-w-[1440px] mx-auto px-4 sm:px-8 py-6 pb-16 relative z-1">
        <StatsGrid data={filteredData} />

        <Filters
          filters={filters}
          setFilters={setFilters}
          resetFilters={resetFilters}
          linhas={linhas}
        />

        {status === 'ok' && (
          <>
            <BusMap data={filteredData} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <SpeedChart data={filteredData} />
              <TopLinesChart data={filteredData} />
            </div>

            <DataTable
              data={filteredData}
              totalCount={allData.length}
              filters={filters}
              setFilters={setFilters}
            />
          </>
        )}

        {status === 'loading' && (
          <div className="text-center py-20 text-slate-500">
            <div className="inline-block w-8 h-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mb-4" />
            <p>Carregando dados dos ônibus…</p>
          </div>
        )}

        {status === 'error' && (
          <div className="text-center py-20 text-rose-400">
            <p className="text-4xl mb-4">⚠️</p>
            <p className="font-semibold">Erro ao carregar dados</p>
            <p className="text-sm text-slate-500 mt-2">{errorMsg}</p>
          </div>
        )}
      </main>
    </div>
  );
}
