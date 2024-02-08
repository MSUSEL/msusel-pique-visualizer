import { z } from "zod";
// Define the new utility function structure
const utilityFunctionNewStructure = z.object({
  //required
  name: z.string(),
  description: z.string(),
  //optional
  benchmarkTag: z.string().optional(),
  utilityFunctionImageURIs: z.record(z.string(), z.string()).optional(),
  benchmarkQualityMetrics: z.record(z.string(), z.union([z.string(), z.number()])).optional(),
  utilityFunctionQualityMetrics: z.record(z.string(), z.union([z.string(), z.number()])).optional(),
  sensitivityAnalysisResults: z.record(z.string(), z.union([z.string(), z.number()])).optional(),
});

// Update the existing utility function schema to accept both the old and new format
const utilityFunctionSchema = z.union([z.string(), utilityFunctionNewStructure]);


export namespace base {
  export const measureSingle = z.object({
    name: z.string(),
    description: z.string(),
    eval_strategy: z.string(),
    normalizer: z.string(),
    positive: z.boolean(),
    thresholds: z.tuple([z.number(), z.number()]),
    utility_function: utilityFunctionSchema,
    value: z.number(),
    weights: z.record(z.string(), z.number()),
  });

  export const factorSingle = z.object({
    name: z.string(),
    value: z.number(),
    eval_strategy: z.string(),
    normalizer: z.string(),
    utility_function: utilityFunctionSchema,
    description: z.string(),
    weights: z.record(z.string(), z.number()),
  });

  export const diagnosticsSingle = z.object({
    
    description: z.string(),
    eval_strategy: z.string(),
    name: z.string(),
    normalizer: z.string(),
    toolName: z.string(),
    utility_function: utilityFunctionSchema,
    value: z.number(),
    weights: z.record(z.string(), z.number()),
  });
  export const dataset = z.object({
    name: z.string(),
    measures: z.record(measureSingle),
    global_config: z.record(z.any()),
    factors: z.record(z.record(factorSingle)),
    additionalData: z.record(z.any()),
    diagnostics: z.record(diagnosticsSingle),
  });

  export type Schema = z.infer<typeof dataset>;
}
