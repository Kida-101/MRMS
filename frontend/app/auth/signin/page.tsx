import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
const page = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center bg-gray-100">
     <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6 w-100">
        <div className="text-center space-y-2">
        <img className="w-30 h-30 rounded-full border mx-auto" src="https://img.freepik.com/free-vector/indonesian-halal-logo-new-branding-2022_17005-1495.jpg?t=st=1742808628~exp=1742812228~hmac=efcd718ff4a52a58e694a812c937e1bd61fe426b07204662dbe7e011958e227e&w=740" alt="Logo" />
        <h1 className="font-bold tracking-tight">Sign In</h1>
     </div>
     <form className="space-y-4">
        <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-semibold">Email</label>
            <Input type="email" name="" id="email" placeholder="your-email@gmail.com" required/>
        </div>
        <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-semibold">Password</label>
            <Input name="" id="password" required/>
        </div>
        <div className="flex items-center justify-end">
            <a href="#" className="text-sm text-gray-500 hover:text-blue-500 transition-colors duration-300">Forget password ?</a>
        </div>
        <Button className="w-full" type="submit">Sign in</Button>
     </form>
     </div>
    </div>
  )
}

export default page
