const sanitizeTextAndReplaceSpaces = (text: string, replacement: string = '-') => {
    return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, '').replace(/[^\w]/g, replacement);
};

const StringUtils = {
    sanitizeTextAndReplaceSpaces
}

export default StringUtils;