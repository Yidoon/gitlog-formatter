import Item from './Item'

interface IKV {
  [key: string]: string
}
const Example = () => {
  const exampleMap: IKV = {
    default: `git log --color=always`,
    type1: `git log --color=always --pretty=format:'%Cred%h%Creset -%C(yellow)%d%C(white) %s %Cgreen(%cd) %C(red)<%an>%Creset' --abbrev-commit`,
  }

  return (
    <div className="flex flex-col gap-8">
      {Object.keys(exampleMap).map((key) => {
        return <Item command={exampleMap[key] || ''} key={key} />
      })}
    </div>
  )
}

export default Example
