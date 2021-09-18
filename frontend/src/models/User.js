export class User {
    constructor(state) {
        for (const [key, value] of Object.entries(state)) {
            this[key] = value
        } 
    }

    getUsername () {
        return this.email
    }
 }

export default User;