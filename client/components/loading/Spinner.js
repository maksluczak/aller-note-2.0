export default function Spinner() {
    return (
        <div className="flex flex-col items-center justify-center gap-4 p-6 text-center">
            <div className="relative">
                <svg
                    className="animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    width="64"
                    height="64"
                    viewBox="0 0 64 64"
                    fill="none"
                >
                    <circle
                        cx="32"
                        cy="32"
                        r="28"
                        stroke="currentColor"
                        strokeWidth="6"
                        className="text-gray-200"
                    />
                    <path
                        d="M32 4C16.536 4 4 16.536 4 32"
                        stroke="currentColor"
                        strokeWidth="6"
                        strokeLinecap="round"
                        className="text-eden-600"
                    />
                </svg>
            </div>

            <div className="max-w-[280px] space-y-2">
                <span className="text-eden-800 text-xl font-semibold block tracking-tight">
                    Ładowanie...
                </span>
                <p className="text-sm text-gray-500 leading-relaxed">
                    To może potrwać chwilę. Proszę uzbroić się w cierpliwość.
                </p>
            </div>
        </div>
    );
}