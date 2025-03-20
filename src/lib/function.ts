export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);

    // 월과 일을 가져와서 2자리 숫자로 포맷팅
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    return `${month}/${day}`;
};