"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(id, last_name, first_name, pseudo, email, password) {
        this.id = id;
        this.last_name = last_name;
        this.first_name = first_name;
        this.pseudo = pseudo;
        this.email = email;
        this.password = password;
    }
}
exports.User = User;
