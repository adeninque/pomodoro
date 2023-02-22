export interface ISotrage {
  defaults : ITimer
  current: ITimer
  total: ITimer
}

export interface ITimer {
  productive: number
  rest: number
}