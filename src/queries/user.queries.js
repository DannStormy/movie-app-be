export default {
  registerUser: `
      INSERT INTO users (firstName, lastName, email, password, role_id, emailverificationtoken, email_verification_expire)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `,
  findUserByEmail: `
      SELECT * 
      FROM users
      WHERE email = $1
    `,
  checkClientStatus: `
      SELECT status
      FROM client_account_status
      WHERE id = $1
    `,
  updatePasswordResetString: `
      UPDATE users
      SET password_reset_string = $1,
      password_reset_expire = $2,
      updated_at = NOW()
      WHERE id = $3
`,
  regeneratePasswordResetString: `
      UPDATE users
      SET password_reset_string = $1,
      password_reset_expire = $2,
      updated_at = NOW()
      WHERE email = $3
`,
  updateEmailVerificationToken: `
      UPDATE users
      SET emailVerificationToken = $1,
      email_verification_expire = $2,
      updated_at = NOW()
      WHERE email = $3
  `,
  updatePassword: `
      UPDATE users
      SET password = $1,
      password_reset_string = NULL,
      password_reset_expire = NULL,
      updated_at = NOW()
      WHERE email = $2
  `,
  updateIsEmailVerified: `
      UPDATE users
      SET isEmailVerified = true,
      updated_at = NOW()
      WHERE email = $1
  `,
  fetchPasswordToken: `
      SELECT password_reset_string, email, password_reset_expire
      FROM users
      WHERE password_reset_string = $1;
  `,
  fetchEmailVerificationToken: `
      SELECT emailverificationtoken, email, email_verification_expire
      FROM users
      WHERE emailverificationtoken = $1;
  `,
  fetchUserRole: `
      SELECT role_id 
      FROM roles
      WHERE role = $1
  `,
};
