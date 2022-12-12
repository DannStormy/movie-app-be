export default {
  findSuperByEmail: `
    SELECT * FROM super
    WHERE email = $1
    `,
  fetchUsersCount: `
    SELECT COUNT(*)
    FROM users
  `,
  fetchAllUsers: `
    SELECT firstName, lastName, email
    FROM users
    `,
  createAdmin: `
    INSERT INTO admin(name, email, role_id, password_reset_string, password_reset_expire)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
  `,
  findUserByID: `
        SELECT * FROM users
        WHERE id = $1
`,
  setClientStatus: `
        UPDATE users
        SET is_active = $1
        WHERE id = $2;
`,
  setAdminStatus: `
        UPDATE admin
        SET status = $1
        WHERE id = $2 AND role_id = 2;
`,
};
