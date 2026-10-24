import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Please enter a valid academic or personal email address.'),
  password: z.string().min(6, 'Password must be at least 6 characters.'),
});

export const registerSchema = z.object({
  fullName: z.string().min(3, 'Full name must be at least 3 characters.'),
  email: z.string().email('Please enter a valid email address.'),
  password: z.string().min(8, 'Password must be at least 8 characters.'),
  institution: z.string().min(2, 'Please specify your university or institution.'),
  faculty: z.string().min(2, 'Please specify your faculty or school.'),
  department: z.string().min(2, 'Please specify your academic department.'),
});

export const projectIntakeSchema = z.object({
  title: z.string().min(10, 'Project title should be at least 10 characters for academic clarity.'),
  institution: z.string().min(2, 'Please provide your institution name.'),
  department: z.string().min(2, 'Please provide your department.'),
  fieldOfStudy: z.string().optional(),
  targetDegree: z.string().min(2, 'Please select your target degree.'),
  methodologyType: z.string().min(3, 'Please select or describe your research methodology.'),
  objectives: z.string().min(20, 'Please state your core research objectives in detail.'),
  supervisorGuidelines: z.string().optional(),
  questions: z.array(
    z.object({
      questionText: z.string().min(5, 'Research question cannot be empty.'),
    })
  ).min(1, 'At least one research question is required.'),
  hypotheses: z.array(
    z.object({
      code: z.string().min(2, 'Hypothesis code required (e.g. H01).'),
      hypothesisText: z.string().min(5, 'Hypothesis text cannot be empty.'),
      isNull: z.boolean(),
    })
  ).optional(),
  dataAuthenticityAcknowledged: z.literal(true, {
    errorMap: () => ({ message: 'You must acknowledge responsibility for data authenticity.' }),
  }),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type ProjectIntakeInput = z.infer<typeof projectIntakeSchema>;
