export const isEmptyString = (value: string): boolean => {
    return !value || value.trim().length === 0
}

export const isValidEmail = (value: string): boolean => {
    // regular expreesion check 
    return true;
}

export const isValidPhone = (value: string): boolean => {

}


export const isAnyFieldsEmpty = (values: string[], object: any): boolean => {
    values.forEach(field => {
       if(isEmptyString(object[field])){
        return true;
       }
    });
    return false;
}

