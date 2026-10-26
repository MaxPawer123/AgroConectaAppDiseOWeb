import { useState } from "react";
import { Eye, CheckCircle, ShoppingCart, User, AlertCircle, XCircle } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { toast } from "sonner@2.0.3";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import quinuaImage from "figma:asset/d70a8a4876d7ebf558541a0290f27e39f8579cc7.png";

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  time: string;
  status: "pending_confirmation" | "pending_payment" | "paid" | "rejected";
  buyer: {
    name: string;
    avatar?: string;
  };
  product: {
    name: string;
    image: string;
    quantity: number;
    unit: string;
    totalPrice: number;
  };
  paymentProof?: string;
}

export function OrderManagement() {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "1",
      orderNumber: "#1024",
      date: "Hoy",
      time: "10:30 AM",
      status: "pending_confirmation",
      buyer: {
        name: "Roberto Flores",
      },
      product: {
        name: "Quinua Real Blanca",
        image: quinuaImage,
        quantity: 10,
        unit: "Kg",
        totalPrice: 120.0,
      },
      paymentProof: "https://via.placeholder.com/600x400?text=Comprobante+de+Pago",
    },
    {
      id: "2",
      orderNumber: "#1023",
      date: "Hoy",
      time: "09:15 AM",
      status: "pending_confirmation",
      buyer: {
        name: "María Quispe",
      },
      product: {
        name: "Quinua Real Blanca",
        image: quinuaImage,
        quantity: 25,
        unit: "Kg",
        totalPrice: 300.0,
      },
      paymentProof: "https://via.placeholder.com/600x400?text=Comprobante+de+Pago",
    },
    {
      id: "3",
      orderNumber: "#1022",
      date: "Ayer",
      time: "04:20 PM",
      status: "pending_payment",
      buyer: {
        name: "Carlos Mendoza",
      },
      product: {
        name: "Quinua Real Blanca",
        image: quinuaImage,
        quantity: 15,
        unit: "Kg",
        totalPrice: 180.0,
      },
    },
    {
      id: "4",
      orderNumber: "#1021",
      date: "Ayer",
      time: "02:45 PM",
      status: "pending_payment",
      buyer: {
        name: "Ana Torres",
      },
      product: {
        name: "Quinua Real Blanca",
        image: quinuaImage,
        quantity: 20,
        unit: "Kg",
        totalPrice: 240.0,
      },
    },
    {
      id: "5",
      orderNumber: "#1020",
      date: "15 Dic",
      time: "11:30 AM",
      status: "paid",
      buyer: {
        name: "Jorge Mamani",
      },
      product: {
        name: "Quinua Real Blanca",
        image: quinuaImage,
        quantity: 30,
        unit: "Kg",
        totalPrice: 360.0,
      },
      paymentProof: "https://via.placeholder.com/600x400?text=Comprobante+de+Pago",
    },
    {
      id: "6",
      orderNumber: "#1019",
      date: "14 Dic",
      time: "03:15 PM",
      status: "paid",
      buyer: {
        name: "Patricia Condori",
      },
      product: {
        name: "Quinua Real Blanca",
        image: quinuaImage,
        quantity: 18,
        unit: "Kg",
        totalPrice: 216.0,
      },
      paymentProof: "https://via.placeholder.com/600x400?text=Comprobante+de+Pago",
    },
  ]);

  const [selectedProof, setSelectedProof] = useState<string | null>(null);
  const [isProofDialogOpen, setIsProofDialogOpen] = useState(false);

  // Función para confirmar pago
  const handleConfirmPayment = (orderId: string) => {
    setOrders(orders.map(order => 
      order.id === orderId 
        ? { ...order, status: "paid" as const }
        : order
    ));
    toast.success("Pago confirmado exitosamente");
  };

  // Función para rechazar pedido
  const handleRejectOrder = (orderId: string) => {
    setOrders(orders.map(order => 
      order.id === orderId 
        ? { ...order, status: "rejected" as const }
        : order
    ));
    toast.error("Pedido rechazado");
  };

  // Función para ver comprobante
  const handleViewProof = (proofUrl: string) => {
    setSelectedProof(proofUrl);
    setIsProofDialogOpen(true);
  };

  // Función para obtener el badge de estado
  const getStatusBadge = (status: Order["status"]) => {
    switch (status) {
      case "pending_confirmation":
        return (
          <Badge className="bg-[#F7C331] text-gray-800 hover:bg-[#F7C331]/90">
            <AlertCircle className="mr-1 h-4 w-4" />
            Comprobante Recibido
          </Badge>
        );
      case "pending_payment":
        return (
          <Badge className="bg-orange-500 text-white hover:bg-orange-600">
            <ShoppingCart className="mr-1 h-4 w-4" />
            Esperando Pago
          </Badge>
        );
      case "paid":
        return (
          <Badge className="bg-[#3BA935] text-white hover:bg-[#3BA935]/90">
            <CheckCircle className="mr-1 h-4 w-4" />
            Pagado
          </Badge>
        );
      case "rejected":
        return (
          <Badge className="bg-red-500 text-white hover:bg-red-600">
            <XCircle className="mr-1 h-4 w-4" />
            Rechazado
          </Badge>
        );
    }
  };

  // Función para renderizar una tarjeta de pedido
  const renderOrderCard = (order: Order, showActions: boolean = true) => (
    <Card key={order.id} className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        {/* Header del Pedido */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <h3 className="text-lg">Pedido {order.orderNumber}</h3>
            <span className="text-sm text-muted-foreground">
              {order.date}, {order.time}
            </span>
          </div>
          {getStatusBadge(order.status)}
        </div>

        {/* Información del Comprador */}
        <div className="flex items-center gap-3 mb-4 p-3 bg-muted/50 rounded-lg">
          <div className="h-12 w-12 rounded-full bg-[#3BA935] flex items-center justify-center text-white shrink-0">
            <User className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Comprador</p>
            <p className="font-medium">{order.buyer.name}</p>
          </div>
        </div>

        {/* Información del Producto */}
        <div className="flex gap-4 mb-6 p-4 border rounded-lg">
          <ImageWithFallback
            src={order.product.image}
            alt={order.product.name}
            className="w-20 h-20 object-cover rounded-lg shrink-0"
          />
          <div className="flex-1 min-w-0">
            <h4 className="font-medium mb-1 truncate">{order.product.name}</h4>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-muted-foreground">
              <span>Cantidad: {order.product.quantity} {order.product.unit}</span>
              <span className="hidden sm:inline">•</span>
              <span className="font-semibold text-[#3BA935]">
                Bs. {order.product.totalPrice.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Área de Acciones */}
        {showActions && (
          <div className="space-y-3">
            {order.status === "pending_confirmation" && (
              <>
                <div className="flex flex-col sm:flex-row gap-3">
                  {order.paymentProof && (
                    <Button
                      variant="outline"
                      className="flex-1 border-[#3BA935] text-[#3BA935] hover:bg-[#3BA935]/10"
                      onClick={() => handleViewProof(order.paymentProof!)}
                    >
                      <Eye className="mr-2 h-5 w-5" />
                      Ver Comprobante
                    </Button>
                  )}
                  <Button
                    className="flex-1 bg-[#3BA935] hover:bg-[#2E8B2A] text-white"
                    onClick={() => handleConfirmPayment(order.id)}
                  >
                    <CheckCircle className="mr-2 h-5 w-5" />
                    Confirmar Pago
                  </Button>
                </div>
                <button
                  className="text-sm text-red-500 hover:text-red-700 hover:underline w-full text-center"
                  onClick={() => handleRejectOrder(order.id)}
                >
                  Rechazar pedido
                </button>
              </>
            )}
            {order.status === "pending_payment" && (
              <div className="flex items-center gap-2 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                <AlertCircle className="h-5 w-5 text-orange-500 shrink-0" />
                <p className="text-sm text-orange-700">
                  Esperando que el comprador envíe el comprobante de pago
                </p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );

  // Filtrar pedidos por estado
  const pendingConfirmationOrders = orders.filter(o => o.status === "pending_confirmation");
  const pendingPaymentOrders = orders.filter(o => o.status === "pending_payment");
  const historyOrders = orders.filter(o => o.status === "paid" || o.status === "rejected");

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-7xl">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-[#3BA935] p-3 rounded-lg">
            <ShoppingCart className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl">Gestión de Pedidos</h1>
            <p className="text-muted-foreground">
              Gestiona y confirma las ventas de tus productos
            </p>
          </div>
        </div>
      </div>

      {/* Tabs de Pedidos */}
      <Tabs defaultValue="pending_confirmation" className="w-full">
        <TabsList className="w-full grid grid-cols-3 mb-6 h-auto">
          <TabsTrigger 
            value="pending_confirmation"
            className="data-[state=active]:bg-[#3BA935] data-[state=active]:text-white flex-col sm:flex-row gap-1 sm:gap-2 py-3"
          >
            <span className="text-sm sm:text-base">Por Confirmar</span>
            {pendingConfirmationOrders.length > 0 && (
              <Badge className="bg-[#F7C331] text-gray-800 hover:bg-[#F7C331]">
                {pendingConfirmationOrders.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger 
            value="pending_payment"
            className="data-[state=active]:bg-[#3BA935] data-[state=active]:text-white flex-col sm:flex-row gap-1 sm:gap-2 py-3"
          >
            <span className="text-sm sm:text-base">Pendientes de Pago</span>
            {pendingPaymentOrders.length > 0 && (
              <Badge className="bg-orange-500 text-white hover:bg-orange-500">
                {pendingPaymentOrders.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger 
            value="history"
            className="data-[state=active]:bg-[#3BA935] data-[state=active]:text-white py-3"
          >
            <span className="text-sm sm:text-base">Historial</span>
          </TabsTrigger>
        </TabsList>

        {/* Por Confirmar */}
        <TabsContent value="pending_confirmation" className="space-y-4">
          {pendingConfirmationOrders.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <CheckCircle className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-lg mb-2">No hay pedidos por confirmar</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Todos los pedidos con comprobante han sido procesados
                </p>
              </CardContent>
            </Card>
          ) : (
            pendingConfirmationOrders.map(order => renderOrderCard(order))
          )}
        </TabsContent>

        {/* Pendientes de Pago */}
        <TabsContent value="pending_payment" className="space-y-4">
          {pendingPaymentOrders.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <ShoppingCart className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-lg mb-2">No hay pedidos pendientes de pago</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Todos los pedidos activos han enviado su comprobante
                </p>
              </CardContent>
            </Card>
          ) : (
            pendingPaymentOrders.map(order => renderOrderCard(order))
          )}
        </TabsContent>

        {/* Historial */}
        <TabsContent value="history" className="space-y-4">
          {historyOrders.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <ShoppingCart className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-lg mb-2">No hay historial de pedidos</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Los pedidos completados o rechazados aparecerán aquí
                </p>
              </CardContent>
            </Card>
          ) : (
            historyOrders.map(order => renderOrderCard(order, false))
          )}
        </TabsContent>
      </Tabs>

      {/* Dialog para Ver Comprobante */}
      <Dialog open={isProofDialogOpen} onOpenChange={setIsProofDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Comprobante de Pago</DialogTitle>
            <DialogDescription>
              Revisa el comprobante enviado por el comprador
            </DialogDescription>
          </DialogHeader>
          {selectedProof && (
            <div className="mt-4">
              <ImageWithFallback
                src={selectedProof}
                alt="Comprobante de pago"
                className="w-full rounded-lg border"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
