const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api/v1";
let accessToken = null;

export async function login(credentials) {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  let result;
  try {
    result = await response.json();
  } catch {
    throw new Error("The server returned an invalid response.");
  }

  if (!response.ok || !result.success) {
    throw new Error(result.error?.message || "Unable to sign in.");
  }

  if (!result.data?.token || !result.data?.user) {
    throw new Error("The server returned an invalid login response.");
  }

  accessToken = result.data.token;
  return result.data;
}

export async function requestPasswordReset(request) {
  const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  let result;
  try {
    result = await response.json();
  } catch {
    throw new Error("The server returned an invalid response.");
  }

  if (!response.ok || !result.success) {
    throw new Error(result.error?.message || "Unable to request a password reset.");
  }

  return result.data;
}

export async function resetPassword(request) {
  const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  let result;
  try {
    result = await response.json();
  } catch {
    throw new Error("The server returned an invalid response.");
  }

  if (!response.ok || !result.success) {
    throw new Error(result.error?.message || "Unable to reset your password.");
  }

  return result.data;
}

export function clearAccessToken() {
  accessToken = null;
}

export function getAccessToken() {
  return accessToken;
}
