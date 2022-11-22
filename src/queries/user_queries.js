export default {
    registerUser: `
        INSERT INTO users (firstName, lastName, email, password)
        VALUES ($1, $2, $3, $4)
    `,
    findUserByEmail: `
        SELECT * FROM users
        WHERE email = $1
    `,
    loginUser: `
        SELECT email, password
        FROM users
        WHERE email = $1
    `
}