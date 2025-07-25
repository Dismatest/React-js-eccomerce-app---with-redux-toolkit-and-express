import { AlignJustify, HouseIcon, LogOut, ShoppingCart, UserRound } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet"
import { Button } from "../ui/button"
import { useDispatch, useSelector } from "react-redux"
import { shoppingViewHeaderMenuItems } from "@/config"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "../ui/dropdown-menu"
import { Avatar, AvatarFallback } from "../ui/avatar"
import { logOutUser } from "@/store/auth-slice"


function  MenuItems(){
    return <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6  lg:flex-row">
        {
          shoppingViewHeaderMenuItems.map(menuItem=><Link className="text-sm font-medium" key={menuItem.id} to={menuItem.path}>{menuItem.label}</Link>)
        }
    </nav>
}

function HeaderRightContent(){
  const {user} = useSelector(state => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLogout(){
    dispatch(logOutUser());
  }


    return <div className="flex lg:items-center lg:flex-row flex-col gap-4">
      <Button variant="outline" size="icon">
        <ShoppingCart className="h-6 w-6" />
        <span className="sr-only">Shopping cart</span>
      </Button>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar className="bg-black cursor-pointer">
                  <AvatarFallback className="bg-black text-white font-semibold">
                      {user?.userName.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="right" className="w-56">
                <DropdownMenuLabel>
                  Logged in as {user?.userName}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer" onClick={() => navigate("/shop/account") }>
                  <UserRound className="mr-2 h-4 w-4"/>
                  Account
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4"/>
                  Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </div>
}
const ShoppingHeader = () => {

  const {isAuthenticated} = useSelector(state => state.auth);

  return (
    <header className="sticky top-0 z-50 border-b bg-background w-full">
        <div className="flex h-16 items-center justify-between px-4 md:px-6">
              <Link to="/shop/home" className="flex items-center gap-2">
              <HouseIcon />
                  <span className="font-bold">Ecommerce</span>
              </Link>
              <Sheet>
                <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="lg:hidden">
                      <AlignJustify className="h-6 w-6" />
                      <span className="sr-only">Toggle sidebar</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-full max-w-xs">
                    <MenuItems />
                    <HeaderRightContent />
                </SheetContent>
              </Sheet>
              <div className="hidden lg:block">
                  <MenuItems />
                  
              </div>
              {
                isAuthenticated ? (
                  <div className="hidden lg:block">
                      <HeaderRightContent />
                  </div>
                ):(
                  null
                )
              }
        </div>
    </header>
  )
}

export default ShoppingHeader