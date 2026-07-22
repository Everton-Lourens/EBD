const LOCAL_API_BASE_URL = 'http://localhost:3000/api/v1';
const PROD_API_BASE_URL = 'https://ebd-fj9u.onrender.com/api/v1';
const API_BASE_URL = resolveApiBaseUrl();
const STORAGE_KEYS = {
  token: 'auth:token',
  username: 'auth:remembered-username',
};

const form = document.getElementById('loginForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const rememberUser = document.getElementById('rememberUser');
const forgotPasswordLink = document.getElementById('forgotPasswordLink');
const loginButton = document.getElementById('loginButton');
const feedback = document.getElementById('feedback');
const postLogin = document.getElementById('postLogin');
const logoutButton = document.getElementById('logoutButton');

const rememberedUsername = window.localStorage.getItem(STORAGE_KEYS.username);
if (rememberedUsername) {
  usernameInput.value = rememberedUsername;
  rememberUser.checked = true;
}

forgotPasswordLink.href = buildWhatsAppLink(
  '71981768164',
  'Esqueci minha senha, pode me ajudar?'
);

const existingToken = getStoredToken();
if (existingToken) {
  showAuthenticatedState();
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  feedback.textContent = '';
  feedback.classList.remove('is-success');

  const login = usernameInput.value.trim();
  const senha = passwordInput.value;

  if (!login || !senha) {
    feedback.textContent = 'Informe usuário e senha para continuar.';
    return;
  }

  setLoading(true);

  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ login, senha }),
    });

    const payload = await safeJson(response);

    if (!response.ok) {
      throw new Error(extractErrorMessage(payload) || 'Não foi possível autenticar agora.');
    }

    const token = extractToken(payload);
    if (!token) {
      throw new Error('A resposta do servidor não retornou um token válido.');
    }

    storeToken(token, payload);
    syncRememberedUsername(login, rememberUser.checked);
    passwordInput.value = '';
    showAuthenticatedState();
  } catch (error) {
    feedback.textContent = error.message || 'Falha ao efetuar login.';
  } finally {
    setLoading(false);
  }
});

logoutButton.addEventListener('click', () => {
  clearToken();
  postLogin.hidden = true;
  form.hidden = false;
  feedback.textContent = 'Sessão encerrada.';
  feedback.classList.remove('is-success');
});

function setLoading(isLoading) {
  loginButton.disabled = isLoading;
  loginButton.textContent = isLoading ? 'Entrando...' : 'Entrar';
}

function showAuthenticatedState() {
  form.hidden = true;
  postLogin.hidden = false;
  feedback.textContent = 'Autenticação concluída.';
  feedback.classList.add('is-success');
}

function resolveApiBaseUrl() {
  const hostname = window.location.hostname.toLowerCase();
  const isLocal = hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '';
  return isLocal ? LOCAL_API_BASE_URL : PROD_API_BASE_URL;
}

function buildWhatsAppLink(phone, message) {
  const normalizedPhone = String(phone).replace(/\D/g, '');
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${normalizedPhone}?text=${encodedMessage}`;
}

function extractToken(payload) {
  if (!payload || typeof payload !== 'object') return '';

  return (
    payload.token ||
    payload.accessToken ||
    payload.data?.token ||
    payload.data?.accessToken ||
    payload.result?.token ||
    payload.result?.accessToken ||
    payload.auth?.token ||
    ''
  );
}

function extractErrorMessage(payload) {
  if (!payload || typeof payload !== 'object') return '';
  return payload.message || payload.error || payload.detail || payload.data?.message || '';
}

async function safeJson(response) {
  const text = await response.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return { message: text };
  }
}

function storeToken(token, payload) {
  const tokenData = {
    token,
    storedAt: new Date().toISOString(),
    user: payload?.user || payload?.data?.user || null,
  };
  window.sessionStorage.setItem(STORAGE_KEYS.token, JSON.stringify(tokenData));
}

function getStoredToken() {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEYS.token);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed?.token || null;
  } catch {
    return null;
  }
}

function clearToken() {
  window.sessionStorage.removeItem(STORAGE_KEYS.token);
}

function syncRememberedUsername(login, shouldRemember) {
  if (shouldRemember) {
    window.localStorage.setItem(STORAGE_KEYS.username, login);
    return;
  }

  window.localStorage.removeItem(STORAGE_KEYS.username);
}
