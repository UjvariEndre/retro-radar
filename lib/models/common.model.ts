import { z } from "zod";

export const CommonIntIdSchema = z.number();
export type CommonIntIdModel = z.infer<typeof CommonIntIdSchema>;

export const CommonTimestampSchema = z.string().datetime().nullish();
export type CommonTimestampModel = z.infer<typeof CommonTimestampSchema>;

export const WikiTagSchema = z.string();
export type WikiTagModel = z.infer<typeof WikiTagSchema>;

export const CommonNameSchema = z.string();
export type CommonNameModel = z.infer<typeof CommonNameSchema>;
