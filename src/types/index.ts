export interface Series {
  id: string;
  title: string;
  titleEn?: string;
  titleKr?: string;
  description?: string;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
  songs?: Song[];
  userFavorites: UserFavoriteSeries[];
  submissions: SeriesSubmission[];
}

export interface Song {
  id: string;
  title: string;
  titleEn?: string;
  titleKr?: string;
  type: "OP" | "ED" | "INSERT";
  season?: string;
  artist?: string;
  releaseDate?: Date;
  createdAt: Date;
  updatedAt: Date;
  seriesId: string;
  series?: Series;
  karaokeInfo: KaraokeInfo[];
  userFavorites: UserFavoriteSong[];
  submissions: SongSubmission[];
}

export interface KaraokeInfo {
  id: string;
  provider: string;
  country: string;
  songNumber?: string;
  createdAt: Date;
  updatedAt: Date;
  songId: string;
  song: Song;
}

export interface User {
  id: string;
  name?: string;
  email: string;
  emailVerified?: Date;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
  role: "USER" | "ADMIN";
  favoriteSongs: UserFavoriteSong[];
  favoriteSeries: UserFavoriteSeries[];
  songSubmissions: SongSubmission[];
  seriesSubmissions: SeriesSubmission[];
}

export interface UserFavoriteSong {
  id: string;
  userId: string;
  songId: string;
  createdAt: Date;
  user: User;
  song: Song;
}

export interface UserFavoriteSeries {
  id: string;
  seriesId: string;
  userId: string;
  createdAt: Date;
  user: User;
  series: Series;
}

export interface SongSubmission {
  id: string;
  title: string;
  titleEn?: string;
  titleKr?: string;
  type: "OP" | "ED" | "INSERT";
  season?: string;
  artist?: string;
  animeTitle: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  user: User;
  songId?: string;
  song?: Song;
}

export interface SeriesSubmission {
  id: string;
  title: string;
  titleEn?: string;
  titleKr?: string;
  description?: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  user: User;
  seriesId?: string;
  series?: Series;
}

export interface SearchFilters {
  seriesId?: string;
  type?: "OP" | "ED" | "INSERT";
  country?: string;
  provider?: string;
  query?: string;
}
