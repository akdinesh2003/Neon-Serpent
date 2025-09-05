'use server';

import { suggestFoodPlacement, type FoodPlacementInput } from '@/ai/flows/food-placement-strategy';

export async function getFoodPlacement(input: FoodPlacementInput) {
  try {
    // The AI can sometimes return coordinates outside the board. We'll add a check on the client.
    const result = await suggestFoodPlacement(input);
    return { success: true, data: result };
  } catch (error) {
    console.error("Error getting food placement:", error);
    return { success: false, error: "Failed to get AI food placement." };
  }
}
