import { Tag } from '../../../shared'

const TagRenderer = (tag, size, color) => {
  return (
    <Tag
      key={tag.key}
      name={tag.value}
      setInProgress={tag.setInProgress}
      inCloud={true}
      color="default"
    />
  )
}
export default TagRenderer
