// lib/score.js
export const DEFAULT_WEIGHTS = {
  ai: 0.4,
  teacher: 0.4,
  task: 0.2,
};

export function computeFinalScore({ aiScore = 0, teacherScore = 0, taskScore = 0 }, weights = DEFAULT_WEIGHTS) {
  const wAI = weights.ai ?? 0.4;
  const wTeacher = weights.teacher ?? 0.4;
  const wTask = weights.task ?? 0.2;
  const val = (aiScore * wAI) + (teacherScore * wTeacher) + (taskScore * wTask);
  return Math.round(Math.max(0, Math.min(100, val)));
}
