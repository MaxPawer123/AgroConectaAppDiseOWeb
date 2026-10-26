import { useState } from "react";
import { Header } from "./components/Header";
import { Home } from "./components/Home";
import { Products } from "./components/Products";
import { Community } from "./components/Community";
import { Profile } from "./components/Profile";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { ForgotPassword } from "./components/ForgotPassword";
// Buyer components
import { BuyerHome } from "./components/buyer/BuyerHome";
import { BuyerCatalog } from "./components/buyer/BuyerCatalog";
import { ProductDetail } from "./components/buyer/ProductDetail";
import { MyReservations } from "./components/buyer/MyReservations";
import { BuyerChat } from "./components/buyer/BuyerChat";
import { BuyerProfile } from "./components/buyer/BuyerProfile";
// Producer components
import { QuinuaLots } from "./components/producer/QuinuaLots";
import { FinancialDashboard } from "./components/producer/FinancialDashboard";
import { OrderManagement } from "./components/producer/OrderManagement";
// Lot Management System - Gestión Contextual
import { LotManagementSimple } from "./components/LotManagementSimple";
import { LotDashboardWithCalculator } from "./components/LotDashboardWithCalculator";
import { CostCalculatorForm } from "./components/CostCalculatorForm";
// Admin components
import { AdminDashboard } from "./components/admin/AdminDashboard";
import { UserManagement } from "./components/admin/UserManagement";
import { CostConfiguration } from "./components/admin/CostConfiguration";
import { CostCatalog } from "./components/admin/CostCatalog";
import { BroadcastCenter } from "./components/admin/BroadcastCenter";
import { AdminSettings } from "./components/admin/AdminSettings";
import { Button } from "./components/ui/button";
import { 
  Home as HomeIcon, 
  Package, 
  Calculator, 
  MessageCircle, 
  User, 
  Menu, 
  X, 
  Search, 
  Clock, 
  ShoppingCart, 
  RefreshCw, 
  BarChart3, 
  Users, 
  DollarSign, 
  Megaphone, 
  Settings, 
  ListChecks, 
  Tractor 
} from "lucide-react";
import { Badge } from "./components/ui/badge";
import { Toaster } from "./components/ui/sonner";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authPage, setAuthPage] = useState<"login" | "register" | "forgot">("login");
  const [userRole, setUserRole] = useState<"producer" | "buyer" | "admin">("producer"); // Rol del usuario
  const [currentPage, setCurrentPage] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // Estado para el detalle de producto (comprador)
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  // Estado para el sistema de lotes
  const [selectedLotId, setSelectedLotId] = useState<string | null>(null);
  const [selectedLotCode, setSelectedLotCode] = useState<string>("");
  const [lotView, setLotView] = useState<"dashboard" | "calculator">("dashboard");

  // Navegación para Productores
  const producerNavItems = [
    { id: "home", label: "Inicio", icon: HomeIcon },
    { id: "lots", label: "Lotes", icon: Tractor },
    { id: "products", label: "Productos", icon: Package },
    { id: "orders", label: "Pedidos", icon: ShoppingCart },
    { id: "community", label: "Comunidad", icon: MessageCircle },
    { id: "profile", label: "Perfil", icon: User },
  ];

  // Navegación para Compradores
  const buyerNavItems = [
    { id: "buyer-home", label: "Inicio", icon: HomeIcon },
    { id: "catalog", label: "Catálogo", icon: Search },
    { id: "reservations", label: "Reservas", icon: Clock },
    { id: "buyer-chat", label: "Chat", icon: MessageCircle },
    { id: "buyer-profile", label: "Perfil", icon: User },
  ];

  // Navegación para Administrador
  const adminNavItems = [
    { id: "admin-dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "user-management", label: "Usuarios", icon: Users },
    { id: "cost-catalog", label: "Catálogo Costos", icon: ListChecks },
    { id: "broadcast", label: "Difusión", icon: Megaphone },
    { id: "admin-settings", label: "Ajustes", icon: Settings },
  ];

  const navItems = 
    userRole === "producer" 
      ? producerNavItems 
      : userRole === "buyer" 
      ? buyerNavItems 
      : adminNavItems;

  const handleLogin = () => {
    setIsAuthenticated(true);
    setAuthPage("login");
  };

  const handleAdminLogin = () => {
    setIsAuthenticated(true);
    setUserRole("admin");
    setCurrentPage("admin-dashboard");
    setAuthPage("login");
  };

  const handleRegister = () => {
    setIsAuthenticated(true);
    setAuthPage("login");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAuthPage("login");
    setCurrentPage("home");
    setSelectedProductId(null);
  };

  const handleRoleSwitch = () => {
    const newRole = userRole === "producer" ? "buyer" : "producer";
    setUserRole(newRole);
    setCurrentPage(newRole === "producer" ? "home" : "buyer-home");
    setSelectedProductId(null);
    setMobileMenuOpen(false);
  };

  const handleRoleChange = (newRole: "producer" | "buyer" | "admin") => {
    setUserRole(newRole);
    if (newRole === "producer") {
      setCurrentPage("home");
    } else if (newRole === "buyer") {
      setCurrentPage("buyer-home");
    } else {
      setCurrentPage("admin-dashboard");
    }
    setSelectedProductId(null);
    setMobileMenuOpen(false);
  };

  const renderPage = () => {
    // Páginas del Productor
    if (userRole === "producer") {
      // Si hay un lote seleccionado con calculadora, mostrar la calculadora
      if (selectedLotId && lotView === "calculator") {
        return (
          <LotDashboardWithCalculator
            lotId={selectedLotId}
            lotCode={selectedLotCode}
            onBack={() => {
              setSelectedLotId(null);
              setSelectedLotCode("");
              setLotView("dashboard");
              setCurrentPage("lots");
            }}
          />
        );
      }

      // Si hay un lote seleccionado, mostrar el dashboard del lote
      if (selectedLotId) {
        return (
          <LotDashboardWithCalculator
            lotId={selectedLotId}
            onBack={() => {
              setSelectedLotId(null);
              setLotView("dashboard");
              setCurrentPage("lots");
            }}
          />
        );
      }

      switch (currentPage) {
        case "home":
          return <Home onNavigate={setCurrentPage} />;
        case "financial":
          return <FinancialDashboard onBack={() => setCurrentPage("home")} />;
        case "calculator-demo":
          return <CostCalculatorForm />;
        case "lots":
          return (
            <LotManagementSimple
              onNavigateToCalculator={(lotId, lotCode) => {
                setSelectedLotId(lotId);
                setSelectedLotCode(lotCode);
                setLotView("calculator");
              }}
            />
          );
        case "products":
          return <Products />;
        case "orders":
          return <OrderManagement />;
        case "community":
          return <Community />;
        case "profile":
          return <Profile />;
        default:
          return <Home onNavigate={setCurrentPage} />;
      }
    }
    
    // Páginas del Comprador
    if (userRole === "buyer") {
      // Si hay un producto seleccionado, mostrar el detalle
      if (selectedProductId) {
        return (
          <ProductDetail
            productId={selectedProductId}
            onBack={() => {
              setSelectedProductId(null);
              setCurrentPage("catalog");
            }}
            onReservationCreated={() => {
              setSelectedProductId(null);
              setCurrentPage("reservations");
            }}
            onContactProducer={() => {
              setSelectedProductId(null);
              setCurrentPage("buyer-chat");
            }}
          />
        );
      }

      switch (currentPage) {
        case "buyer-home":
          return <BuyerHome onNavigate={setCurrentPage} />;
        case "catalog":
          return <BuyerCatalog onNavigateToDetail={setSelectedProductId} />;
        case "reservations":
          return <MyReservations />;
        case "buyer-chat":
          return <BuyerChat />;
        case "buyer-profile":
          return <BuyerProfile />;
        default:
          return <BuyerHome onNavigate={setCurrentPage} />;
      }
    }

    // Páginas del Administrador
    if (userRole === "admin") {
      switch (currentPage) {
        case "admin-dashboard":
          return <AdminDashboard />;
        case "user-management":
          return <UserManagement />;
        case "cost-config":
          return <CostConfiguration />;
        case "cost-catalog":
          return <CostCatalog />;
        case "broadcast":
          return <BroadcastCenter />;
        case "admin-settings":
          return <AdminSettings />;
        default:
          return <AdminDashboard />;
      }
    }
  };

  // Función para obtener el título de la página
  const getPageTitle = () => {
    if (userRole === "producer") {
      switch (currentPage) {
        case "home": return "Mis Lotes Activos";
        case "financial": return "Dashboard Financiero";
        case "calculator-demo": return "Calculadora de Costos";
        case "lots": return "Gestión de Lotes";
        case "products": return "Gestión de Productos";
        case "orders": return "Pedidos";
        case "community": return "Comunidad y Red";
        case "profile": return "Mi Perfil";
        default: return "Dashboard";
      }
    }
    if (userRole === "buyer") {
      if (selectedProductId) return "Detalle del Producto";
      switch (currentPage) {
        case "buyer-home": return "Marketplace";
        case "catalog": return "Catálogo de Productos";
        case "reservations": return "Mis Reservas";
        case "buyer-chat": return "Chat con Productores";
        case "buyer-profile": return "Mi Perfil";
        default: return "Dashboard";
      }
    }
    if (userRole === "admin") {
      switch (currentPage) {
        case "admin-dashboard": return "Dashboard General";
        case "user-management": return "Gestión de Usuarios";
        case "cost-config": return "Configuración de Costos";
        case "cost-catalog": return "Catálogo de Costos";
        case "broadcast": return "Centro de Difusión";
        case "admin-settings": return "Ajustes del Sistema";
        default: return "Panel Administrativo";
      }
    }
    return "Dashboard";
  };

  // Función para obtener el nombre del usuario
  const getUserName = () => {
    if (userRole === "producer") return "Juan Mamani";
    if (userRole === "buyer") return "Roberto Flores";
    if (userRole === "admin") return "Dr. Fernando Vargas";
    return "Usuario";
  };

  // Si no está autenticado, mostrar páginas de autenticación
  if (!isAuthenticated) {
    if (authPage === "login") {
      return (
        <Login
          onLogin={handleLogin}
          onAdminLogin={handleAdminLogin}
          onNavigateToRegister={() => setAuthPage("register")}
          onNavigateToForgotPassword={() => setAuthPage("forgot")}
        />
      );
    } else if (authPage === "register") {
      return (
        <Register
          onRegister={handleRegister}
          onNavigateToLogin={() => setAuthPage("login")}
        />
      );
    } else {
      return <ForgotPassword onNavigateToLogin={() => setAuthPage("login")} />;
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header 
        onNavigate={setCurrentPage} 
        onLogout={handleLogout} 
        onRoleChange={handleRoleChange}
        currentRole={userRole}
        pageTitle={getPageTitle()}
        userName={getUserName()}
      />

      {/* Mobile Menu Toggle */}
      <div className="lg:hidden sticky top-16 z-40 bg-white border-b p-4">
        <Button
          variant="outline"
          className="w-full"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <>
              <X className="mr-2 h-5 w-5" />
              Cerrar Menú
            </>
          ) : (
            <>
              <Menu className="mr-2 h-5 w-5" />
              Abrir Menú
            </>
          )}
        </Button>
      </div>

      <div className="flex flex-1">
        {/* Desktop Sidebar */}
        <aside 
          className={`hidden lg:block w-64 border-r sticky top-[73px] h-[calc(100vh-73px)] overflow-y-auto ${ 
            userRole === "admin" 
              ? "bg-[#1B4D3E] text-white" 
              : "bg-white"
          }`}
        >
          {/* Logo AgroConecta */}
          <div className={`p-4 border-b ${userRole === "admin" ? "border-white/10" : ""}`}>
            <div className="flex items-center gap-3">
              <div className="bg-[#3BA935] rounded-lg p-2">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16 4C16 4 12 8 12 12C12 14.2091 13.7909 16 16 16C18.2091 16 20 14.2091 20 12C20 8 16 4 16 4Z"
                    fill="white"
                  />
                  <path
                    d="M10 10C10 10 8 12 8 14C8 15.1046 8.89543 16 10 16C11.1046 16 12 15.1046 12 14C12 12 10 10 10 10Z"
                    fill="#F7C331"
                  />
                  <path
                    d="M22 10C22 10 20 12 20 14C20 15.1046 20.8954 16 22 16C23.1046 16 24 15.1046 24 14C24 12 22 10 22 10Z"
                    fill="#F7C331"
                  />
                  <rect x="14" y="16" width="4" height="12" rx="1" fill="#A87C4F" />
                </svg>
              </div>
              <div>
                <p className={`${userRole === "admin" ? "text-white" : "text-[#3BA935]"}`}>
                  AgroConecta
                </p>
                <p className={`text-xs ${userRole === "admin" ? "text-white/60" : "text-muted-foreground"}`}>
                  Sistema Integrado
                </p>
              </div>
            </div>
          </div>

          {/* Selector de Rol (Solo para Productor y Comprador) */}
          {userRole !== "admin" && (
            <div className="p-4 border-b bg-gradient-to-r from-[#3BA935] to-[#2E8B2A]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-white/80">Modo actual:</span>
                <Badge className="bg-white text-[#3BA935] hover:bg-white">
                  {userRole === "producer" ? "Productor" : "Comprador"}
                </Badge>
              </div>
              <Button
                variant="secondary"
                size="sm"
                className="w-full"
                onClick={handleRoleSwitch}
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Cambiar a {userRole === "producer" ? "Comprador" : "Productor"}
              </Button>
            </div>
          )}

          {/* Header para Admin - Usuario Actual */}
          {userRole === "admin" && (
            <div className="p-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-[#3BA935] flex items-center justify-center text-white">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm">{getUserName()}</p>
                  <p className="text-xs text-white/60">Administrador</p>
                </div>
              </div>
            </div>
          )}

          <nav className="p-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <Button
                  key={item.id}
                  variant={isActive ? "default" : "ghost"}
                  className={`w-full justify-start ${
                    userRole === "admin"
                      ? isActive
                        ? "bg-[#3BA935] hover:bg-[#2E8B2A] text-white"
                        : "text-white/80 hover:text-white hover:bg-white/10"
                      : isActive
                      ? "bg-[#3BA935] hover:bg-[#2E8B2A] text-white"
                      : "hover:bg-muted"
                  }`}
                  onClick={() => {
                    setCurrentPage(item.id);
                    setSelectedProductId(null);
                  }}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.label}
                </Button>
              );
            })}
          </nav>

          {/* Consejo del día - Solo para Productor y Comprador */}
          {userRole !== "admin" && (
            <div className="p-4 mt-4">
              <div className="bg-[#E8F5E9] rounded-lg p-4 space-y-2">
                <p className="text-sm text-[#3BA935]">💡 Consejo del día</p>
                <p className="text-xs text-muted-foreground">
                  {userRole === "producer"
                    ? "Revisa las alertas climáticas regularmente para proteger tus cultivos de heladas y sequías."
                    : "Compra productos locales y apoya a los productores de tu región. ¡Frescos y de calidad!"}
                </p>
              </div>
            </div>
          )}
        </aside>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-black/50" onClick={() => setMobileMenuOpen(false)}>
            <div className="bg-white w-64 h-full p-4 space-y-2" onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-center mb-4">
                <h2>Menú</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Selector de Rol en Mobile */}
              <div className="mb-4 p-3 border rounded-lg bg-[#E8F5E9]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-muted-foreground">Modo:</span>
                  <Badge className="bg-[#3BA935] text-white">
                    {userRole === "producer" ? "Productor" : "Comprador"}
                  </Badge>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={handleRoleSwitch}
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Cambiar a {userRole === "producer" ? "Comprador" : "Productor"}
                </Button>
              </div>

              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.id}
                    variant={currentPage === item.id ? "default" : "ghost"}
                    className={`w-full justify-start ${
                      currentPage === item.id
                        ? "bg-[#3BA935] hover:bg-[#2E8B2A] text-white"
                        : "hover:bg-muted"
                    }`}
                    onClick={() => {
                      setCurrentPage(item.id);
                      setSelectedProductId(null);
                      setMobileMenuOpen(false);
                    }}
                  >
                    <Icon className="mr-3 h-5 w-5" />
                    {item.label}
                  </Button>
                );
              })}
            </div>
          </div>
        )}

        {/* Main Content */}
        <main className={`flex-1 overflow-y-auto ${
          userRole === "admin" ? "bg-[#F5F6FA]" : ""
        }`}>
          {renderPage()}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t z-40">
        <div className="grid grid-cols-6 gap-1 p-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                className={`flex flex-col items-center gap-1 p-2 rounded-lg ${
                  currentPage === item.id
                    ? "text-[#3BA935] bg-[#E8F5E9]"
                    : "text-muted-foreground"
                }`}
                onClick={() => {
                  setCurrentPage(item.id);
                  setSelectedProductId(null);
                }}
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
      <Toaster />
    </div>
  );
}