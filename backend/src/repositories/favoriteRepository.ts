// Favorite repository - data access layer

import { Favorite } from "../types/favorite.js";
import { getPrismaClient } from "../db/prisma.js";

export class FavoriteRepository {
  async getAll(): Promise<Favorite[]> {
    const prisma = getPrismaClient();
    const favorites = await prisma.favorite.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return favorites.map(
      (fav: (typeof favorites)[number]): Favorite => ({
        id: fav.id,
        videoPath: fav.videoPath,
        createdAt: fav.createdAt.toISOString(),
      }),
    );
  }

  async getById(id: number): Promise<Favorite | null> {
    const prisma = getPrismaClient();
    const favorite = await prisma.favorite.findUnique({
      where: { id },
    });

    if (!favorite) {
      return null;
    }

    return {
      id: favorite.id,
      videoPath: favorite.videoPath,
      createdAt: favorite.createdAt.toISOString(),
    };
  }

  async getByPath(videoPath: string): Promise<Favorite | null> {
    const prisma = getPrismaClient();
    const favorite = await prisma.favorite.findUnique({
      where: { videoPath },
    });

    if (!favorite) {
      return null;
    }

    return {
      id: favorite.id,
      videoPath: favorite.videoPath,
      createdAt: favorite.createdAt.toISOString(),
    };
  }

  async create(videoPath: string): Promise<Favorite> {
    const prisma = getPrismaClient();
    const favorite = await prisma.favorite.create({
      data: {
        videoPath,
      },
    });

    return {
      id: favorite.id,
      videoPath: favorite.videoPath,
      createdAt: favorite.createdAt.toISOString(),
    };
  }

  async deleteById(id: number): Promise<boolean> {
    const prisma = getPrismaClient();
    const result = await prisma.favorite.deleteMany({
      where: { id },
    });

    return result.count > 0;
  }

  async deleteByPath(videoPath: string): Promise<boolean> {
    const prisma = getPrismaClient();
    const result = await prisma.favorite.deleteMany({
      where: { videoPath },
    });

    return result.count > 0;
  }

  async exists(videoPath: string): Promise<boolean> {
    const prisma = getPrismaClient();
    const favorite = await prisma.favorite.findUnique({
      where: { videoPath },
    });

    return !!favorite;
  }
}

export const favoriteRepository = new FavoriteRepository();
