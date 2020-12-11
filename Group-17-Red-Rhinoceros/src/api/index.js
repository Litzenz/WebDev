import ajax from './ajax'

// register api
export const reqRegister = (user) => ajax('/signup', user, 'POST')
// sign in  api
export const reqSignin = ({username, password}) => ajax('/signin', {username, password}, 'POST')