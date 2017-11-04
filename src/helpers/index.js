export const getUniqueID = (length) => {

    if (typeof length !== 'number') {
        throw new Error('Length should be a number');
    }
    let text = '';
    const possible =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
};

export const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';

    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
};

export const getFullApiUrl = (api, key, addQuery='') => {
    if (typeof api !== 'string' || typeof key !== 'string' || typeof addQuery !== 'string') {
        throw new Error('api, key and addQuery should be a string');
    }

    return `${api}api_key=${key}${addQuery}`;
};
