import Thumbnail from "../../components/Thumbnail";
import { ThumbnailType } from "../../types/thumbnail";

export default function Grid() {
    const thumbnail: ThumbnailType[] = Array.from({ length: 15 }, (_, i) => ({
        id: i + 1,
        img: Math.random() > 0.5 ? '/img/salgu1.jpg' : '/img/salgu2.jpg',
        imgCount: Math.random() > 0.5 ? 1 : 2,
    }));

    return (
        <div className="max-w-[1000px] mx-auto px-4">
            <h1 className="text-[26px] font-bold py-8 dark:text-white text-center">
                여기에 안내 멘트 들어감
            </h1>
            <div className="grid grid-cols-3 gap-1">
                {thumbnail.map((item) => (
                    <Thumbnail key={item.id} imgObject={item} />
                ))}
            </div>
        </div>
    );
}