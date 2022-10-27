import Tag from '../../components/Tag'

const TagRenderer = (tag, size, color) => {
  return (
    <Tag
      name={tag.value}
      setInProgress={tag.setInProgress}
      inCloud={true}
      color="default"
    />
  )
}
export default TagRenderer
