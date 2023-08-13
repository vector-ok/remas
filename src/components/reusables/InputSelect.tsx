interface ISelectProps {
  defaultValue: string
  handleSelect: (value: string) => void
}

function InputSelect({ defaultValue, handleSelect }: ISelectProps) {
  return (
    <div className="relative w-full">
      <select
        defaultValue={defaultValue}
        className="w-full p-2.5 text-black-tertiary bg-white border rounded-lg hover:border-blue shadow-sm outline-none appearance-none focus:border-indigo-600"
        onChange={(e) => handleSelect(e.target.value)}
      >
        <option disabled value={defaultValue}>
          {defaultValue}
        </option>
        <option value="No">No</option>
        <option value="Yes">Yes</option>
      </select>
    </div>
  )
}

export default InputSelect
