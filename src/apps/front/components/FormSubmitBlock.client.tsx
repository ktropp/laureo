import { LoaderCircle} from "lucide-react"
export default function FormSubmitBlockClient({children, pending, ...props}) {
    return <div className={`flex items-center gap-2 ${pending ? 'opacity-50 pointer-events-none' : ''}`}>
        {pending && <span className="form-loader animate-spin"><LoaderCircle /></span>}
        {children}
    </div>
}