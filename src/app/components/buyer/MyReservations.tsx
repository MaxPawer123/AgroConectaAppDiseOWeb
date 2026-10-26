import { useState, useEffect } from "react";
import {
  Clock,
  CheckCircle,
  XCircle,
  Upload,
  Package,
  Calendar,
  MapPin,
  User,
  AlertTriangle,
} from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { toast } from "sonner@2.0.3";

export function MyReservations() {
  // Estado para el contador regresivo
  const [timeRemaining, setTimeRemaining] = useState<{
    [key: string]: number;
  }>({});

  // Mock data de reservas
  const reservations = [
    {
      id: "RES-001",
      status: "RESERVADO", // RESERVADO, PAGADO, EN_ENTREGA, COMPLETADO, EXPIRADO, CANCELADO
      product: {
        name: "Quinua Real Orgánica",
        image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400",
        price: 12.0,
        unit: "kg",
      },
      quantity: 10,
      totalAmount: 120.0,
      producer: {
        name: "Juan Mamani",
        phone: "+591 7123-4567",
        community: "Comunidad Villa Remedios",
      },
      payment: {
        bankName: "Banco Unión",
        accountNumber: "10000123456789",
        accountHolder: "Juan Mamani Condori",
      },
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 horas atrás
      expiresAt: new Date(Date.now() + 22 * 60 * 60 * 1000).toISOString(), // 22 horas desde ahora
      deliveryDate: null,
    },
    {
      id: "RES-002",
      status: "RESERVADO",
      product: {
        name: "Haba Verde Fresca",
        image: "https://images.unsplash.com/photo-1615485500834-bc10199bc727?w=400",
        price: 8.5,
        unit: "kg",
      },
      quantity: 5,
      totalAmount: 42.5,
      producer: {
        name: "María Quispe",
        phone: "+591 7234-5678",
        community: "Comunidad Vinto Coopani",
      },
      payment: {
        bankName: "Banco Nacional de Bolivia",
        accountNumber: "20001234567890",
        accountHolder: "María Quispe Laura",
      },
      createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      expiresAt: new Date(Date.now() + 19 * 60 * 60 * 1000).toISOString(),
      deliveryDate: null,
    },
    {
      id: "RES-003",
      status: "PAGADO",
      product: {
        name: "Alfalfa Fresca",
        image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400",
        price: 25.0,
        unit: "quintal",
      },
      quantity: 3,
      totalAmount: 75.0,
      producer: {
        name: "Pedro Condori",
        phone: "+591 7345-6789",
        community: "Comunidad Jalsuri",
      },
      payment: {
        bankName: "Banco Mercantil Santa Cruz",
        accountNumber: "30002345678901",
        accountHolder: "Pedro Condori Mamani",
      },
      createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
      expiresAt: null,
      paymentDate: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      deliveryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "RES-004",
      status: "COMPLETADO",
      product: {
        name: "Papa Imilla",
        image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400",
        price: 4.0,
        unit: "kg",
      },
      quantity: 25,
      totalAmount: 100.0,
      producer: {
        name: "Rosa Apaza",
        phone: "+591 7456-7890",
        community: "Comunidad Ulloma",
      },
      payment: {
        bankName: "Banco Unión",
        accountNumber: "10003456789012",
        accountHolder: "Rosa Apaza Quispe",
      },
      createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      expiresAt: null,
      paymentDate: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(),
      deliveryDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      completedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "RES-005",
      status: "EXPIRADO",
      product: {
        name: "Cebolla Roja",
        image: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=400",
        price: 5.5,
        unit: "kg",
      },
      quantity: 8,
      totalAmount: 44.0,
      producer: {
        name: "Carlos Choque",
        phone: "+591 7567-8901",
        community: "Comunidad Machacamarca",
      },
      payment: {
        bankName: "Banco Unión",
        accountNumber: "10004567890123",
        accountHolder: "Carlos Choque Flores",
      },
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      expiresAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
      deliveryDate: null,
    },
  ];

  // Calcular tiempo restante para reservas pendientes
  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeRemaining: { [key: string]: number } = {};

      reservations.forEach((reservation) => {
        if (reservation.status === "RESERVADO" && reservation.expiresAt) {
          const now = new Date().getTime();
          const expiresAt = new Date(reservation.expiresAt).getTime();
          const remaining = expiresAt - now;
          newTimeRemaining[reservation.id] = Math.max(0, remaining);
        }
      });

      setTimeRemaining(newTimeRemaining);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Formatear tiempo restante
  const formatTimeRemaining = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  // Manejar subida de comprobante
  const handleUploadReceipt = (reservationId: string) => {
    toast.success("Comprobante enviado", {
      description: "El productor verificará tu pago pronto",
    });
  };

  // Obtener badge según el estado
  const getStatusBadge = (status: string) => {
    const styles = {
      RESERVADO: {
        className: "bg-[#F7C331] text-white",
        icon: Clock,
        label: "Pendiente de Pago",
      },
      PAGADO: {
        className: "bg-[#3BA935] text-white",
        icon: CheckCircle,
        label: "Pagado",
      },
      COMPLETADO: {
        className: "bg-[#3BA935] text-white",
        icon: CheckCircle,
        label: "Completado",
      },
      EXPIRADO: {
        className: "bg-red-500 text-white",
        icon: XCircle,
        label: "Expirado",
      },
      CANCELADO: {
        className: "bg-gray-500 text-white",
        icon: XCircle,
        label: "Cancelado",
      },
    };

    const config = styles[status as keyof typeof styles];
    const Icon = config.icon;

    return (
      <Badge className={config.className}>
        <Icon className="h-3 w-3 mr-1" />
        {config.label}
      </Badge>
    );
  };

  // Filtrar reservas por estado
  const pendingReservations = reservations.filter(
    (r) => r.status === "RESERVADO"
  );
  const activeReservations = reservations.filter(
    (r) => r.status === "PAGADO" || r.status === "EN_ENTREGA"
  );
  const completedReservations = reservations.filter(
    (r) => r.status === "COMPLETADO" || r.status === "EXPIRADO" || r.status === "CANCELADO"
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#E8F5E9] pb-20 lg:pb-8">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2">Mis Reservas y Pedidos</h1>
          <p className="text-muted-foreground">
            Gestiona tus reservas y haz seguimiento a tus pedidos
          </p>
        </div>

        {/* Tabs para filtrar por estado */}
        <Tabs defaultValue="pending" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="pending">
              Pendientes ({pendingReservations.length})
            </TabsTrigger>
            <TabsTrigger value="active">
              Activos ({activeReservations.length})
            </TabsTrigger>
            <TabsTrigger value="history">
              Historial ({completedReservations.length})
            </TabsTrigger>
          </TabsList>

          {/* Reservas Pendientes */}
          <TabsContent value="pending" className="space-y-6">
            {pendingReservations.length === 0 ? (
              <Card className="p-12 text-center">
                <Clock className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                <p className="text-muted-foreground">
                  No tienes reservas pendientes de pago
                </p>
              </Card>
            ) : (
              pendingReservations.map((reservation) => (
                <Card
                  key={reservation.id}
                  className="border-2 border-[#F7C331]"
                >
                  <CardContent className="p-6">
                    {/* Alerta de Tiempo */}
                    <div className="bg-[#FFF9E6] border border-[#F7C331] rounded-lg p-4 mb-4 flex items-start gap-3">
                      <AlertTriangle className="h-5 w-5 text-[#F7C331] mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-sm mb-2">
                          ⏰ Tiempo restante para completar el pago:
                        </p>
                        <div className="text-2xl text-[#F7C331] tabular-nums">
                          {formatTimeRemaining(
                            timeRemaining[reservation.id] || 0
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {/* Información del Producto */}
                      <div className="lg:col-span-2">
                        <div className="flex items-start gap-4 mb-4">
                          <div className="relative h-20 w-20 flex-shrink-0">
                            <ImageWithFallback
                              src={reservation.product.image}
                              alt={reservation.product.name}
                              className="w-full h-full object-cover rounded-lg"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h3>{reservation.product.name}</h3>
                                <p className="text-sm text-muted-foreground">
                                  Reserva: {reservation.id}
                                </p>
                              </div>
                              {getStatusBadge(reservation.status)}
                            </div>

                            <div className="space-y-2">
                              <div className="flex items-center gap-2 text-sm">
                                <Package className="h-4 w-4 text-muted-foreground" />
                                <span>
                                  {reservation.quantity} {reservation.product.unit}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                <User className="h-4 w-4 text-muted-foreground" />
                                <span>{reservation.producer.name}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                <span>{reservation.producer.community}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <Separator className="my-4" />

                        {/* Total */}
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">
                            Total a pagar:
                          </span>
                          <span className="text-[#3BA935]">
                            Bs {reservation.totalAmount.toFixed(2)}
                          </span>
                        </div>
                      </div>

                      {/* Información de Pago y Acciones */}
                      <div className="space-y-4">
                        {/* Datos Bancarios */}
                        <div className="bg-muted p-4 rounded-lg">
                          <p className="text-sm mb-2">
                            Realiza la transferencia a:
                          </p>
                          <div className="space-y-1 text-xs">
                            <p>
                              <strong>Banco:</strong> {reservation.payment.bankName}
                            </p>
                            <p>
                              <strong>Cuenta:</strong>{" "}
                              {reservation.payment.accountNumber}
                            </p>
                            <p>
                              <strong>Titular:</strong>{" "}
                              {reservation.payment.accountHolder}
                            </p>
                          </div>
                        </div>

                        {/* Botón de Subir Comprobante */}
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              className="w-full bg-[#3BA935] hover:bg-[#2E8B2A]"
                              size="lg"
                            >
                              <Upload className="mr-2 h-5 w-5" />
                              Subir Comprobante
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Subir Comprobante de Pago</DialogTitle>
                              <DialogDescription>
                                Sube una foto o captura del comprobante de
                                transferencia. El productor verificará tu pago.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <div>
                                <Label htmlFor="receipt">
                                  Comprobante de Pago
                                </Label>
                                <Input
                                  id="receipt"
                                  type="file"
                                  accept="image/*"
                                  className="mt-2"
                                />
                              </div>
                              <Button
                                className="w-full bg-[#3BA935] hover:bg-[#2E8B2A]"
                                onClick={() =>
                                  handleUploadReceipt(reservation.id)
                                }
                              >
                                Confirmar y Enviar
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          {/* Pedidos Activos */}
          <TabsContent value="active" className="space-y-6">
            {activeReservations.length === 0 ? (
              <Card className="p-12 text-center">
                <Package className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                <p className="text-muted-foreground">
                  No tienes pedidos activos en este momento
                </p>
              </Card>
            ) : (
              activeReservations.map((reservation) => (
                <Card key={reservation.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="relative h-20 w-20 flex-shrink-0">
                        <ImageWithFallback
                          src={reservation.product.image}
                          alt={reservation.product.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3>{reservation.product.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              Pedido: {reservation.id}
                            </p>
                          </div>
                          {getStatusBadge(reservation.status)}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm">
                              <Package className="h-4 w-4 text-muted-foreground" />
                              <span>
                                {reservation.quantity} {reservation.product.unit}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <User className="h-4 w-4 text-muted-foreground" />
                              <span>{reservation.producer.name}</span>
                            </div>
                          </div>
                          <div className="space-y-2">
                            {reservation.deliveryDate && (
                              <div className="flex items-center gap-2 text-sm">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <span>
                                  Entrega:{" "}
                                  {new Date(
                                    reservation.deliveryDate
                                  ).toLocaleDateString("es-BO")}
                                </span>
                              </div>
                            )}
                            <div className="text-sm">
                              <span className="text-muted-foreground">
                                Total:{" "}
                              </span>
                              <span className="text-[#3BA935]">
                                Bs {reservation.totalAmount.toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          {/* Historial */}
          <TabsContent value="history" className="space-y-6">
            {completedReservations.length === 0 ? (
              <Card className="p-12 text-center">
                <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                <p className="text-muted-foreground">
                  No tienes pedidos en el historial
                </p>
              </Card>
            ) : (
              completedReservations.map((reservation) => (
                <Card key={reservation.id} className="opacity-75">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="relative h-16 w-16 flex-shrink-0">
                        <ImageWithFallback
                          src={reservation.product.image}
                          alt={reservation.product.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4>{reservation.product.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              {reservation.id} •{" "}
                              {new Date(
                                reservation.createdAt
                              ).toLocaleDateString("es-BO")}
                            </p>
                          </div>
                          {getStatusBadge(reservation.status)}
                        </div>
                        <div className="mt-2 text-sm text-muted-foreground">
                          {reservation.quantity} {reservation.product.unit} • Bs{" "}
                          {reservation.totalAmount.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
