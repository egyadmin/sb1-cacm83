import { prisma } from '../db';

export async function getContractors() {
  return prisma.contractor.findMany({
    include: {
      contracts: {
        include: {
          project: true,
          tasks: true,
          invoices: true
        }
      }
    }
  });
}

export async function getContractorById(id: string) {
  return prisma.contractor.findUnique({
    where: { id },
    include: {
      contracts: {
        include: {
          project: true,
          tasks: true,
          invoices: true
        }
      }
    }
  });
}

export async function createContractor(data: {
  name: string;
  nameEn: string;
}) {
  return prisma.contractor.create({
    data: {
      name: data.name,
      nameEn: data.nameEn
    }
  });
}