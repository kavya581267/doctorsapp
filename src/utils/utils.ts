export const isEmptyString = (value: string): boolean => {
    return !value || value.trim().length === 0
}

const isValidEmail = (value: string): boolean => {
    const phoneRegex = /^\+[1-9]\d{1,14}$/;
    return phoneRegex.test(value) ? true : false;
}

const isValidPhone = (value: string): boolean => {
     const emailRegExpresion = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
     return emailRegExpresion.test(value) ? true : false; 
}


export const isAnyFieldsEmpty = (values: string[], object: any): boolean => {
    if(!object){
        return true;
    }
    values.forEach(field => {
       if(isEmptyString(object[field])){
        return true;
       }
    });
    return false;
}

