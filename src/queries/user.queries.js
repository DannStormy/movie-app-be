export default {
  registerUser: `
        INSERT INTO users (firstName, lastName, email, password)
        VALUES ($1, $2, $3, $4)
        RETURNING *
    `,
  findUserByEmail: `
        SELECT * 
        FROM users
        WHERE email = $1
    `,
  loginUser: `
        SELECT email, password
        FROM users
        WHERE email = $1
    `,
  addClientStatus: `
        INSERT into client_account_status (id, status)
        VALUES ($1, $2)
    `,
  checkClientStatus: `
        SELECT status
        FROM client_account_status
        WHERE id = $1
    `,
};
