import { useState } from "react";
import { LogIn, Mail, Lock, Globe, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface LoginProps {
  onLogin: () => void;
  onNavigateToRegister: () => void;
  onNavigateToForgotPassword: () => void;
  onAdminLogin?: () => void;
}

export function Login({ onLogin, onNavigateToRegister, onNavigateToForgotPassword, onAdminLogin }: LoginProps) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [language, setLanguage] = useState("Español");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica de autenticación
    onLogin();
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Hero Image */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1659021245220-8cf62b36fe25?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXJtZXIlMjB3b3JraW5nJTIwZmllbGR8ZW58MXx8fHwxNzYyMTYwOTU0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Agricultor trabajando"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#3BA935]/90 to-[#3BA935]/70 flex items-center justify-center">
          <div className="text-white text-center px-8">
            <div className="mb-6">
              <svg
                width="80"
                height="80"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mx-auto"
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
            <h1 className="text-4xl mb-4">AgroConecta</h1>
            <p className="text-xl mb-8">Conectando productores con el futuro 🌱</p>
            <div className="space-y-4 text-left max-w-md mx-auto">
              <div className="flex items-start gap-3">
                <div className="bg-white/20 rounded-full p-2 mt-1">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="text-lg">Registra tus productos fácilmente</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-white/20 rounded-full p-2 mt-1">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="text-lg">Recibe alertas climáticas</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-white/20 rounded-full p-2 mt-1">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="text-lg">Conecta con otros productores</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gradient-to-b from-[#E8F5E9] to-white">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="bg-[#3BA935] rounded-lg p-2">
                <svg
                  width="40"
                  height="40"
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
              <h1 className="text-[#3BA935]">AgroConecta</h1>
            </div>
            <p className="text-muted-foreground">Conectando productores con el futuro 🌱</p>
          </div>

          <Card className="shadow-xl border-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Iniciar Sesión</CardTitle>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <Globe className="h-4 w-4 mr-2" />
                      {language}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setLanguage("Español")}>
                      Español
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setLanguage("Aymara")}>
                      Aymara
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setLanguage("Quechua")}>
                      Quechua
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <p className="text-sm text-muted-foreground">
                Ingresa tus credenciales para continuar
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Correo Electrónico o Teléfono</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="email"
                      type="text"
                      placeholder="ejemplo@correo.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="pl-10 h-12"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Contraseña</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      className="pl-10 h-12"
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="remember"
                      className="h-4 w-4 rounded border-gray-300"
                    />
                    <label htmlFor="remember" className="text-sm text-muted-foreground">
                      Recordarme
                    </label>
                  </div>
                  <Button
                    type="button"
                    variant="link"
                    className="text-[#3BA935] p-0 h-auto"
                    onClick={onNavigateToForgotPassword}
                  >
                    ¿Olvidaste tu contraseña?
                  </Button>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-[#3BA935] hover:bg-[#2E8B2A]"
                >
                  <LogIn className="mr-2 h-5 w-5" />
                  Ingresar
                </Button>

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-white px-4 text-muted-foreground">
                      ¿No tienes cuenta?
                    </span>
                  </div>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-12 border-[#3BA935] text-[#3BA935] hover:bg-[#E8F5E9]"
                  onClick={onNavigateToRegister}
                >
                  Crear Cuenta Nueva
                </Button>
              </form>
            </CardContent>
          </Card>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Al continuar, aceptas nuestros{" "}
            <button className="text-[#3BA935] hover:underline">
              Términos de Servicio
            </button>{" "}
            y{" "}
            <button className="text-[#3BA935] hover:underline">
              Política de Privacidad
            </button>
          </p>

          {/* Acceso Administrador */}
          {onAdminLogin && (
            <div className="mt-8">
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-dashed"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-4 text-muted-foreground">
                    Modo Demo
                  </span>
                </div>
              </div>
              
              <Button
                type="button"
                variant="outline"
                className="w-full h-12 border-[#1B4D3E] text-[#1B4D3E] hover:bg-[#1B4D3E] hover:text-white transition-colors"
                onClick={onAdminLogin}
              >
                <Shield className="mr-2 h-5 w-5" />
                Acceso Administrador
              </Button>
              <p className="text-xs text-center text-muted-foreground mt-2">
                Acceso rápido al panel administrativo para demostración
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}