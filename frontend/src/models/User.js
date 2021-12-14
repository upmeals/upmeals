export class User {
    constructor(state) {
        for (const [key, value] of Object.entries(state)) {
            this[key] = value
        } 
    }

    getUsername () {
        if (this.email) {
            return this.email
        } else {
            return undefined
        }
    }
 }

export default User;