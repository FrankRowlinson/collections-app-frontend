import { Link } from 'react-router-dom'
import { routes } from '../../../common/constants'

export const NameRenderer = (params: any) => {
  return (
    <Link to={`${routes.ITEMS}/byid/${params.data.id}`}>
      {params.data['Item name']}
    </Link>
  )
}
