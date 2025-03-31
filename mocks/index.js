import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";

export const server = setupServer(
  http.get("https://api.example.com/users", () => {
    return HttpResponse.json({
      
    })
  })
);
