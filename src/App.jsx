import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    fetch('/assets/calendar-dados.json')
      .then(response => response.json())
      .then(data => {
        setCards(data.calendar);
      });
  }, []);

  const openModal = (card) => {
    setSelectedCard(card);
  };

  const closeModal = () => {
    setSelectedCard(null);
  };

  return (
    <>
      <header className="main-header">
        <div className="container">
          <h1>Treinamento Google Workspace</h1>
          <nav className="main-nav" role="navigation" id="main-nav">
            <ul>
              <li><a href="/">Início</a></li>
            </ul>
          </nav>
        </div>
      </header>
      <main>
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold mb-4">Treinamento Google Calendar</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {cards.map(card => (
              <div key={card.id} className="bg-white rounded-lg shadow-md p-4 cursor-pointer" onClick={() => openModal(card)}>
                <div className="text-2xl font-bold mb-2">{card.id}</div>
                <div className="text-lg">{card.title}</div>
              </div>
            ))}
          </div>

          {selectedCard && (
            <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={closeModal}>
              <div className="bg-white rounded-lg overflow-hidden w-full max-w-4xl" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center p-4 border-b">
                  <h2 className="text-2xl font-bold">{selectedCard.title}</h2>
                  <button className="text-2xl" onClick={closeModal}>&times;</button>
                </div>
                <div className="p-4">
                  <div className="aspect-w-16 aspect-h-9">
                    <iframe
                      src={selectedCard.videoUrl}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <footer className="main-footer">
        <div className="container">
          <p>Desenvolvido por Manuela dos Santos Leite</p>
          <div className="contact-links">
            <a href="https://www.linkedin.com/in/manuela-leite-1318691a3" target="_blank" rel="noopener noreferrer">LinkedIn</a> | <a href="https://github.com/Devcode2-web" target="_blank" rel="noopener noreferrer">GitHub</a> | <a href="mailto:manuelaleite.ciber@gmail.com">Email</a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default App;
