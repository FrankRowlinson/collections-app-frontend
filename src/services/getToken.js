import Cookies from 'universal-cookie'

function getToken() {
  const cookies = new Cookies()
  return cookies.get('token')
}

export default getToken