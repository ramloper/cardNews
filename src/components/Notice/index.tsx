export default function Notice() {
    return (
        <aside className="w-[350px] p-10">
            <div className="fixed w-[500px]">
                <h2 className="text-lg font-bold mb-4 dark:text-white">공지사항</h2>
                <div className="space-y-4">
                    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                        <h3 className="font-semibold mb-2 dark:text-white">2024 전시회 일정</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                            3월 15일 - 봄 기획전<br />
                            6월 20일 - 여름 특별전<br />
                            9월 10일 - 가을 아트페어<br />
                            12월 25일 - 겨울 단체전
                        </p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                        <h3 className="font-semibold mb-2 dark:text-white">작가 모집</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                            2024년 하반기 신진작가 모집<br />
                            지원마감: 5월 31일
                        </p>
                    </div>
                </div>
            </div>
        </aside>
    );
} 