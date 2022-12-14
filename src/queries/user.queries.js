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
      SELECT is_active
      FROM users
      WHERE id = $1
    `,
  updatePasswordResetString: `
      UPDATE users
      SET password_reset_string = $1,
      password_reset_expire = $2,
      updated_at = NOW()
      WHERE email = $3
      AND is_active = true;
`,
  updateEmailVerificationToken: `
      UPDATE users
      SET emailVerificationToken = $1,
      email_verification_expire = $2,
      updated_at = NOW()
      WHERE id = $3
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
      WHERE id = $1
  `,
  fetchUserByPasswordToken: `
      SELECT password_reset_string, email
      FROM users
      WHERE password_reset_string = $1
      AND password_reset_expire::timestamp > NOW()
  `,
  fetchUserByEmailVerificationToken: `
      SELECT id,emailverificationtoken, email
      FROM users
      WHERE emailverificationtoken = $1
      AND email_verification_expire::timestamp > NOW()
  `,
  fetchUserRole: `
      SELECT role_id 
      FROM roles
      WHERE role = $1
  `,
};
