import { MapPin, Clock, Music, ShoppingCart, Menu, X, Globe, Plus, Minus } from 'lucide-react';
import { useState } from 'react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);
  const [quantities, setQuantities] = useState<Record<string, number>>({
    frontstage: 1,
    vip: 1,
    mesa: 1,
  });

  const tickets = [
    {
      id: 'frontstage',
      name: 'FrontStage',
      price: 'R$97,00',
      color: 'bg-blue-100',
      borderColor: 'border-blue-400',
      textColor: 'text-blue-800',
      checkoutUrl: 'https://seguro.safepagamentoseguro.shop/api/public/shopify?product=1965185172158&store=19651',
    },
    {
      id: 'vip',
      name: 'ÁREA VIP',
      price: 'R$150,00',
      color: 'bg-green-100',
      borderColor: 'border-green-400',
      textColor: 'text-green-800',
      checkoutUrl: 'https://seguro.safepagamentoseguro.shop/api/public/shopify?product=1965167366358&store=19651',
    },
    {
      id: 'mesa',
      name: 'MESA OURO (9 PESSOAS)',
      price: 'R$650,00',
      color: 'bg-yellow-100',
      borderColor: 'border-yellow-400',
      textColor: 'text-yellow-800',
      checkoutUrl: 'https://seguro.safepagamentoseguro.shop/api/public/shopify?product=1965182624748&store=19651',
    },
  ];

  const handleQuantityChange = (ticketId: string, change: number) => {
    setQuantities(prev => {
      const newQuantity = Math.max(1, Math.min(10, prev[ticketId] + change));
      return { ...prev, [ticketId]: newQuantity };
    });
  };

  const handleCompra = () => {
    if (!selectedTicket) return;
    const ticket = tickets.find(t => t.id === selectedTicket);
    if (ticket) {
      const quantity = quantities[selectedTicket];
      window.location.href = `${ticket.checkoutUrl}&quantity=${quantity}`;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-900 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src="/q2logo.png" alt="Q2 Ingressos" className="h-10" />
            </div>

            <nav className="hidden md:flex items-center gap-8">
              <a href="#" className="hover:text-blue-200 transition">Home</a>
              <a href="#" className="hover:text-blue-200 transition">Atendimento</a>
              <a href="#" className="hover:text-blue-200 transition flex items-center gap-1">
                <Globe className="w-4 h-4" /> PT
              </a>
            </nav>

            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {isMenuOpen && (
            <nav className="md:hidden mt-4 space-y-3 pb-4">
              <a href="#" className="block hover:text-blue-200 transition">Home</a>
              <a href="#" className="block hover:text-blue-200 transition">Atendimento</a>
            </nav>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Event Details */}
          <div className="lg:col-span-2">
            {/* Event Poster */}
            <div className="mb-8">
              <img
                src="/WhatsApp_Image_2026-03-26_at_15.56.21.jpeg"
                alt="Barzim de Rock 2026"
                className="w-full h-auto rounded-xl shadow-lg"
              />
            </div>

            {/* Event Title */}
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              BARZIM DE ROCK 2026
            </h2>

            {/* Event Info */}
            <div className="space-y-3 mb-8 text-gray-700">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-orange-500 flex-shrink-0" />
                <span className="text-lg">Sábado, 29 de agosto</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-orange-500 flex-shrink-0" />
                <span className="text-lg">Boulevard Music Hall - Natal/RN</span>
              </div>
            </div>

            {/* Ticket Selection - Mobile Only */}
            <div className="lg:hidden mb-8">
              <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold text-blue-900 mb-2">Selecione o ingresso</h3>
                <p className="text-sm text-gray-600 mb-6">
                  Ingressos reservados apenas após o acesso à tela de pagamento, sujeitos à disponibilidade.
                </p>

                <div className="space-y-3 mb-6">
                  {tickets.map((ticket) => (
                    <div key={ticket.id}>
                      <button
                        onClick={() => setSelectedTicket(ticket.id)}
                        className={`w-full text-left p-4 rounded-lg border-2 transition ${
                          selectedTicket === ticket.id
                            ? `${ticket.color} ${ticket.borderColor} border-2`
                            : 'bg-white border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className={`font-semibold ${selectedTicket === ticket.id ? ticket.textColor : 'text-gray-900'}`}>
                          {ticket.name}
                        </div>
                        <div className={`text-sm ${selectedTicket === ticket.id ? ticket.textColor : 'text-gray-600'}`}>
                          por {ticket.price}
                        </div>
                      </button>
                      {selectedTicket === ticket.id && (
                        <div className="mt-3 flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                          <span className="text-sm font-medium text-gray-700">Quantidade:</span>
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => handleQuantityChange(ticket.id, -1)}
                              className="w-8 h-8 flex items-center justify-center bg-white border border-gray-300 rounded-md hover:bg-gray-100 transition"
                              disabled={quantities[ticket.id] <= 1}
                            >
                              <Minus className="w-4 h-4 text-gray-600" />
                            </button>
                            <span className="text-lg font-semibold text-gray-900 w-8 text-center">
                              {quantities[ticket.id]}
                            </span>
                            <button
                              onClick={() => handleQuantityChange(ticket.id, 1)}
                              className="w-8 h-8 flex items-center justify-center bg-white border border-gray-300 rounded-md hover:bg-gray-100 transition"
                              disabled={quantities[ticket.id] >= 10}
                            >
                              <Plus className="w-4 h-4 text-gray-600" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <button
                  onClick={handleCompra}
                  disabled={!selectedTicket}
                  className={`w-full py-4 rounded-lg font-bold text-lg transition shadow-lg ${
                    selectedTicket
                      ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white hover:shadow-xl cursor-pointer'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <ShoppingCart className="w-5 h-5 inline mr-2" />
                  COMPRAR INGRESSO
                </button>
              </div>
            </div>

            {/* Venue Map */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Mapa do evento</h3>
              <div className="rounded-lg overflow-hidden">
                <img
                  src="/Gemini_Generated_Image_qyw02zqyw02zqyw0.png"
                  alt="Mapa do Evento"
                  className="w-full h-auto"
                />
              </div>
              <div className="rounded-lg overflow-hidden mt-4">
                <img
                  src="/Gemini_Generated_Image_8ir3sw8ir3sw8ir3.png"
                  alt="Detalhes dos Setores"
                  className="w-full h-auto"
                />
              </div>
            </div>

            {/* Event Description */}
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">O evento</h3>
                <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Informações do Evento</h4>
                    <div className="space-y-2 text-gray-700">
                      <p><strong>Data:</strong> Sábado, 29 de agosto</p>
                      <p><strong>Local:</strong> Boulevard Music Hall - Natal/RN</p>
                    </div>
                  </div>
                  <hr className="my-4" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Instagram do Evento</h4>
                    <a href="https://www.instagram.com/barzimderock" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">@barzimderock</a>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Descrição do evento</h3>
                <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Music className="w-5 h-5 text-orange-500" />
                      Atrações
                    </h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Barzim de Rock 2026</li>
                    </ul>
                  </div>

                  <hr className="my-4" />

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Setores</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• FrontStage</li>
                      <li>• ÁREA VIP</li>
                      <li>• MESA OURO (9 PESSOAS)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Ticket Selection - Desktop Only */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 sticky top-4">
              <h3 className="text-xl font-bold text-blue-900 mb-2">Selecione o ingresso</h3>
              <p className="text-sm text-gray-600 mb-6">
                Ingressos reservados apenas após o acesso à tela de pagamento, sujeitos à disponibilidade.
              </p>

              <div className="space-y-3 mb-6">
                {tickets.map((ticket) => (
                  <div key={ticket.id}>
                    <button
                      onClick={() => setSelectedTicket(ticket.id)}
                      className={`w-full text-left p-4 rounded-lg border-2 transition ${
                        selectedTicket === ticket.id
                          ? `${ticket.color} ${ticket.borderColor} border-2`
                          : 'bg-white border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className={`font-semibold ${selectedTicket === ticket.id ? ticket.textColor : 'text-gray-900'}`}>
                        {ticket.name}
                      </div>
                      <div className={`text-sm ${selectedTicket === ticket.id ? ticket.textColor : 'text-gray-600'}`}>
                        por {ticket.price}
                      </div>
                    </button>
                    {selectedTicket === ticket.id && (
                      <div className="mt-3 flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                        <span className="text-sm font-medium text-gray-700">Quantidade:</span>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => handleQuantityChange(ticket.id, -1)}
                            className="w-8 h-8 flex items-center justify-center bg-white border border-gray-300 rounded-md hover:bg-gray-100 transition"
                            disabled={quantities[ticket.id] <= 1}
                          >
                            <Minus className="w-4 h-4 text-gray-600" />
                          </button>
                          <span className="text-lg font-semibold text-gray-900 w-8 text-center">
                            {quantities[ticket.id]}
                          </span>
                          <button
                            onClick={() => handleQuantityChange(ticket.id, 1)}
                            className="w-8 h-8 flex items-center justify-center bg-white border border-gray-300 rounded-md hover:bg-gray-100 transition"
                            disabled={quantities[ticket.id] >= 10}
                          >
                            <Plus className="w-4 h-4 text-gray-600" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <button
                onClick={handleCompra}
                disabled={!selectedTicket}
                className={`w-full py-4 rounded-lg font-bold text-lg transition shadow-lg ${
                  selectedTicket
                    ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white hover:shadow-xl cursor-pointer'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <ShoppingCart className="w-5 h-5 inline mr-2" />
                COMPRAR INGRESSO
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center text-gray-600">
          <p>&copy; 2026 Q2 Ingressos. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
