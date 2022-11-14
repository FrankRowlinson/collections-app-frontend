import Image from 'mui-image'

function ItemImage({ img }) {
  return (
    <Image
      src={img}
      duration={1000}
      easing="cubic-bezier(0.7, 0, 0.6, 1)"
      showLoading={false}
      errorIcon={true}
      bgColor="inherit"
    />
  )
}

export default ItemImage
