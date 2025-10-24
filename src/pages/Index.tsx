import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Meme {
  id: number;
  title: string;
  image: string;
  votes: number;
  category: string;
}

const MEMES_API = 'https://functions.poehali.dev/489a3aff-7ea7-4d74-9d9c-3926fa706fb6';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [memes, setMemes] = useState<Meme[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMemes();
  }, []);

  const fetchMemes = async () => {
    try {
      const response = await fetch(MEMES_API);
      const data = await response.json();
      setMemes(data.memes || []);
    } catch (error) {
      console.error('Ошибка загрузки мемов:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async (id: number, value: number) => {
    try {
      const response = await fetch(MEMES_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, value }),
      });
      const data = await response.json();
      
      if (data.success) {
        setMemes(memes.map(meme => 
          meme.id === id ? { ...meme, votes: data.votes } : meme
        ));
      }
    } catch (error) {
      console.error('Ошибка голосования:', error);
    }
  };

  const sortedMemes = [...memes].sort((a, b) => b.votes - a.votes);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/10">
      <nav className="sticky top-0 z-50 backdrop-blur-lg bg-background/80 border-b border-primary/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-4xl animate-bounce-slow">🔫</div>
              <h1 className="text-2xl md:text-3xl font-black bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                CS2 МЕМЫ
              </h1>
            </div>
            
            <div className="hidden md:flex gap-2">
              <Button
                variant={activeSection === 'home' ? 'default' : 'ghost'}
                onClick={() => setActiveSection('home')}
                className="font-bold"
              >
                <Icon name="Home" className="mr-2" size={18} />
                Главная
              </Button>
              <Button
                variant={activeSection === 'memes' ? 'default' : 'ghost'}
                onClick={() => setActiveSection('memes')}
                className="font-bold"
              >
                <Icon name="Image" className="mr-2" size={18} />
                Мемы
              </Button>
              <Button
                variant={activeSection === 'rating' ? 'default' : 'ghost'}
                onClick={() => setActiveSection('rating')}
                className="font-bold"
              >
                <Icon name="Trophy" className="mr-2" size={18} />
                Рейтинг
              </Button>
              <Button
                variant={activeSection === 'gaben' ? 'default' : 'ghost'}
                onClick={() => setActiveSection('gaben')}
                className="font-bold bg-gradient-to-r from-secondary to-primary hover:opacity-90"
              >
                🍔 БУРГЕР ГАБЕНА
              </Button>
            </div>

            <Button variant="ghost" className="md:hidden">
              <Icon name="Menu" size={24} />
            </Button>
          </div>
        </div>
      </nav>

      {activeSection === 'home' && (
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-block mb-6">
              <div className="text-8xl mb-4 animate-float">💸</div>
            </div>
            <h2 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent leading-tight">
              ДОБРО ПОЖАЛОВАТЬ<br />В АД ТОРГОВЛИ
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Самая честная платформа мемов про CS2 маркет, где мы высмеиваем всё: от цен до скамов
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="font-bold text-lg px-8 bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                <Icon name="TrendingUp" className="mr-2" />
                СМОТРЕТЬ МЕМЫ
              </Button>
              <Button size="lg" variant="outline" className="font-bold text-lg px-8">
                <Icon name="Plus" className="mr-2" />
                ДОБАВИТЬ МЕМ
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card className="bg-card/50 backdrop-blur border-primary/30 hover:border-primary transition-all hover:scale-105">
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-3 animate-glow">🔥</div>
                <div className="text-3xl font-black text-primary mb-2">1337+</div>
                <div className="text-sm text-muted-foreground">Мемов в базе</div>
              </CardContent>
            </Card>
            
            <Card className="bg-card/50 backdrop-blur border-secondary/30 hover:border-secondary transition-all hover:scale-105">
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-3 animate-glow">😂</div>
                <div className="text-3xl font-black text-secondary mb-2">420K</div>
                <div className="text-sm text-muted-foreground">Лайков</div>
              </CardContent>
            </Card>
            
            <Card className="bg-card/50 backdrop-blur border-accent/30 hover:border-accent transition-all hover:scale-105">
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-3 animate-glow">💰</div>
                <div className="text-3xl font-black text-accent mb-2">∞</div>
                <div className="text-sm text-muted-foreground">Потерянных денег</div>
              </CardContent>
            </Card>
            
            <Card className="bg-card/50 backdrop-blur border-primary/30 hover:border-primary transition-all hover:scale-105">
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-3 animate-glow">🎮</div>
                <div className="text-3xl font-black text-primary mb-2">9999</div>
                <div className="text-sm text-muted-foreground">Скамов в день</div>
              </CardContent>
            </Card>
          </div>

          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-3xl font-black">🔥 ТОП МЕМЫ НЕДЕЛИ</h3>
              <Button variant="ghost" onClick={() => setActiveSection('memes')}>
                Смотреть все <Icon name="ArrowRight" className="ml-2" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {sortedMemes.slice(0, 4).map((meme) => (
                <Card key={meme.id} className="group overflow-hidden bg-card/50 backdrop-blur border-primary/20 hover:border-primary transition-all hover:scale-105">
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden">
                      <img 
                        src={meme.image} 
                        alt={meme.title}
                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground font-bold">
                        {meme.category}
                      </Badge>
                    </div>
                    <div className="p-4">
                      <h4 className="font-bold text-lg mb-3">{meme.title}</h4>
                      <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleVote(meme.id, 1)}
                            className="hover:bg-primary hover:text-primary-foreground"
                          >
                            <Icon name="ThumbsUp" size={16} />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleVote(meme.id, -1)}
                            className="hover:bg-destructive hover:text-destructive-foreground"
                          >
                            <Icon name="ThumbsDown" size={16} />
                          </Button>
                        </div>
                        <div className="flex items-center gap-2 font-bold text-primary">
                          <Icon name="TrendingUp" size={16} />
                          {meme.votes}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeSection === 'memes' && (
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-black mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              ВСЕ МЕМЫ
            </h2>
            <p className="text-xl text-muted-foreground">Коллекция лучших мемов про CS2 маркет</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {memes.map((meme) => (
              <Card key={meme.id} className="group overflow-hidden bg-card/50 backdrop-blur border-primary/20 hover:border-primary transition-all hover:scale-105">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden">
                    <img 
                      src={meme.image} 
                      alt={meme.title}
                      className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground font-bold">
                      {meme.category}
                    </Badge>
                  </div>
                  <div className="p-6">
                    <h4 className="font-bold text-xl mb-4">{meme.title}</h4>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          onClick={() => handleVote(meme.id, 1)}
                          className="hover:bg-primary"
                        >
                          <Icon name="ThumbsUp" size={16} className="mr-1" />
                          Топ
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleVote(meme.id, -1)}
                          className="hover:bg-destructive hover:text-destructive-foreground"
                        >
                          <Icon name="ThumbsDown" size={16} className="mr-1" />
                          Дно
                        </Button>
                      </div>
                      <div className="flex items-center gap-2 font-bold text-lg text-primary">
                        {meme.votes}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {activeSection === 'rating' && (
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <div className="text-6xl mb-4 animate-float">🏆</div>
            <h2 className="text-5xl font-black mb-4 bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
              РЕЙТИНГ МЕМОВ
            </h2>
            <p className="text-xl text-muted-foreground">Топ мемов по количеству голосов</p>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-4">
            {sortedMemes.map((meme, index) => (
              <Card key={meme.id} className="bg-card/50 backdrop-blur border-primary/20 hover:border-primary transition-all">
                <CardContent className="p-6">
                  <div className="flex items-center gap-6">
                    <div className={`text-4xl font-black ${
                      index === 0 ? 'text-secondary' : 
                      index === 1 ? 'text-muted-foreground' : 
                      index === 2 ? 'text-primary' : 'text-muted-foreground/50'
                    }`}>
                      #{index + 1}
                    </div>
                    <img 
                      src={meme.image} 
                      alt={meme.title}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-bold text-xl mb-2">{meme.title}</h4>
                      <Badge variant="outline">{meme.category}</Badge>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-black text-primary mb-1">{meme.votes}</div>
                      <div className="text-sm text-muted-foreground">голосов</div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button 
                        size="sm" 
                        onClick={() => handleVote(meme.id, 1)}
                        className="hover:bg-primary"
                      >
                        <Icon name="ThumbsUp" size={16} />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleVote(meme.id, -1)}
                        className="hover:bg-destructive hover:text-destructive-foreground"
                      >
                        <Icon name="ThumbsDown" size={16} />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {activeSection === 'gaben' && (
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-9xl mb-8 animate-bounce-slow">🍔</div>
            <h2 className="text-6xl font-black mb-6 bg-gradient-to-r from-secondary via-primary to-accent bg-clip-text text-transparent">
              БУРГЕР ГАБЕНА
            </h2>
            <p className="text-2xl text-muted-foreground mb-12">
              Секретный раздел для истинных ценителей
            </p>
            
            <Card className="bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 backdrop-blur border-primary">
              <CardContent className="p-12">
                <div className="space-y-6 text-lg">
                  <p className="font-bold text-2xl">🎮 Факты о маркете CS2:</p>
                  <div className="text-left space-y-4 max-w-2xl mx-auto">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">💸</span>
                      <p>Средний игрок тратит на скины больше, чем на саму игру (которая бесплатна)</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">📈</span>
                      <p>Цены на скины растут быстрее биткоина</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">🔫</span>
                      <p>AWP Dragon Lore дороже автомобиля</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">🎰</span>
                      <p>Открытие кейсов - это легальное казино для геймеров</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">😭</span>
                      <p>Каждый день тысячи игроков попадаются на скам-сайты</p>
                    </div>
                  </div>
                  
                  <div className="mt-12 p-6 bg-primary/10 rounded-lg border-2 border-primary">
                    <p className="text-3xl font-black mb-4">🍔 + 💰 = ❤️</p>
                    <p className="text-xl">Габен любит бургеры почти так же силько, как ваши деньги</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      <footer className="bg-card/50 backdrop-blur border-t border-primary/20 mt-20">
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-muted-foreground mb-4">
            Создано с 💀 для сообщества CS2
          </p>
          <div className="flex gap-4 justify-center">
            <Button variant="ghost" size="sm">
              <Icon name="MessageCircle" className="mr-2" size={16} />
              Telegram
            </Button>
            <Button variant="ghost" size="sm">
              <Icon name="Twitter" className="mr-2" size={16} />
              Twitter
            </Button>
            <Button variant="ghost" size="sm">
              <Icon name="Github" className="mr-2" size={16} />
              GitHub
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;