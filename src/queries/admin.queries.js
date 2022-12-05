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
    updated_at = NOW()
    WHERE id = $2
  `,
  adminResetPassword: `
    UPDATE admin
    SET password = $1,
    password_reset_string = NULL,
    updated_at = NOW()
    WHERE email = $2
  `,
};
