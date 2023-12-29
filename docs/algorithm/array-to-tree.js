function arrayToTree(list, rootId = 0) {
  const nodeMap = {};
  for (let item of list) {
    nodeMap[item.id] = item;
  }

  const result = [];
  for (let item of list) {
    const pId = item.parent_id;
    if (pId === rootId) {
      result.push(item);
    } else {
      const target = nodeMap[pId];
      target.children = target.children || [];
      target.children.push(item);
    }
  }
  return result;
}