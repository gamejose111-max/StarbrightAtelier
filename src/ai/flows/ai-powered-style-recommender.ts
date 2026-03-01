
'use server';
/**
 * @fileOverview Um agente de IA que recomenda bolsas de luxo reais do catálogo com base nas preferências do usuário.
 *
 * - recommendHandbags - Uma função que gerencia o processo de recomendação de bolsas.
 * - RecommendHandbagsInput - O tipo de entrada para a função recommendHandbags.
 * - RecommendHandbagsOutput - O tipo de retorno para a função recommendHandbags.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProductInfoSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  category: z.string(),
  price: z.number(),
});

const RecommendHandbagsInputSchema = z.object({
  occasion: z
    .string()
    .describe('A ocasião para a qual o usuário precisa de uma bolsa (ex: "evento noturno", "trabalho diário", "viagem").'),
  stylePreference: z
    .string()
    .describe('O estilo preferido do usuário (ex: "minimalista", "boêmio", "clássico", "tendência").'),
  wardrobeItems: z
    .string()
    .describe('Uma descrição dos itens de guarda-roupa existentes para combinar com a bolsa.'),
  availableProducts: z.array(ProductInfoSchema).describe('A lista de produtos reais disponíveis na loja para recomendação.'),
});
export type RecommendHandbagsInput = z.infer<typeof RecommendHandbagsInputSchema>;

const RecommendedHandbagSchema = z.object({
  productId: z.string().describe('O ID real do produto no catálogo.'),
  name: z.string().describe('O nome da bolsa recomendada.'),
  brand: z.string().describe('A marca (sempre Ateliê Starbright).'),
  reason: z.string().describe('Explicação personalizada de por que esta peça específica da nossa loja é ideal para o usuário.'),
});

const RecommendHandbagsOutputSchema = z.object({
  recommendations: z.array(RecommendedHandbagSchema).describe('Um array de bolsas recomendadas do nosso catálogo.'),
  summary: z.string().describe('Um resumo explicando as recomendações com base na entrada do usuário.'),
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
  prompt: `Você é uma consultora de moda de luxo especializada nas peças exclusivas do Ateliê Starbright. 
Sua tarefa é recomendar as 3 melhores bolsas do nosso catálogo real para o cliente.

IMPORTANTE: Você SÓ pode recomendar produtos que estejam na lista "availableProducts" fornecida abaixo. Use o "id" real do produto.

Catálogo da Loja:
{{#each availableProducts}}
- [ID: {{{id}}}] {{{name}}} (Categoria: {{{category}}}, Preço: €{{{price}}}) - {{{description}}}
{{/each}}

Preferências do Usuário:
- Ocasião: {{{occasion}}}
- Estilo Preferido: {{{stylePreference}}}
- Itens do Guarda-Roupa: {{{wardrobeItems}}}

Analise o catálogo e as preferências. Selecione as 3 peças mais adequadas. 
Para cada recomendação, forneça o productId correto e uma razão convincente e luxuosa em Português (PT-BR).`,
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
      throw new Error('Falha ao obter recomendações de bolsas.');
    }
    return output;
  }
);
