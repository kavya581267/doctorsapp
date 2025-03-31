// src/mirage.ts
import { UserInfo } from "@api/model/auth/Auth";
import { ClinicRequest } from "@api/model/client/ClientRequest";
import { createServer, Model, Response } from "miragejs";



export function makeServer({ environment = "development" } = {}) {
  let server = createServer({
    environment,

    models: {
      user: Model.extend<Partial<UserInfo>>({}),
      clinic: Model.extend<Partial<ClinicRequest>>({})
    },

    seeds(server) {
      server.create("user", { id: "1", username: "admin@admin.com", firstName: "user1", lastName:"last1",roles:["ADMIN"],internalUserId:1234 });
      server.create("user", { id: "2", username: "admin2@admin.com", firstName: "user2", lastName:"last2",roles:["DOCTOR"],internalUserId:12345 });
    },

    routes() {
      this.namespace = "api";

      this.post("/login", (schema, request) => {
        const { email, password } = JSON.parse(request.requestBody);
        let user = schema.where("user", (user) => user.username === email).models[0];
        console.log(user.attrs)
        if (email === "admin@admin.com" && password === "password123") {
          return {
            accessToken:"ddddd",
            refreshToken:"ftyhuj",
            expiresIn:5678,
            requiresMfa:false,
            user: user.attrs,
          };
        } else {
          return new Response(401, { "Content-Type": "application/json" }, { message: "Invalid credentials" });
        }
      });

      this.post("/logout", () => {
        return { message: "Logged out successfully" };
      });

      this.get("/users", (schema) => {
        return schema.all("user");
      });
    },
  });

  return server;
}
