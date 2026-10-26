import { Menu, User, Globe, LogOut, Shield, Search, Bell } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "./ui/dropdown-menu";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { useState } from "react";

interface HeaderProps {
  onNavigate?: (page: string) => void;
  onLogout?: () => void;
  onRoleChange?: (role: "producer" | "buyer" | "admin") => void;
  currentRole?: "producer" | "buyer" | "admin";
  pageTitle?: string;
  userName?: string;
}

export function Header({ 
  onNavigate, 
  onLogout, 
  onRoleChange, 
  currentRole,
  pageTitle = "Dashboard",
  userName = "Usuario"
}: HeaderProps) {
  const [hasNotifications, setHasNotifications] = useState(true);
  
  // Notificaciones de ejemplo
  const notifications = [
    { id: 1, text: "Nueva reserva de quinua recibida", time: "Hace 5 min", unread: true },
    { id: 2, text: "Alerta climática: Heladas próximas 48h", time: "Hace 1 hora", unread: true },
    { id: 3, text: "Pago confirmado - Pedido #1234", time: "Hace 3 horas", unread: false },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Título de la Sección */}
          <div className="flex-shrink-0">
            <h2 className="text-gray-700">{pageTitle}</h2>
          </div>

          {/* Barra de Búsqueda Universal */}
          <div className="flex-1 max-w-xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar productos, usuarios, reportes..."
                className="pl-10 bg-[#F5F6FA] border-gray-200 focus:bg-white transition-colors"
              />
            </div>
          </div>

          {/* Acciones de Usuario */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {/* Selector de Idioma */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Globe className="h-5 w-5 text-gray-600" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Español</DropdownMenuItem>
                <DropdownMenuItem>Aymara</DropdownMenuItem>
                <DropdownMenuItem>Quechua</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Notificaciones */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full relative">
                  <Bell className="h-5 w-5 text-gray-600" />
                  {hasNotifications && (
                    <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full ring-2 ring-white"></span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel className="flex items-center justify-between">
                  <span>Notificaciones</span>
                  <Badge variant="secondary" className="rounded-full">
                    {notifications.filter(n => n.unread).length}
                  </Badge>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notification) => (
                    <DropdownMenuItem
                      key={notification.id}
                      className="flex flex-col items-start py-3 cursor-pointer"
                    >
                      <div className="flex items-start justify-between w-full">
                        <p className={`text-sm ${notification.unread ? '' : 'text-muted-foreground'}`}>
                          {notification.text}
                        </p>
                        {notification.unread && (
                          <span className="h-2 w-2 bg-blue-500 rounded-full flex-shrink-0 mt-1 ml-2"></span>
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground mt-1">
                        {notification.time}
                      </span>
                    </DropdownMenuItem>
                  ))}
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="justify-center text-[#3BA935]">
                  Ver todas las notificaciones
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Menú de Usuario */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="rounded-full h-10 px-3 gap-2">
                  <div className="h-8 w-8 rounded-full bg-[#3BA935] flex items-center justify-center text-white">
                    {userName.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm hidden md:inline">{userName}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p>{userName}</p>
                    <p className="text-xs text-muted-foreground">
                      {currentRole === "producer" && "Productor Agropecuario"}
                      {currentRole === "buyer" && "Comprador"}
                      {currentRole === "admin" && "Administrador del Sistema"}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => onNavigate?.("profile")}>
                  Mi Perfil
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onNavigate?.("settings")}>
                  Configuración
                </DropdownMenuItem>

                {onRoleChange && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel className="text-xs text-muted-foreground">
                      Modo Demo - Cambiar Rol
                    </DropdownMenuLabel>
                    <DropdownMenuItem
                      onClick={() => onRoleChange("producer")}
                      className={currentRole === "producer" ? "bg-[#E8F5E9]" : ""}
                    >
                      🌾 Productor
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => onRoleChange("buyer")}
                      className={currentRole === "buyer" ? "bg-[#E8F5E9]" : ""}
                    >
                      🛒 Comprador
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => onRoleChange("admin")}
                      className={currentRole === "admin" ? "bg-[#E8F5E9]" : ""}
                    >
                      <Shield className="mr-2 h-4 w-4" />
                      Administrador
                    </DropdownMenuItem>
                  </>
                )}

                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={onLogout}
                  className="text-destructive focus:text-destructive"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Cerrar Sesión
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}