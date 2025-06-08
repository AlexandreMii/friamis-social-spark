
const TrendingSection = () => {
  const trendingHashtags = [
    '#dance', '#comedy', '#art', '#food', '#lifestyle', '#music', '#trending'
  ];

  return (
    <div className="bg-background/95 backdrop-blur-sm border-b border-border/50 p-4">
      <h3 className="text-sm font-semibold text-foreground mb-3">Tendances du jour 🔥</h3>
      <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
        {trendingHashtags.map((hashtag, index) => (
          <button
            key={hashtag}
            className="flex-shrink-0 px-3 py-1.5 rounded-full bg-gradient-to-r from-friamis-purple/10 to-friamis-pink/10 border border-friamis-purple/20 text-friamis-purple text-xs font-medium hover:scale-105 transition-transform animate-fade-in"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            {hashtag}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TrendingSection;
