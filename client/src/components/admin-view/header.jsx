import { AlignJustify, LogOut } from "lucide-react"
import { Button } from "../ui/button"
import { useDispatch } from "react-redux";
import { logOutUser } from "@/store/auth-slice";

const AdminHeader = ({setOpen}) => {

    const dispatch = useDispatch();

    function handleLogoutUser(){
        dispatch(logOutUser());
    }


    return (
      <header className="flex items-center justify-between px-4 py-2 bg-background border-b">
          <Button className="lg:hidden sm:block" onClick={() => setOpen(true)}>
              <AlignJustify />
              <span className="sr-only">Toggle Menu</span>
          </Button>
          <div className="flex flex-1 justify-end">
              <Button className="inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow" onClick={handleLogoutUser}>
                  <LogOut />
                    Logout
              </Button>
          </div>
      </header>
    )
  }
  
  export default AdminHeader