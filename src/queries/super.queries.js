export default {
    findSuperByEmail: `
        SELECT * FROM super
        WHERE email = $1
    `,
    loginSuper: `
        SELECT email, password
        FROM users
        WHERE email = $1
    `,
    fetchAllUsers: `
        SELECT firstName, lastName, email
        FROM users
    `
}