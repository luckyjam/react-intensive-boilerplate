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

export const trimOverview = (overview) => {

    if (typeof overview !== 'string') {
        throw new Error('overview should be a string');
    }

    const overviewLength = overview.length;

    if (overviewLength > 250) {
        const trimmedOverview = overview.substr(0, 247);

        // removing last character if it is not a letter or a number
        return `${trimmedOverview.replace(/[^\w\d]+$/, '')}...`;
    }

    return overview;
};
