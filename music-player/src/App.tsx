import React, { useState, useEffect } from 'react';
import { songs, Song } from './data/songs';
import './styles/main.scss';
import { Container, Row, Col, Tab, Tabs } from 'react-bootstrap';
import PlayerControls from './components/PlayerControls';
import NowPlaying from './components/NowPlaying';
import Playlist from './components/Playlist';
import SearchBar from './components/SearchBar';
import useAudioPlayer from './hooks/useAudioPlayer';

const App: React.FC = () => {
  const {
    currentSong,
    isPlaying,
    play,
    togglePlayPause
  } = useAudioPlayer();

  const [favorites, setFavorites] = useState<Song[]>([]);
  const [recentlyPlayed, setRecentlyPlayed] = useState<Song[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'favorites' | 'recent'>('all');

  // Load favorites from localStorage
  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  // Load recently played from sessionStorage
  useEffect(() => {
    const storedRecent = sessionStorage.getItem('recentlyPlayed');
    if (storedRecent) {
      setRecentlyPlayed(JSON.parse(storedRecent));
    }
  }, []);

  const handlePlay = (song: Song) => {
    play(song);
    // Update recently played
    const updatedRecent = [song, ...recentlyPlayed.filter(s => s.id !== song.id)].slice(0, 10);
    setRecentlyPlayed(updatedRecent);
    sessionStorage.setItem('recentlyPlayed', JSON.stringify(updatedRecent));
  };

  const toggleFavorite = (song: Song) => {
    const isFavorite = favorites.some(s => s.id === song.id);
    let updatedFavorites;
    
    if (isFavorite) {
      updatedFavorites = favorites.filter(s => s.id !== song.id);
    } else {
      updatedFavorites = [...favorites, song];
    }
    
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const filteredSongs = songs.filter(song => 
    song.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displaySongs = activeTab === 'all' 
    ? filteredSongs 
    : activeTab === 'favorites' 
      ? favorites.filter(song => 
          song.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : recentlyPlayed.filter(song => 
          song.title.toLowerCase().includes(searchQuery.toLowerCase())
        );

  return (
    <Container fluid className="player-container">
      <Row>
        <Col md={4} className="sidebar">
          <Tabs
            activeKey={activeTab}
            onSelect={(k) => setActiveTab(k as any)}
            className="mb-3"
          >
            <Tab eventKey="all" title="All Songs" />
            <Tab eventKey="favorites" title="Favorites" />
            <Tab eventKey="recent" title="Recently Played" />
          </Tabs>
          
          <SearchBar 
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
          
          <Playlist 
            songs={displaySongs}
            currentSong={currentSong}
            onSelect={handlePlay}
            onFavorite={toggleFavorite}
            favorites={favorites}
          />
        </Col>
        
        <Col md={8} className="main-content">
          <NowPlaying currentSong={currentSong} />
          
          <PlayerControls
            isPlaying={isPlaying}
            onPlayPause={togglePlayPause}
            onNext={() => {}}
            onPrevious={() => {}}
            onShuffle={() => {}}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default App;