import { prisma } from '../db';

export async function getComplexes() {
  return prisma.complex.findMany({
    include: {
      branch: true,
      managers: true,
      buildings: {
        include: {
          residents: true
        }
      }
    }
  });
}

export async function getComplexById(id: string) {
  return prisma.complex.findUnique({
    where: { id },
    include: {
      branch: true,
      managers: true,
      buildings: {
        include: {
          residents: true
        }
      }
    }
  });
}

export async function createComplex(data: {
  name: string;
  nameEn: string;
  branchId: string;
  managerIds: string[];
  totalCapacity: number;
  buildings: Array<{
    number: string;
    rooms: number;
    bathrooms: number;
    kitchens: number;
    location: string;
  }>;
}) {
  return prisma.complex.create({
    data: {
      name: data.name,
      nameEn: data.nameEn,
      branchId: data.branchId,
      totalCapacity: data.totalCapacity,
      managers: {
        connect: data.managerIds.map(id => ({ id }))
      },
      buildings: {
        create: data.buildings
      }
    },
    include: {
      branch: true,
      managers: true,
      buildings: true
    }
  });
}