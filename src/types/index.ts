import { Prisma } from "@prisma/client";

export interface Series {
  id: string;
  title: string;
  titleKr?: string;
  createdAt: Date;
  updatedAt: Date;
  songs?: SongT[];
  userFavorites: UserFavoriteSeries[];
  submissions: SeriesSubmission[];
}

export type SongT = Prisma.SongGetPayload<{
  include: {
    karaokeInfo: true;
    userFavorites: true;
    submissions: true;
    series: true;
  };
}>;

export interface KaraokeInfo {
  id: string;
  provider: string;
  country: string;
  songNumber: string;
  createdAt: Date;
  updatedAt: Date;
  songId: string;
  song: SongT;
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
  song: SongT;
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
  song?: SongT;
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
