import { useContext } from 'react'
import Item from './Item'
import { HomeContext } from '@/pages'

const exampleMap: IKV = {
  default: {
    command: `git log --color=always`,
    options: [''],
  },
  one: {
    command: `git log --color=always --abbrev-commit --pretty=format:'%C(#fff000)%h - %C(yellow)%d %C(#f50202)%s %C(#02f52f)(%cd) %C(#02f52f)[%an]'`,
    options: ['--abbrev-commit', '--format'],
  },
}
interface IKV {
  [key: string]: {
    command: string
    options: string[]
  }
}
const Example = () => {
  const { handleEdit } = useContext(HomeContext) || {}
  const handleCopy = () => {}
  return (
    <div className="flex flex-col gap-8">
      {Object.keys(exampleMap).map((key) => {
        return (
          <Item
            onCopy={handleCopy}
            onEdit={() => {
              handleEdit(exampleMap[key])
            }}
            command={exampleMap[key].command || ''}
            key={key}
          />
        )
      })}
    </div>
  )
}

export default Example
