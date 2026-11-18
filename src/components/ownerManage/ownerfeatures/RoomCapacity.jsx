import {
 FormField,
 FormItem,
 FormLabel,
 FormControl,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";


const RoomCapacity = ({control}) => {

return (

<div className="grid grid-cols-3 gap-4">


<FormField

control={control}

name="capacity.adults"

render={({field})=>(

<FormItem>

<FormLabel>
Adults
</FormLabel>

<FormControl>

<Input
type="number"
{...field}
/>

</FormControl>

</FormItem>

)}

/>



<FormField

control={control}

name="capacity.children"

render={({field})=>(

<FormItem>

<FormLabel>
Children
</FormLabel>

<FormControl>

<Input
type="number"
{...field}
/>

</FormControl>

</FormItem>

)}

/>


</div>

)

}

export default RoomCapacity;