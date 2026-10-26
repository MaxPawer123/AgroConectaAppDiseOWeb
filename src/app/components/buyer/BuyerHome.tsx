import { ShoppingCart, Clock, MessageCircle, Search } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { ImageWithFallback } from "../figma/ImageWithFallback";

interface BuyerHomeProps {
  onNavigate: (page: string) => void;
}

export function BuyerHome({ onNavigate }: BuyerHomeProps) {
  const features = [
    {
      id: "catalog",
      icon: Search,
      title: "Catálogo",
      description: "Buscar productos locales",
      color: "#3BA935",
      bgColor: "#E8F5E9",
    },
    {
      id: "reservations",
      icon: Clock,
      title: "Mis Reservas",
      description: "Ver pedidos y reservas",
      color: "#F7C331",
      bgColor: "#FFF9E6",
    },
    {
      id: "buyer-chat",
      icon: MessageCircle,
      title: "Chat",
      description: "Contactar productores",
      color: "#A87C4F",
      bgColor: "#EFEBE9",
    },
  ];

  // Mock data para reservas pendientes
  const pendingReservations = 2;
  const activeChats = 3;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E8F5E9] to-white">
      {/* Hero Section */}
      <div className="relative h-[400px] overflow-hidden">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1488459716781-31db52582fe9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXJtZXIlMjBtYXJrZXQlMjB2ZWdldGFibGVzfGVufDF8fHx8MTc2MjIyNTU3Mnww&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Mercado de productos agrícolas"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#3BA935]/80 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl text-white">
              <h1 className="mb-4">Compra Productos Locales</h1>
              <p className="text-xl opacity-90">
                Conecta directamente con productores de Sica Sica y Patacamaya.
                Productos frescos, trazables y de calidad.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card
                key={feature.id}
                className="cursor-pointer hover:shadow-lg transition-all transform hover:-translate-y-1 border-2 border-transparent hover:border-[#3BA935]"
                onClick={() => onNavigate(feature.id)}
              >
                <CardContent className="p-8 text-center">
                  <div
                    className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center"
                    style={{ backgroundColor: feature.bgColor }}
                  >
                    <Icon
                      className="w-10 h-10"
                      style={{ color: feature.color }}
                    />
                  </div>
                  <h3 className="mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Stats */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-[#3BA935] to-[#2E8B2A] text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Productos Disponibles</p>
                  <h2 className="mt-1">45</h2>
                </div>
                <ShoppingCart className="w-12 h-12 opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[#F7C331] to-[#E0A800] text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Reservas Pendientes</p>
                  <h2 className="mt-1">{pendingReservations}</h2>
                </div>
                <Clock className="w-12 h-12 opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[#A87C4F] to-[#8B6339] text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Conversaciones Activas</p>
                  <h2 className="mt-1">{activeChats}</h2>
                </div>
                <MessageCircle className="w-12 h-12 opacity-80" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Productos Destacados */}
        <div className="mt-12">
          <h2 className="mb-6">Productos Destacados</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "Quinua Real",
                price: "12.00",
                unit: "kg",
                location: "Sica Sica",
                image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400",
              },
              {
                name: "Haba Verde",
                price: "8.50",
                unit: "kg",
                location: "Patacamaya",
                image: "https://images.unsplash.com/photo-1615485500834-bc10199bc727?w=400",
              },
              {
                name: "Alfalfa Fresca",
                price: "25.00",
                unit: "quintal",
                location: "Sica Sica",
                image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400",
              },
              {
                name: "Papa Imilla",
                price: "4.00",
                unit: "kg",
                location: "Patacamaya",
                image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400",
              },
            ].map((product, index) => (
              <Card
                key={index}
                className="cursor-pointer hover:shadow-lg transition-all"
                onClick={() => onNavigate("catalog")}
              >
                <CardContent className="p-0">
                  <div className="relative h-40">
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover rounded-t-lg"
                    />
                    <div className="absolute top-2 right-2 bg-[#3BA935] text-white px-2 py-1 rounded-md text-xs">
                      Disponible
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="mb-1">{product.name}</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      📍 {product.location}
                    </p>
                    <p className="text-[#3BA935]">
                      Bs {product.price} / {product.unit}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
