export default {
  findAdminByEmail: `
    SELECT * FROM admin
    WHERE email = $1
`,
  findAdminByID: `
    SELECT * FROM admin
    WHERE id = $1
`,
  updatePasswordResetString: `
    UPDATE admin
    SET password_reset_string = $1,
    password_reset_expire = $2,
    updated_at = NOW()
    WHERE email = $3
  `,
  adminResetPassword: `
    UPDATE admin
    SET password = $1,
    password_reset_string = NULL,
    password_reset_expire = NULL,
    updated_at = NOW()
    WHERE email = $2
  `,
  fetchPasswordToken: `
      SELECT password_reset_string, email, password_reset_expire
      FROM admin
      WHERE password_reset_string = $1;
  `,
};
