import { prisma } from '../db';

export async function getProjects() {
  return prisma.project.findMany({
    include: {
      contracts: {
        include: {
          contractor: true,
          tasks: true,
          invoices: true
        }
      },
      tasks: true
    }
  });
}

export async function getProjectById(id: string) {
  return prisma.project.findUnique({
    where: { id },
    include: {
      contracts: {
        include: {
          contractor: true,
          tasks: true,
          invoices: true
        }
      },
      tasks: true
    }
  });
}

export async function createProject(data: {
  name: string;
  managerId: string;
  startDate: Date;
  endDate: Date;
}) {
  return prisma.project.create({
    data: {
      name: data.name,
      managerId: data.managerId,
      startDate: data.startDate,
      endDate: data.endDate,
      status: 'active'
    }
  });
}