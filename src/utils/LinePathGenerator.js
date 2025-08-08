// 贝塞尔曲线路径生成工具
export const createLinePathForCurve = (
  fx, // 起始点 x 坐标
  fy, // 起始点 y 坐标
  tx, // 终点 x 坐标
  ty, // 终点 y 坐标
  toLeft = false // 是否向左连接
) => {
  const __buff_x = tx - fx;
  const __buff_y = ty - fy;
  const startDirection_x = toLeft ? -100 : 100;
  const startDirection_y = 0;
  const endDirection_x = toLeft ? 100 : -100;
  const endDirection_y = 0;

  const forceX = Math.min(200, Math.max(100, Math.abs(__buff_x / 2)));
  const forceY = Math.min(200, Math.max(100, Math.abs(__buff_y / 2)));
  const startForceX = startDirection_x / (Math.abs(startDirection_x) + Math.abs(startDirection_y)) * forceX;
  const startForceY = startDirection_y / (Math.abs(startDirection_x) + Math.abs(startDirection_y)) * forceY;
  const ctrl1 = {x: startForceX, y: startForceY};
  const endForceX = endDirection_x / (Math.abs(endDirection_x) + Math.abs(endDirection_y)) * forceX + __buff_x;
  const endForceY = endDirection_y / (Math.abs(endDirection_x) + Math.abs(endDirection_y)) * forceY + __buff_y;
  const ctrl2 = {x: endForceX, y: endForceY};
  
  const path = `M ${Math.round(fx)},${Math.round(fy)} c ${Math.round(ctrl1.x)},${Math.round(ctrl1.y)} ${Math.round(ctrl2.x)},${Math.round(ctrl2.y)} ${Math.round(__buff_x)},${Math.round(__buff_y)}`;
  return path;
};