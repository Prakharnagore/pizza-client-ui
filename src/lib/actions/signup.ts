"use server";
import cookie from "cookie";
import { cookies } from "next/headers";

export default async function signup(prevState: any, formdata: FormData) {
  const firstName = formdata.get("firstName");
  const lastName = formdata.get("lastName");
  const email = formdata.get("email");
  const password = formdata.get("password");

  // todo: do request data validation

  // call auth service
  try {
    const response = await fetch(`http://localhost:5501/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.log("error", error);
      return {
        type: "error",
        message:
          error.errors?.[0]?.msg || error.message || "Registration failed",
      };
    }

    const responseData = await response.json();
    console.log("Registration response:", responseData);

    // Get cookies from response headers
    const c = response.headers.getSetCookie();
    const accessToken = c.find((cookie) => cookie.includes("accessToken"));
    const refreshToken = c.find((cookie) => cookie.includes("refreshToken"));

    // Set cookies if they exist
    if (accessToken) {
      const parsedAccessToken = cookie.parse(accessToken);
      cookies().set({
        name: "accessToken",
        value: parsedAccessToken.accessToken || "",
        expires: parsedAccessToken.expires
          ? new Date(parsedAccessToken.expires)
          : new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours default
        httpOnly: (parsedAccessToken.httpOnly as unknown as boolean) || true,
        path: parsedAccessToken.Path || "/",
        domain: parsedAccessToken.Domain || undefined,
        sameSite: (parsedAccessToken.SameSite as "strict") || "strict",
      });
    }

    if (refreshToken) {
      const parsedRefreshToken = cookie.parse(refreshToken);
      cookies().set({
        name: "refreshToken",
        value: parsedRefreshToken.refreshToken || "",
        expires: parsedRefreshToken.expires
          ? new Date(parsedRefreshToken.expires)
          : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days default
        httpOnly: (parsedRefreshToken.httpOnly as unknown as boolean) || true,
        path: parsedRefreshToken.Path || "/",
        domain: parsedRefreshToken.Domain || undefined,
        sameSite: (parsedRefreshToken.SameSite as "strict") || "strict",
      });
    }

    return {
      type: "success",
      message: "Registration successful!",
      data: responseData,
    };
  } catch (err: any) {
    console.error("Registration error:", err);
    return {
      type: "error",
      message: err.message || "Registration failed",
    };
  }
}
