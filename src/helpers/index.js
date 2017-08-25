// Core
import moment from 'moment';

export const getCurrentTime = () => moment().format('MMMM D h:mm:ss a');

export const getUniqueID = (length, lowercase) => {
    let text = '';
    let possible =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    if (lowercase) {
        possible = 'abcdefghijklmnopqrstuvwxyz0123456789';
    }

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
<<<<<<< HEAD
}

export function getFullName (firstName, lastName) {
    if (typeof firstName !== 'string' || typeof lastName !== 'string') {
        throw new Error(
            'firstName and lastName arguments passed should be a string!'
        );
    }

    return `${firstName} ${lastName}`;
}
=======
};
>>>>>>> d0a9d3f... rename helper functions
