import { useState } from "react";
import { UserPlus, User, Mail, Lock, Phone, MapPin, Sprout } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface RegisterProps {
  onRegister: () => void;
  onNavigateToLogin: () => void;
}

export function Register({ onRegister, onNavigateToLogin }: RegisterProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    community: "",
    mainCrop: "",
    farmSize: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else {
      // Aquí iría la lógica de registro
      onRegister();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E8F5E9] to-white flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
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
          <p className="text-muted-foreground">Únete a la comunidad de productores</p>
        </div>

        <Card className="shadow-xl border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserPlus className="h-6 w-6 text-[#3BA935]" />
              Crear Cuenta Nueva
            </CardTitle>
            <div className="flex items-center gap-2 mt-4">
              <div className={`flex-1 h-2 rounded-full ${step >= 1 ? 'bg-[#3BA935]' : 'bg-muted'}`} />
              <div className={`flex-1 h-2 rounded-full ${step >= 2 ? 'bg-[#3BA935]' : 'bg-muted'}`} />
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Paso {step} de 2 - {step === 1 ? 'Datos Personales' : 'Información Agrícola'}
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {step === 1 ? (
                <>
                  {/* Step 1: Personal Information */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nombre Completo *</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                          id="name"
                          type="text"
                          placeholder="Ej: Juan Mamani Quispe"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          className="pl-10 h-12"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Teléfono *</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="+591 7123 4567"
                            value={formData.phone}
                            onChange={(e) =>
                              setFormData({ ...formData, phone: e.target.value })
                            }
                            className="pl-10 h-12"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Correo Electrónico</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                          <Input
                            id="email"
                            type="email"
                            placeholder="ejemplo@correo.com"
                            value={formData.email}
                            onChange={(e) =>
                              setFormData({ ...formData, email: e.target.value })
                            }
                            className="pl-10 h-12"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="password">Contraseña *</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                          <Input
                            id="password"
                            type="password"
                            placeholder="Mínimo 6 caracteres"
                            value={formData.password}
                            onChange={(e) =>
                              setFormData({ ...formData, password: e.target.value })
                            }
                            className="pl-10 h-12"
                            required
                            minLength={6}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirmar Contraseña *</Label>
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
                    </div>

                    {formData.password &&
                      formData.confirmPassword &&
                      formData.password !== formData.confirmPassword && (
                        <p className="text-sm text-destructive">
                          Las contraseñas no coinciden
                        </p>
                      )}
                  </div>
                </>
              ) : (
                <>
                  {/* Step 2: Agricultural Information */}
                  <div className="space-y-4">
                    <div className="bg-[#E8F5E9] p-4 rounded-lg mb-4">
                      <p className="text-sm text-[#3BA935]">
                        📋 Esta información nos ayudará a personalizar tu experiencia
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="community">Comunidad / Municipio *</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground z-10" />
                        <Select
                          value={formData.community}
                          onValueChange={(value) =>
                            setFormData({ ...formData, community: value })
                          }
                          required
                        >
                          <SelectTrigger className="pl-10 h-12">
                            <SelectValue placeholder="Selecciona tu comunidad" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Sica Sica">Sica Sica</SelectItem>
                            <SelectItem value="Patacamaya">Patacamaya</SelectItem>
                            <SelectItem value="Umala">Umala</SelectItem>
                            <SelectItem value="Ayo Ayo">Ayo Ayo</SelectItem>
                            <SelectItem value="Calamarca">Calamarca</SelectItem>
                            <SelectItem value="Collana">Collana</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="mainCrop">Cultivo Principal *</Label>
                      <div className="relative">
                        <Sprout className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground z-10" />
                        <Select
                          value={formData.mainCrop}
                          onValueChange={(value) =>
                            setFormData({ ...formData, mainCrop: value })
                          }
                          required
                        >
                          <SelectTrigger className="pl-10 h-12">
                            <SelectValue placeholder="¿Qué produces principalmente?" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Papa">Papa</SelectItem>
                            <SelectItem value="Quinua">Quinua</SelectItem>
                            <SelectItem value="Habas">Habas</SelectItem>
                            <SelectItem value="Cebada">Cebada</SelectItem>
                            <SelectItem value="Oca">Oca</SelectItem>
                            <SelectItem value="Papalisa">Papalisa</SelectItem>
                            <SelectItem value="Trigo">Trigo</SelectItem>
                            <SelectItem value="Cañahua">Cañahua</SelectItem>
                            <SelectItem value="Otro">Otro</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="farmSize">
                        Tamaño de Parcela (hectáreas) - Opcional
                      </Label>
                      <Input
                        id="farmSize"
                        type="number"
                        step="0.1"
                        placeholder="Ej: 2.5"
                        value={formData.farmSize}
                        onChange={(e) =>
                          setFormData({ ...formData, farmSize: e.target.value })
                        }
                        className="h-12"
                      />
                    </div>

                    <div className="bg-[#FFF9E6] p-4 rounded-lg">
                      <h4 className="text-[#F7C331] mb-2">
                        ✨ Beneficios de completar tu perfil:
                      </h4>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>• Alertas climáticas personalizadas para tu zona</li>
                        <li>• Recomendaciones de cultivo específicas</li>
                        <li>• Conecta con productores cercanos</li>
                        <li>• Acceso a capacitaciones locales</li>
                      </ul>
                    </div>
                  </div>
                </>
              )}

              <div className="flex gap-3">
                {step === 2 && (
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 h-12"
                    onClick={() => setStep(1)}
                  >
                    Anterior
                  </Button>
                )}
                <Button
                  type="submit"
                  className="flex-1 h-12 bg-[#3BA935] hover:bg-[#2E8B2A]"
                  disabled={
                    step === 1 &&
                    formData.password !== formData.confirmPassword
                  }
                >
                  {step === 1 ? (
                    "Siguiente"
                  ) : (
                    <>
                      <UserPlus className="mr-2 h-5 w-5" />
                      Crear Cuenta
                    </>
                  )}
                </Button>
              </div>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-4 text-muted-foreground">
                    ¿Ya tienes cuenta?
                  </span>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                className="w-full h-12 border-[#3BA935] text-[#3BA935] hover:bg-[#E8F5E9]"
                onClick={onNavigateToLogin}
              >
                Iniciar Sesión
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
