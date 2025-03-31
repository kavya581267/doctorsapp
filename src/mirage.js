// src/mirage.js
import { createServer } from "miragejs";

export function makeServer({ environment = "development" } = {}) {
  let server = createServer({
    environment,

    routes() {
      this.namespace = "api"; // Base API prefix to match real requests

      // Mock Login API
      this.post("/login", (schema, request) => {
        const { email, password } = JSON.parse(request.requestBody);

        // Simulated user authentication
        if (email === "admin@admin.com" && password === "password123") {
          return {
            accessToken: "mock-jwt-token",
            refreshToken: "",
            expiresIn: 300,
            requiresMfa: false,

            user: {
              id: 1,
              username: "adminusername",
              firstName: "adminfirst",
              lastName: "adminlast",
              roles: ["ADMIN"],
              internalUserId: 123456
            },
          };
        } else {
          return new Response({ message: "Invalid credentials" },{status:401,statusText:"Invalid credentials"});
        }
      });

      // Mock Logout (optional)
      this.post("/logout", () => {
        return { message: "Logged out successfully" };
      });

      // Mock User Data
      this.get("/users", () => {
        return [
          { id: 1, name: "John Doe", email: "john@example.com" },
          { id: 2, name: "Jane Doe", email: "jane@example.com" },
        ];
      });
    },
  });

  return server;
}
