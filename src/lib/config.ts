// src/lib/config.ts
interface Config {
    auth0: {
      secret: string;
      baseUrl: string;
      issuerBaseUrl: string;
      clientId: string;
      clientSecret: string;
    };
    printful: {
      apiKey: string;
      webhookSecret: string;
    };
    stripe: {
      secretKey: string;
      publishableKey: string;
      webhookSecret: string;
      proPriceId: string;
    };
    baseUrl: string;
    database: {
      url: string;
    };
  }
  
  const getConfig = (): Config => {
    // Validate required environment variables
    const requiredEnvVars = [
      'AUTH0_SECRET',
      'AUTH0_BASE_URL',
      'AUTH0_ISSUER_BASE_URL',
      'AUTH0_CLIENT_ID',
      'AUTH0_CLIENT_SECRET',
      'PRINTFUL_API_KEY',
      'STRIPE_SECRET_KEY',
      'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY',
      'DATABASE_URL'
    ];
  
    for (const envVar of requiredEnvVars) {
      if (!process.env[envVar]) {
        throw new Error(`Missing required environment variable: ${envVar}`);
      }
    }
  
    return {
      auth0: {
        secret: process.env.AUTH0_SECRET!,
        baseUrl: process.env.AUTH0_BASE_URL!,
        issuerBaseUrl: process.env.AUTH0_ISSUER_BASE_URL!,
        clientId: process.env.AUTH0_CLIENT_ID!,
        clientSecret: process.env.AUTH0_CLIENT_SECRET!,
      },
      printful: {
        apiKey: process.env.PRINTFUL_API_KEY!,
        webhookSecret: process.env.PRINTFUL_WEBHOOK_SECRET || '',
      },
      stripe: {
        secretKey: process.env.STRIPE_SECRET_KEY!,
        publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
        webhookSecret: process.env.STRIPE_WEBHOOK_SECRET || '',
        proPriceId: process.env.STRIPE_PRO_PRICE_ID!,
      },
      baseUrl: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
      database: {
        url: process.env.DATABASE_URL!,
      },
    };
  };
  
  export const config = getConfig();