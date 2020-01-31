import { emailRegExp } from './regular-expressions';

export function checkEmailValidity(email: string): boolean {
    return email ? emailRegExp.test(email) : false;
}

export function normalizeQueryParam(queryParam: string): string {
    return queryParam ? queryParam.replace(',', '|') : '';
}
