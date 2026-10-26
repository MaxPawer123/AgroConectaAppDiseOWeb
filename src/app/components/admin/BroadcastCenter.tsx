import { useState } from "react";
import { Send, Bell, Info, CloudRain, AlertTriangle, Smartphone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { toast } from "sonner@2.0.3";

export function BroadcastCenter() {
  const [destination, setDestination] = useState("all");
  const [alertType, setAlertType] = useState("info");
  const [message, setMessage] = useState("");

  // Mock data - Historial de mensajes
  const messageHistory = [
    {
      id: "1",
      type: "weather",
      title: "Alerta de Heladas",
      message: "Se esperan heladas en la zona de Sica Sica para los próximos 3 días. Protege tus cultivos.",
      destination: "Sica Sica",
      sentAt: "2024-11-25 08:30",
      recipients: 45,
    },
    {
      id: "2",
      type: "info",
      title: "Nueva Funcionalidad",
      message: "Ya puedes subir fotos de tus productos desde la app. Prueba la nueva función en la sección de Productos.",
      destination: "Todas las comunidades",
      sentAt: "2024-11-24 14:15",
      recipients: 156,
    },
    {
      id: "3",
      type: "urgent",
      title: "Bloqueo de Carreteras",
      message: "Debido al bloqueo en la carretera a Patacamaya, las entregas estarán retrasadas. Coordinen con sus compradores.",
      destination: "Patacamaya",
      sentAt: "2024-11-23 10:00",
      recipients: 67,
    },
  ];

  const handleSendMessage = () => {
    if (!message.trim()) {
      toast.error("Error", {
        description: "El mensaje no puede estar vacío",
      });
      return;
    }

    // Aquí se enviaría el mensaje a través de la API
    toast.success("Mensaje enviado", {
      description: `Se ha enviado la alerta a ${getDestinationText(destination)}`,
    });

    // Limpiar formulario
    setMessage("");
  };

  const getDestinationText = (dest: string) => {
    switch (dest) {
      case "all":
        return "todas las comunidades";
      case "sica":
        return "Sica Sica";
      case "patacamaya":
        return "Patacamaya";
      default:
        return dest;
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "info":
        return <Info className="h-5 w-5" />;
      case "weather":
        return <CloudRain className="h-5 w-5" />;
      case "urgent":
        return <AlertTriangle className="h-5 w-5" />;
      default:
        return <Bell className="h-5 w-5" />;
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case "info":
        return { bg: "bg-blue-500", text: "text-blue-500", border: "border-blue-500" };
      case "weather":
        return { bg: "bg-purple-500", text: "text-purple-500", border: "border-purple-500" };
      case "urgent":
        return { bg: "bg-red-500", text: "text-red-500", border: "border-red-500" };
      default:
        return { bg: "bg-gray-500", text: "text-gray-500", border: "border-gray-500" };
    }
  };

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="mb-2">Centro de Notificaciones</h1>
        <p className="text-muted-foreground">
          Envía alertas y mensajes a las comunidades de productores
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Columna Izquierda - Formulario */}
        <div className="xl:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Crear Nueva Alerta</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Selector de Destino */}
              <div>
                <Label htmlFor="destination">Destinatarios</Label>
                <Select value={destination} onValueChange={setDestination}>
                  <SelectTrigger id="destination" className="mt-2">
                    <SelectValue placeholder="Selecciona el destino" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">
                      Todas las comunidades (156 usuarios)
                    </SelectItem>
                    <SelectItem value="sica">
                      Solo Sica Sica (89 usuarios)
                    </SelectItem>
                    <SelectItem value="patacamaya">
                      Solo Patacamaya (67 usuarios)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              {/* Tipo de Alerta */}
              <div>
                <Label>Tipo de Alerta</Label>
                <RadioGroup
                  value={alertType}
                  onValueChange={setAlertType}
                  className="mt-3 space-y-3"
                >
                  <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-muted cursor-pointer">
                    <RadioGroupItem value="info" id="info" />
                    <Label
                      htmlFor="info"
                      className="flex items-center gap-2 cursor-pointer flex-1"
                    >
                      <Info className="h-5 w-5 text-blue-500" />
                      <div>
                        <p>Informativa</p>
                        <p className="text-xs text-muted-foreground">
                          Noticias, actualizaciones, consejos
                        </p>
                      </div>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-muted cursor-pointer">
                    <RadioGroupItem value="weather" id="weather" />
                    <Label
                      htmlFor="weather"
                      className="flex items-center gap-2 cursor-pointer flex-1"
                    >
                      <CloudRain className="h-5 w-5 text-purple-500" />
                      <div>
                        <p>Climática</p>
                        <p className="text-xs text-muted-foreground">
                          Alertas de clima, heladas, sequías
                        </p>
                      </div>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-muted cursor-pointer">
                    <RadioGroupItem value="urgent" id="urgent" />
                    <Label
                      htmlFor="urgent"
                      className="flex items-center gap-2 cursor-pointer flex-1"
                    >
                      <AlertTriangle className="h-5 w-5 text-red-500" />
                      <div>
                        <p>Urgente</p>
                        <p className="text-xs text-muted-foreground">
                          Emergencias, situaciones críticas
                        </p>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <Separator />

              {/* Mensaje */}
              <div>
                <Label htmlFor="message">Mensaje de la Alerta</Label>
                <Textarea
                  id="message"
                  placeholder="Escribe el mensaje que se enviará a los productores..."
                  className="mt-2 min-h-[150px]"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  maxLength={500}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {message.length}/500 caracteres
                </p>
              </div>

              {/* Botón de Envío */}
              <Button
                className="w-full bg-[#3BA935] hover:bg-[#2E8B2A]"
                size="lg"
                onClick={handleSendMessage}
                disabled={!message.trim()}
              >
                <Send className="mr-2 h-5 w-5" />
                Enviar Alerta
              </Button>
            </CardContent>
          </Card>

          {/* Historial de Mensajes */}
          <Card>
            <CardHeader>
              <CardTitle>Historial de Mensajes Enviados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {messageHistory.map((msg) => {
                  const colors = getAlertColor(msg.type);
                  return (
                    <div
                      key={msg.id}
                      className={`p-4 border-l-4 ${colors.border} bg-muted/30 rounded-r-lg`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className={colors.text}>
                            {getAlertIcon(msg.type)}
                          </div>
                          <h4>{msg.title}</h4>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {msg.sentAt}
                        </p>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {msg.message}
                      </p>
                      <div className="flex items-center gap-4 text-xs">
                        <span className="text-muted-foreground">
                          📍 {msg.destination}
                        </span>
                        <span className="text-muted-foreground">
                          👥 {msg.recipients} destinatarios
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Columna Derecha - Vista Previa */}
        <div className="space-y-6">
          <Card className="sticky top-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="h-5 w-5" />
                Vista Previa
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Así verá el productor la notificación en su dispositivo:
              </p>

              {/* Simulación de Notificación Móvil */}
              <div className="bg-gray-100 rounded-xl p-4 border-2 border-gray-300">
                {/* Pantalla de celular */}
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  {/* Barra superior */}
                  <div className="bg-[#3BA935] text-white p-3 flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    <span>AgroConecta</span>
                  </div>

                  {/* Contenido de la notificación */}
                  <div className="p-4">
                    <div className="flex items-start gap-3 mb-3">
                      <div
                        className={`p-2 rounded-full ${
                          getAlertColor(alertType).bg
                        } text-white`}
                      >
                        {getAlertIcon(alertType)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge
                            className={`${getAlertColor(alertType).bg} text-white`}
                          >
                            {alertType === "info"
                              ? "Informativa"
                              : alertType === "weather"
                              ? "Climática"
                              : "Urgente"}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Administrador del Sistema
                        </p>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-3 min-h-[100px]">
                      {message ? (
                        <p className="text-sm">{message}</p>
                      ) : (
                        <p className="text-sm text-muted-foreground italic">
                          El mensaje aparecerá aquí...
                        </p>
                      )}
                    </div>

                    <div className="mt-3 text-xs text-muted-foreground">
                      📍 Para: {getDestinationText(destination)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Información adicional */}
              <div className="mt-4 p-3 bg-[#E8F5E9] rounded-lg">
                <p className="text-xs text-[#3BA935]">
                  💡 Las notificaciones se envían instantáneamente a los
                  usuarios activos y quedan guardadas en la sección de
                  Comunidad.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Estadísticas */}
          <Card>
            <CardHeader>
              <CardTitle>Estadísticas de Mensajería</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Mensajes enviados (mes)
                </span>
                <span>24</span>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Tasa de lectura
                </span>
                <span className="text-[#3BA935]">87%</span>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Usuarios alcanzados
                </span>
                <span>156</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
