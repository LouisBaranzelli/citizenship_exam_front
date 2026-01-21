
export enum ThemeID {
  T1= "theme.t1",
  T2= "theme.t2",
  T3= "theme.t3",
  T4= "theme.t4",
  T5= "theme.t5",
}

export interface Theme {
  id: ThemeID
}

export const THEMES: Record<ThemeID, {background: string}> = {
  [ThemeID.T1]: {
    background:'assets/images/themes/t1.jpg'
  },
  [ThemeID.T2]: {
    background:'assets/images/themes/t2.jpg'
  },
    [ThemeID.T3]: {
  background:'assets/images/themes/t3.jpg'
  },
  [ThemeID.T4]: {
    background:'assets/images/themes/t4.jpg'
  },
  [ThemeID.T5]: {
    background:'assets/images/themes/t5.jpg'
  }
}
