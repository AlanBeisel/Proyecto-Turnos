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
  
    // Agregar más validaciones
  
    return errors;
  };

  
  
  
  export const validateRequired = (value) => {
    return value.trim() !== '';
  };
  
  export const validateDate = (value) => {
    const isValidFormat = /^(\d{2})\/(\d{2})\/(\d{4})$/.test(value);
    if (!isValidFormat) {
      return true;
    }
  
    const currentDate = new Date();
  
    const [day, month, year] = value.split('/');
    const selectedDate = new Date(`${day}-${month}-${year}`);
  
    if (selectedDate <= currentDate) {
      return false; 
    }
  
    if (selectedDate.getDay() === 6 || selectedDate.getDay() === 0) {
      return false;
    }
  
    return true;
  };
  
  export const validateTime = (value) => {
    // Aquí puedes implementar la validación del formato de la hora y el rango permitido
    return true;
  };