'use server';
/**
 * @fileOverview An AI agent that recommends luxury handbags based on user preferences.
 *
 * - recommendHandbags - A function that handles the handbag recommendation process.
 * - RecommendHandbagsInput - The input type for the recommendHandbags function.
 * - RecommendHandbagsOutput - The return type for the recommendHandbags function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendHandbagsInputSchema = z.object({
  occasion: z
    .string()
    .describe('The occasion for which the user needs a handbag (e.g., "evening event", "daily work", "travel").'),
  stylePreference: z
    .string()
    .describe('The user\u0027s preferred style (e.g., "minimalist", "bohemian", "classic", "trendy").'),
  wardrobeItems: z
    .string()
    .describe('A description of existing wardrobe items to match the handbag with (e.g., "black dress, silver jewelry", "jeans and t-shirts", "business suits").'),
});
export type RecommendHandbagsInput = z.infer<typeof RecommendHandbagsInputSchema>;

const RecommendedHandbagSchema = z.object({
  name: z.string().describe('The name of the recommended handbag.'),
  brand: z.string().describe('The brand of the recommended handbag.'),
  description: z.string().describe('A brief description of the handbag, highlighting why it fits the user\u0027s preferences.'),
  features: z.array(z.string()).describe('Key features of the handbag (e.g., "detachable strap", "internal pockets", "calfskin leather").'),
  imageUrl: z.string().url().describe('A URL to an image of the recommended handbag.'),
});

const RecommendHandbagsOutputSchema = z.object({
  recommendations: z.array(RecommendedHandbagSchema).describe('An array of recommended luxury handbags.'),
  summary: z.string().describe('A summary explaining the recommendations based on the user\u0027s input.'),
});
export type RecommendHandbagsOutput = z.infer<typeof RecommendHandbagsOutputSchema>;

export async function recommendHandbags(
  input: RecommendHandbagsInput
): Promise<RecommendHandbagsOutput> {
  return recommendHandbagsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendHandbagsPrompt',
  input: {schema: RecommendHandbagsInputSchema},
  output: {schema: RecommendHandbagsOutputSchema},
  prompt: `You are a luxury fashion stylist specializing in high-end handbags for Ateliê Starbright. Your task is to recommend 3 exquisite luxury handbags based on the user's preferences, occasion, and existing wardrobe. Focus on sophisticated, timeless, and elegant pieces.

User Preferences:
- Occasion: {{{occasion}}}
- Style Preference: {{{stylePreference}}}
- Existing Wardrobe Items: {{{wardrobeItems}}}

Based on these details, provide 3 distinct handbag recommendations, including their brand, a detailed description, key features, and a hypothetical image URL. Also, include a brief summary explaining your choices.

Ensure the output is a JSON object matching the following structure and prioritize brands known for luxury handbags.`,
});

const recommendHandbagsFlow = ai.defineFlow(
  {
    name: 'recommendHandbagsFlow',
    inputSchema: RecommendHandbagsInputSchema,
    outputSchema: RecommendHandbagsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (!output) {
      throw new Error('Failed to get handbag recommendations.');
    }
    return output;
  }
);
