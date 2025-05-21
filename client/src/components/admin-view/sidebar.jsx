
import { LayoutDashboard, Bean, Gauge, ListOrdered} from "lucide-react"
import { Fragment } from "react"
import { useNavigate } from "react-router-dom"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

const adminSidebarMenuItems = [
  {
      id: 'dashboard',
      label: 'Dashboard',
      path: '/admin/dashboard',
      icon: <Gauge />
  },

  {
      id: 'products',
      label: 'Products',
      path: '/admin/products',
      icon: <Bean />
  },

  {
      id: 'orders',
      label: 'Orders',
      path: '/admin/orders',
      icon: <ListOrdered />
  }
]


function MenuItems({setOpen}){
  const navigate = useNavigate();
  return <nav className="mt-8 flex-col flex gap-2">
        {
          adminSidebarMenuItems.map(item => <div key={item.id} 
            onClick={() => 
              {
                navigate(item.path)
                setOpen ? setOpen(false) : null
              }
          } 
          className="flex items-center gap-2 rounded-md px-3 py-2 cursor-pointer hover:bg-accent">
              {
                item.icon
              }
              <span className="text-sm font-medium">{item.label}</span>

          </div>)
        }
  </nav>

}


const AdminSidebar = ({open, setOpen}) => {
  const navigate = useNavigate();
  return <Fragment>
    <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64">
              <div className="flex flex-col h-full">
                  <SheetHeader className="border-b">
                      <SheetTitle className="flex gap-2 mt-5 mb-4">
                        <div onClick={()=> navigate("/admin/dashboard")} className="flex items-center gap-2 cursor-pointer">
                          <LayoutDashboard size={24}/>
                          <h1 className="text-md font-extrabold">Admin Panel</h1>
                          </div>
                      </SheetTitle>
                  </SheetHeader>
                  <MenuItems setOpen={setOpen}/>
              </div>
        </SheetContent>
    </Sheet>
    <aside className="hidden w-64 flex-col border-r bg-background p-6 lg:flex">
      <div onClick={()=> navigate("/admin/dashboard")} className="flex items-center gap-2 cursor-pointer">
          <LayoutDashboard size={24}/>
          <h1 className="text-xl font-extrabold">Admin Panel</h1>
      </div>
      <MenuItems/>
    </aside>
  </Fragment>
}

export default AdminSidebar