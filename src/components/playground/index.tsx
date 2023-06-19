import { useEffect, useMemo, useState } from 'react'
import { Checkbox, FormControlLabel, FormGroup, Button } from '@mui/material'

const FormatterOptions = [
  '--abbrev-commit',
  '--no-abbrev-commit',
  '--oneline',
  '--relative-date',
  '--graph',
  '--pretty',
  '--parents',
  '--children',
  '--left-right',
  '--show-linear-break',
  '--date',
  '--format',
]
const Playground = () => {
  const [gitlogStr, setGitlogStr] = useState('')
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])

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
  const command = useMemo(() => {
    const base = `git log --color=always --pretty=format:'%Cred%h%Creset -%C(yellow)%d%C(white) %s %Cgreen(%cd) %C(red)<%an>%Creset'`
    const options = selectedOptions.join(' ')
    return `${base} ${options}`
  }, [selectedOptions])

  useEffect(() => {
    getGitLog(command)
  }, [])

  return (
    <div className="w-3/5 m-auto flex mt-6">
      <div className="w-1/4 ">
        <FormGroup>
          {FormatterOptions.map((option) => {
            return (
              <FormControlLabel
                key={option}
                control={
                  <Checkbox
                    checked={selectedOptions.includes(option)}
                    onChange={(e) => {
                      handleChange(e.target.checked, option)
                    }}
                  />
                }
                label={option}
              />
            )
          })}
        </FormGroup>
        <Button
          variant="outlined"
          onClick={() => {
            setSelectedOptions([])
          }}
        >
          Reset
        </Button>
      </div>
      <div className="p-3 flex-1">
        <div>{command}</div>
        <Button
          variant="outlined"
          onClick={() => {
            getGitLog(command)
          }}
        >
          Active
        </Button>
        <div dangerouslySetInnerHTML={{ __html: gitlogStr }}></div>
      </div>
    </div>
  )
}

export default Playground
