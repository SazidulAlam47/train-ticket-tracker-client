export const setToLocalStorage = (key: string, value: string) => {
    if (typeof window === 'undefined') {
        return null;
    }
    return localStorage.setItem(key, value);
};

export const getFromLocalStorage = (key: string) => {
    if (typeof window === 'undefined') {
        return null;
    }
    return localStorage.getItem(key);
};

export const removeFromLocalStorage = (key: string) => {
    if (typeof window === 'undefined') {
        return null;
    }
    return localStorage.removeItem(key);
};
