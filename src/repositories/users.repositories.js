import {db} from "../database/database.connection.js";
export function checkUserByEmail(email){
    return db.query("SELECT * FROM users WHERE email = $1;", [email]);
}
export function signUpDB (body){
    const {name, email, password} = body;

    return db.query("INSERT INTO users (name, email, password) VALUES ($1, $2, $3);", [name, email, password]);
    
}

export function signInDB (id, token){
    return db.query(`INSERT INTO sessions ("userId", token) VALUES ($1, $2);`, [id, token]);
}

export function checkUserSession (token){
    return db.query("SELECT * FROM sessions WHERE token = $1;", [token]);
}