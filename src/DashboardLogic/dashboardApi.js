const BASE_URL = "https://dummyjson.com";

const buildUrl = (path, params = {}) => {
  const url = new URL(`${BASE_URL}${path}`);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.append(key, value);
    }
  });
  return url.toString();
};

export const fetchUsers = async (params = {}) => {
  let path = "/users";
  if (params.q) {
    path = "/users/search";
  } else if (params.filterKey && params.filterValue) {
    path = `/users/filter`;
    // For Users filter, DummyJSON uses ?key=field&value=val
    const { filterKey, filterValue, ...rest } = params;
    const url = buildUrl(path, {
      key: filterKey,
      value: filterValue,
      limit: 200,
      ...rest,
    });
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch filtered users");
    return res.json();
  }

  const url = buildUrl(path, { limit: 200, ...params });
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
};

export const fetchProducts = async (params = {}) => {
  let path = "/products";
  if (params.q) {
    path = "/products/search";
  } else if (params.category) {
    path = `/products/category/${params.category}`;
    const url = buildUrl(path, { limit: 100 });
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch products in category");
    return res.json();
  }

  const url = buildUrl(path, { limit: 100, ...params });
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
};

export const addUser = async (user) => {
  const res = await fetch("https://dummyjson.com/users/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  if (!res.ok) throw new Error("Failed to add user");
  return res.json();
};

export const addProduct = async (product) => {
  const res = await fetch("https://dummyjson.com/products/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  if (!res.ok) throw new Error("Failed to add product");
  return res.json();
};

export const updateUser = async (id, data) => {
  const { id: _, ...payload } = data;
  const res = await fetch(`https://dummyjson.com/users/${id}`, {
    method: "PATCH", // Changed from PUT to PATCH
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Failed to update user ${id}`);
  return res.json();
};

export const updateProduct = async (id, data) => {
  const { id: _, ...payload } = data;
  const res = await fetch(`https://dummyjson.com/products/${id}`, {
    method: "PATCH", // Changed from PUT to PATCH
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Failed to update product ${id}`);
  return res.json();
};

export const fetchCarts = async (params = {}) => {
  // If search query 'q' is a number, use the /carts/user/{id} endpoint
  if (params.q && !isNaN(params.q)) {
    const { q, ...rest } = params;
    const url = buildUrl(`/carts/user/${q}`, rest);
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch carts for user ${q}`);
    return res.json();
  }

  const url = buildUrl("/carts", { limit: 50, ...params });
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch carts");
  return res.json();
};

export const loginUser = async (username, password) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username,
      password,
      expiresInMins: 60,
    }),
  });
  if (!res.ok) throw new Error("Login failed. Please check your credentials.");
  return res.json();
};

export const fetchAuthMe = async (token) => {
  const res = await fetch(`${BASE_URL}/auth/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Failed to fetch user profile");
  return res.json();
};
