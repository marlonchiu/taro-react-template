import { create } from 'zustand';
import { combine } from 'zustand/middleware';

import { TAB_BAR_LIST } from '@/constants/PAGE';

// define the initial state
const initialState = () => ({
  tabbarList: TAB_BAR_LIST,
  tabbarActive: 'home'
});

type State = ReturnType<typeof initialState>;
type Update = State | Partial<State> | ((state: State) => State | Partial<State>);

/**
 * common store
 */
export const useCommonStore = create(
  combine(
    initialState(),

    set => ({
      /** 通用update */
      SET_STATE: (data: Update) => set(data),

      /** 设置tabbar列表 */
      SET_TABBAR_LIST: (data: App.Tabbar[]) => set({ tabbarList: data }),

      /** 设置tabbar激活 */
      SET_TABBAR_ACTIVE: (key: string) => set({ tabbarActive: key })
    })
  )
);
