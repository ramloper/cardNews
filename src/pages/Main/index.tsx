import Post from '../../components/Post';
import Notice from '../../components/Notice';

export default function Main() {
    return (
        <div className="max-w-[935px] mx-auto py-4 px-2">
            <div className="flex gap-8">
                {/* 포스트 영역 - 모바일/태블릿에서는 전체 너비 사용 */}
                <div className="w-full xl:w-[600px]">
                    {/* 포스트 영역 */}
                    <div className="space-y-8">
                        <Post />
                        <Post />
                        <Post />
                        <Post />
                        <Post />
                    </div>
                </div>
                {/* 공지사항 영역 - 모바일/태블릿에서는 숨김 */}
                <div className="hidden lg:block">
                    <Notice />
                </div>
            </div>
        </div>
    );
}