import { create } from "zustand"

const useStatisticsStore = create(set => ({
    counter: {
        good: 0,
        bad: 0,
        neutral: 0,
    },
    actions: {
        goodIncrement: () => set(state => ({
            counter: {
                ...state.counter,
                good: state.counter.good + 1
            }
        })),
        badIncrement: () => set(state => ({
            counter: {
                ...state.counter,
                bad: state.counter.bad + 1
            }
        })),
        neutralIncrement: () => set(state => ({
            counter: {
                ...state.counter,
                neutral: state.counter.neutral + 1
            }
        }))
    }
}))

export const useStatisticsCounter = () => useStatisticsStore(state => state.counter)
export const useStatisticsControls = () => useStatisticsStore(state => state.actions)