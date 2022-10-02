import {Image} from 'react-bootstrap'

function ItemImage(props) {
  const { src } = props
  return (
    <Image fluid className="item-img sticky-md-top" src={src} />
  )
}

export default ItemImage