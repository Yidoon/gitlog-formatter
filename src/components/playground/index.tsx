import { useEffect, useMemo, useState } from 'react'
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Button,
  Box,
  Input,
  Radio,
  RadioGroup,
} from '@mui/material'
import { AiOutlineCopy } from 'react-icons/ai'
import CodeWrap from '../codeWrap'

interface IKV {
  [key: string]: string
}
const FormatterOptions = [
  '--abbrev-commit',
  '--no-abbrev-commit',
  '--oneline',
  '--relative-date',
  // '--graph',
  '--pretty',
  '--parents',
  '--children',
  '--left-right',
  '--show-linear-break',
  '--date',
  '--format',
]
interface Props {
  data: { command: string; options: string[] } | null
}
const Playground = (props: Props) => {
  const { command, options } = props.data || {}
  const [gitlogStr, setGitlogStr] = useState('')
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])
  const [optionExtraMap, setOptionExtraMap] = useState<IKV>({})
  const [commandStr, setCommandStr] = useState(command)

  const getGitLog = async (command?: string) => {
    const res = await fetch(
      `http://localhost:3000/api/gitlog?command=${encodeURIComponent(
        command || ''
      )}`
    )
    const data = await res.json()
    setGitlogStr(data.result)
  }
  const handleChange = (isChecked: boolean, option: string) => {
    if (isChecked) {
      setSelectedOptions([...selectedOptions, option])
    } else {
      setSelectedOptions(selectedOptions.filter((item) => item !== option))
    }
  }
  const determineDisabled = (option: string) => {
    const c1 =
      (option === '--abbrev-commit' &&
        selectedOptions.includes('--no-abbrev-commit')) ||
      (option === '--no-abbrev-commit' &&
        selectedOptions.includes('--abbrev-commit'))

    return c1
  }
  const handleGenerateCode = () => {
    const base = `git log --color=always`
    let optionsStr = ''
    selectedOptions.map((option) => {
      if (optionExtraMap.hasOwnProperty(option)) {
        optionsStr += `${option}='${optionExtraMap[option]}' `
      } else {
        optionsStr += `${option} `
      }
    })
    setCommandStr(`${base} ${optionsStr}`)
  }
  const _command = useMemo(() => {
    const base = `git log --color=always`
    const options = selectedOptions.join(' ')
    return `${base} ${options}`
  }, [selectedOptions])
  const handleCopy = () => {}
  const handleExcute = () => {
    getGitLog(commandStr)
  }

  useEffect(() => {
    getGitLog(_command)
  }, [])

  useEffect(() => {
    if (options) {
      setSelectedOptions(options)
    }
  }, [options])

  return (
    <div className="w-full m-auto flex mt-6 h-2/3">
      <div className="w-[240px] flex flex-col h-[600px]">
        <FormGroup
          className="overflow-auto flex-1"
          style={{ flexWrap: 'nowrap' }}
        >
          {FormatterOptions.map((option) => {
            return (
              <div key={option}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedOptions.includes(option)}
                      disabled={determineDisabled(option)}
                      onChange={(e) => {
                        handleChange(e.target.checked, option)
                      }}
                    />
                  }
                  label={option}
                />
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    ml: 3,
                  }}
                >
                  {selectedOptions.includes('--show-linear-break') &&
                    option === '--show-linear-break' && (
                      <FormControlLabel
                        label=""
                        control={
                          <Input
                            placeholder="Input"
                            onChange={(e) => {
                              setOptionExtraMap({ [option]: e.target.value })
                            }}
                          />
                        }
                      />
                    )}
                  {selectedOptions.includes('--date') &&
                    option === '--date' && (
                      <RadioGroup
                        onChange={(e) => {
                          setOptionExtraMap({ [option]: e.target.value })
                        }}
                      >
                        <FormControlLabel
                          value="default"
                          control={<Radio />}
                          label="default"
                        />
                        <FormControlLabel
                          value="relative"
                          control={<Radio />}
                          label="relative"
                        />
                        <FormControlLabel
                          value="local"
                          control={<Radio />}
                          label="local"
                        />
                        <FormControlLabel
                          value="iso"
                          control={<Radio />}
                          label="iso"
                        />
                        <FormControlLabel
                          value="iso-strict"
                          control={<Radio />}
                          label="iso-strict"
                        />
                        <FormControlLabel
                          value="rfc"
                          control={<Radio />}
                          label="rfc"
                        />
                        <FormControlLabel
                          value="short"
                          control={<Radio />}
                          label="short"
                        />
                      </RadioGroup>
                    )}
                </Box>
              </div>
            )
          })}
        </FormGroup>
        <div className="flex gap-4">
          <Button
            variant="outlined"
            onClick={() => {
              setSelectedOptions([])
            }}
          >
            Reset
          </Button>
          <Button variant="outlined" onClick={handleGenerateCode}>
            Generate Code
          </Button>
        </div>
      </div>
      <div className="p-3 flex-1">
        <div className="flex items-center gap-4">
          {/* <div className="flex gap-2 items-center">
            <div>{commandStr}</div>
            <AiOutlineCopy className="cursor-pointer" onClick={handleCopy} />
          </div> */}
          <CodeWrap
            command={commandStr || ''}
            showExcute
            showCopy
            onExcute={handleExcute}
          />
          {/* <div className="border p-1 bg-black text-white flex justify-between">
            {commandStr}
          </div> */}
          {/* <Button
            variant="outlined"
            onClick={() => {
              getGitLog(commandStr)
            }}
          >
            Run
          </Button> */}
        </div>
        <div
          className="bg-black p-2 border-solid border h-[400px] text-white whitespace-pre-wrap max-h-[340px] overflow-auto mt-10"
          dangerouslySetInnerHTML={{ __html: gitlogStr }}
        ></div>
      </div>
    </div>
  )
}

export default Playground
