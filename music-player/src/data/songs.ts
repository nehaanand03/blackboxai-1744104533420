export interface Song {
  id: string;
  title: string;
  thumbnail: string;
  musicUrl: string;
  duration: string;
  artistName: string;
}

export const songs: Song[] = [
  {
    id: '1',
    title: 'Blinding Lights',
    thumbnail: 'https://example.com/thumbnail1.jpg',
    musicUrl: 'https://example.com/music1.mp3',
    duration: '3:20',
    artistName: 'The Weeknd'
  },
  {
    id: '2',
    title: 'Save Your Tears',
    thumbnail: 'https://example.com/thumbnail2.jpg',
    musicUrl: 'https://example.com/music2.mp3',
    duration: '3:35',
    artistName: 'The Weeknd'
  },
  {
    id: '3',
    title: 'Stay',
    thumbnail: 'https://example.com/thumbnail3.jpg',
    musicUrl: 'https://example.com/music3.mp3',
    duration: '2:21',
    artistName: 'The Kid LAROI, Justin Bieber'
  },
  {
    id: '4',
    title: 'Good 4 U',
    thumbnail: 'https://example.com/thumbnail4.jpg',
    musicUrl: 'https://example.com/music4.mp3',
    duration: '2:58',
    artistName: 'Olivia Rodrigo'
  },
  {
    id: '5',
    title: 'Levitating',
    thumbnail: 'https://example.com/thumbnail5.jpg',
    musicUrl: 'https://example.com/music5.mp3',
    duration: '3:23',
    artistName: 'Dua Lipa'
  }
];