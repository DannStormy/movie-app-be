export default {
  registerUser: `
        INSERT INTO users (firstName, lastName, email, password, role_id)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
    `,
  findUserByEmail: `
        SELECT * 
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
  updatePassword: `
      UPDATE users
      SET password = $1
      WHERE id = $2
  `,
};
