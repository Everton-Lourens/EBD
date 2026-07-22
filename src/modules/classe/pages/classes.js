const STORAGE_KEYS = window.APP_STORAGE_KEYS;

const API_CONFIG = window.APP_CONFIG;
const API_BASE_URL = API_CONFIG.resolveApiBaseUrl();
const AUTH_STORAGE = window.APP_AUTH_STORAGE;
const APP_API_CLIENT = window.APP_API_CLIENT;
const classesGrid = document.getElementById('classesGrid');
const statusText = document.getElementById('statusText');

const session = readSession();
if (!session.token) {
  goToLogin();
} else {
  loadClasses(session.token);
}

function readSession() {
  try {
    const token = AUTH_STORAGE.readToken(STORAGE_KEYS.token);
    return {
      token
    };
  } catch {
    return { token: '' };
  }
}

async function loadClasses(token) {
  setStatus('Carregando classes...');

  try {
    const response = await fetch(`${API_BASE_URL}/classes`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const payload = await APP_API_CLIENT.safeJson(response);
    if (!response.ok || APP_API_CLIENT.isFailurePayload?.(payload) || payload?.ok === false) {
      throw APP_API_CLIENT.createApiError(response, payload, {
        fallbackMessage: 'Não foi possível carregar as classes.'
      });
    }

    const classes = normalizeClasses(payload);
    renderClasses(classes);
  } catch (error) {
    renderError(error.message || 'Falha ao consultar a API de classes.');
  }
}

function normalizeClasses(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.result)) return payload.result;
  if (Array.isArray(payload?.items)) return payload.items;
  return [];
}

function renderClasses(classes) {
  if (!classes.length) {
    classesGrid.innerHTML = `
      <article class="class-card is-empty" tabindex="0" aria-disabled="true">
        <h3 class="class-card__title">Nenhuma classe encontrada</h3>
        <p class="class-card__fallback">A API respondeu corretamente, mas não devolveu registros para exibir.</p>
      </article>
    `;
    setStatus('0 classes carregadas.');
    return;
  }

  classesGrid.innerHTML = classes
    .map((classItem, index) => {
      const title = getClassTitle(classItem, index);
      const details = getClassDetails(classItem);
      const badge = buildBadge(title, index);
      const callStatusEmoji = getCallStatusEmoji(classItem);
      const classId = getClassId(classItem);
      const hasClassId = Boolean(classId);

      return `
        <button
          type="button"
          class="class-card${hasClassId ? '' : ' is-disabled'}"
          data-class-name="${escapeHtml(title)}"
          data-class-id="${escapeHtml(classId)}"
          ${hasClassId ? '' : 'disabled aria-disabled="true"'}
        >
          <span class="class-card__badge" aria-hidden="true">${escapeHtml(badge)}</span>
          <h3 class="class-card__title">
            <span class="class-card__title-text">${escapeHtml(title)}</span>
            <span class="class-card__status-emoji" aria-hidden="true">${escapeHtml(callStatusEmoji)}</span>
          </h3>
          <p class="class-card__meta">${escapeHtml(details)}</p>
          <span class="class-card__footer">${hasClassId ? 'Abrir chamada' : 'ID da classe indisponível'}</span>
        </button>
      `;
    })
    .join('');

  classesGrid.querySelectorAll('.class-card').forEach((button) => {
    button.addEventListener('click', () => {
      const className = button.dataset.className || 'Classe';
      const classId = button.dataset.classId || '';
      goToCallPage(classId, className);
    });
  });

  setStatus(`${classes.length} classe${classes.length === 1 ? '' : 's'} carregada${classes.length === 1 ? '' : 's'}.`);
}

function renderError(message) {
  classesGrid.innerHTML = `
    <article class="class-card is-empty" tabindex="0" aria-disabled="true">
      <h3 class="class-card__title">Erro ao carregar classes</h3>
      <p class="class-card__fallback">${escapeHtml(message)}</p>
    </article>
  `;
  setStatus('Não foi possível carregar as classes.');
}

function goToCallPage(classId, className) {
  const params = new URLSearchParams();
  if (classId) params.set('classId', classId);
  if (className) params.set('className', className);

  const query = params.toString();
  const target = `../../chamada/pages/index.html${query ? `?${query}` : ''}`;
  window.location.assign(target);
}

function setStatus(message) {
  statusText.textContent = message;
}

function getClassTitle(classItem, index) {
  return (
    classItem?.nome ||
    classItem?.name ||
    classItem?.titulo ||
    classItem?.descricao ||
    classItem?.label ||
    `Classe ${index + 1}`
  );
}

function getClassDetails(classItem) {
  const parts = [];
  const classId = getClassId(classItem);

  if (classId) parts.push(`ID ${classId}`);
  if (classItem?.turno || classItem?.shift) parts.push(classItem.turno || classItem.shift);
  if (classItem?.faixaEtaria || classItem?.ageGroup) parts.push(classItem.faixaEtaria || classItem.ageGroup);
  if (classItem?.dias) parts.push(classItem.dias);
  if (classItem?.observacao) parts.push(classItem.observacao);

  return parts.length ? parts.join(' · ') : 'Registro vindo da API';
}

function getClassId(classItem) {
  const value = classItem?.id_classe ?? classItem?.idClasse ?? classItem?.classId ?? classItem?.id;

  if (value === undefined || value === null || value === '') {
    return '';
  }

  return String(value);
}

function buildBadge(title, index) {
  const first = String(title || '')
    .trim()
    .charAt(0)
    .toUpperCase();
  if (first) return first;
  return String(index + 1);
}

function getCallStatusEmoji(classItem) {
  return classItem?.chamada_ja_feita ? '✅' : '🟡';
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}


function goToLogin() {
  window.location.replace('../../../../../index.html');
}
