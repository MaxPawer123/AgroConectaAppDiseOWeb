import { useState } from "react";
import { User, MapPin, Phone, Mail, Edit, Save } from "lucide-react";
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
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";

export function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Juan Mamani",
    community: "Sica Sica",
    phone: "+591 7123 4567",
    email: "juan.mamani@example.com",
    mainCrop: "Papa",
    farmSize: "5",
    experience: "10",
  });

  const handleSave = () => {
    setIsEditing(false);
    // Aquí iría la lógica para guardar en el backend
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1>Mi Perfil</h1>
        <p className="text-muted-foreground">
          Gestiona tu información personal y preferencias
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <Avatar className="h-32 w-32 mx-auto mb-4 bg-gradient-to-br from-[#3BA935] to-[#2E8B2A]">
                  <AvatarFallback className="text-white text-4xl">
                    {profile.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <h2 className="mb-2">{profile.name}</h2>
                <div className="flex items-center justify-center gap-2 text-muted-foreground mb-4">
                  <MapPin className="h-4 w-4" />
                  <span>{profile.community}</span>
                </div>
                <Badge className="bg-[#3BA935]">Productor Verificado</Badge>
              </div>

              <div className="mt-6 pt-6 border-t space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm">{profile.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm">{profile.email}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6 bg-[#E8F5E9]">
            <CardHeader>
              <CardTitle className="text-[#3BA935]">Estadísticas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">
                  Productos Registrados
                </span>
                <span>12</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">
                  Publicaciones
                </span>
                <span>23</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">
                  Conexiones
                </span>
                <span>45</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">
                  Miembro desde
                </span>
                <span>Enero 2024</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Edit Profile Form */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Información Personal</CardTitle>
                <Button
                  variant={isEditing ? "default" : "outline"}
                  onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                  className={isEditing ? "bg-[#3BA935] hover:bg-[#2E8B2A]" : ""}
                >
                  {isEditing ? (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Guardar
                    </>
                  ) : (
                    <>
                      <Edit className="mr-2 h-4 w-4" />
                      Editar
                    </>
                  )}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nombre Completo</Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) =>
                      setProfile({ ...profile, name: e.target.value })
                    }
                    disabled={!isEditing}
                  />
                </div>

                <div>
                  <Label htmlFor="community">Comunidad</Label>
                  <Select
                    value={profile.community}
                    onValueChange={(value) =>
                      setProfile({ ...profile, community: value })
                    }
                    disabled={!isEditing}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Sica Sica">Sica Sica</SelectItem>
                      <SelectItem value="Patacamaya">Patacamaya</SelectItem>
                      <SelectItem value="Umala">Umala</SelectItem>
                      <SelectItem value="Ayo Ayo">Ayo Ayo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input
                    id="phone"
                    value={profile.phone}
                    onChange={(e) =>
                      setProfile({ ...profile, phone: e.target.value })
                    }
                    disabled={!isEditing}
                  />
                </div>

                <div>
                  <Label htmlFor="email">Correo Electrónico</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) =>
                      setProfile({ ...profile, email: e.target.value })
                    }
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Información Agrícola</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="mainCrop">Cultivo Principal</Label>
                  <Select
                    value={profile.mainCrop}
                    onValueChange={(value) =>
                      setProfile({ ...profile, mainCrop: value })
                    }
                    disabled={!isEditing}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Papa">Papa</SelectItem>
                      <SelectItem value="Quinua">Quinua</SelectItem>
                      <SelectItem value="Habas">Habas</SelectItem>
                      <SelectItem value="Cebada">Cebada</SelectItem>
                      <SelectItem value="Oca">Oca</SelectItem>
                      <SelectItem value="Otro">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="farmSize">Tamaño de Parcela (hectáreas)</Label>
                  <Input
                    id="farmSize"
                    type="number"
                    value={profile.farmSize}
                    onChange={(e) =>
                      setProfile({ ...profile, farmSize: e.target.value })
                    }
                    disabled={!isEditing}
                  />
                </div>

                <div>
                  <Label htmlFor="experience">Años de Experiencia</Label>
                  <Input
                    id="experience"
                    type="number"
                    value={profile.experience}
                    onChange={(e) =>
                      setProfile({ ...profile, experience: e.target.value })
                    }
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Preferencias de Notificación</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p>Alertas Climáticas</p>
                  <p className="text-sm text-muted-foreground">
                    Recibir notificaciones sobre heladas y sequías
                  </p>
                </div>
                <input type="checkbox" defaultChecked className="h-5 w-5" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p>Actualizaciones de Precios</p>
                  <p className="text-sm text-muted-foreground">
                    Información sobre precios de mercado
                  </p>
                </div>
                <input type="checkbox" defaultChecked className="h-5 w-5" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p>Mensajes de la Comunidad</p>
                  <p className="text-sm text-muted-foreground">
                    Nuevas publicaciones y respuestas
                  </p>
                </div>
                <input type="checkbox" defaultChecked className="h-5 w-5" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#FFF9E6] border-[#F7C331]">
            <CardHeader>
              <CardTitle className="text-[#F7C331]">
                Consejos para tu Perfil
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm">
                ✓ Mantén tu información actualizada para mejores conexiones
              </p>
              <p className="text-sm">
                ✓ Agrega una foto de perfil para generar más confianza
              </p>
              <p className="text-sm">
                ✓ Completa tu información agrícola para recibir recomendaciones
                personalizadas
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
