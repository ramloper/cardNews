const onlyNumber = (value: string) => {
    return value.replace(/[^0-9]/g, '');
};

const onlyString = (value: string) => {
    return value.replace(/[^가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z]/g, "");
};

export { onlyNumber, onlyString };
