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
    INSERT INTO admin(name, email)
    VALUES ($1, $2)
  `,
  findUserByID: `
        SELECT * FROM client_account_status
        WHERE id = $1
`,
  setClientStatus: `
        UPDATE client_account_status
        SET status = $1
        WHERE id = $2;
`,
  setAdminStatus: `
        UPDATE admin
        SET status = $1
        WHERE id = $2;
`,
};