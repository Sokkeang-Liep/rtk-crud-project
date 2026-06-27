import FormExampleComponent from "@/components/example-form/FormExampleComponent";
import { RegisterForm } from "@/components/example-form/FormRegisterComponent";
import ProductForm from "@/components/example-form/ProductFormComponent";


export default function Home() {
  return (

  <div className="grid grid-cols-2 max-w-7xl items-center place-items-center container mx-auto gap-8 py-4 place-content-center min-h-screen">
   <ProductForm/>

</div>
  )
}