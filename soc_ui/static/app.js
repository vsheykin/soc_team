// Данные по планированию отдела SoC (L1, 24/7)
const DATA = {
  meta: {
    title: "Планирование отдела SoC — L1 команда",
    subtitle: "Собственная команда: 4 ставки L1 + руководитель. Режим 24/7. Без штатных L2/SOC-инженеров и TI-аналитиков.",
    updated: "2026-10-15"
  },

  roles: [
    {
      role: "Руководитель группы SOC (Team Lead)",
      count: "1 ставка",
      duties: [
        "Владение playbooks: написание, актуализация, контроль качества применения",
        "Контроль триажа: выборочные ревью закрытых тикетов (не менее 10% за смену)",
        "Обучение и онбординг L1, матрица компетенций",
        "Метрики MTTD / MTTR / FP-rate, отчетность руководству",
        "Управление эскалациями во внешний контур (дежурные админы, MSSP/DFIR)",
        "Составление ротаций, работа с подменами, контроль переработок"
      ],
      notDoing: ["Ручной триаж алертов в регулярном потоке (только пиковые ситуации)"]
    },
    {
      role: "Аналитик L1 (SOC Analyst)",
      count: "4 ставки",
      duties: [
        "Первичный триаж алертов SIEM/EDR по чек-листам и playbooks",
        "Обогащение контекста: TI-фиды, WHOIS, внутренняя CMDB, логи прокси/mail",
        "Штатный containment по инструкции: блокировка IP/хоста/учетки, изоляция EDR",
        "Заведение и ведение инцидентов в ITSM, фиксация timeline",
        "Передача смены по чек-листу, дежурство в общем канале эскалаций",
        "TI-рутина (по графику): разбор новых фидов, IoC-проверки, обзор отчётов вендоров"
      ],
      notDoing: [
        "Глубокая форензика и реверс-инжиниринг (эскалация наружу)",
        "Настройка/тюнинг SIEM, EDR, SOAR (нет штатного SOC-инженера)",
        "Разработка детектов и охотничьи операции (threat hunting)"
      ]
    },
    {
      role: "Внешний контур (обязателен при таком составе)",
      count: "не штат",
      duties: [
        "Дежурные администраторы инфраструктуры — эскалация по системным действиям",
        "MSSP / договорной DFIR — сложные инциденты, глубина 2 уровня",
        "Подрядчик по тюнингу SIEM — периодические работы по настройке правил"
      ],
      notDoing: []
    }
  ],

  schedules: [
    {
      id: "A",
      name: "Вариант A — бригадный, 12-часовые смены",
      shifts: "08:00–20:00 и 20:00–08:00",
      scheme: [
        "Два аналитика работают день (08–20), два — ночь (20–08)",
        "Ротация: 2 рабочих дня / 2 выходных внутри пары",
        "Живое покрытие всю ночь: 2 человека на смене"
      ],
      pros: ["Непрерывный мониторинг в реальном времени", "Простая логика ротации", "Ночью полноценная реакция"],
      cons: ["Смены по 12 часов", "Нагрузка ~180 ч/мес — нужен фонд подмен", "Болезнь одного роняет пару"],
      bestFor: "Поток алертов ровный, ночью тоже есть события",
      maxShift: "12 ч",
      nightCoverage: "2 человека онлайн",
      resilience: "низкая (4 ставки без запаса)",
      mttd: "минимальный",
      burnout: "высокий риск"
    },
    {
      id: "B",
      name: "Вариант B — 8-часовые смены + on-call вахта",
      shifts: "Будни 08:00–16:00 и 16:00–24:00; ночь и выходные — on-call",
      scheme: [
        "Двое в будни покрывают день и вечер (по 8 ч)",
        "Ночь 00–08 и выходные — один аналитик на телефоне (on-call-вахта, неделя через три)",
        "Реагирует по алертам из дежурного канала, не сидит в мониторе"
      ],
      pros: ["Максимум «человеческих» смен по 8 ч", "Дешевле остальных вариантов", "Команда живет в нормальном ритме"],
      cons: ["Ночью реакция, а не мониторинг — MTTD растет", "On-call утомляет при частых вызовах", "Выходные полностью на одном человеке"],
      bestFor: "Ночью тихо, большинство алертов — рабочее время",
      maxShift: "8 ч",
      nightCoverage: "on-call 1 человек",
      resilience: "средняя",
      mttd: "ночью выше",
      burnout: "средний риск"
    },
    {
      id: "C",
      name: "Вариант C — гибрид (рекомендуемый старт)",
      shifts: "День 09:00–19:00 ×2, окно 19:00–03:00 ×1, вахта 03:00–09:00 + выходные ×1",
      scheme: [
        "Плотный рабочий день: двое по 10 ч (09–19) — основной поток алертов",
        "Вечернее окно 19:00–03:00: один аналитик (8 ч)",
        "Четвертый — недельная вахта: глубокая ночь 03:00–09:00 по вызову + выходные",
        "Роли ротируются раз в 2 недели"
      ],
      pros: ["Нет смен длиннее 10 ч", "Пик алертов покрыт двумя людьми", "Ядро команды в предсказуемом ритме"],
      cons: ["Сложнее ротация и планирование", "Вахтенный в ночь — только реакция", "Требует дисциплины передачи смены"],
      bestFor: "Статистика показывает пики в рабочее время и вечером",
      maxShift: "10 ч",
      nightCoverage: "1 онлайн + 1 on-call",
      resilience: "средне-высокая",
      mttd: "приемлемый",
      burnout: "умеренный риск"
    }
  ],

  comparison: {
    headers: ["Критерий", "A: 12ч бригадный", "B: 8ч + on-call", "C: гибрид"],
    rows: [
      ["Максимальная длина смены", "12 ч", "8 ч", "10 ч"],
      ["Ночное покрытие", "2 человека онлайн", "on-call", "1 онлайн + on-call"],
      ["MTTD ночью", "минимальный", "выше среднего", "средний"],
      ["Устойчивость к больничным", "низкая", "средняя", "средне-высокая"],
      ["Риск выгорания", "высокий", "средний", "умеренный"],
      ["Сложность управления", "низкая", "средняя", "высокая"],
      ["Когда выбирать", "ровный поток 24/7", "тихие ночи, экономия", "стартовый вариант"]
    ]
  },

  processes: [
    {
      name: "Playbooks (стартовый набор)",
      items: [
        "Фишинговое письмо (mail + ссылка + вложение)",
        "Подозрительная активность учетной записи (brute-force, anormaly logon)",
        "Алерт EDR: malware / suspicious process",
        "Блокировка C2-обращения (DNS/proxy)",
        "Утечка данных через DLP (триаж)",
        "RDP/SSH с необычного IP"
      ]
    },
    {
      name: "Чек-лист передачи смены",
      items: [
        "Открытые инциденты с таймлайном и следующим шагом",
        "Алерты «на домотре», не ставшие инцидентами",
        "Плановые работы/изменения, влияющие на алерты",
        "Контакты подключенных экспертов по активным кейсам",
        "Подпись принявшего смену в журнале"
      ]
    },
    {
      name: "Матрица эскалации (таймбоксы)",
      items: [
        "P1 (критичный, подтвержденная компрометация): TL сразу + внешний DFIR ≤ 30 мин",
        "P2 (высокий): TL ≤ 1 ч, дежурный админ ≤ 2 ч",
        "P3 (средний): решение в рамках playbook, TL — постфактум",
        "P4 (низкий/информационный): закрытие L1 самостоятельно"
      ]
    },
    {
      name: "Метрики отдела",
      items: [
        "MTTD — среднее время обнаружения (цель < 30 мин для P1–P2)",
        "MTTR — среднее время реакции/закрытия",
        "FP-rate — доля ложных срабатываний (цель снижения по тюнингу)",
        "Quality score — % корректного триажа по ревью TL",
        "SLA on-call — время отклика ночной вахты"
      ]
    }
  ],

  roadmap: [
    { period: "1–2 мес.", items: ["Запуск дежурств по варианту C", "6 стартовых playbooks, обучение L1", "Настройка дашборда дежурного, канал эскалаций", "Сбор статистики алертов по времени суток"] },
    { period: "3–6 мес.", items: ["Автоматизация типовых действий (SOAR-lite / скрипты)", "Договор с внешним DFIR/MSSP на глубину L2", "Периодический тюнинг SIEM подрядчиком", "Расширение набора playbooks до 12+"] },
    { period: "6–12 мес.", items: ["Найм 5-й ставки L1 (фонд подмен)", "Найм L2/SOC-инженера, перевод TI-рутины на специалиста", "Переход к двухуровневой модели L1/L2", "Threat hunting как отдельная практика"] }
  ],

  legal: [
    "Суммированный учёт рабочего времени (ст. 104 ТК РФ), учётный период — квартал",
    "Ночные часы (22:00–06:00) оплачиваются в повышенном размере (ст. 154 ТК РФ)",
    "Работа в выходные — двойная оплата или отгул (ст. 153 ТК РФ)",
    "Переработки (сверх нормы при суммированном учёте) — не более 4 ч за 2 дня и 120 ч/год (ст. 99 ТК РФ)",
    "On-call вне рабочего времени: закрепить в ЛНА порядок и компенсацию (райдер/коэффициент)"
  ],

  recommendation: "Первые 2–4 недели работайте по варианту C и собирайте статистику алертов по времени суток. Если ночи стабильно тихие — переходите на B (дешевле). Если поток ровный — на A. При любой схеме заложите в бюджет 5-ю ставку L1: четыре человека на 24/7 работают без запаса на отпуска и больничные."
};

// ---------- Рендеринг ----------
const tabs = document.getElementById("tabs");
const content = document.getElementById("content");

const VIEWS = [
  { id: "overview", label: "Обзор и роли", render: renderOverview },
  { id: "schedules", label: "Графики 24/7", render: renderSchedules },
  { id: "compare", label: "Сравнение", render: renderCompare },
  { id: "processes", label: "Процессы", render: renderProcesses },
  { id: "roadmap", label: "Roadmap", render: renderRoadmap }
];

let activeView = "overview";

function esc(s) {
  return String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
}

function renderTabs() {
  tabs.innerHTML = "";
  VIEWS.forEach(v => {
    const b = document.createElement("button");
    b.className = "tab" + (v.id === activeView ? " active" : "");
    b.textContent = v.label;
    b.dataset.view = v.id;
    b.addEventListener("click", () => { activeView = v.id; renderAll(); });
    tabs.appendChild(b);
  });
}

function renderHeader() {
  document.getElementById("hdr-title").textContent = DATA.meta.title;
  document.getElementById("hdr-sub").textContent = DATA.meta.subtitle;
  document.getElementById("hdr-updated").textContent = "Обновлено: " + DATA.meta.updated;
}

function renderOverview() {
  let html = `<div class="grid">`;
  html += `
    <div class="card stat"><div class="stat-num">4+1</div><div class="stat-label">L1 + руководитель</div></div>
    <div class="card stat"><div class="stat-num">24/7</div><div class="stat-label">режим дежурств</div></div>
    <div class="card stat"><div class="stat-num">3</div><div class="stat-label">варианта графиков</div></div>
    <div class="card stat"><div class="stat-num">6</div><div class="stat-label">стартовых playbooks</div></div>`;
  html += `</div>`;

  DATA.roles.forEach(r => {
    html += `<div class="card role-card">
      <h3>${esc(r.role)} <span class="badge">${esc(r.count)}</span></h3>
      <div class="duties">
        <div class="col"><h4>Обязанности</h4><ul>${r.duties.map(d => `<li>${esc(d)}</li>`).join("")}</ul></div>
        ${r.notDoing.length ? `<div class="col"><h4 class="muted-h">Не входит в зону</h4><ul class="not">${r.notDoing.map(d => `<li>${esc(d)}</li>`).join("")}</ul></div>` : ""}
      </div>
    </div>`;
  });
  html += `<div class="card rec"><h3>Рекомендация</h3><p>${esc(DATA.recommendation)}</p></div>`;
  return html;
}

function scheduleCard(s) {
  return `<div class="card sched">
    <h3>${esc(s.name)}</h3>
    <div class="shift-line">🕐 ${esc(s.shifts)}</div>
    <ul class="scheme">${s.scheme.map(x => `<li>${esc(x)}</li>`).join("")}</ul>
    <div class="proscons">
      <div><h4 class="plus">Плюсы</h4><ul>${s.pros.map(x => `<li>${esc(x)}</li>`).join("")}</ul></div>
      <div><h4 class="minus">Минусы</h4><ul>${s.cons.map(x => `<li>${esc(x)}</li>`).join("")}</ul></div>
    </div>
    <div class="bestfor">💡 Когда подходит: <b>${esc(s.bestFor)}</b></div>
  </div>`;
}

function renderSchedules() {
  return DATA.schedules.map(scheduleCard).join("");
}

function renderCompare() {
  const c = DATA.comparison;
  return `<div class="card table-wrap"><table>
    <thead><tr>${c.headers.map(h => `<th>${esc(h)}</th>`).join("")}</tr></thead>
    <tbody>${c.rows.map(row => `<tr>${row.map((cell, i) => i === 0 ? `<td class="k">${esc(cell)}</td>` : `<td>${esc(cell)}</td>`).join("")}</tr>`).join("")}</tbody>
  </table></div>`;
}

function renderProcesses() {
  return DATA.processes.map(p => `<div class="card"><h3>${esc(p.name)}</h3><ul class="proc">${p.items.map(i => `<li>${esc(i)}</li>`).join("")}</ul></div>`).join("")
    + `<div class="card"><h3>ТК РФ — заметки</h3><ul class="proc">${DATA.legal.map(i => `<li>${esc(i)}</li>`).join("")}</ul></div>`;
}

function renderRoadmap() {
  return `<div class="timeline">` + DATA.roadmap.map(r => `
    <div class="tl-item card">
      <div class="tl-period">${esc(r.period)}</div>
      <ul>${r.items.map(i => `<li>${esc(i)}</li>`).join("")}</ul>
    </div>`).join("") + `</div>`;
}

function renderAll() {
  renderHeader();
  renderTabs();
  const v = VIEWS.find(x => x.id === activeView);
  content.innerHTML = v.render();
}

renderAll();
