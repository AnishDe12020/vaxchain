import { ReactNode } from "react"

const DashbardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="container max-w-5xl mt-16 h-full w-full">{children}</div>
  )
}

export default DashbardLayout
