import { z } from "zod";

export const acceptMessageSchema = z.object({
  acceptMessges: z.boolean(),
});
