import { User, Phone, Mail, MapPin, Calendar, Edit2, ShoppingBag } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";

export function BuyerProfile() {
  // Mock data del perfil del comprador
  const buyerProfile = {
    name: "Roberto Flores",
    email: "roberto.flores@email.com",
    phone: "+591 7890-1234",
    location: "La Paz, Bolivia",
    memberSince: "2024-03-15",
    stats: {
      totalPurchases: 12,
      totalSpent: 1450.0,
      activeReservations: 2,
    },
  };

  // Historial reciente de compras
  const recentPurchases = [
    {
      id: "1",
      product: "Quinua Real Orgánica",
      producer: "Juan Mamani",
      date: "2024-11-20",
      amount: 120.0,
      status: "Completado",
    },
    {
      id: "2",
      product: "Papa Imilla",
      producer: "Rosa Apaza",
      date: "2024-11-15",
      amount: 100.0,
      status: "Completado",
    },
    {
      id: "3",
      product: "Haba Verde",
      producer: "María Quispe",
      date: "2024-11-10",
      amount: 42.5,
      status: "Completado",
    },
  ];

  // Productores favoritos o frecuentes
  const frequentProducers = [
    {
      name: "Juan Mamani",
      community: "Comunidad Villa Remedios",
      purchaseCount: 5,
    },
    {
      name: "María Quispe",
      community: "Comunidad Vinto Coopani",
      purchaseCount: 3,
    },
    {
      name: "Pedro Condori",
      community: "Comunidad Jalsuri",
      purchaseCount: 2,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#E8F5E9] pb-20 lg:pb-8">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2">Mi Perfil</h1>
          <p className="text-muted-foreground">
            Información personal y resumen de actividad
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Columna Izquierda - Información Personal */}
          <div className="lg:col-span-1 space-y-6">
            {/* Tarjeta de Perfil */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="h-24 w-24 bg-[#3BA935] text-white mb-4">
                    <AvatarFallback className="bg-[#3BA935] text-white text-2xl">
                      {buyerProfile.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <h2 className="mb-1">{buyerProfile.name}</h2>
                  <Badge className="bg-[#3BA935] hover:bg-[#2E8B2A] mb-4">
                    Comprador
                  </Badge>
                  <Button variant="outline" className="w-full">
                    <Edit2 className="mr-2 h-4 w-4" />
                    Editar Perfil
                  </Button>
                </div>

                <Separator className="my-6" />

                {/* Información de Contacto */}
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-[#3BA935] mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="text-sm">{buyerProfile.email}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-[#3BA935] mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Teléfono</p>
                      <p className="text-sm">{buyerProfile.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-[#3BA935] mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Ubicación</p>
                      <p className="text-sm">{buyerProfile.location}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-[#3BA935] mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Miembro desde
                      </p>
                      <p className="text-sm">
                        {new Date(
                          buyerProfile.memberSince
                        ).toLocaleDateString("es-BO", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Estadísticas Rápidas */}
            <Card>
              <CardHeader>
                <CardTitle>Estadísticas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-[#E8F5E9] rounded-lg">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Compras Totales
                    </p>
                    <p className="text-2xl text-[#3BA935]">
                      {buyerProfile.stats.totalPurchases}
                    </p>
                  </div>
                  <ShoppingBag className="h-8 w-8 text-[#3BA935]" />
                </div>

                <div className="flex items-center justify-between p-3 bg-[#FFF9E6] rounded-lg">
                  <div>
                    <p className="text-sm text-muted-foreground">Monto Total</p>
                    <p className="text-2xl text-[#F7C331]">
                      Bs {buyerProfile.stats.totalSpent.toFixed(2)}
                    </p>
                  </div>
                  <span className="text-3xl">💰</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-[#EFEBE9] rounded-lg">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Reservas Activas
                    </p>
                    <p className="text-2xl text-[#A87C4F]">
                      {buyerProfile.stats.activeReservations}
                    </p>
                  </div>
                  <span className="text-3xl">📦</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Columna Derecha - Actividad */}
          <div className="lg:col-span-2 space-y-6">
            {/* Compras Recientes */}
            <Card>
              <CardHeader>
                <CardTitle>Compras Recientes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentPurchases.map((purchase) => (
                    <div key={purchase.id}>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h4 className="mb-1">{purchase.product}</h4>
                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">
                              <User className="inline h-3 w-3 mr-1" />
                              {purchase.producer}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              <Calendar className="inline h-3 w-3 mr-1" />
                              {new Date(purchase.date).toLocaleDateString(
                                "es-BO"
                              )}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-[#3BA935] mb-2">
                            Bs {purchase.amount.toFixed(2)}
                          </p>
                          <Badge className="bg-[#3BA935] hover:bg-[#2E8B2A]">
                            {purchase.status}
                          </Badge>
                        </div>
                      </div>
                      {purchase.id !== recentPurchases[recentPurchases.length - 1].id && (
                        <Separator className="mt-4" />
                      )}
                    </div>
                  ))}
                </div>

                <Button variant="outline" className="w-full mt-6">
                  Ver Todo el Historial
                </Button>
              </CardContent>
            </Card>

            {/* Productores Frecuentes */}
            <Card>
              <CardHeader>
                <CardTitle>Productores Frecuentes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {frequentProducers.map((producer, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10 bg-[#3BA935] text-white">
                            <AvatarFallback className="bg-[#3BA935] text-white">
                              {producer.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p>{producer.name}</p>
                            <p className="text-sm text-muted-foreground">
                              📍 {producer.community}
                            </p>
                          </div>
                        </div>
                        <Badge variant="secondary">
                          {producer.purchaseCount}{" "}
                          {producer.purchaseCount === 1 ? "compra" : "compras"}
                        </Badge>
                      </div>
                      {index !== frequentProducers.length - 1 && (
                        <Separator className="mt-4" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Métodos de Pago (futuro) */}
            <Card>
              <CardHeader>
                <CardTitle>Métodos de Pago</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <p className="mb-4">
                    Los pagos se realizan directamente a las cuentas bancarias
                    de los productores
                  </p>
                  <p className="text-sm">
                    Puedes subir el comprobante desde la sección de Reservas
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
