import { Hono } from "hono";
import { jwt, sign } from "hono/jwt";
import { load } from "ENV_LORDER";

const app = new Hono();
await load({ export: true });

// JWTの生成
const generateJwt = async (username: string) => {
  const payload = { iss: username, exp: Date.now() + 60 * 60 * 1000 };
  const token = await sign(payload, Deno.env.get("SECRET_KEY") || "", "HS256");
  return token;
};

// 認証用のエンドポイント
app.post("/login", async (c) => {
  const { username, password } = await c.req.json();

  // 認証ロジック（例として固定のユーザー名とパスワードを使用）
  if (username === "user" && password === "pass") {
    const token = await generateJwt(username);
    return c.json({ token });
  }

  return c.json({ message: "Invalid username or password" }, 401);
});

// JWT認証ミドルウェアの設定
app.use(
  "/protected/*",
  jwt({ secret: Deno.env.get("SECRET_KEY") || "", alg: "HS256" }),
);

// 認可されたエンドポイント
app.get("/protected/data", (c) => {
  return c.json({ message: "🔥This is protected data🔥" });
});

// エラー処理
app.onError((err, c) => {
  console.error(err);
  return c.json({ message: err.message }, 500);
});

Deno.serve(app.fetch);
