import Example from '@/components/example'
import Playground from '@/components/playground'

export default function Home() {
  return (
    <div className="h-screen bg-slate-300 overflow-hidden">
      <div className="w-2/3 mx-auto mt-4">
        <div className="h-20 w-full text-white text-xxl text-center">
          Gilog Formatter, beautify your git log
        </div>
        <div className="mt-6">
          <Example />
        </div>
        <div>{/* <Playground /> */}</div>
      </div>
    </div>
  )
}
