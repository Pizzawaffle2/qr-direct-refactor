// src/app/bio-links/utils/slugs.ts
export const generateSlug = (name: string) => {
    return `${name.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${Math.random().toString(36).substr(2, 9)}`;
  };
  
  // Add unique slug checking against database
  export const validateSlug = async (slug: string) => {
    // Check if slug exists in database
    return true; // Return false if slug exists
  };