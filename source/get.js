'use strict';

const get = (obj, string) => {
    if (string === undefined || !string) return undefined; 
    if (string === '.') return obj;

    var arrayKeys = string.slice(1).split(".");

    for (let index in arrayKeys) {
        if (obj.hasOwnProperty(arrayKeys[index])) obj = obj[arrayKeys[index]];
        else return undefined;
    }
    return obj;
};

