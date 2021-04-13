import jwt_decode from "jwt-decode";

/* var token = "eyJ0eXAiO.../// jwt token";
var decoded = jwt_decode(token);

console.log(decoded);
 */

export class JwtService {

    /**
     * Obtine el token almacenado
     */
    getToken() {
        if (sessionStorage.getItem('token')) {
            return sessionStorage.getItem('token');
        } else {
            return null;
        }
    }

    /**
     * Almacena el token almacenado
     */
    setToken(token) {
        sessionStorage.setItem('token', token);
    }

    /**
     * Valida el tiempo del token almacenado
     */
    getTokenExpirationDate() {

        try {
            if (this.getToken() === null) {
                return null;
            } else {
                const decoded = jwt_decode(this.getToken());

                if (decoded.exp === undefined) {
                    return null;
                }

                const date = new Date(0);
                date.setUTCSeconds(decoded.exp);
                return date;
            }
        } catch (err) {
            console.log(err);
        }

    }

    /**
     * Valida el token almacenado
     */
    isTokenExpired() {
        const date = this.getTokenExpirationDate();
        if (date === null) {
            return true;
        } else {
            if (date === undefined) {
                return true;
            }
            return !(date.valueOf() > new Date().valueOf());
        }
    }
}