import { useAuthActions } from "@/hooks/use-auth-actions";
import { LayoutDashboard, UserPlus, ShoppingCart, LogOut, CreditCard, Menu, X } from "lucide-react";
import { NavLink } from "react-router";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

const navigation = [
  { name: "Inicio", href: "/admin", icon: LayoutDashboard },
  { name: "Registrar cliente", href: "/admin/register-client", icon: UserPlus },
  { name: "Ventas", href: "/admin/sales", icon: ShoppingCart },
  { name: "Pagos", href: "/admin/payments", icon: CreditCard },
];

const Navbar = () => {
  const { logout } = useAuthActions();
  const [open, setOpen] = useState(false);

  return (
    <header className="shadow-md border-b bg-background">
      <nav className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold text-foreground">CobraYa</h1>
        </div>
        <div className="hidden md:flex gap-4">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  "text-muted-foreground hover:text-foreground flex items-center gap-2 px-3 py-2 rounded-md transition-colors",
                  isActive ? "text-primary font-semibold bg-primary/10" : ""
                )
              }
              end
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </NavLink>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <Button onClick={logout} variant="outline" className="hidden md:flex">
            <LogOut className="w-5 h-5 mr-2" />
            Logout
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setOpen(!open)}>
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </nav>

      {open && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="p-4 space-y-2">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "text-muted-foreground hover:text-foreground flex items-center gap-2 px-3 py-2 rounded-md transition-colors",
                    isActive ? "text-primary font-semibold bg-primary/10" : ""
                  )
                }
                end
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </NavLink>
            ))}
            <Button onClick={() => { logout(); setOpen(false); }} variant="outline" className="w-full mt-4">
              <LogOut className="w-5 h-5 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
