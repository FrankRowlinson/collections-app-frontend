import { Tag } from '../../../common/components'

interface CloudTag {
  value: string
  count: number
  key?: string
  color?: string
  props?: any
}

export const TagRenderer = (tag: CloudTag) => {
  return <Tag key={tag.key} name={tag.value} color="default" />
}
