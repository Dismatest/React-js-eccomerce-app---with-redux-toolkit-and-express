
import CommonForm from "@/components/common/form";
import { loginFormControls } from "@/config";
import { useToast } from "@/hooks/use-toast";
import { loginUser } from "@/store/auth-slice";
import { useState } from "react"
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom"

const initialState = {
  email: '',
  password: ''
}

const AuthLogin = () => {

  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const {toast} = useToast();

    function onSubmit(event){
      event.preventDefault();
      dispatch(loginUser(formData)).then(data=>{
        if(data?.payload?.success){
          toast(
            {
              title: data?.payload?.message,
              variant: 'success'
            }
          )
        }else{
          toast(
            {
              title: data?.payload?.message,
              variant: 'destructive'
            }
          )
        }
      })
    }
    return (
      <div className="mx-auto w-full max-w-md space-y-6">
          <div className="text-center">
              <h1 className="text-3xl font-bold tracking-tight text-foreground">Sign in to your account</h1>
              <p className="mt-2">Don't have account
                <Link className="text-primary font-medium hover:underline ml-2" to='/auth/register'>Register</Link>
              </p>
          </div>
          <CommonForm 
            formControls={loginFormControls}
            buttonText={'Sign In'}
            formData={formData}
            setFormData={setFormData}
            onSubmit={onSubmit}
          />
      </div>
    )
  }
  
  export default AuthLogin


  