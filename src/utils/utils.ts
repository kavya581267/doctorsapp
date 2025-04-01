export const isEmptyString = (value: string): boolean => {
    return !value || value.trim().length === 0
}

 export const isValidEmail = (value: string): boolean => {
    const emailRegExpresion = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
     return emailRegExpresion.test(value) ? true : false; 
}

export const isValidPhone = (value: string): boolean => {
    
     const phoneRegex = /^\+[1-9]\d{1,14}$/;
     return phoneRegex.test(value) ? true : false;
}


export const isAnyFieldsEmpty = (values: string[], object: any): boolean => {
    if(!object){
        return true;
    }
    return values.some(field => isEmptyString(object[field]));
}

