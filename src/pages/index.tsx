import Example from '@/components/example'
import Playground from '@/components/playground'
import Modal from '@mui/material/Modal'
import { createContext, useState } from 'react'

export const HomeContext = createContext<{
  open: boolean
  setOpen: any
  handleEdit: any
} | null>(null)

export default function Home() {
  const [open, setOpen] = useState(false)
  const [editData, setEditData] = useState<{
    command: string
    options: string[]
  } | null>(null)

  const handleClose = () => setOpen(false)
  const handleEdit = (data: { command: string; options: string[] }) => {
    console.log(data)
    setEditData(data)
    setOpen(true)
  }
  const store = {
    open: open,
    setOpen: setOpen,
    handleEdit: handleEdit,
  }
  return (
    <HomeContext.Provider value={store}>
      <div className="h-screen bg-slate-300 overflow-auto">
        <div className="w-2/3 mx-auto mt-4 pb-20">
          <div className="h-20 w-full text-white text-xxl text-center">
            Gilog Formatter, beautify your git log
          </div>
          <div className="mt-6">
            <Example />
          </div>

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <div className="bg-white w-2/3 mx-auto p-8 mt-16">
              <Playground data={editData} />
            </div>
          </Modal>
        </div>
      </div>
    </HomeContext.Provider>
  )
}
