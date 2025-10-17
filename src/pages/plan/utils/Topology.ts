import type { InitTask } from '../types/InitTask';

export function topologicalSort(dependencies: Record<InitTask, InitTask[]>): InitTask[] {
  const indegree = new Map<InitTask, number>();
  const graph = new Map<InitTask, InitTask[]>();

  Object.keys(dependencies).forEach((node) => {
    const InitNode = node as InitTask;
    const deps = dependencies[InitNode];
    indegree.set(InitNode, deps.length);
    deps.forEach((dep) => {
      if (!graph.has(dep)) graph.set(dep, []);
      graph.get(dep)!.push(InitNode);
    });
  });

  const queue: InitTask[] = [];
  for (const [node, deg] of indegree) {
    if (deg === 0) queue.push(node);
  }

  const result: InitTask[] = [];
  while (queue.length > 0) {
    const current = queue.shift()!;
    result.push(current);
    for (const next of graph.get(current) || []) {
      indegree.set(next, indegree.get(next)! - 1);
      if (indegree.get(next) === 0) queue.push(next);
    }
  }

  if (result.length !== Object.keys(dependencies).length) {
    throw new Error('Cyclic dependency detected in init tasks');
  }

  return result;
}
