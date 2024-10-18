export const formatPhone = (phone:string) =>{
     phone = phone.replace(/\s+/g, '').replace(/\+/g, '');
     phone = phone.replace(/^0/, '593');
     return phone;
}

