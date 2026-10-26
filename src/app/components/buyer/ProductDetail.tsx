import { useState } from "react";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  User,
  Package,
  ShoppingCart,
  MessageCircle,
  Info,
} from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { toast } from "sonner@2.0.3";

interface ProductDetailProps {
  productId: string;
  onBack: () => void;
  onReservationCreated: () => void;
  onContactProducer: () => void;
}

export function ProductDetail({
  productId,
  onBack,
  onReservationCreated,
  onContactProducer,
}: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1);

  // Mock data - En producción vendría de una API o base de datos
  const product = {
    id: productId,
    name: "Quinua Real Orgánica",
    type: "Quinua",
    price: 12.0,
    unit: "kg",
    stock: 150,
    description:
      "Quinua Real de primera calidad, cultivada orgánicamente en las tierras altas de Sica Sica. Rica en proteínas y nutrientes esenciales.",
    images: [
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800",
      "https://images.unsplash.com/photo-1585326491688-bd2a490ea5ba?w=800",
    ],
    // Información de trazabilidad
    producer: {
      name: "Juan Mamani",
      phone: "+591 7123-4567",
      rating: 4.8,
    },
    location: {
      municipality: "Sica Sica",
      community: "Comunidad Villa Remedios",
      coordinates: "17°15'S, 67°45'W",
    },
    lot: {
      lotNumber: "LOT-2024-0515-JM-001",
      harvestDate: "2024-05-15",
      plotSize: "2 hectáreas",
      certification: "Orgánico certificado",
    },
    // Información bancaria del productor (para el pago)
    payment: {
      bankName: "Banco Unión",
      accountNumber: "10000123456789",
      accountHolder: "Juan Mamani Condori",
    },
  };

  const handleReserve = () => {
    if (quantity <= 0) {
      toast.error("Por favor ingresa una cantidad válida");
      return;
    }
    if (quantity > product.stock) {
      toast.error(`Solo hay ${product.stock} ${product.unit} disponibles`);
      return;
    }

    // Simular creación de reserva
    const totalAmount = quantity * product.price;
    toast.success(
      `Reserva creada por ${quantity} ${product.unit} - Total: Bs ${totalAmount.toFixed(2)}`,
      {
        description: "Tienes 24 horas para completar el pago",
      }
    );
    onReservationCreated();
  };

  const totalAmount = quantity * product.price;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#E8F5E9] pb-20 lg:pb-8">
      <div className="container mx-auto px-4 py-8">
        {/* Botón Volver */}
        <Button
          variant="ghost"
          className="mb-6"
          onClick={onBack}
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Volver al catálogo
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Columna Izquierda: Imágenes */}
          <div className="space-y-4">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="relative h-96">
                  <ImageWithFallback
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-4 left-4 bg-[#3BA935] hover:bg-[#2E8B2A]">
                    {product.type}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Imágenes adicionales */}
            <div className="grid grid-cols-2 gap-4">
              {product.images.slice(1).map((image, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="relative h-40">
                      <ImageWithFallback
                        src={image}
                        alt={`${product.name} ${index + 2}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Columna Derecha: Información */}
          <div className="space-y-6">
            {/* Información Básica */}
            <div>
              <h1 className="mb-2">{product.name}</h1>
              <p className="text-muted-foreground mb-4">
                {product.description}
              </p>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-[#3BA935]">Bs {product.price.toFixed(2)}</span>
                <span className="text-sm text-muted-foreground">
                  por {product.unit}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Stock disponible: {product.stock} {product.unit}
              </p>
            </div>

            <Separator />

            {/* Trazabilidad - Información del Productor */}
            <Card className="bg-[#E8F5E9] border-[#3BA935]">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Info className="h-5 w-5 text-[#3BA935]" />
                  <h3 className="text-[#3BA935]">Información de Origen</h3>
                </div>

                <div className="space-y-3">
                  {/* Productor */}
                  <div className="flex items-start gap-3">
                    <User className="h-5 w-5 text-[#3BA935] mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Productor</p>
                      <p>{product.producer.name}</p>
                      <p className="text-sm text-[#3BA935]">
                        ⭐ {product.producer.rating} / 5.0
                      </p>
                    </div>
                  </div>

                  {/* Ubicación */}
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-[#3BA935] mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Ubicación</p>
                      <p>{product.location.community}</p>
                      <p className="text-sm">{product.location.municipality}</p>
                    </div>
                  </div>

                  {/* Lote */}
                  <div className="flex items-start gap-3">
                    <Package className="h-5 w-5 text-[#3BA935] mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Información del Lote
                      </p>
                      <p className="text-sm">N° {product.lot.lotNumber}</p>
                      <p className="text-sm">Parcela: {product.lot.plotSize}</p>
                      <Badge
                        variant="secondary"
                        className="mt-1 bg-[#3BA935] text-white"
                      >
                        {product.lot.certification}
                      </Badge>
                    </div>
                  </div>

                  {/* Fecha de Cosecha */}
                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-[#3BA935] mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Fecha de Cosecha
                      </p>
                      <p>
                        {new Date(product.lot.harvestDate).toLocaleDateString(
                          "es-BO",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Formulario de Reserva */}
            <Card className="border-2 border-[#3BA935]">
              <CardContent className="p-6">
                <h3 className="mb-4">Realizar Reserva</h3>

                {/* Cantidad */}
                <div className="mb-4">
                  <Label htmlFor="quantity">
                    Cantidad ({product.unit})
                  </Label>
                  <Input
                    id="quantity"
                    type="number"
                    min="1"
                    max={product.stock}
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                    className="mt-2"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Máximo: {product.stock} {product.unit}
                  </p>
                </div>

                {/* Total */}
                <div className="bg-muted p-4 rounded-lg mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">
                      Subtotal
                    </span>
                    <span>Bs {totalAmount.toFixed(2)}</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between items-center">
                    <span>Total</span>
                    <span className="text-[#3BA935]">
                      Bs {totalAmount.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Información de Pago */}
                <div className="bg-[#FFF9E6] border border-[#F7C331] rounded-lg p-4 mb-4">
                  <p className="text-sm mb-2">
                    ℹ️ Después de reservar, tendrás <strong>24 horas</strong>{" "}
                    para realizar el pago.
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Deberás transferir a la cuenta del productor y subir el
                    comprobante.
                  </p>
                </div>

                {/* Botones de Acción */}
                <div className="space-y-3">
                  <Button
                    className="w-full bg-[#3BA935] hover:bg-[#2E8B2A]"
                    size="lg"
                    onClick={handleReserve}
                  >
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Reservar Producto
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full border-[#3BA935] text-[#3BA935] hover:bg-[#E8F5E9]"
                    size="lg"
                    onClick={onContactProducer}
                  >
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Contactar al Productor
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
