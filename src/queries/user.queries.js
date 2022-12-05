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
  updatePasswordResetString: `
        UPDATE users
        SET password_reset_string = $1,
        updated_at = NOW()
        WHERE id = $2
  `,
  updatePassword: `
        UPDATE users
        SET password = $1,
        password_reset_string = NULL,
        updated_at = NOW()
        WHERE email = $2
  `,
};
