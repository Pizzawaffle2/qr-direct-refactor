// src/app/bio-link/actions.ts
import { BioPage } from './types'; // Adjust the import path as necessary
export async function saveBioPage(bioPage: Partial<BioPage>) {
    try {
      const response = await fetch('/api/bio-links', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bioPage),
      });
  
      if (!response.ok) throw new Error('Failed to save bio page');
      return await response.json();
    } catch (error) {
      console.error('Error saving bio page:', error);
      throw error;
    }
  }
  
  export async function publishBioPage(id: string) {
    try {
      const response = await fetch(`/api/bio-links/${id}/publish`, {
        method: 'PUT',
      });
  
      if (!response.ok) throw new Error('Failed to publish bio page');
      return await response.json();
    } catch (error) {
      console.error('Error publishing bio page:', error);
      throw error;
    }
  }