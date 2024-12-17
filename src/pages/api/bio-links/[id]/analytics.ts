// src/pages/api/bio-links/[id]/analytics.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from '@auth0/nextjs-auth0';
import { prisma } from '@/lib/prisma';
import { BioClick, BioAnalytics } from '@prisma/client';

interface AnalyticsResponse {
  totalViews: number;
  clicks: {
    total: number;
    byLink: Array<{
      linkId: string;
      count: number;
    }>;
  };
  locations: Record<string, number>;
  devices: Record<string, number>;
}

export default async function analyticsHandler(
  req: NextApiRequest,
  res: NextApiResponse<AnalyticsResponse | { error: string }>
) {
  try {
    // Get the user session
    const session = await getSession(req, res);
    if (!session?.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const bioPageId = req.query.id as string;

    // First verify the bio page exists and belongs to the user
    const bioPage = await prisma.bioPage.findFirst({
      where: {
        id: bioPageId,
        user: {
          email: session.user.email
        }
      }
    });

    if (!bioPage) {
      return res.status(404).json({ error: 'Bio page not found' });
    }

    // Calculate date range
    const timeframe = (req.query.timeframe as string) || '7d';
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - (
      timeframe === '30d' ? 30 : timeframe === '90d' ? 90 : 7
    ));

    // Fetch analytics data
    const [clicks, analytics] = await Promise.all([
      prisma.bioClick.findMany({
        where: {
          bioPageId,
          timestamp: { gte: startDate },
        },
        orderBy: { timestamp: 'desc' },
      }),
      prisma.bioAnalytics.findMany({
        where: {
          bioPageId,
          timestamp: { gte: startDate },
        },
        orderBy: { timestamp: 'desc' },
      }),
    ]);

    // Process clicks by link
    const clicksByLink = clicks.reduce((acc: Record<string, { linkId: string; count: number }>, click) => {
      if (!acc[click.linkId]) {
        acc[click.linkId] = { linkId: click.linkId, count: 0 };
      }
      acc[click.linkId].count++;
      return acc;
    }, {});

    // Process locations
    const locations = clicks.reduce((acc: Record<string, number>, click) => {
      if (click.country) {
        acc[click.country] = (acc[click.country] || 0) + 1;
      }
      return acc;
    }, {});

    // Process devices
    const devices = analytics.reduce((acc: Record<string, number>, event) => {
      if (event.device) {
        acc[event.device] = (acc[event.device] || 0) + 1;
      }
      return acc;
    }, {});

    const response: AnalyticsResponse = {
      totalViews: bioPage.views,
      clicks: {
        total: clicks.length,
        byLink: Object.values(clicksByLink),
      },
      locations,
      devices,
    };

    return res.status(200).json(response);
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return res.status(500).json({ error: 'Error fetching analytics' });
  }
}