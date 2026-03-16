const VALENCE = {
  H: 1, C: 4, N: 5, O: 6, F: 7, Cl: 7, Na: 1, Mg: 2, Cu: 1, Si: 4,
};

const THEORY_QUESTIONS = [
  { id: 1, prompt: "Porque é que, em geral, os átomos estabelecem ligações químicas?", options: ["Para atingirem uma configuração eletrónica mais estável.", "Para ficarem com maior massa.", "Porque querem perder sempre todos os eletrões.", "Porque os núcleos se fundem entre si."], answer: 0, explanation: "No 9.º ano, a ideia essencial é esta: os átomos ligam-se para atingirem maior estabilidade eletrónica." },
  { id: 2, prompt: "Numa ligação covalente, o que acontece aos eletrões?", options: ["São destruídos.", "São partilhados entre átomos.", "São transferidos para o núcleo.", "Ficam apenas no metal."], answer: 1, explanation: "A ligação covalente resulta da partilha de pares de eletrões entre átomos, geralmente não metálicos." },
  { id: 3, prompt: "Qual destas opções descreve melhor uma ligação iónica?", options: ["Partilha de eletrões entre dois não metais.", "Atração entre iões de cargas opostas.", "Atração entre moléculas neutras.", "Atração entre neutrões e eletrões."], answer: 1, explanation: "Na ligação iónica, forma-se uma atração eletrostática entre catiões e aniões." },
  { id: 4, prompt: "A regra do octeto, usada como modelo simples no 9.º ano, diz que muitos átomos tendem a ficar com:", options: ["2 eletrões de valência", "6 eletrões de valência", "8 eletrões de valência", "10 eletrões de valência"], answer: 2, explanation: "A regra do octeto é uma regra simplificada muito útil neste nível de ensino: muitos átomos tendem a ficar com 8 eletrões na camada de valência." },
  { id: 5, prompt: "Qual destas afirmações é correta?", options: ["As substâncias moleculares têm, tipicamente, ligações covalentes dentro das moléculas.", "As substâncias iónicas são constituídas por moléculas discretas.", "As substâncias metálicas são feitas de aniões e moléculas.", "As substâncias covalentes em rede são formadas por iões."], answer: 0, explanation: "Boa distinção conceptual: substâncias moleculares têm moléculas, e nessas moléculas as ligações são covalentes." },
  { id: 6, prompt: "Qual destas combinações corresponde melhor a uma ligação metálica?", options: ["Átomos não metálicos que partilham eletrões.", "Iões positivos e negativos que se atraem.", "Catiões metálicos e eletrões deslocalizados.", "Moléculas polares e apolares misturadas."], answer: 2, explanation: "Num modelo simples, a ligação metálica envolve a atração entre catiões metálicos e eletrões deslocalizados." },
];

const LEWIS_CHECKS = [
  { id: "check-h2o-ok", title: "Estrutura A", statement: "A notação de Lewis apresentada para a água respeita a regra do octeto no oxigénio?", central: "O", outer: ["H", "H"], shownBonds: [1, 1], shownCentralLP: 2, shownOuterLP: [0, 0], correct: true, feedback: "Correta: o oxigénio fica com 8 eletrões à sua volta e cada hidrogénio com 2." },
  { id: "check-nh3-bad", title: "Estrutura B", statement: "Esta estrutura do amoníaco está corretamente representada?", central: "N", outer: ["H", "H", "H"], shownBonds: [1, 1, 1], shownCentralLP: 0, shownOuterLP: [0, 0, 0], correct: false, feedback: "Incorreta: no NH₃ o azoto deve ter 1 par não ligante. Sem esse par, o azoto fica apenas com 6 eletrões à sua volta." },
  { id: "check-co2-ok", title: "Estrutura C", statement: "A representação de CO₂ mostrada cumpre a regra do octeto?", central: "C", outer: ["O", "O"], shownBonds: [2, 2], shownCentralLP: 0, shownOuterLP: [2, 2], correct: true, feedback: "Correta: o carbono fica com 8 eletrões e cada oxigénio também." },
  { id: "check-ch4-bad", title: "Estrutura D", statement: "Esta estrutura do metano está correta?", central: "C", outer: ["H", "H", "H", "H"], shownBonds: [1, 1, 1, 1], shownCentralLP: 1, shownOuterLP: [0, 0, 0, 0], correct: false, feedback: "Incorreta: no CH₄ o carbono não deve ter pares não ligantes. Com esse par extra, o carbono ultrapassaria o octeto." },
];

const BUILDER_CHALLENGES = [
  { id: "h2o", formula: "H₂O", name: "Água", hint: "Dois hidrogénios ligados a um oxigénio.", central: "O", outer: ["H", "H"], expectedBonds: [1, 1], expectedCentralLP: 2, expectedOuterLP: [0, 0] },
  { id: "nh3", formula: "NH₃", name: "Amoníaco", hint: "Três ligações simples e um par não ligante no átomo central.", central: "N", outer: ["H", "H", "H"], expectedBonds: [1, 1, 1], expectedCentralLP: 1, expectedOuterLP: [0, 0, 0] },
  { id: "ch4", formula: "CH₄", name: "Metano", hint: "O carbono faz quatro ligações simples e não fica com pares não ligantes.", central: "C", outer: ["H", "H", "H", "H"], expectedBonds: [1, 1, 1, 1], expectedCentralLP: 0, expectedOuterLP: [0, 0, 0, 0] },
  { id: "co2", formula: "CO₂", name: "Dióxido de carbono", hint: "O carbono central liga-se a dois oxigénios e cada oxigénio precisa de pares não ligantes.", central: "C", outer: ["O", "O"], expectedBonds: [2, 2], expectedCentralLP: 0, expectedOuterLP: [2, 2] },
  { id: "hcl", formula: "HCl", name: "Cloreto de hidrogénio", hint: "Uma ligação simples; o cloro fica com três pares não ligantes.", central: "Cl", outer: ["H"], expectedBonds: [1], expectedCentralLP: 3, expectedOuterLP: [0] },
];

const MATCH_ROWS = [
  { concept: "Substância molecular", definition: "Constituída por moléculas.", bond: "Covalente", species: "Átomos não metálicos" },
  { concept: "Substância covalente em rede", definition: "Rede extensa de átomos ligados covalentemente.", bond: "Covalente", species: "Átomos não metálicos" },
  { concept: "Substância iónica", definition: "Constituída por catiões e aniões.", bond: "Iónica", species: "Iões de cargas opostas" },
  { concept: "Substância metálica", definition: "Constituída por átomos metálicos / catiões metálicos e eletrões deslocalizados.", bond: "Metálica", species: "Átomos metálicos / catiões metálicos e eletrões deslocalizados" },
];

const DEFINITION_OPTIONS = [
  "Constituída por moléculas.",
  "Rede extensa de átomos ligados covalentemente.",
  "Constituída por catiões e aniões.",
  "Constituída por átomos metálicos / catiões metálicos e eletrões deslocalizados.",
];
const BOND_OPTIONS = ["Covalente", "Iónica", "Metálica"];
const SPECIES_OPTIONS = [
  "Átomos não metálicos",
  "Iões de cargas opostas",
  "Átomos metálicos / catiões metálicos e eletrões deslocalizados",
];

const APPLICATION_CASES = [
  { formula: "H₂O", name: "Água", substance: "Molecular", bond: "Covalente", species: "Átomos não metálicos" },
  { formula: "NaCl", name: "Cloreto de sódio", substance: "Iónica", bond: "Iónica", species: "Iões de cargas opostas" },
  { formula: "Cu", name: "Cobre", substance: "Metálica", bond: "Metálica", species: "Átomos metálicos / catiões metálicos e eletrões deslocalizados" },
  { formula: "SiO₂", name: "Dióxido de silício", substance: "Covalente em rede", bond: "Covalente", species: "Átomos não metálicos" },
];
const SUBSTANCE_OPTIONS = ["Molecular", "Covalente em rede", "Iónica", "Metálica"];
const TABS = [
  ["conceitos", "1. Conceitos"],
  ["verifica", "2. Lewis: verifica"],
  ["constroi", "3. Lewis: constrói"],
  ["substancias", "4. Substâncias"],
];

const state = {
  tab: "conceitos",
  theoryAnswers: {},
  checkAnswers: {},
  builderIndex: 0,
  builderState: null,
  builderMessage: null,
  builderCompleted: {},
  matchAnswers: {},
  matchChecked: false,
  applicationAnswers: {},
  applicationChecked: false,
};

function makeBuilderState(challenge) {
  return {
    bonds: challenge.outer.map(() => 0),
    centralLP: 0,
    outerLP: challenge.outer.map(() => 0),
  };
}
state.builderState = makeBuilderState(BUILDER_CHALLENGES[0]);

function sameArray(a, b) {
  return a.length === b.length && a.every((value, index) => value === b[index]);
}
function getElectronTarget(atom) { return atom === "H" ? 2 : 8; }
function electronsAroundAtom(atom, bondOrder, lonePairs) { return 2 * bondOrder + 2 * lonePairs; }
function getTotalValence(challenge) {
  return [challenge.central, ...challenge.outer].reduce((sum, atom) => sum + (VALENCE[atom] || 0), 0);
}
function getUsedElectrons(builderState) {
  const bondElectrons = builderState.bonds.reduce((sum, order) => sum + order * 2, 0);
  const lonePairElectrons = builderState.centralLP * 2 + builderState.outerLP.reduce((sum, lp) => sum + lp * 2, 0);
  return bondElectrons + lonePairElectrons;
}
function isBuilderSolved(builderState, challenge) {
  return (
    builderState.centralLP === challenge.expectedCentralLP &&
    sameArray(builderState.bonds, challenge.expectedBonds) &&
    sameArray(builderState.outerLP, challenge.expectedOuterLP)
  );
}
function buildLewisFeedback(builderState, challenge) {
  const hints = [];
  if (builderState.centralLP !== challenge.expectedCentralLP) {
    hints.push(`Revê os pares não ligantes do átomo central (${challenge.central}).`);
  }
  builderState.bonds.forEach((bond, index) => {
    if (bond !== challenge.expectedBonds[index]) {
      hints.push(`A ligação entre ${challenge.central} e ${challenge.outer[index]} precisa de ser revista.`);
    }
  });
  builderState.outerLP.forEach((lp, index) => {
    if (lp !== challenge.expectedOuterLP[index]) {
      hints.push(`Revê os pares não ligantes do átomo ${challenge.outer[index]}.`);
    }
  });
  const used = getUsedElectrons(builderState);
  const total = getTotalValence(challenge);
  if (used !== total) {
    hints.push(`A estrutura está a usar ${used} eletrões de valência, mas a molécula dispõe de ${total}.`);
  }
  if (hints.length === 0) hints.push("Há algo a rever na distribuição dos eletrões e/ou no tipo de ligação.");
  return hints;
}
function pairAnchors(x, y) {
  return [{ x, y: y - 34 }, { x, y: y + 34 }, { x: x - 34, y }, { x: x + 34, y }];
}
function getOuterPositions(count) {
  if (count === 1) return [{ x: 250, y: 70 }];
  if (count === 2) return [{ x: 165, y: 85 }, { x: 335, y: 85 }];
  if (count === 3) return [{ x: 250, y: 60 }, { x: 165, y: 190 }, { x: 335, y: 190 }];
  return [{ x: 250, y: 52 }, { x: 365, y: 130 }, { x: 250, y: 208 }, { x: 135, y: 130 }];
}

function escapeHtml(text) {
  return String(text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
function scoreData() {
  const theoryScore = THEORY_QUESTIONS.filter((q) => state.theoryAnswers[q.id] === q.answer).length;
  const checkScore = LEWIS_CHECKS.filter((item) => state.checkAnswers[item.id] === item.correct).length;
  const builderScore = Object.keys(state.builderCompleted).length;
  const matchScore = MATCH_ROWS.filter((row, index) => {
    const answer = state.matchAnswers[index] || {};
    return answer.definition === row.definition && answer.bond === row.bond && answer.species === row.species;
  }).length;
  const applicationScore = APPLICATION_CASES.filter((row, index) => {
    const answer = state.applicationAnswers[index] || {};
    return answer.substance === row.substance && answer.bond === row.bond && answer.species === row.species;
  }).length;
  const totalScore = theoryScore + checkScore + builderScore + matchScore + applicationScore;
  const totalPossible = THEORY_QUESTIONS.length + LEWIS_CHECKS.length + BUILDER_CHALLENGES.length + MATCH_ROWS.length + APPLICATION_CASES.length;
  const progress = Math.round((totalScore / totalPossible) * 100);
  return { theoryScore, checkScore, builderScore, matchScore, applicationScore, totalScore, totalPossible, progress };
}

function updateHeader() {
  const { builderScore, totalScore, totalPossible, progress } = scoreData();
  document.getElementById("progress-label").textContent = `${progress}%`;
  document.getElementById("progress-fill").style.width = `${progress}%`;
  document.getElementById("score-label").textContent = `${totalScore}/${totalPossible}`;
  document.getElementById("builder-label").textContent = `${builderScore}/${BUILDER_CHALLENGES.length}`;
}

function renderTabs() {
  const nav = document.getElementById("tabs");
  nav.innerHTML = TABS.map(([value, label]) => `
    <button class="tab-btn ${state.tab === value ? 'active' : ''}" data-tab="${value}">${label}</button>
  `).join("");
  nav.querySelectorAll("[data-tab]").forEach(btn => {
    btn.addEventListener("click", () => {
      state.tab = btn.dataset.tab;
      render();
    });
  });
}

function lewisSvg({ central, outer, bonds, centralLP, outerLP }) {
  const center = { x: 250, y: 130 };
  const positions = getOuterPositions(outer.length);

  function bondLines(x1, y1, x2, y2, order) {
    if (!order) return '';
    const dx = x2 - x1;
    const dy = y2 - y1;
    const length = Math.sqrt(dx * dx + dy * dy) || 1;
    const px = -dy / length;
    const py = dx / length;
    const offsets = order === 1 ? [0] : order === 2 ? [-4, 4] : [-7, 0, 7];
    return offsets.map(offset => `
      <line x1="${x1 + px * offset}" y1="${y1 + py * offset}" x2="${x2 + px * offset}" y2="${y2 + py * offset}"
        stroke="#0f172a" stroke-width="2.4" stroke-linecap="round"></line>
    `).join('');
  }

  function lonePairs(x, y, count) {
    return pairAnchors(x, y).slice(0, count).map(point => `
      <text x="${point.x}" y="${point.y}" text-anchor="middle" font-size="18" fill="#2563eb">••</text>
    `).join('');
  }

  return `
    <div class="lewis-wrap">
      <svg class="lewis-svg" viewBox="0 0 500 260" aria-label="Diagrama de Lewis">
        ${positions.map((point, index) => bondLines(center.x, center.y, point.x, point.y, bonds[index])).join('')}
        ${lonePairs(center.x, center.y, centralLP)}
        ${positions.map((point, index) => lonePairs(point.x, point.y, outerLP[index])).join('')}
        <text x="${center.x}" y="${center.y + 7}" text-anchor="middle" font-size="30" font-weight="800" fill="#0f172a">${escapeHtml(central)}</text>
        ${positions.map((point, index) => `
          <text x="${point.x}" y="${point.y + 7}" text-anchor="middle" font-size="30" font-weight="800" fill="#0f172a">${escapeHtml(outer[index])}</text>
        `).join('')}
      </svg>
    </div>
  `;
}

function renderTheory() {
  const { theoryScore } = scoreData();
  return `
    <section class="section-stack">
      <div class="card">
        <div class="card-head">
          <div>
            <h2>Missão 1 · Porque é que os átomos se ligam?</h2>
            <div class="muted">Escolhe a melhor resposta e recebe feedback imediato.</div>
          </div>
          <div class="badge blue">${theoryScore}/${THEORY_QUESTIONS.length} corretas</div>
        </div>
      </div>
      <div class="grid-2">
        ${THEORY_QUESTIONS.map(question => {
          const selected = state.theoryAnswers[question.id];
          const revealed = selected !== undefined;
          const correct = selected === question.answer;
          return `
            <article class="question-card">
              <div class="question-head">
                <div class="question-title">${escapeHtml(question.prompt)}</div>
                <div class="question-id">Q${question.id}</div>
              </div>
              <div class="choice-list">
                ${question.options.map((option, index) => {
                  let cls = 'choice-btn';
                  if (revealed && index === question.answer) cls += ' correct';
                  else if (revealed && selected === index && index !== question.answer) cls += ' wrong';
                  else if (selected === index) cls += ' active';
                  return `<button class="${cls}" data-theory="${question.id}" data-option="${index}">${escapeHtml(option)}</button>`;
                }).join('')}
              </div>
              ${revealed ? `
                <div class="feedback ${correct ? 'success' : 'warn'}">
                  <strong>${correct ? 'Certo!' : 'Quase.'}</strong>
                  <div>${escapeHtml(question.explanation)}</div>
                </div>` : ''}
            </article>
          `;
        }).join('')}
      </div>
    </section>
  `;
}

function renderVerifica() {
  const { checkScore } = scoreData();
  return `
    <section class="section-stack">
      <div class="card">
        <div class="card-head">
          <div>
            <h2>Missão 2 · Verifica notações de Lewis</h2>
            <div class="muted">Observa cada estrutura e decide se está correta ou incorreta.</div>
          </div>
          <div class="badge blue">${checkScore}/${LEWIS_CHECKS.length} corretas</div>
        </div>
      </div>
      <div class="grid-2">
        ${LEWIS_CHECKS.map(item => {
          const selected = state.checkAnswers[item.id];
          const answered = selected !== undefined;
          const right = selected === item.correct;
          return `
            <article class="question-card">
              <div class="question-head">
                <div>
                  <div class="question-title">${escapeHtml(item.title)}</div>
                  <div class="muted">${escapeHtml(item.statement)}</div>
                </div>
              </div>
              ${lewisSvg({ central: item.central, outer: item.outer, bonds: item.shownBonds, centralLP: item.shownCentralLP, outerLP: item.shownOuterLP })}
              <div class="binary-grid">
                <button class="big-btn" data-check="${item.id}" data-value="true">Correta</button>
                <button class="ghost-btn" data-check="${item.id}" data-value="false">Incorreta</button>
              </div>
              ${answered ? `
                <div class="feedback ${right ? 'success' : 'warn'}">
                  <strong>${right ? 'Boa leitura!' : 'Revê com atenção.'}</strong>
                  <div>${escapeHtml(item.feedback)}</div>
                </div>` : ''}
            </article>
          `;
        }).join('')}
      </div>
    </section>
  `;
}

function renderConstroi() {
  const { builderScore } = scoreData();
  const challenge = BUILDER_CHALLENGES[state.builderIndex];
  const builderState = state.builderState;
  const usedElectrons = getUsedElectrons(builderState);
  const totalValence = getTotalValence(challenge);
  const centralElectrons = builderState.bonds.reduce((sum, bond) => sum + bond * 2, 0) + builderState.centralLP * 2;
  const centralTarget = getElectronTarget(challenge.central);

  return `
    <section class="section-stack">
      <div class="card">
        <div class="card-head">
          <div>
            <h2>Missão 3 · Constrói a notação de Lewis</h2>
            <div class="muted">Ajusta as ligações e os pares não ligantes até obteres a estrutura correta.</div>
          </div>
          <div class="badge blue">${builderScore}/${BUILDER_CHALLENGES.length} moléculas resolvidas</div>
        </div>
      </div>

      <div class="grid-hero">
        <div class="card">
          <div class="card-head">
            <div>
              <div class="small-note">Desafio atual</div>
              <h3>${escapeHtml(challenge.formula)} · ${escapeHtml(challenge.name)}</h3>
              <div class="muted">${escapeHtml(challenge.hint)}</div>
            </div>
            ${state.builderCompleted[challenge.id] ? '<div class="challenge-chip">Já concluído</div>' : ''}
          </div>

          ${lewisSvg({ central: challenge.central, outer: challenge.outer, bonds: builderState.bonds, centralLP: builderState.centralLP, outerLP: builderState.outerLP })}

          <div class="status-grid">
            <div class="status-box">
              <div class="status-title">Eletrões de valência disponíveis</div>
              <div class="status-value">${totalValence}</div>
            </div>
            <div class="status-box">
              <div class="status-title">Eletrões usados na estrutura</div>
              <div class="status-value ${usedElectrons === totalValence ? 'ok' : 'warn'}">${usedElectrons}</div>
            </div>
            <div class="status-box">
              <div class="status-title">Estado do átomo central</div>
              <div class="status-value ${centralElectrons === centralTarget ? 'ok' : 'warn'}">${centralElectrons}/${centralTarget}</div>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="config-box">
            <div class="control-label">Configuração do átomo central (${escapeHtml(challenge.central)})</div>
            <div class="pill-row">
              ${[0,1,2,3,4].map(value => `
                <button class="pill-btn ${builderState.centralLP === value ? 'active-dark' : ''}" data-central-lp="${value}">
                  ${value} par${value !== 1 ? 'es' : ''} não ligante${value !== 1 ? 's' : ''}
                </button>
              `).join('')}
            </div>
          </div>

          <div class="section-stack" style="margin-top:16px">
            ${challenge.outer.map((atom, index) => {
              const electrons = electronsAroundAtom(atom, builderState.bonds[index], builderState.outerLP[index]);
              const target = getElectronTarget(atom);
              const atomOk = electrons === target;
              return `
                <div class="control-card">
                  <div class="control-top">
                    <div>
                      <div class="control-label">Ligação ${escapeHtml(challenge.central)}–${escapeHtml(atom)}</div>
                      <div class="control-sub">Átomo exterior ${index + 1}</div>
                    </div>
                    <div class="atom-state ${atomOk ? 'ok' : 'warn'}">${electrons}/${target} eletrões</div>
                  </div>

                  <div class="control-area">
                    <div class="control-caption">Ordem da ligação</div>
                    <div class="pill-row">
                      ${[0,1,2,3].map(value => `
                        <button class="pill-btn ${builderState.bonds[index] === value ? 'active-blue' : ''}" data-bond="${index}" data-value="${value}">
                          ${value === 0 ? 'Sem ligação' : value === 1 ? 'Simples' : value === 2 ? 'Dupla' : 'Tripla'}
                        </button>
                      `).join('')}
                    </div>
                  </div>

                  <div class="control-area">
                    <div class="control-caption">Pares não ligantes do átomo ${escapeHtml(atom)}</div>
                    <div class="pill-row">
                      ${[0,1,2,3,4].map(value => `
                        <button class="pill-btn ${builderState.outerLP[index] === value ? 'active-indigo' : ''}" data-outer-lp="${index}" data-value="${value}">
                          ${value}
                        </button>
                      `).join('')}
                    </div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>

          <div class="toolbar">
            <button class="big-btn" id="verify-builder">Verificar estrutura</button>
            <button class="ghost-btn" id="show-solution">Mostrar solução</button>
            <button class="ghost-btn" id="random-builder">Novo desafio aleatório</button>
            <button class="ghost-btn" id="next-builder">Seguinte molécula</button>
          </div>

          ${state.builderMessage ? `
            <div class="feedback ${state.builderMessage.type === 'success' ? 'success' : state.builderMessage.type === 'info' ? 'info' : 'warn'}">
              <strong>${escapeHtml(state.builderMessage.title)}</strong>
              <ul class="list-feedback">
                ${state.builderMessage.lines.map(line => `<li>${escapeHtml(line)}</li>`).join('')}
              </ul>
            </div>` : ''}
        </div>
      </div>
    </section>
  `;
}

function renderSubstancias() {
  const { matchScore, applicationScore } = scoreData();
  return `
    <section class="section-stack">
      <div class="card">
        <h2>Missão 4 · Liga conceitos, espécies e tipos de substâncias</h2>
        <div class="muted">Nesta fase, o objetivo é não confundir tipo de ligação, partículas presentes e classificação da substância.</div>
      </div>

      <div class="card">
        <div class="card-head">
          <div>
            <h3>Parte A · Correspondência conceptual</h3>
            <div class="muted">Associa cada conceito à definição, ao tipo de ligação e às espécies químicas.</div>
          </div>
          <div class="badge blue">${matchScore}/${MATCH_ROWS.length} linhas corretas</div>
        </div>

        <div class="section-stack" style="margin-top:18px">
          ${MATCH_ROWS.map((row, index) => {
            const answer = state.matchAnswers[index] || {};
            const rowCorrect = answer.definition === row.definition && answer.bond === row.bond && answer.species === row.species;
            return `
              <div class="panel-card">
                <div class="control-label" style="margin-bottom:12px">${escapeHtml(row.concept)}</div>
                <div class="select-grid">
                  ${selectField('match-definition', index, answer.definition || '', DEFINITION_OPTIONS, 'Escolhe a definição')}
                  ${selectField('match-bond', index, answer.bond || '', BOND_OPTIONS, 'Escolhe o tipo de ligação')}
                  ${selectField('match-species', index, answer.species || '', SPECIES_OPTIONS, 'Escolhe as espécies químicas')}
                </div>
                ${state.matchChecked ? `
                  <div class="result-line ${rowCorrect ? 'ok' : 'warn'}">
                    ${rowCorrect ? 'Tudo certo nesta linha.' : `Revê esta associação. Solução: ${escapeHtml(row.definition)} · ${escapeHtml(row.bond)} · ${escapeHtml(row.species)}`}
                  </div>` : ''}
              </div>
            `;
          }).join('')}
        </div>

        <div class="toolbar">
          <button class="big-btn" id="check-match">Corrigir correspondências</button>
          <button class="ghost-btn" id="show-match">Mostrar soluções</button>
        </div>
      </div>

      <div class="card">
        <div class="card-head">
          <div>
            <h3>Parte B · Aplica a casos concretos</h3>
            <div class="muted">Decide o tipo de substância, o tipo de ligação e as espécies presentes.</div>
          </div>
          <div class="badge blue">${applicationScore}/${APPLICATION_CASES.length} casos corretos</div>
        </div>

        <div class="section-stack" style="margin-top:18px">
          ${APPLICATION_CASES.map((row, index) => {
            const answer = state.applicationAnswers[index] || {};
            const rowCorrect = answer.substance === row.substance && answer.bond === row.bond && answer.species === row.species;
            return `
              <div class="panel-card">
                <div style="margin-bottom:12px">
                  <div class="control-label">${escapeHtml(row.formula)}</div>
                  <div class="muted" style="margin-top:2px">${escapeHtml(row.name)}</div>
                </div>
                <div class="select-grid">
                  ${selectField('app-substance', index, answer.substance || '', SUBSTANCE_OPTIONS, 'Tipo de substância')}
                  ${selectField('app-bond', index, answer.bond || '', BOND_OPTIONS, 'Tipo de ligação')}
                  ${selectField('app-species', index, answer.species || '', SPECIES_OPTIONS, 'Espécies químicas')}
                </div>
                ${state.applicationChecked ? `
                  <div class="result-line ${rowCorrect ? 'ok' : 'warn'}">
                    ${rowCorrect ? 'Correto.' : `Revê este caso. Solução: ${escapeHtml(row.substance)} · ${escapeHtml(row.bond)} · ${escapeHtml(row.species)}`}
                  </div>` : ''}
              </div>
            `;
          }).join('')}
        </div>

        <div class="toolbar">
          <button class="big-btn" id="check-app">Corrigir casos</button>
          <button class="ghost-btn" id="show-app">Mostrar soluções</button>
        </div>
      </div>
    </section>
  `;
}

function selectField(kind, index, value, options, placeholder) {
  return `
    <select data-kind="${kind}" data-index="${index}">
      <option value="">${escapeHtml(placeholder)}</option>
      ${options.map(option => `<option value="${escapeHtml(option)}" ${value === option ? 'selected' : ''}>${escapeHtml(option)}</option>`).join('')}
    </select>
  `;
}

function render() {
  renderTabs();
  updateHeader();
  const app = document.getElementById("app");
  if (state.tab === "conceitos") app.innerHTML = renderTheory();
  if (state.tab === "verifica") app.innerHTML = renderVerifica();
  if (state.tab === "constroi") app.innerHTML = renderConstroi();
  if (state.tab === "substancias") app.innerHTML = renderSubstancias();
  bindEvents();
}

function loadChallenge(index) {
  state.builderIndex = index;
  state.builderState = makeBuilderState(BUILDER_CHALLENGES[index]);
  state.builderMessage = null;
  render();
}
function randomChallenge() {
  if (BUILDER_CHALLENGES.length <= 1) return;
  let next = state.builderIndex;
  while (next === state.builderIndex) {
    next = Math.floor(Math.random() * BUILDER_CHALLENGES.length);
  }
  loadChallenge(next);
}
function verifyBuilder() {
  const challenge = BUILDER_CHALLENGES[state.builderIndex];
  if (isBuilderSolved(state.builderState, challenge)) {
    state.builderCompleted[challenge.id] = true;
    state.builderMessage = { type: "success", title: "Muito bem!", lines: ["A tua notação de Lewis está correta para esta molécula."] };
  } else {
    state.builderMessage = { type: "error", title: "Ainda não está.", lines: buildLewisFeedback(state.builderState, challenge) };
  }
  render();
}
function showBuilderSolution() {
  const challenge = BUILDER_CHALLENGES[state.builderIndex];
  state.builderState = {
    bonds: [...challenge.expectedBonds],
    centralLP: challenge.expectedCentralLP,
    outerLP: [...challenge.expectedOuterLP],
  };
  state.builderMessage = { type: "info", title: "Solução mostrada", lines: ["Observa a distribuição dos pares ligantes e não ligantes e compara com a tua tentativa."] };
  render();
}

function bindEvents() {
  document.querySelectorAll("[data-theory]").forEach(btn => {
    btn.addEventListener("click", () => {
      state.theoryAnswers[btn.dataset.theory] = Number(btn.dataset.option);
      render();
    });
  });
  document.querySelectorAll("[data-check]").forEach(btn => {
    btn.addEventListener("click", () => {
      state.checkAnswers[btn.dataset.check] = btn.dataset.value === "true";
      render();
    });
  });

  document.querySelectorAll("[data-central-lp]").forEach(btn => {
    btn.addEventListener("click", () => {
      state.builderState.centralLP = Number(btn.dataset.centralLp);
      state.builderMessage = null;
      render();
    });
  });
  document.querySelectorAll("[data-bond]").forEach(btn => {
    btn.addEventListener("click", () => {
      state.builderState.bonds[Number(btn.dataset.bond)] = Number(btn.dataset.value);
      state.builderMessage = null;
      render();
    });
  });
  document.querySelectorAll("[data-outer-lp]").forEach(btn => {
    btn.addEventListener("click", () => {
      state.builderState.outerLP[Number(btn.dataset.outerLp)] = Number(btn.dataset.value);
      state.builderMessage = null;
      render();
    });
  });

  const verifyBtn = document.getElementById("verify-builder");
  if (verifyBtn) verifyBtn.addEventListener("click", verifyBuilder);
  const solutionBtn = document.getElementById("show-solution");
  if (solutionBtn) solutionBtn.addEventListener("click", showBuilderSolution);
  const randomBtn = document.getElementById("random-builder");
  if (randomBtn) randomBtn.addEventListener("click", randomChallenge);
  const nextBtn = document.getElementById("next-builder");
  if (nextBtn) nextBtn.addEventListener("click", () => loadChallenge((state.builderIndex + 1) % BUILDER_CHALLENGES.length));

  document.querySelectorAll("select[data-kind]").forEach(select => {
    select.addEventListener("change", () => {
      const kind = select.dataset.kind;
      const index = Number(select.dataset.index);
      if (kind.startsWith("match-")) {
        state.matchAnswers[index] = state.matchAnswers[index] || {};
        if (kind === "match-definition") state.matchAnswers[index].definition = select.value;
        if (kind === "match-bond") state.matchAnswers[index].bond = select.value;
        if (kind === "match-species") state.matchAnswers[index].species = select.value;
        state.matchChecked = false;
      }
      if (kind.startsWith("app-")) {
        state.applicationAnswers[index] = state.applicationAnswers[index] || {};
        if (kind === "app-substance") state.applicationAnswers[index].substance = select.value;
        if (kind === "app-bond") state.applicationAnswers[index].bond = select.value;
        if (kind === "app-species") state.applicationAnswers[index].species = select.value;
        state.applicationChecked = false;
      }
      render();
    });
  });

  const checkMatch = document.getElementById("check-match");
  if (checkMatch) checkMatch.addEventListener("click", () => { state.matchChecked = true; render(); });

  const showMatch = document.getElementById("show-match");
  if (showMatch) showMatch.addEventListener("click", () => {
    MATCH_ROWS.forEach((row, index) => {
      state.matchAnswers[index] = { definition: row.definition, bond: row.bond, species: row.species };
    });
    state.matchChecked = true;
    render();
  });

  const checkApp = document.getElementById("check-app");
  if (checkApp) checkApp.addEventListener("click", () => { state.applicationChecked = true; render(); });

  const showApp = document.getElementById("show-app");
  if (showApp) showApp.addEventListener("click", () => {
    APPLICATION_CASES.forEach((row, index) => {
      state.applicationAnswers[index] = { substance: row.substance, bond: row.bond, species: row.species };
    });
    state.applicationChecked = true;
    render();
  });
}

render();
