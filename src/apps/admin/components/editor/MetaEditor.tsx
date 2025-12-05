import {Settings} from "@theme/settings";
import {PostLang} from "@prisma/client";
import {Label} from "@admin/components/ui/label";
import {postMetaField} from "@front/lib/definitions";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "../ui/select";
import {Checkbox} from "@admin/components/ui/checkbox";

export default function MetaEditor({postLang, type}: { postLang: PostLang, type: string }) {
    const meta = Settings.postMeta.filter(meta => meta.postType === type)

    const renderField = (field: postMetaField) => {
        const fieldSlug = 'meta-' + field.slug
        const fieldName = 'postLangMeta[' + field.slug + ']'
        switch (field.type) {
            case 'text':
            case 'textarea':
            case 'select':
                return <>
                    <Label htmlFor={fieldSlug}>{field.label}</Label>
                    <Select defaultValue={postLang.postLangMeta?.filter(meta => meta.key === field.slug)[0]?.value} name={fieldName}>
                        <SelectTrigger>
                            <SelectValue placeholder={field.placeholder || 'Select value'}/>
                        </SelectTrigger>
                        <SelectContent>
                            {field.options?.map(item => (
                                <SelectItem key={item.value}
                                            value={item.value}>{item.label}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </>
            case 'checkbox':
                return <div className="flex items-center space-x-2">
                    <input type="hidden" name={fieldName} value="0" />
                    <Checkbox id={fieldSlug} name={fieldName} value="1" defaultChecked={postLang.postLangMeta?.filter(meta => meta.key === field.slug)[0]?.value}/>
                    <Label className="mb-0" htmlFor={fieldSlug}>{field.label}</Label>
                </div>
            default:
                console.log('Field type: ' + field.type + ' not implemented!')
                return null
        }
    }

    return <div className="mt-8 pt-4 border-t border-laureo-border dark:border-laureo-border-dark">
        {meta.map((meta, index) => (
            <div key={index}>
                <h3 className="text-2xl font-semibold">{meta.label}</h3>
                {meta.fields.map((field, index) => (
                    <div className="space-y-2 mb-2" key={index}>
                        {renderField(field)}
                    </div>
                ))}
            </div>
        ))}
    </div>
}