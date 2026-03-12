export function WhatsAppButton() {
  const phone = "5527999999999";
  const message = encodeURIComponent("Olá! Gostaria de informações sobre os produtos da Ferramentas Valfre.");
  const url = `https://wa.me/${phone}?text=${message}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-[100] flex items-center justify-center w-14 h-14 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300"
      style={{ backgroundColor: "#25D366" }}
      aria-label="Fale conosco no WhatsApp"
      title="Fale conosco no WhatsApp"
    >
      <svg viewBox="0 0 32 32" className="w-8 h-8 fill-white" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.004 2.667C8.64 2.667 2.667 8.64 2.667 16c0 2.357.624 4.568 1.712 6.483L2.667 29.333l7.075-1.693A13.27 13.27 0 0 0 16.004 29.333C23.36 29.333 29.333 23.36 29.333 16S23.36 2.667 16.004 2.667zm0 24.267c-2.143 0-4.143-.587-5.856-1.605l-.418-.248-4.196 1.003.956-4.11-.27-.43A11.02 11.02 0 0 1 4.8 16c0-6.187 5.017-11.2 11.204-11.2C22.187 4.8 27.2 9.813 27.2 16S22.187 26.934 16.004 26.934zm6.144-8.363c-.337-.168-1.989-.98-2.299-1.092-.31-.112-.534-.168-.758.168-.224.337-.868 1.092-1.064 1.316-.196.225-.393.252-.73.084-.337-.168-1.423-.524-2.711-1.672-.999-.891-1.674-1.991-1.87-2.328-.196-.337-.021-.52.147-.688.152-.15.337-.393.505-.589.168-.196.224-.337.337-.56.112-.224.056-.421-.028-.589-.084-.168-.757-1.825-1.038-2.5-.274-.658-.552-.568-.757-.579-.196-.01-.421-.012-.645-.012-.224 0-.589.084-.897.421-.308.337-1.177 1.149-1.177 2.805 0 1.655 1.205 3.258 1.373 3.482.168.224 2.373 3.62 5.748 5.079.803.348 1.43.556 1.917.713.806.258 1.54.222 2.12.134.647-.096 1.989-.813 2.27-1.598.28-.786.28-1.46.196-1.598-.084-.14-.308-.224-.645-.392z"/>
      </svg>
      {/* Pulse animation */}
      <span className="absolute inset-0 rounded-full animate-ping opacity-30" style={{ backgroundColor: "#25D366" }} />
    </a>
  );
}
