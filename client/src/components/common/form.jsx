
import { Input } from "../ui/input";
import { Label } from "../ui/label"
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

const CommonForm = ({formControls, formData, setFormData, onSubmit, buttonText, isBtnDisabled}) => {


    function renderInputsByComponentType(getControlItem){
        let element = null;
        const value = formData[getControlItem.name] || "";

        switch(getControlItem.componentType){
            case 'input':
                element = (
                <Input name={getControlItem.name} 
                placeholder={getControlItem.placeholder} 
                id={getControlItem.name}
                type={getControlItem.type}
                value={value}
                onChange={event=>setFormData(
                    {
                    ...formData,
                    [getControlItem.name]: event.target.value,
                    }
                )}
                />
                );
                break;

            case 'select':

                element = (
                    <Select onValueChange={(value) => setFormData(
                        {
                            ...formData,
                            [getControlItem.name] : value
                        }
                    )} value={value}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder={getControlItem.placeholder}/>
                        </SelectTrigger>
                        <SelectContent>
                            {
                                getControlItem.options && 
                                getControlItem.options.length > 0 ?
                                getControlItem.options.map(optionItem => <SelectItem value={optionItem.id} key={optionItem.id}>{optionItem.label}</SelectItem>) : null
                            }
                        </SelectContent>
                    </Select>
                );
                break;


            case 'textarea':

                element = (
                    <Textarea
                        name={getControlItem.name}
                        placeholder={getControlItem.placeholder}
                        id={getControlItem.id}
                        value={value}
                        onChange={event=>setFormData(
                            {
                            ...formData,
                            [getControlItem.name]: event.target.value,
                            }
                        )}
                    />
                );
                break;
            default:
                element = (
                    <Input name={getControlItem.name} 
                    placeholder={getControlItem.placeholder} 
                    id={getControlItem.name}
                    type={getControlItem.type}
                    value={value}
                    onChange={event=>setFormData(
                        {
                        ...formData,
                        [getControlItem.name]: event.target.value,
                        }
                    )}
                    />
                    );
                break;
        }

        return element;
    }
  return (
    <form onSubmit={onSubmit}>
        <div className="flex flex-col gap-3">
            {
                formControls.map(controlItem=><div className="grid w-full gap-1.5" key={controlItem.name}>
                    <Label className="mb-1">{controlItem.label}</Label>
                    {renderInputsByComponentType(controlItem)}
                </div>)
            }
        </div>
        <Button type="submit" className="mt-4 w-full" onSubmit={()=>onSubmit} disabled={isBtnDisabled}>{buttonText || 'Submit'}</Button>
    </form>
  )
}

export default CommonForm