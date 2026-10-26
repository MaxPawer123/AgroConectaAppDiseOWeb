import { useState } from "react";
import { Send, ArrowLeft, User, Phone, MapPin } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";

export function BuyerChat() {
  const [selectedChat, setSelectedChat] = useState<string | null>("1");
  const [messageText, setMessageText] = useState("");

  // Mock data de conversaciones
  const chats = [
    {
      id: "1",
      producer: {
        name: "Juan Mamani",
        initials: "JM",
        phone: "+591 7123-4567",
        community: "Comunidad Villa Remedios",
        location: "Sica Sica",
      },
      lastMessage: "Perfecto, te lo puedo entregar el viernes",
      lastMessageTime: "10:30",
      unreadCount: 2,
      messages: [
        {
          id: "1",
          sender: "buyer",
          text: "Hola, quisiera saber si tienes disponible 10 kg de quinua",
          time: "10:15",
        },
        {
          id: "2",
          sender: "producer",
          text: "¡Hola! Sí, tengo disponible. ¿Para cuándo lo necesitas?",
          time: "10:18",
        },
        {
          id: "3",
          sender: "buyer",
          text: "Para esta semana si es posible",
          time: "10:20",
        },
        {
          id: "4",
          sender: "producer",
          text: "Perfecto, te lo puedo entregar el viernes",
          time: "10:30",
        },
      ],
    },
    {
      id: "2",
      producer: {
        name: "María Quispe",
        initials: "MQ",
        phone: "+591 7234-5678",
        community: "Comunidad Vinto Coopani",
        location: "Patacamaya",
      },
      lastMessage: "De acuerdo, muchas gracias",
      lastMessageTime: "Ayer",
      unreadCount: 0,
      messages: [
        {
          id: "1",
          sender: "buyer",
          text: "Buenas tardes, ya realicé la transferencia por las habas",
          time: "14:30",
        },
        {
          id: "2",
          sender: "producer",
          text: "Perfecto, ya recibí tu comprobante. Lo verificaré hoy",
          time: "14:45",
        },
        {
          id: "3",
          sender: "buyer",
          text: "De acuerdo, muchas gracias",
          time: "14:50",
        },
      ],
    },
    {
      id: "3",
      producer: {
        name: "Pedro Condori",
        initials: "PC",
        phone: "+591 7345-6789",
        community: "Comunidad Jalsuri",
        location: "Sica Sica",
      },
      lastMessage: "¿Dónde te queda mejor?",
      lastMessageTime: "Lun",
      unreadCount: 1,
      messages: [
        {
          id: "1",
          sender: "buyer",
          text: "Hola Pedro, ¿cómo coordinamos la entrega de la alfalfa?",
          time: "09:15",
        },
        {
          id: "2",
          sender: "producer",
          text: "Hola, puedo llevártela o puedes pasar a recogerla. ¿Dónde te queda mejor?",
          time: "09:30",
        },
      ],
    },
  ];

  const currentChat = chats.find((chat) => chat.id === selectedChat);

  const handleSendMessage = () => {
    if (!messageText.trim() || !selectedChat) return;

    // Aquí se enviaría el mensaje a la base de datos
    console.log("Enviando mensaje:", messageText);
    setMessageText("");
  };

  return (
    <div className="h-[calc(100vh-73px)] lg:h-[calc(100vh-73px)] bg-white pb-16 lg:pb-0">
      <div className="h-full grid grid-cols-1 lg:grid-cols-3">
        {/* Lista de Conversaciones - Desktop siempre visible */}
        <div
          className={`border-r bg-white ${
            selectedChat && "hidden lg:block"
          }`}
        >
          <div className="p-4 border-b bg-[#3BA935] text-white">
            <h2>Conversaciones</h2>
            <p className="text-sm opacity-90">Contacta con productores</p>
          </div>

          <ScrollArea className="h-[calc(100%-88px)]">
            <div className="divide-y">
              {chats.map((chat) => (
                <div
                  key={chat.id}
                  className={`p-4 cursor-pointer hover:bg-muted transition-colors ${
                    selectedChat === chat.id ? "bg-[#E8F5E9]" : ""
                  }`}
                  onClick={() => setSelectedChat(chat.id)}
                >
                  <div className="flex items-start gap-3">
                    <Avatar className="h-12 w-12 bg-[#3BA935] text-white flex-shrink-0">
                      <AvatarFallback className="bg-[#3BA935] text-white">
                        {chat.producer.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="truncate">{chat.producer.name}</h4>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {chat.lastMessageTime}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        📍 {chat.producer.community}
                      </p>
                      <p className="text-sm text-muted-foreground truncate mt-1">
                        {chat.lastMessage}
                      </p>
                    </div>
                    {chat.unreadCount > 0 && (
                      <div className="bg-[#3BA935] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0">
                        {chat.unreadCount}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Área de Chat */}
        <div
          className={`lg:col-span-2 flex flex-col ${
            !selectedChat && "hidden lg:flex"
          }`}
        >
          {currentChat ? (
            <>
              {/* Header del Chat */}
              <div className="p-4 border-b bg-white">
                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="lg:hidden"
                    onClick={() => setSelectedChat(null)}
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </Button>

                  <Avatar className="h-10 w-10 bg-[#3BA935] text-white">
                    <AvatarFallback className="bg-[#3BA935] text-white">
                      {currentChat.producer.initials}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <h3 className="truncate">{currentChat.producer.name}</h3>
                    <p className="text-sm text-muted-foreground truncate">
                      {currentChat.producer.community}
                    </p>
                  </div>
                </div>
              </div>

              {/* Información del Productor */}
              <div className="p-4 bg-[#E8F5E9] border-b">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2 text-sm">
                    <User className="h-4 w-4 text-[#3BA935]" />
                    <span className="text-muted-foreground">
                      {currentChat.producer.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-[#3BA935]" />
                    <span className="text-muted-foreground">
                      {currentChat.producer.phone}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-[#3BA935]" />
                    <span className="text-muted-foreground">
                      {currentChat.producer.location}
                    </span>
                  </div>
                </div>
              </div>

              {/* Mensajes */}
              <ScrollArea className="flex-1 p-4 bg-gradient-to-b from-white to-[#E8F5E9]">
                <div className="space-y-4 max-w-4xl mx-auto">
                  {currentChat.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.sender === "buyer"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[70%] rounded-lg px-4 py-2 ${
                          message.sender === "buyer"
                            ? "bg-[#3BA935] text-white"
                            : "bg-white border border-gray-200"
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                        <p
                          className={`text-xs mt-1 ${
                            message.sender === "buyer"
                              ? "text-white/70"
                              : "text-muted-foreground"
                          }`}
                        >
                          {message.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Input de Mensaje */}
              <div className="p-4 border-t bg-white">
                <div className="flex gap-2 max-w-4xl mx-auto">
                  <Input
                    placeholder="Escribe tu mensaje..."
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        handleSendMessage();
                      }
                    }}
                    className="flex-1"
                  />
                  <Button
                    onClick={handleSendMessage}
                    className="bg-[#3BA935] hover:bg-[#2E8B2A]"
                    disabled={!messageText.trim()}
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-gradient-to-b from-white to-[#E8F5E9]">
              <div className="text-center text-muted-foreground">
                <div className="w-20 h-20 rounded-full bg-[#E8F5E9] flex items-center justify-center mx-auto mb-4">
                  <User className="h-10 w-10 text-[#3BA935]" />
                </div>
                <h3 className="mb-2">Selecciona una conversación</h3>
                <p className="text-sm">
                  Elige un productor para comenzar a chatear
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Placeholder cuando no hay chat seleccionado - Solo desktop */}
        {!selectedChat && (
          <div className="hidden lg:flex lg:col-span-2 items-center justify-center bg-gradient-to-b from-white to-[#E8F5E9]">
            <div className="text-center text-muted-foreground">
              <div className="w-20 h-20 rounded-full bg-[#E8F5E9] flex items-center justify-center mx-auto mb-4">
                <User className="h-10 w-10 text-[#3BA935]" />
              </div>
              <h3 className="mb-2">Selecciona una conversación</h3>
              <p className="text-sm">
                Elige un productor para comenzar a chatear
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
