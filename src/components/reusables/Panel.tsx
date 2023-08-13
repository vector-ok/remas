interface IPanelProps {
  title: string
  children: React.ReactNode
  isActive: boolean
  onShow: () => void
}

function Panel({ title, children, isActive, onShow }: IPanelProps) {
  return (
    <section className="panel mb-5">
      <div className="flex justify-between">
        <p className="text-sm text-black-secondary font-medium">{title}</p>
        <p className="text-sm text-black-secondary font-medium">
          {isActive ? "" : "Details >>"}
        </p>
      </div>
      {
        isActive ? <p className="pl-3">{children}</p> : ""
        //   <button onClick={onShow}>Show</button>
      }
    </section>
  )
}

export default Panel
