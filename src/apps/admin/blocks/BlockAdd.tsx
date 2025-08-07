import { Button } from "components/ui/button"

export const BlockAdd = () => {
  return (
    <div className="flex justify-between items-center relative">
      <p contentEditable="true" className="w-full focus:outline-0">
        <span className="pointer-events-none opacity-60" data-rich-text-placeholder="Write / for block selection"></span>
      </p>
      <Button className="absolute right-0">Add</Button>
    </div>
  )
}
