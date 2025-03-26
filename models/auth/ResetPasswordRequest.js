class ResetPasswordRequest{
    constructor(email,token,newPassword,confirmPassword){
        this.email = email;
        this.token = token;
        this.newPassword = newPassword;
        this.confirmPassword = confirmPassword;
    }
}