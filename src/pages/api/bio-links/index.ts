// src/pages/api/bio-links/index.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import { nanoid } from 'nanoid';
import { getSession } from '@auth0/nextjs-auth0';
import { z } from 'zod';

// Validation schemas
const ColorSchemeSchema = z.object({
  primary: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/),
  secondary: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/),
  text: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/),
  background: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
});

const ThemeSchema = z.object({
  name: z.string().min(1),
  backgroundColor: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/),
  fontFamily: z.string().min(1),
  buttonStyle: z.enum(['rounded', 'sharp', 'pill']),
  buttonAnimation: z.enum(['none', 'fade', 'slide', 'bounce']),
  colorScheme: ColorSchemeSchema
});

const LinkSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1),
  url: z.string().url().or(z.literal('')),
  animation: z.enum(['none', 'fade', 'slide', 'bounce']).optional(),
  backgroundColor: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/).optional(),
  textColor: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/).optional(),
  clicks: z.number().default(0)
});

const BioPageSchema = z.object({
  name: z.string().min(1),
  bio: z.string().optional(),
  theme: ThemeSchema,
  links: z.array(LinkSchema),
  isPublished: z.boolean().default(false)
});

// Helper functions
function generateSlug(name: string): string {
  const baseSlug = name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

  return `${baseSlug}-${nanoid(6)}`;
}

async function getUserFromSession(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession(req, res);
  if (!session?.user) {
    throw new Error('Unauthorized');
  }

  const user = await prisma.user.findFirst({
    where: { email: session.user.email }
  });

  if (!user) {
    throw new Error('User not found');
  }

  return user;
}

async function logAnalyticsEvent(bioPageId: string, event: string, data: any = {}) {
  await prisma.bioAnalytics.create({
    data: {
      bioPageId,
      event,
      data,
      timestamp: new Date()
    }
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const user = await getUserFromSession(req, res);

    switch (req.method) {
      case 'POST':
        return handleCreate(req, res, user.id);
      case 'GET':
        return handleGet(req, res, user.id);
      case 'PUT':
        return handleUpdate(req, res, user.id);
      case 'DELETE':
        return handleDelete(req, res, user.id);
      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Error handling bio page request:', error);
    const errorMessage = (error instanceof Error) ? error.message : 'Error processing request';
    return res.status(errorMessage === 'Unauthorized' ? 401 : 500).json({
      error: errorMessage,
      details: process.env.NODE_ENV === 'development' ? error : undefined
    });
  }
}

// Handler functions
async function handleCreate(req: NextApiRequest, res: NextApiResponse, userId: number) {
  const validatedData = BioPageSchema.parse(req.body);
  const slug = generateSlug(validatedData.name);

  const bioPage = await prisma.bioPage.create({
    data: {
      userId,
      name: validatedData.name,
      bio: validatedData.bio,
      theme: validatedData.theme,
      links: validatedData.links,
      slug,
      isPublished: validatedData.isPublished,
      views: 0
    },
  });

  await logAnalyticsEvent(bioPage.id, 'create', {
    initialTheme: validatedData.theme.name,
    initialLinksCount: validatedData.links.length
  });

  return res.status(200).json(bioPage);
}

async function handleGet(req: NextApiRequest, res: NextApiResponse, userId: number) {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const search = req.query.search as string;

  const where = {
    userId,
    ...(search && {
      OR: [
        { name: { contains: search, mode: Prisma.QueryMode.insensitive } },
        { bio: { contains: search, mode: Prisma.QueryMode.insensitive } },
      ],
    }),
  };

  const [bioPages, total] = await Promise.all([
    prisma.bioPage.findMany({
      where,
      orderBy: { updatedAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.bioPage.count({ where }),
  ]);

  return res.status(200).json({
    data: bioPages,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  });
}

async function handleUpdate(req: NextApiRequest, res: NextApiResponse, userId: number) {
  const updates = BioPageSchema.parse(req.body);

  const bioPage = await prisma.bioPage.findFirst({
    where: { id: req.query.id as string, userId },
  });

  if (!bioPage) {
    return res.status(404).json({ error: 'Bio page not found' });
  }

  const updatedBioPage = await prisma.bioPage.update({
    where: { id: bioPage.id },
    data: {
      ...updates,
      updatedAt: new Date(),
    },
  });

  await logAnalyticsEvent(bioPage.id, 'update', {
    updatedFields: Object.keys(updates),
  });

  return res.status(200).json(updatedBioPage);
}

async function handleDelete(req: NextApiRequest, res: NextApiResponse, userId: number) {
  const bioPage = await prisma.bioPage.findFirst({
    where: { id: req.query.id as string, userId },
  });

  if (!bioPage) {
    return res.status(404).json({ error: 'Bio page not found' });
  }

  await Promise.all([
    prisma.bioPage.delete({ where: { id: bioPage.id } }),
    logAnalyticsEvent(bioPage.id, 'delete', {
      deletedAt: new Date(),
    }),
  ]);

  return res.status(204).end();
}