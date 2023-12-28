

// 处理四位数字的展示
// 例如 1234 => 一千二百三十四
function transNumToZh(number) {
  const numChar = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
  const numUnit = ['', '十', '百', '千'];

  const res = [];

  const numStr = String(number);
  const len = numStr.length;

  if (len > 4) {
    throw Error('not support');
  }

  for (let i = 0; i < numStr.length; i++) {
    // 处理 0 情况, 如果出现多个 0 只需要添加一个零
    if (numStr[i] !== '0') {
      if (numStr[i - 1] === '0') {
        res.push(numChar[0]);
      }
      res.push(numChar[numStr[i]]);
      res.push(numUnit[len - i - 1]);
    }
  }
  if (len === 2 && numStr[0] === '1') {
    // 移除首位，11 = 一十一 => 十一
    res.shift();
  }
  return res.join('');
}

function trans(number) {
  const numStr = String(number);
  const len = numStr.length;
  let numSection = ['', '万', '亿', '万亿', '亿亿'];
  const res = [];
  for (let i = len; i > 0; i -= 4) {
    const segment = transNumToZh(numStr.slice(Math.max(0, i - 4), i));
    // 加入计算的单位，因为 i 从 len开始计算，(len - i) / 4 表示 for 渲染执行的第几次，
    // 第 0 次是最后 4 位，第 1 次是倒数第 4 位 ～ 第 8 位对应单位为万
    res.unshift(numSection[(len - i) / 4]);
    res.unshift(segment);
  }
  return res.join('');
}