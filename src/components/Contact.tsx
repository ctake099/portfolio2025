export default function Contact() {
  return (
    <section id="contact" className="py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Contact</h2>
        
        <div className="max-w-2xl">
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            XのDMまたは以下のメールアドレス
          </p>
          
          <div className="text-lg">
            <a 
              href="mailto:ctake0099@gmail.com" 
              className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
            >
              ctake0099[at]gmail.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}