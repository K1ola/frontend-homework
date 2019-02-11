'use strict';

const get = (obj, string) => {
    if (!string) {
        return;
    } 
    if (string === '.') {
        return obj;
    } 

    const arrayKeys = string.slice(1).split('.');

    for (let value of arrayKeys) {
        if (!Object.prototype.hasOwnProperty.call(obj, value)) {
            return;
        } 
        obj = obj[value];
    }
    return obj;
};

