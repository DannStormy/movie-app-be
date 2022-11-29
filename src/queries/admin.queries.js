export default {
  findAdminByEmail: `
    SELECT * FROM admin
    WHERE email = $1
`,
  findAdminByID: `
        SELECT * FROM admin
        WHERE id = $1
`,
};
