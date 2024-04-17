export const validateRegistration = (formData) => {
    const errors = {};
  
    for (const key in formData) {
      if (!formData[key]) {
        errors[key] = 'Este campo es requerido';
      }
    }
  
    if (formData.username.length < 6) {
      errors.username = 'El nombre de usuario debe tener al menos 6 caracteres';
    }
  
    if (!/\d/.test(formData.password)) {
      errors.password = 'La contraseña debe contener al menos un número';
    }

    return errors;
  };

  
  
  
  export const validateRequired = (value) => {
    return value.trim() !== '';
  };
  
  export const validateDate = (value) => {
   

    const isValidFormat = /^\d{4}-\d{2}-\d{2}$/.test(value);
    const currentDate = new Date();

    if (!isValidFormat) {
      return false; 
    }
  
    const [day, month, year] = value.split('/');
    const selectedDate = new Date(`${year}-${month}-${day}`); 
  
    
    if (selectedDate.getDay() === 6 || selectedDate.getDay() === 0) {
      return false;
    }
  
    return true; 
  };
  
  export const validateTime = (value) => {
    return true;
  };