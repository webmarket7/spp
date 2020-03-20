import { findIndex } from 'lodash';

export function normalizeQueryParam(queryParam: string): string {
    return queryParam ? queryParam.replace(',', '|') : '';
}

export function updateItemInArray(list, item, key = 'id') {
    const index = findIndex(list, {[key]: item[key]});

    return index > -1 ? [...list.slice(0, index), item, ...list.slice(index + 1)] : list;
}

export function generateRandomAlphanumericStr(length: number): string {
    return Math.round((Math.pow(36, length + 1) - Math.random() * Math.pow(36, length))).toString(36).slice(1);
}
