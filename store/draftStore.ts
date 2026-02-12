import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface NewFormContent {
  name: string;
  email: string;
  date: string;
  comment: string;
}

interface FormDraft {
  draft: NewFormContent;
  setDraft: (form: NewFormContent) => void;
  clearDraft: () => void;
}

const initialDraft: NewFormContent = {
  name: '',
  email: '',
  date: '',
  comment: '',
};

export const useFormDraft = create<FormDraft>()(
  persist(
    set => ({
      draft: initialDraft,
      setDraft: form => set(() => ({ draft: form })),
      clearDraft: () => set(() => ({ draft: initialDraft })),
    }),
    {
      name: 'form-draft',
      partialize: state => ({ draft: state.draft }),
    }
  )
);