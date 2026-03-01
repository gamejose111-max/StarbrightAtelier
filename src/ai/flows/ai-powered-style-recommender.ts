
'use server';
/**
 * @fileOverview Um agente de IA que recomenda bolsas de luxo com base nas preferências do usuário.
 *
 * - recommendHandbags - Uma função que gerencia o processo de recomendação de bolsas.
 * - RecommendHandbagsInput - O tipo de entrada para a função recommendHandbags.
 * - RecommendHandbagsOutput - O tipo de retorno para a função recommendHandbags.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendHandbagsInputSchema = z.object({
  occasion: z
    .string()
    .describe('A ocasião para a qual o usuário precisa de uma bolsa (ex: "evento noturno", "trabalho diário", "viagem").'),
  stylePreference: z
    .string()
    .describe('O estilo preferido do usuário (ex: "minimalista", "boêmio", "clássico", "tendência").'),
  wardrobeItems: z
    .string()
    .describe('Uma descrição dos itens de guarda-roupa existentes para combinar com a bolsa (ex: "vestido preto, joias de prata", "jeans e camisetas", "ternos de negócios").'),
});
export type RecommendHandbagsInput = z.infer<typeof RecommendHandbagsInputSchema>;

const RecommendedHandbagSchema = z.object({
  name: z.string().describe('O nome da bolsa recomendada.'),
  brand: z.string().describe('A marca da bolsa recomendada.'),
  description: z.string().describe('Uma breve descrição da bolsa, destacando por que ela se encaixa nas preferências do usuário.'),
  features: z.array(z.string()).describe('Recursos principais da bolsa (ex: "alça removível", "bolsos internos", "couro de bezerro").'),
  imageUrl: z.string().url().describe('Uma URL para uma imagem da bolsa recomendada.'),
});

const RecommendHandbagsOutputSchema = z.object({
  recommendations: z.array(RecommendedHandbagSchema).describe('Um array de bolsas de luxo recomendadas.'),
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
  prompt: `Você é uma consultora de moda de luxo especializada em bolsas de alta costura para o Ateliê Starbright. Sua tarefa é recomendar 3 bolsas de luxo requintadas com base nas preferências do usuário, ocasião e guarda-roupa existente. Foque em peças sofisticadas, atemporais e elegantes. Toda a sua resposta deve ser em Português (PT-BR).

Preferências do Usuário:
- Ocasião: {{{occasion}}}
- Estilo Preferido: {{{stylePreference}}}
- Itens do Guarda-Roupa: {{{wardrobeItems}}}

Com base nestes detalhes, forneça 3 recomendações de bolsas distintas, incluindo a marca, uma descrição detalhada, recursos principais e uma URL de imagem hipotética (use picsum.photos). Além disso, inclua um breve resumo explicando suas escolhas.

Certifique-se de que a saída seja um objeto JSON correspondente à estrutura solicitada e priorize marcas conhecidas por bolsas de luxo.`,
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
