import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatFees(amount) {
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L/yr`;
  if (amount >= 1000) return `₹${(amount / 1000).toFixed(0)}K/yr`;
  return `₹${amount}/yr`;
}

export function formatPackage(lpa) {
  return `${lpa} LPA`;
}
