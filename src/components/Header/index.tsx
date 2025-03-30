
export default function Header() {
    return (
        <header className="h-[50px] border-b border-gray-200 dark:border-gray-700 flex justify-between items-center px-4 bg-white dark:bg-gray-800">
            <h1 className="text-xl font-bold dark:text-white">
                영선 artgram
            </h1>
            <div className="flex items-center gap-4">
                {/* <button>
                    <HeartIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                </button>
                <button>
                    <PaperAirplaneIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                </button> */}
            </div>
        </header>
    );
} 