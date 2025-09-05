'use server';

/**
 * @fileOverview A Genkit flow for determining the optimal food placement strategy in the Neon Serpent game.
 *
 * This flow analyzes the current game state and suggests a new food location that
 * increases the challenge for the player, preventing easily exploitable closed loops.
 *
 * @param {FoodPlacementInput} input - The input data containing the game board state and snake position.
 * @returns {Promise<FoodPlacementOutput>} - A promise resolving to the suggested food placement coordinates.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Define the input schema for the food placement flow
const FoodPlacementInputSchema = z.object({
  boardWidth: z.number().describe('The width of the game board.'),
  boardHeight: z.number().describe('The height of the game board.'),
  snakeBody: z
    .array(z.object({x: z.number(), y: z.number()}))
    .describe('The current coordinates of the snake body.'),
  currentFood: z
    .object({x: z.number(), y: z.number()})
    .optional()
    .describe('The coordinates of the current food, if any.'),
});
export type FoodPlacementInput = z.infer<typeof FoodPlacementInputSchema>;

// Define the output schema for the food placement flow
const FoodPlacementOutputSchema = z.object({
  x: z.number().describe('The x-coordinate of the suggested food placement.'),
  y: z.number().describe('The y-coordinate of the suggested food placement.'),
  reasoning: z
    .string()
    .optional()
    .describe('The AI reasoning behind the food placement suggestion.'),
});
export type FoodPlacementOutput = z.infer<typeof FoodPlacementOutputSchema>;

/**
 * Places food in a location that increases the game's challenge.
 * This prevents the snake from creating easily exploitable closed loops.
 * @param input The game board and snake details.
 */
export async function suggestFoodPlacement(input: FoodPlacementInput): Promise<FoodPlacementOutput> {
  return foodPlacementFlow(input);
}

// Define the prompt for the food placement strategy
const foodPlacementPrompt = ai.definePrompt({
  name: 'foodPlacementPrompt',
  input: {schema: FoodPlacementInputSchema},
  output: {schema: FoodPlacementOutputSchema},
  prompt: `You are an AI game strategist for the game Neon Serpent. Your task is to suggest the optimal location for the next food item to increase the challenge for the player.

  The game board is {{boardWidth}} units wide and {{boardHeight}} units tall.
  The snake's body is currently located at the following coordinates:
  {{#each snakeBody}}
    - ({{x}}, {{y}})
  {{/each}}

  Consider these factors when selecting the food location:
  - Difficulty: The location should be somewhat difficult for the snake to reach, requiring strategic planning.
  - Loop Prevention: Avoid placing the food in locations that would allow the snake to easily create closed loops, as this makes the game too easy.
  - Proximity to Snake: It should be a reasonable distance from the snake to prevent instant consumption, and allow for some maneuvering.

  Try to find a location that encourages the snake to explore more of the board rather than just circling in one area.

  Current Food (if any): {{#if currentFood}} at ({{currentFood.x}}, {{currentFood.y}}) {{else}} None {{/if}}

  Output ONLY a JSON object with the new x and y coordinates. Also include a reasoning field explaining your suggestion in one short sentence.
  `,
});

// Define the Genkit flow for food placement
const foodPlacementFlow = ai.defineFlow(
  {
    name: 'foodPlacementFlow',
    inputSchema: FoodPlacementInputSchema,
    outputSchema: FoodPlacementOutputSchema,
  },
  async input => {
    const {output} = await foodPlacementPrompt(input);
    return output!;
  }
);
