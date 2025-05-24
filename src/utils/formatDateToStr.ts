const formatDateToStr = (date: Date) =>
    `${date?.getFullYear()}-${String(date?.getMonth()).padStart(2, '0')}-${String(date?.getDate()).padStart(2, '0')}`;

export default formatDateToStr;
