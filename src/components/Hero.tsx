import { Sparkles } from 'lucide-react';

export function Hero() {
  return (
    <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 text-white">
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <Sparkles className="w-16 h-16" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            Disney Movie Collection
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Explore the magical world of Disney classics, from timeless animations to modern masterpieces
          </p>
        </div>
      </div>
    </div>
  );
}
