import { useState } from "react";
import { ArrowLeft, Mail, Lock, CheckCircle, Phone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface ForgotPasswordProps {
  onNavigateToLogin: () => void;
}

export function ForgotPassword({ onNavigateToLogin }: ForgotPasswordProps) {
  const [step, setStep] = useState<"request" | "verify" | "reset" | "success">("request");
  const [method, setMethod] = useState<"email" | "phone">("email");
  const [formData, setFormData] = useState({
    contact: "",
    code: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleRequestReset = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar código de verificación
    setStep("verify");
  };

  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para verificar el código
    setStep("reset");
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para resetear la contraseña
    setStep("success");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E8F5E9] to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo Header */}
        <div className="text-center mb-8">
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
        </div>

        <Card className="shadow-xl border-2">
          {step === "request" && (
            <>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-6 w-6 text-[#3BA935]" />
                  Recuperar Contraseña
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Ingresa tu correo o teléfono para recibir un código de
                  verificación
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleRequestReset} className="space-y-6">
                  <Tabs
                    value={method}
                    onValueChange={(value) => setMethod(value as "email" | "phone")}
                  >
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="email">Correo</TabsTrigger>
                      <TabsTrigger value="phone">Teléfono</TabsTrigger>
                    </TabsList>

                    <TabsContent value="email" className="space-y-4 mt-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Correo Electrónico</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                          <Input
                            id="email"
                            type="email"
                            placeholder="ejemplo@correo.com"
                            value={formData.contact}
                            onChange={(e) =>
                              setFormData({ ...formData, contact: e.target.value })
                            }
                            className="pl-10 h-12"
                            required
                          />
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Te enviaremos un código de 6 dígitos a tu correo
                        </p>
                      </div>
                    </TabsContent>

                    <TabsContent value="phone" className="space-y-4 mt-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Número de Teléfono</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="+591 7123 4567"
                            value={formData.contact}
                            onChange={(e) =>
                              setFormData({ ...formData, contact: e.target.value })
                            }
                            className="pl-10 h-12"
                            required
                          />
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Te enviaremos un código de 6 dígitos por SMS
                        </p>
                      </div>
                    </TabsContent>
                  </Tabs>

                  <Button
                    type="submit"
                    className="w-full h-12 bg-[#3BA935] hover:bg-[#2E8B2A]"
                  >
                    Enviar Código
                  </Button>

                  <Button
                    type="button"
                    variant="ghost"
                    className="w-full"
                    onClick={onNavigateToLogin}
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Volver al inicio de sesión
                  </Button>
                </form>
              </CardContent>
            </>
          )}

          {step === "verify" && (
            <>
              <CardHeader>
                <CardTitle>Verificar Código</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Ingresa el código de 6 dígitos que enviamos a{" "}
                  <span className="text-[#3BA935]">{formData.contact}</span>
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleVerifyCode} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="code">Código de Verificación</Label>
                    <Input
                      id="code"
                      type="text"
                      placeholder="000000"
                      value={formData.code}
                      onChange={(e) =>
                        setFormData({ ...formData, code: e.target.value })
                      }
                      className="h-12 text-center text-2xl tracking-widest"
                      maxLength={6}
                      required
                    />
                  </div>

                  <div className="bg-[#E8F5E9] p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      ¿No recibiste el código?{" "}
                      <button
                        type="button"
                        className="text-[#3BA935] hover:underline"
                        onClick={() => {
                          // Lógica para reenviar código
                        }}
                      >
                        Reenviar código
                      </button>
                    </p>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 bg-[#3BA935] hover:bg-[#2E8B2A]"
                  >
                    Verificar
                  </Button>

                  <Button
                    type="button"
                    variant="ghost"
                    className="w-full"
                    onClick={() => setStep("request")}
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Cambiar correo/teléfono
                  </Button>
                </form>
              </CardContent>
            </>
          )}

          {step === "reset" && (
            <>
              <CardHeader>
                <CardTitle>Nueva Contraseña</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Crea una contraseña segura para tu cuenta
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleResetPassword} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">Nueva Contraseña</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="newPassword"
                        type="password"
                        placeholder="Mínimo 6 caracteres"
                        value={formData.newPassword}
                        onChange={(e) =>
                          setFormData({ ...formData, newPassword: e.target.value })
                        }
                        className="pl-10 h-12"
                        required
                        minLength={6}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="Repite tu contraseña"
                        value={formData.confirmPassword}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            confirmPassword: e.target.value,
                          })
                        }
                        className="pl-10 h-12"
                        required
                        minLength={6}
                      />
                    </div>
                  </div>

                  {formData.newPassword &&
                    formData.confirmPassword &&
                    formData.newPassword !== formData.confirmPassword && (
                      <p className="text-sm text-destructive">
                        Las contraseñas no coinciden
                      </p>
                    )}

                  <div className="bg-[#FFF9E6] p-4 rounded-lg">
                    <p className="text-sm">
                      <strong>Consejos para una contraseña segura:</strong>
                    </p>
                    <ul className="text-xs text-muted-foreground mt-2 space-y-1">
                      <li>• Mínimo 6 caracteres</li>
                      <li>• Combina letras y números</li>
                      <li>• No uses información personal obvia</li>
                    </ul>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 bg-[#3BA935] hover:bg-[#2E8B2A]"
                    disabled={
                      formData.newPassword !== formData.confirmPassword ||
                      !formData.newPassword
                    }
                  >
                    Cambiar Contraseña
                  </Button>
                </form>
              </CardContent>
            </>
          )}

          {step === "success" && (
            <>
              <CardHeader>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-[#E8F5E9] rounded-full mb-4">
                    <CheckCircle className="h-10 w-10 text-[#3BA935]" />
                  </div>
                  <CardTitle>¡Contraseña Actualizada!</CardTitle>
                  <p className="text-sm text-muted-foreground mt-2">
                    Tu contraseña ha sido cambiada exitosamente
                  </p>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-[#E8F5E9] p-4 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">
                      Ya puedes iniciar sesión con tu nueva contraseña
                    </p>
                  </div>

                  <Button
                    onClick={onNavigateToLogin}
                    className="w-full h-12 bg-[#3BA935] hover:bg-[#2E8B2A]"
                  >
                    Ir a Iniciar Sesión
                  </Button>
                </div>
              </CardContent>
            </>
          )}
        </Card>

        {step === "request" && (
          <div className="mt-6 text-center">
            <div className="bg-white rounded-lg p-4 shadow-sm border">
              <p className="text-sm text-muted-foreground mb-2">
                💡 <strong>¿Necesitas ayuda?</strong>
              </p>
              <p className="text-xs text-muted-foreground">
                Si no recuerdas tu correo o teléfono, contacta con soporte en tu
                comunidad
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
