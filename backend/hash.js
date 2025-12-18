const bcrypt = require("bcryptjs");

(async () => {
  const agents = [
    { name: "Ahmed", password: "ahmed123" },
    { name: "Sara", password: "sara123" }
  ];

  for (const agent of agents) {
    const hash = await bcrypt.hash(agent.password, 10);
    console.log(`${agent.name}: ${hash}`);
  }
})();
