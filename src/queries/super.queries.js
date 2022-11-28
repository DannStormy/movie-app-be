export default {
  findSuperByEmail: `
        SELECT * FROM super
        WHERE email = $1
    `,
  findAdminByEmail: `
        SELECT * FROM admin
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
    `,
  createAdmin: `
        INSERT INTO admin(name, email)
        VALUES ($1, $2)
    `,
  addMovie: `
    INSERT INTO movies(title, genre, year)
    VALUES ($1, $2, $3)
    `,
  setClientStatus: `
      UPDATE client_account_status
      SET status = $1
      WHERE id = $2;
`,
};
