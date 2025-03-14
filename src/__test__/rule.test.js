import { steal } from "../pages/room/rule";

test("steal function should transfer 2 coins from victim to attacker", () => {
  // 初始化两个玩家
  const attacker = { coin: 5 }; // 攻击者初始有 5 个硬币
  const victim = { coin: 5 }; // 受害者初始有 5 个硬币

  // 调用 steal 函数
  steal(attacker, victim);

  // 验证攻击者的硬币增加了 2
  expect(attacker.coin).toBe(7);

  // 验证受害者的硬币减少了 2
  expect(victim.coin).toBe(3);
});
