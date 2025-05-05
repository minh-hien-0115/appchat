export class Validate {
    static email(email: string) {
      if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
        return true;
      }
      return false;
    }
  
    static password = (val: string) => {
      const minLength = val.length >= 6;
      const hasUpperCase = /[A-Z]/.test(val);
      const hasLowerCase = /[a-z]/.test(val);
      const hasNumber = /[0-9]/.test(val);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(val);
  
      return minLength || hasUpperCase || hasLowerCase || hasNumber || hasSpecialChar;
    };
  
    static confirmPassword(password: string, confirmPassword: string) {
      return password === confirmPassword;
    }
  
    // Kiểm tra username có thể chứa dấu, chữ, và khoảng trắng
    // static username(username: string) {
    //   const usernameRegex = /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚÀ-ú\s]+$/; // Cho phép ký tự có dấu và khoảng trắng
    //   return usernameRegex.test(username);
    // }
  }  