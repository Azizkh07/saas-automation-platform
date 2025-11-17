import { create } from 'zustand';
import { Flow } from '@/types';

interface FlowState {
  flows: Flow[];
  currentFlow: Flow | null;
  setFlows: (flows: Flow[]) => void;
  setCurrentFlow: (flow: Flow | null) => void;
  addFlow: (flow: Flow) => void;
  updateFlow: (id: string, flow: Partial<Flow>) => void;
  deleteFlow: (id: string) => void;
}

export const useFlowStore = create<FlowState>((set) => ({
  flows: [],
  currentFlow: null,
  setFlows: (flows) => set({ flows }),
  setCurrentFlow: (flow) => set({ currentFlow: flow }),
  addFlow: (flow) => set((state) => ({ flows: [...state.flows, flow] })),
  updateFlow: (id, updatedFlow) =>
    set((state) => ({
      flows: state.flows.map((f) => (f.id === id ? { ...f, ...updatedFlow } : f)),
    })),
  deleteFlow: (id) =>
    set((state) => ({ flows: state.flows.filter((f) => f.id !== id) })),
}));