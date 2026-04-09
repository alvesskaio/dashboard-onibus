interface HeaderProps {
    status: 'loading' | 'ok' | 'error';
    count: number;
    errorMsg: string;
}

export default function Header({ status, count, errorMsg }: HeaderProps) {
    const dotClass =
        status === 'loading'
            ? 'bg-amber-400 animate-pulse-dot-fast'
            : status === 'error'
                ? 'bg-rose-500'
                : 'bg-emerald-400 animate-pulse-dot';

    const text =
        status === 'loading'
            ? 'Carregando dados…'
            : status === 'error'
                ? `Erro: ${errorMsg}`
                : `${count} ônibus carregados`;

    return (
        <header className="sticky top-0 z-50 bg-[#0a0e1a]/85 backdrop-blur-xl border-b border-white/6 px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3.5">
                <div className="w-[42px] h-[42px] bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-xl shadow-[0_4px_15px_rgba(59,130,246,0.3)]">
                    🚌
                </div>
                <h1 className="text-xl font-bold bg-gradient-to-br from-slate-100 to-slate-400 bg-clip-text text-transparent tracking-tight">
                    Dashboard Ônibus RJ
                </h1>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-400">
                <span className={`w-2 h-2 rounded-full ${dotClass}`} />
                <span>{text}</span>
            </div>
        </header>
    );
}
