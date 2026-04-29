'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCompareStore = create(
  persist(
    (set, get) => ({
      colleges: [], // array of college objects (up to 3)

      addCollege: (college) => {
        const current = get().colleges;
        if (current.length >= 3) return { error: 'You can compare at most 3 colleges.' };
        if (current.find((c) => c._id === college._id)) return { error: 'Already in compare list.' };
        set({ colleges: [...current, college] });
        return { success: true };
      },

      removeCollege: (id) =>
        set((state) => ({ colleges: state.colleges.filter((c) => c._id !== id) })),

      clearAll: () => set({ colleges: [] }),

      isInCompare: (id) => get().colleges.some((c) => c._id === id),
    }),
    { name: 'college-compare-store' }
  )
);
