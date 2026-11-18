import { Outlet } from "react-router-dom";


export default function AuthLayout(){


return (

<div>

{/* <div className="
hidden
lg:flex
bg-slate-900
text-white
items-center
justify-center
p-10
">


<div>

<h1 className="
text-5xl
font-bold
">

Stay Anywhere

</h1>


<p className="mt-5 text-gray-300">

Book hotels and resorts worldwide

</p>


</div>


</div> */}


<div className="
flex
items-center
justify-center
  bg-slate-100
  min-h-screen
p-5
">


<Outlet/>


</div>


</div>

)

}