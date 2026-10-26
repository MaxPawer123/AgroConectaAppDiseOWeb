import { Save, User, Shield, Database, Bell } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Separator } from "../ui/separator";
import { toast } from "sonner@2.0.3";

export function AdminSettings() {
  const handleSave = () => {
    toast.success("Configuración guardada", {
      description: "Los cambios han sido aplicados exitosamente",
    });
  };

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="mb-2">Ajustes del Sistema</h1>
          <p className="text-muted-foreground">
            Configura las opciones generales de la plataforma
          </p>
        </div>
        <Button
          onClick={handleSave}
          className="bg-[#3BA935] hover:bg-[#2E8B2A]"
        >
          <Save className="mr-2 h-4 w-4" />
          Guardar Cambios
        </Button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Perfil del Administrador */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-[#3BA935]" />
              Perfil del Administrador
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="adminName">Nombre Completo</Label>
              <Input
                id="adminName"
                defaultValue="Ing. Carlos Mendoza"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="adminEmail">Email</Label>
              <Input
                id="adminEmail"
                type="email"
                defaultValue="admin@agroconecta.bo"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="adminPhone">Teléfono</Label>
              <Input
                id="adminPhone"
                defaultValue="+591 2-1234567"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="institution">Institución</Label>
              <Input
                id="institution"
                defaultValue="UMSA - Facultad de Agronomía"
                className="mt-2"
              />
            </div>
          </CardContent>
        </Card>

        {/* Seguridad */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-[#3BA935]" />
              Seguridad
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="currentPassword">Contraseña Actual</Label>
              <Input
                id="currentPassword"
                type="password"
                placeholder="••••••••"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="newPassword">Nueva Contraseña</Label>
              <Input
                id="newPassword"
                type="password"
                placeholder="••••••••"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="confirmPassword">Confirmar Nueva Contraseña</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                className="mt-2"
              />
            </div>

            <Button variant="outline" className="w-full">
              Cambiar Contraseña
            </Button>
          </CardContent>
        </Card>

        {/* Configuración del Sistema */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5 text-[#3BA935]" />
              Sistema
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label>Aprobación automática de productores</Label>
                <p className="text-sm text-muted-foreground">
                  Los nuevos productores se aprueban automáticamente
                </p>
              </div>
              <Switch />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <Label>Modo mantenimiento</Label>
                <p className="text-sm text-muted-foreground">
                  Desactiva temporalmente la app para los usuarios
                </p>
              </div>
              <Switch />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <Label>Permitir nuevos registros</Label>
                <p className="text-sm text-muted-foreground">
                  Los usuarios pueden crear nuevas cuentas
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <Label>Sincronización automática</Label>
                <p className="text-sm text-muted-foreground">
                  Sincroniza datos automáticamente cada 5 minutos
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <Separator />

            <div>
              <Label htmlFor="backupInterval">
                Intervalo de respaldo (horas)
              </Label>
              <Input
                id="backupInterval"
                type="number"
                defaultValue="24"
                className="mt-2"
              />
            </div>
          </CardContent>
        </Card>

        {/* Notificaciones */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-[#3BA935]" />
              Notificaciones
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label>Nuevos usuarios registrados</Label>
                <p className="text-sm text-muted-foreground">
                  Recibe alerta cuando un nuevo usuario se registra
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <Label>Transacciones completadas</Label>
                <p className="text-sm text-muted-foreground">
                  Recibe notificación de ventas completadas
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <Label>Errores del sistema</Label>
                <p className="text-sm text-muted-foreground">
                  Alertas críticas de fallos o errores
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <Label>Resumen diario</Label>
                <p className="text-sm text-muted-foreground">
                  Reporte diario con estadísticas generales
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <Separator />

            <div>
              <Label htmlFor="notificationEmail">
                Email para notificaciones
              </Label>
              <Input
                id="notificationEmail"
                type="email"
                defaultValue="admin@agroconecta.bo"
                className="mt-2"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Información del Sistema */}
      <Card>
        <CardHeader>
          <CardTitle>Información del Sistema</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-muted-foreground">Versión</p>
              <p>1.0.0</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Base de Datos</p>
              <p className="text-[#3BA935]">Conectada</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Último Respaldo</p>
              <p>25 Nov 2024, 02:00</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Espacio Usado</p>
              <p>2.4 GB / 10 GB</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Usuarios Totales</p>
              <p>156</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
                Transacciones (mes)
              </p>
              <p>892</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Acciones de Mantenimiento */}
      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="text-red-600">Zona de Peligro</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Limpiar caché del sistema</Label>
              <p className="text-sm text-muted-foreground">
                Elimina archivos temporales y caché
              </p>
            </div>
            <Button variant="outline">Limpiar</Button>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <Label>Exportar datos</Label>
              <p className="text-sm text-muted-foreground">
                Descarga una copia de seguridad de todos los datos
              </p>
            </div>
            <Button variant="outline">Exportar</Button>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-red-600">Restablecer sistema</Label>
              <p className="text-sm text-muted-foreground">
                ⚠️ Esta acción eliminará todos los datos
              </p>
            </div>
            <Button variant="destructive">Restablecer</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
