import Image from 'mui-image'

interface Props {
  img: string
}

export function ItemImage({ img }: Props) {
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
