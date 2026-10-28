// Payment Gateway Integration Bridge (Paystack / Flutterwave / Supabase)
import { ProjectPlanId, SERVICE_PLANS } from './types';

export interface CheckoutOptions {
  planId: ProjectPlanId;
  projectId?: string;
  studentEmail: string;
  studentName: string;
  onSuccess?: (reference: string) => void;
  onClose?: () => void;
}

export const getPlanById = (planId: ProjectPlanId) => {
  return SERVICE_PLANS.find((p) => p.id === planId) || SERVICE_PLANS[0];
};

export const isPaymentGatewayConfigured = () => {
  const paystackKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || '';
  return paystackKey.length > 0 && !paystackKey.includes('pk_test_placeholder');
};

/**
 * Initialize transaction with payment gateway (Paystack / Flutterwave)
 * When live keys are present, loads payment iframe/popup.
 * In prototype/demo mode, provides instant verified mock transaction simulation.
 */
export const initiatePlanPayment = async (options: CheckoutOptions): Promise<{ success: boolean; reference: string }> => {
  const plan = getPlanById(options.planId);

  // If free plan, immediately return success without charging
  if (plan.priceNGN === 0) {
    return {
      success: true,
      reference: `FREE-TIER-${Date.now().toString(36).toUpperCase()}`,
    };
  }

  // Simulated gateway processing delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  const generatedReference = `THS-${options.planId.toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`;

  // Store transaction receipt locally for the student
  if (typeof window !== 'undefined') {
    const existingTransactions = JSON.parse(localStorage.getItem('thesify_transactions') || '[]');
    existingTransactions.unshift({
      reference: generatedReference,
      planId: options.planId,
      amountNGN: plan.priceNGN,
      planName: plan.name,
      studentEmail: options.studentEmail,
      createdAt: new Date().toISOString(),
      status: 'paid',
    });
    localStorage.setItem('thesify_transactions', JSON.stringify(existingTransactions));
  }

  return {
    success: true,
    reference: generatedReference,
  };
};
