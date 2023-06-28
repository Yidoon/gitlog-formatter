import { Button } from '@mui/material'
import {
  MdContentCopy,
  MdOutlineRefresh,
  MdOutlineSettings,
  MdPlayArrow,
} from 'react-icons/md'

interface Props {
  command: string
  showExcute?: boolean
  showCopy?: boolean
  showSetting?: boolean
  showReset?: boolean
  onExcute?: () => void
  onCopy?: () => void
  onSetting?: () => void
  onReset?: () => void
}
const CodeWrap = (props: Props) => {
  const {
    command,
    showCopy,
    showExcute,
    showReset,
    showSetting,
    onExcute,
    onCopy,
    onSetting,
    onReset,
  } = props
  return (
    <div className="flex flex-col w-full">
      <div className="flex items-center justify-end gap-2">
        {showCopy && (
          <MdContentCopy onClick={onCopy} className="text-xl cursor-pointer" />
        )}
        {showSetting && (
          <MdOutlineSettings
            onClick={onSetting}
            className="text-xl cursor-pointer"
          />
        )}
        {showReset && (
          <MdOutlineRefresh
            onClick={onReset}
            className="text-xl cursor-pointer"
          />
        )}
        {showExcute && (
          <MdPlayArrow onClick={onExcute} className="text-xl cursor-pointer" />
        )}
      </div>
      <div className="border w-full mt-2 p-6 bg-[#041c34] text-white relative">
        <div className="whitespace-pre-wrap break-all overflow-auto">
          {command}
        </div>
        <div className="absolute top-0 right-0 hidden">
          <Button className="bg-[#122c4a] text-[#475d74]">Copy</Button>
        </div>
      </div>
    </div>
  )
}

export default CodeWrap
