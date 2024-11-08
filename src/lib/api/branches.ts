import { prisma } from '../db';

export async function getBranches() {
  return prisma.branch.findMany({
    include: {
      managers: true,
      complexes: {
        include: {
          buildings: true
        }
      }
    }
  });
}

export async function getBranchById(id: string) {
  return prisma.branch.findUnique({
    where: { id },
    include: {
      managers: true,
      complexes: {
        include: {
          buildings: true
        }
      }
    }
  });
}

export async function createBranch(data: {
  name: string;
  nameEn: string;
  managerIds: string[];
}) {
  return prisma.branch.create({
    data: {
      name: data.name,
      nameEn: data.nameEn,
      managers: {
        connect: data.managerIds.map(id => ({ id }))
      }
    },
    include: {
      managers: true
    }
  });
}