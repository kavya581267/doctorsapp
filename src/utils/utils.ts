export const isEmptyString = (value: string): boolean => {
    return !value || value.trim().length === 0
}

 export const isValidEmail = (value: string): boolean => {
    const emailRegExpresion = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
     return emailRegExpresion.test(value) ? true : false; 
}

export const isValidPassword = (value: string) : boolean =>{
     const passwordRegExp = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
     return passwordRegExp.test(value) ? true : false;
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

export function replacePlaceholders(template:string, params:any) {
    return template.replace(/{{(.*?)}}/g, (_, key) => params[key.trim()] ?? "");
  }


  export function getAvatarName(firstName:string, lastName: string){
    if(firstName && lastName){
        return firstName.toUpperCase().charAt(0)+lastName.toUpperCase().charAt(0);
    }else{
        return "XX"
    }
    
  }

  export const getFutureDate = (date: Date, plusDays: number): string => {
    date.setDate(date.getDate() + plusDays);
    return date.toISOString().split('T')[0];
  }

  export const getPastDate = (date: Date, minusDays: number): string => {
    date.setDate(date.getDate() + minusDays);
    return date.toISOString().split('T')[0];
  }

  export const formatTimeHHMMSS = (date: Date) =>
    date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  export function formatToYYYYMMDD(date: Date) {
    date = new Date(date);
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, '0'); // Months are 0-indexed
    const day = `${date.getDate()}`.padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  export function convertTo12Hour(time24:string) {
    const [hour, minute, second] = time24.split(':');
    let hour12 = ((+hour % 12) || 12); // convert to 12-hour format
    const ampm = +hour < 12 ? 'AM' : 'PM';
    return `${hour12}:${minute} ${ampm}`;
  }

  export function formatDateToMonthDay(dateString) {
    const date = new Date(dateString);
  
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
  
    const day = date.getDate();
    const month = monthNames[date.getMonth()];
  
    // Add ordinal suffix to the day (1st, 2nd, 3rd, 4th, etc.)
    const getOrdinalSuffix = (n) => {
      if (n > 3 && n < 21) return 'th';
      switch (n % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
      }
    };
  
    return `${month} ${day}${getOrdinalSuffix(day)}`;
  }

