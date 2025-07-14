import bcrypt from "bcryptjs";

const saltRounds = 10;

const hashPassword = (password) => {
  return bcrypt.hashSync(password, saltRounds);
};

const comparePassword = (password, hash) => {
  return bcrypt.compareSync(password, hash);
};

export { hashPassword, comparePassword };
