export {}

declare global {
  type User = {
    role: string
    username?: string
    id?: string
    _count?: {
      items: number
      collections: number
      comments: number
    }
    createdAt?: string
  }

  type NavItem = {
    label: string
    route: string
    show: boolean
  }

  type CollectionType = {
    id: string
    name: string
  }

  interface Tag {
    id: string
    name: string
  }

  interface DialogProps {
    open: boolean
    handleClose: () => void
  }

  interface FieldProps {
    label: string
    name: string
  }

  interface UserInfo extends User {
    createdAt: string
    email: string
    hasAccess: boolean
  }

  interface UserRecord extends Omit<UserInfo, 'hasAccess'> {
    hasAccess: string
  }

  interface ItemField {
    id: string
    fieldName: string
    value: any
  }

  interface CollectionInfo {
    id: string
    img?: string
    type: {
      name: string
    }
    author: {
      username: string
    }
    _count?: {
      items: number
    }
    name: string
    createdAt: Date
  }

  interface ItemInfo extends CollectionInfo {
    partOf: {
      name: string
      type: {
        name: string
      }
    }
    tags: string[]
    fields: {
      dateFields: ItemField[]
      booleanFields: ItemField[]
      numberFields: ItemField[]
      textFields: ItemField[]
      stringFields: ItemField[]
    }
  }

  interface ItemRecord {
    id: string
    tags: string[]
    'Created At': string
    'Item name': string
    [key: string]: any
  }

  interface ColumnDef {
    field: string
    headerName?: string
    [key: string]: any
  }

  interface Mapping {
    [key: string]: any
  }

  interface ItemFieldDef {
    id: string
    name: string
    type: string
  }

  interface Comment {
    author?: {
      username: string
    }
    createdAt: string
    text: string
    id: string
  }

  interface Like {
    itemId: string
    userId: string
  }
}
