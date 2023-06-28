import { useEffect, useState } from 'react'
import { AiOutlineCopy, AiFillEdit } from 'react-icons/ai'
interface Props {
  command: string
  onCopy?: () => void
  onEdit?: () => void
}
const Item = (props: Props) => {
  const { command, onCopy, onEdit } = props
  const [result, setResult] = useState<string>('')

  const getGitLog = async (command?: string) => {
    const res = await fetch(
      `http://localhost:3000/api/gitlog?command=${encodeURIComponent(
        command || ''
      )}`
    )
    const data = await res.json()
    setResult(data.result)
  }
  useEffect(() => {
    getGitLog(command)
  }, [command])

  return (
    <div className="border p-4 flex flex-col gap-4 bg-white">
      <div
        className="bg-black p-2 border-solid border text-white whitespace-pre-wrap max-h-[340px] overflow-auto"
        dangerouslySetInnerHTML={{ __html: result }}
      ></div>

      <div className="h-14 border p-4 bg-black text-white flex justify-between">
        <div className="flex gap-2 items-center">
          <div>{command}</div>
          <AiOutlineCopy className="cursor-pointer" onClick={onCopy} />
        </div>
        <div className="cursor-pointer">
          <AiFillEdit onClick={onEdit} />
        </div>
      </div>
    </div>
  )
}

export default Item
