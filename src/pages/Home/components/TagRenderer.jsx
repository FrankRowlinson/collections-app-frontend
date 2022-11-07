import { Tag } from '../../../shared'

const TagRenderer = (tag) => {
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
