import { CenterCardType } from "../types/centerCard";
import { sendPrivateRequestWithToast } from "./sendApi";

export const handleWish = (centerCardInfo: CenterCardType, setCenterCardInfo: (centerCardInfo: CenterCardType) => void) => {
    const isWish = centerCardInfo.isWish
    console.log(isWish);

    if (!isWish) {
        sendPrivateRequestWithToast({
            method: "POST",
            url: `/auth/wish/save?centerId=${centerCardInfo.centerId}`
        }, { pending: "요청중...", success: "찜 등록에 성공했습니다.", error: "찜 등록에 실패했습니다." })
            .catch((error) => {
                console.log(error);
                return;
            })
    } else {
        sendPrivateRequestWithToast({
            method: "DELETE",
            url: `/auth/wish/delete?centerId=${centerCardInfo.centerId}`
        }, { pending: "요청중...", success: "찜 삭제에 성공했습니다.", error: "찜 삭제에 실패했습니다." })
            .catch((error) => {
                console.log(error);
                return;
            })
    }

    setCenterCardInfo({ ...centerCardInfo, isWish: !centerCardInfo.isWish })
}