/**
 * 最小路径和
 * 1, 1, 3
 * 1, 5, 1
 * 4, 2, 1
 * @nums Array<Array>, 
 */
function minPathSum(nums) {
    let min = Infinity;
    // queue中保存的每一个路径中终点的位置信息，该路径已经遍历过的sum
    let queue = [[0, 0, 0]];
    const m = nums.length - 1;
    const n = nums[0].length - 1;

    while (queue.length) {
        const [i, j, preSum] = queue.pop();

        const cur = nums[i][j];
        const curSum = cur + preSum;
        if (i === n && j === m) {
            min = Math.min(min, curSum);
            continue;
        }
        // 向下遍历
        if (i + 1 <= m) {
            queue.push([i + 1, j, curSum]);
        }
        // 向右遍历
        if (j + 1 <= n) {
            queue.push([i, j + 1, curSum]);
        }
    }
    return min;
}