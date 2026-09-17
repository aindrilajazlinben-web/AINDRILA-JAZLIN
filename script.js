const boot = document.querySelector('#boot');
const hideBoot = () => { boot.classList.add('hidden'); };
const progress = document.querySelector('#loader-progress');
const bootAscii = document.querySelector('#boot-ascii');
let amount = 0;
const bootTimer = setInterval(() => { amount += 5; progress.style.width = `${amount}%`; bootAscii.textContent = `[${'█'.repeat(amount / 5)}${'░'.repeat(20 - amount / 5)}] ${amount}%`; if (amount >= 100) { clearInterval(bootTimer); document.querySelector('#boot-copy').textContent = 'SYSTEM STATUS: ONLINE'; } }, 65);
document.querySelector('#enter-btn').onclick = hideBoot;
document.querySelector('#skip-btn').onclick = hideBoot;

const observer = new IntersectionObserver((entries) => entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); }), {threshold:.12});
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
document.querySelectorAll('.loop-step').forEach(button => button.addEventListener('click', () => { document.querySelectorAll('.loop-step').forEach(b => b.classList.remove('active')); button.classList.add('active'); document.querySelector('#loop-display').textContent = button.dataset.loop; }));

const answers = {
  learning: 'Aindrila is currently learning C++ and building foundations in Data Structures & Algorithms. She is also exploring web development, AI, and R&D.',
  rd: 'She is drawn to R&D because she likes understanding how things work, testing different approaches, learning from failures, and turning curiosity into experiments.',
  explore: 'Her current exploration map includes AI, web development, research & development, and ideas such as a Study Flow Mapper and an Explain-It-Again AI concept.',
  default: 'This prototype only knows what is in Aindrila’s portfolio. Try asking about learning, R&D, ideas, or current interests.'
};
function respond(q) { const t = q.toLowerCase(); const answer = /(learn|c\+\+|dsa|skill)/.test(t) ? answers.learning : /(r&d|r and d|research|why)/.test(t) ? answers.rd : /(explore|idea|interest|build)/.test(t) ? answers.explore : answers.default; const res=document.querySelector('#ai-response'); res.textContent=''; let i=0; const timer=setInterval(()=>{res.textContent += answer[i++] || ''; if(i>=answer.length) clearInterval(timer)}, 11); }
document.querySelector('#ai-form').addEventListener('submit', e=>{e.preventDefault(); const input=document.querySelector('#ai-input'); if(input.value.trim()) {respond(input.value); input.value='';}});
document.querySelectorAll('.quick-asks button').forEach(b=>b.onclick=()=>respond(b.textContent));

const commands = { help: 'COMMANDS: about · skills · ideas · status · clear', about: 'AINDRILA JAZLIN — first-year CSE student, curious builder, and aspiring R&D explorer.', skills: 'CURRENTLY LEARNING: C++ / DSA. EXPLORING: web development / AI / R&D.', ideas: 'IDEA VAULT: Study Flow Mapper, Campus Question Board, Explain-It-Again AI, Curiosity Capture.', status: 'SYSTEM ONLINE. CURRENT MODE: learning, testing, and asking better questions.' };
document.querySelector('#terminal-form').addEventListener('submit', e => { e.preventDefault(); const input = document.querySelector('#terminal-input'); const command = input.value.trim().toLowerCase(); const output = document.querySelector('#terminal-output'); if (!command) return; if (command === 'clear') { output.innerHTML = ''; input.value = ''; return; } const reply = commands[command] || `Command not found: ${command}. Type help.`; output.insertAdjacentHTML('beforeend', `<p><span class="cyan">aindrila@studio:~$</span> ${command}</p><p class="command-result">${reply}</p>`); output.scrollTop = output.scrollHeight; input.value = ''; });

let logoClicks=0, logoTimeout;
document.querySelector('#logo').onclick = () => { logoClicks++; clearTimeout(logoTimeout); logoTimeout=setTimeout(()=>logoClicks=0,900); if(logoClicks===4){ document.body.classList.toggle('debug'); document.querySelector('#toast').textContent = document.body.classList.contains('debug') ? 'DEBUG MODE: ON — CURIOSITY DETECTED' : 'DEBUG MODE: OFF'; document.querySelector('#toast').classList.add('show'); setTimeout(()=>document.querySelector('#toast').classList.remove('show'),2200); logoClicks=0; }};
document.querySelector('#debug-toggle').onclick=()=>document.body.classList.toggle('debug');
