
class LoginRequest {
    constructor(accessToken,refreshToken,expiresIn,user,requiresMfa){
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.expiresIn = expiresIn;
        this.user = user;
        this.requiresMfa = requiresMfa;
    }
}