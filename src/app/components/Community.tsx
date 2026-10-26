import { useState } from "react";
import { MessageCircle, ThumbsUp, Send, User, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface Post {
  id: string;
  author: string;
  location: string;
  date: string;
  category: string;
  content: string;
  likes: number;
  replies: number;
}

export function Community() {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: "1",
      author: "Juan Mamani",
      location: "Sica Sica",
      date: "Hace 2 horas",
      category: "Consulta",
      content:
        "¿Alguien sabe cuál es el mejor momento para aplicar fertilizante a las papas? Este año quiero mejorar mi producción.",
      likes: 5,
      replies: 3,
    },
    {
      id: "2",
      author: "María Quispe",
      location: "Patacamaya",
      date: "Hace 5 horas",
      category: "Experiencia",
      content:
        "Este año tuve muy buenos resultados con la variedad Huaycha. La producción aumentó un 30% comparado con el año pasado. Les recomiendo.",
      likes: 12,
      replies: 7,
    },
    {
      id: "3",
      author: "Pedro Condori",
      location: "Sica Sica",
      date: "Hace 1 día",
      category: "Alerta",
      content:
        "Cuidado con las heladas de esta semana. Ya estoy cubriendo mis cultivos. Sería bueno que otros también tomen precauciones.",
      likes: 8,
      replies: 4,
    },
  ]);

  const [newPost, setNewPost] = useState("");

  const categories = [
    { value: "all", label: "Todos", color: "default" },
    { value: "consulta", label: "Consultas", color: "blue" },
    { value: "experiencia", label: "Experiencias", color: "green" },
    { value: "alerta", label: "Alertas", color: "amber" },
    { value: "venta", label: "Compra/Venta", color: "purple" },
  ];

  const handlePostSubmit = () => {
    if (newPost.trim()) {
      const post: Post = {
        id: Date.now().toString(),
        author: "Tú",
        location: "Sica Sica",
        date: "Ahora",
        category: "Consulta",
        content: newPost,
        likes: 0,
        replies: 0,
      };
      setPosts([post, ...posts]);
      setNewPost("");
    }
  };

  const handleLike = (postId: string) => {
    setPosts(
      posts.map((post) =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "consulta":
        return "bg-blue-100 text-blue-800";
      case "experiencia":
        return "bg-green-100 text-green-800";
      case "alerta":
        return "bg-amber-100 text-amber-800";
      case "venta":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1>Comunidad AgroConecta</h1>
        <p className="text-muted-foreground">
          Comparte experiencias, consultas y consejos con otros productores
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* New Post Card */}
          <Card>
            <CardHeader>
              <CardTitle>Compartir con la comunidad</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="¿Qué quieres compartir con otros productores?"
                rows={4}
                className="resize-none"
              />
              <div className="flex justify-between items-center">
                <p className="text-sm text-muted-foreground">
                  Comparte tus experiencias, preguntas o alertas
                </p>
                <Button
                  onClick={handlePostSubmit}
                  disabled={!newPost.trim()}
                  className="bg-[#3BA935] hover:bg-[#2E8B2A]"
                >
                  <Send className="mr-2 h-4 w-4" />
                  Publicar
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Posts List */}
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="w-full justify-start overflow-x-auto">
              {categories.map((cat) => (
                <TabsTrigger key={cat.value} value={cat.value}>
                  {cat.label}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="all" className="space-y-4 mt-4">
              {posts.map((post) => (
                <Card key={post.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-12 w-12 bg-[#3BA935] flex-shrink-0">
                        <AvatarFallback className="bg-[#3BA935] text-white">
                          {post.author
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div>
                            <p>{post.author}</p>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <span>{post.location}</span>
                              <span>•</span>
                              <span>{post.date}</span>
                            </div>
                          </div>
                          <Badge className={getCategoryColor(post.category)}>
                            {post.category}
                          </Badge>
                        </div>

                        <p className="mb-4">{post.content}</p>

                        <div className="flex items-center gap-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleLike(post.id)}
                            className="text-muted-foreground hover:text-[#3BA935]"
                          >
                            <ThumbsUp className="mr-2 h-4 w-4" />
                            {post.likes} Me gusta
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-muted-foreground hover:text-[#3BA935]"
                          >
                            <MessageCircle className="mr-2 h-4 w-4" />
                            {post.replies} Respuestas
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            {categories.slice(1).map((cat) => (
              <TabsContent key={cat.value} value={cat.value} className="mt-4">
                <p className="text-center text-muted-foreground py-8">
                  No hay publicaciones en esta categoría aún
                </p>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card className="bg-gradient-to-br from-[#3BA935] to-[#2E8B2A] text-white">
            <CardHeader>
              <CardTitle>Miembros Activos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <p className="text-4xl mb-2">247</p>
                <p className="text-sm opacity-90">Productores conectados</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Productores Destacados</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: "María Quispe", posts: 45, likes: 234 },
                { name: "Juan Mamani", posts: 38, likes: 189 },
                { name: "Pedro Condori", posts: 32, likes: 167 },
              ].map((producer, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 bg-[#F7C331]">
                    <AvatarFallback className="bg-[#F7C331] text-white">
                      {producer.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm">{producer.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {producer.posts} publicaciones ��� {producer.likes} me gusta
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-[#FFF9E6]">
            <CardHeader>
              <CardTitle className="text-[#F7C331]">
                Temas Populares
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {[
                "Variedades de papa",
                "Control de plagas",
                "Fertilización orgánica",
                "Riego eficiente",
                "Heladas",
              ].map((topic, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 rounded hover:bg-white/50 cursor-pointer"
                >
                  <span className="text-sm">{topic}</span>
                  <Badge variant="secondary">{Math.floor(Math.random() * 20) + 5}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Próximos Eventos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="border-l-4 border-[#3BA935] pl-3">
                <p>Capacitación: Manejo de Suelos</p>
                <p className="text-sm text-muted-foreground">15 Nov - Sica Sica</p>
              </div>
              <div className="border-l-4 border-[#F7C331] pl-3">
                <p>Feria de Productos Orgánicos</p>
                <p className="text-sm text-muted-foreground">
                  22 Nov - Patacamaya
                </p>
              </div>
              <div className="border-l-4 border-[#A87C4F] pl-3">
                <p>Taller: Control de Plagas</p>
                <p className="text-sm text-muted-foreground">30 Nov - Umala</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
