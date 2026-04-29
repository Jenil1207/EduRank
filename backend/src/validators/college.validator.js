const { z } = require('zod');

const collegeQuerySchema = z.object({
  search: z.string().optional(),
  state: z.string().optional(),
  type: z.string().optional(),
  minFees: z.coerce.number().optional(),
  maxFees: z.coerce.number().optional(),
  minRating: z.coerce.number().optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(50).default(12),
  sortBy: z.enum(['rating', 'totalFees', 'name', 'placementPct']).optional(),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

module.exports = { collegeQuerySchema };
