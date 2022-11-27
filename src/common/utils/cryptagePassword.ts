import bcrypt from 'bcrypt'

export async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt()
  const passwordHashed = bcrypt.hash(password, salt)
  return passwordHashed
}

async function checkPassword(passwordInRequest, passwordInDB) {
  const isPassword = await bcrypt.compare(passwordInRequest, passwordInDB)
  return isPassword
}
