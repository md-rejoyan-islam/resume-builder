import { deleteCookie, getCookie, setCookie } from "@/app/actions";
import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.API_URL;

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  return handleProxyRequest(request, (await params).path);
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  return handleProxyRequest(request, (await params).path);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  return handleProxyRequest(request, (await params).path);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  return handleProxyRequest(request, (await params).path);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  return handleProxyRequest(request, (await params).path);
}

async function handleProxyRequest(
  request: NextRequest,
  pathSegments: string[]
) {
  const requestHeaders = new Headers(request.headers);

  const accessToken = await getCookie("accessToken");
  const refreshToken = await getCookie("refreshToken");

  requestHeaders.delete("connection");

  if (accessToken) {
    requestHeaders.set("Authorization", `Bearer ${accessToken}`);
  }

  const urlPath = pathSegments.join("/");
  const targetUrl = `${API_URL}/${urlPath}${request.nextUrl.search}`;

  const requestBody =
    request.method === "GET" || request.method === "HEAD"
      ? null
      : await request.arrayBuffer();

  let response = await fetchResource({
    url: targetUrl,
    method: request.method,
    headers: requestHeaders,
    body: requestBody,
  });

  // Handle 401 Unauthorized - attempt to refresh token
  if (response.status === 401) {
    if (!refreshToken) {
      await deleteCookie("accessToken");
      await deleteCookie("refreshToken");

      // send before returning responseBody
      return NextResponse.json(
        {
          ...(await response.json()),
        },
        {
          status: response.status,
        }
      );
    }

    try {
      const tokenRefreshResponse = await fetchResource({
        url: `${API_URL}/api/v1/auth/refresh`,
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify({
          refresh_token: refreshToken,
        }),
      });

      if (tokenRefreshResponse.ok) {
        const tokenData = await tokenRefreshResponse.json();
        const newAccessToken = tokenData.data.access_token;

        if (newAccessToken) {
          await setCookie("accessToken", newAccessToken);

          // Retry the original request with the new access token
          response = await fetchResource({
            url: targetUrl,
            method: request.method,
            headers: new Headers({
              Authorization: `Bearer ${newAccessToken}`,
            }),
            body: requestBody,
          });
        }
      } else {
        await deleteCookie("accessToken");
        await deleteCookie("refreshToken");
        const errorMsg =
          "Session expired. Please log in again.";
        return NextResponse.json({ message: errorMsg }, { status: 401 });
      }
    } catch (error) {
      console.error("Error during token refresh:", error);
      return NextResponse.json(
        { message: "An error occurred during token refresh." },
        { status: 500 }
      );
    }
  }

  // Check the response's content type
  const contentType = response.headers.get("content-type");

  // If the content is not JSON, stream it directly back to the client
  if (contentType && !contentType.includes("application/json")) {
    return new NextResponse(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    });
  }

  // response body
  const responseBody = await response.json();

  // If the request is a login and successful, set cookies
  if (
    request.method === "POST" &&
    request.url.includes("/auth/login") &&
    response.status === 200
  ) {
    await setCookie("accessToken", responseBody.data.access_token);
    await setCookie("refreshToken", responseBody.data.refresh_token);
    await setCookie("role", responseBody.data.user.role);
    await setCookie("tenantId", responseBody.data.tenant._id);
    await setCookie("tenantName", responseBody.data.tenant.name);
  }

  return new NextResponse(JSON.stringify(responseBody), {
    status: response.status,
    statusText: response.statusText,
    headers: {
      ...response.headers,
      "Content-Type": "application/json",
    },
  });
}

async function fetchResource({
  url,
  method,
  headers: fetchHeaders,
  body,
}: {
  readonly url: string;
  readonly method: string;
  readonly headers?: Headers;
  readonly body?: BodyInit | null;
}) {
  const headers = new Headers(fetchHeaders);
  // headers.set('Content-Type', 'application/json');

  return fetch(url, {
    method,
    headers,
    body,
  });
}
