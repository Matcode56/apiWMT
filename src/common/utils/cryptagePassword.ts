import bcrypt from 'bcrypt'

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt()
  const passwordHashed = bcrypt.hash(password, salt)
  return passwordHashed
}

export async function checkPassword(password1: string, password2: string): Promise<boolean> {
  const isPassword = await bcrypt.compare(password1, password2)
  return isPassword
}
