'use strict';

const get = (obj, string) => {
    if (typeof string === 'undefined' || !string) {
        return;
    } 
    if (string === '.') {
        return obj;
    } 

    const arrayKeys = string.slice(1).split('.');

    for (let value of arrayKeys) {
        if (Object.prototype.hasOwnProperty.call(obj, value)) {
            obj = obj[value];
        } 
        else {
            return;
        }
    }
    return obj;
};

