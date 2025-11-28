// main.js
// Premium Telemetry Dashboard (vanilla JS)
// - All widgets are modular classes
// - Central pipeline emits a new "frame" every 300ms via generateFakeSystemFrame()
// - Smooth rendering via requestAnimationFrame

/* =========================
   Utilities
   ========================= */
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const lerp = (a, b, t) => a + (b - a) * t;
const ease = t => (--t) * t * t + 1; // subtle easeOutCubic

/* =========================
   Synthetic data generator
   ========================= */
class DataSource {
  constructor() {
    this.time = 0;
    this.cores = 8;
    this.totalRamGB = 32;
    this.base = Math.random() * 1000;
    this.seeds = { cpu: Math.random() * 100, net: Math.random() * 100, disk: Math.random() * 100 };
  }

  frame() {
    this.time += 0.3; // roughly 300ms tick scaled
    const t = this.time;
    // CPU: blend low-frequency drift + spiky bursts
    const cpuBase = 20 + 10 * Math.sin(t * 0.25 + this.seeds.cpu);
    const cpuBurst = Math.abs(Math.sin(t * 3.2 + this.seeds.cpu * 2)) * (Math.random() < 0.12 ? 60 : 18) * Math.random();
    const cpuNow = clamp(cpuBase + cpuBurst + (Math.random() * 6), 2, 98);

    // RAM: slowly varying used memory
    const ramUsedGB = clamp(8 + 6 * Math.abs(Math.sin(t * 0.12 + this.seeds.disk)) + Math.random() * 2, 4, this.totalRamGB - 2);

    // Network: uplink/downlink as noisy signals
    const netDown = clamp(Math.abs(100 * Math.sin(t * 0.8 + this.seeds.net) + Math.random() * 40), 0.2, 900);
    const netUp = clamp(Math.abs(60 * Math.cos(t * 0.9 + this.seeds.net * 1.2) + Math.random() * 20), 0.1, 500);
    const latency = clamp(10 + Math.abs(40 * Math.sin(t * 0.4 + this.seeds.net)), 5, 260);

    // GPU load
    const gpuLoad = clamp(10 + 50 * Math.abs(Math.sin(t * 0.6 + this.seeds.cpu)) + (Math.random() < 0.1 ? Math.random()*30 : 0), 2, 99);
    const gpuTemp = clamp(40 + gpuLoad * 0.45 + Math.random()*3, 30, 95);

    // Disk read/write
    const diskRead = clamp(Math.abs(60 * Math.sin(t * 1.1 + this.seeds.disk) + Math.random() * 30), 0.1, 600);
    const diskWrite = clamp(Math.abs(40 * Math.cos(t * 1.4 + this.seeds.disk) + Math.random() * 20), 0.1, 400);

    // Temps
    const temps = [
      { name: 'CPU Package', value: clamp(35 + cpuNow * 0.6 + Math.random()*3, 30, 110) },
      { name: 'Motherboard', value: clamp(28 + cpuNow * 0.2 + Math.random()*2, 25, 80) },
      { name: 'VRM', value: clamp(30 + gpuLoad * 0.25 + Math.random()*2, 28, 95) },
      { name: 'SSD1', value: clamp(30 + diskWrite * 0.05 + Math.random()*2, 28, 75) }
    ];

    // Processes: generate list of processes with pid and resource numbers
    const processes = [];
    const n = 12;
    for (let i = 0; i < n; i++) {
      const pid = 1000 + i;
      const name = ['nginx', 'worker', 'db', 'cache', 'metrics', 'orchestrator', 'svc', 'renderer'][i % 8] + (i % 3 === 0 ? '-x' : '');
      const cpu = clamp(Math.max(0.1, Math.abs((Math.sin(t*0.3 + i) * 20) + (Math.random()*6))), 0.0, 95).toFixed(1);
      const mem = clamp(Math.abs((Math.cos(t*0.2 + i) * 2.5) + (Math.random()*2.5)), 0.1, 28).toFixed(2);
      const states = ['running','sleeping','idle','zombie'];
      const st = states[Math.abs(Math.floor((i + Math.sin(t+i))*100)) % states.length];
      processes.push({pid, name, cpu, mem, state: st});
    }

    // Binary frame: array of bits for a 32x8 grid
    const binaryCols = 32, binaryRows = 8;
    const binary = new Uint8Array(binaryCols * binaryRows);
    for (let i = 0; i < binary.length; i++) {
      // create wave-like patterns
      const x = i % binaryCols;
      const y = Math.floor(i / binaryCols);
      const v = Math.sin((t*2.2 + x*0.22 + y*0.1)) + Math.random()*0.5;
      binary[i] = v > 0.3 ? 1 : 0;
    }

    // Events: sporadic events at moderate frequency
    const events = [];
    if (Math.random() < 0.4) {
      const types = ['INFO','WARN','ERR','DBG'];
      const type = types[Math.floor(Math.random()*types.length)];
      const messages = [
        'Autoscaler adjusted replicas',
        'High CPU spike detected on node-3',
        'TCP connection latency increased',
        'Disk write throughput back to normal',
        'OOM avoided by early GC',
        'GPU driver uploaded new shader'
      ];
      events.push({
        ts: Date.now(),
        type,
        text: messages[Math.floor(Math.random()*messages.length)]
      });
    }

    return {
      ts: Date.now(),
      cpu: {value: cpuNow, avg: (cpuNow*0.7 + Math.random()*4)},
      cores: this.cores,
      ram: {usedGB: ramUsedGB, totalGB: this.totalRamGB},
      net: {up: Math.round(netUp), down: Math.round(netDown), lat: Math.round(latency)},
      gpu: {load: Math.round(gpuLoad), temp: Math.round(gpuTemp), vramGB: 6},
      disk: {read: Math.round(diskRead), write: Math.round(diskWrite)},
      temps,
      processes,
      binary: {cols: 32, rows: 8, data: binary},
      events
    };
  }
}

/* =========================
   Widget base class
   ========================= */
class Widget {
  constructor(container) {
    this.container = container;
    this.header = container.querySelector('.panel-header');
    this.body = container.querySelector('.panel-body');
    this.resizer = container.querySelector('.resizer');
    this.initResizer();
  }

  initResizer(){
    if(!this.resizer) return;
    let startY, startH, el = this.container;
    const onDown = (e) => {
      e.preventDefault();
      startY = e.clientY || e.touches?.[0]?.clientY;
      startH = el.getBoundingClientRect().height;
      document.addEventListener('pointermove', onMove);
      document.addEventListener('pointerup', onUp, {once:true});
    };
    const onMove = (e) => {
      const y = e.clientY || e.touches?.[0]?.clientY;
      const dy = y - startY;
      el.style.height = Math.max(96, startH + dy) + 'px';
    };
    const onUp = () => {
      document.removeEventListener('pointermove', onMove);
    };
    this.resizer.addEventListener('pointerdown', onDown);
  }

  update(frame){ /* override */ }
}

/* =========================
   Canvas helper for smooth drawing
   ========================= */
class CanvasPlot {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d', {alpha: true});
    this.dpr = Math.max(1, window.devicePixelRatio || 1);
    this.resize();
    window.addEventListener('resize', ()=>this.resize());
    this.offscreen = document.createElement('canvas');
    this.offscreenCtx = this.offscreen.getContext('2d');
  }
  resize(){
    const w = this.canvas.clientWidth;
    const h = this.canvas.clientHeight;
    this.canvas.width = Math.floor(w * this.dpr);
    this.canvas.height = Math.floor(h * this.dpr);
    this.canvas.style.height = h + 'px';
    this.canvas.style.width = w + 'px';
    this.ctx.setTransform(this.dpr,0,0,this.dpr,0,0);
    this.offscreen.width = this.canvas.width;
    this.offscreen.height = this.canvas.height;
    this.offscreenCtx.setTransform(this.dpr,0,0,this.dpr,0,0);
  }
}

/* =========================
   CPU Widget
   ========================= */
class CPUWidget extends Widget {
  constructor(container){
    super(container);
    this.canvas = new CanvasPlot(container.querySelector('#cpuCanvas'));
    this.values = new Array(240).fill(0); // last ~72s at 300ms frames
    this.peak = 0;
    this.avg = 0;
    this.lastRender = 0;
    this.initDOM();
    requestAnimationFrame(this.draw.bind(this));
  }

  initDOM(){
    this.avgEl = this.container.querySelector('#cpuAvg');
    this.peakEl = this.container.querySelector('#cpuPeak');
    this.coresEl = this.container.querySelector('#cpuCores');
    this.coresEl.textContent = navigator.hardwareConcurrency || 8;
  }

  update(frame){
    this.values.push(frame.cpu.value);
    if(this.values.length>240) this.values.shift();
    this.peak = Math.max(...this.values);
    this.avg = (this.values.reduce((a,b)=>a+b,0)/this.values.length);
    this.avgEl.textContent = Math.round(this.avg) + '%';
    this.peakEl.textContent = Math.round(this.peak) + '%';
  }

  draw(ts){
    const off = this.canvas.offscreenCtx;
    const c = this.canvas.ctx;
    const w = this.canvas.canvas.width / this.canvas.dpr;
    const h = this.canvas.canvas.height / this.canvas.dpr;
    // clear with slight glass gradient
    off.clearRect(0,0,w,h);
    const grad = off.createLinearGradient(0,0,0,h);
    grad.addColorStop(0,'rgba(255,255,255,0.02)');
    grad.addColorStop(1,'rgba(0,0,0,0.02)');
    off.fillStyle = grad;
    off.fillRect(0,0,w,h);

    // draw grid lines
    off.strokeStyle = 'rgba(255,255,255,0.03)';
    off.lineWidth = 1;
    off.beginPath();
    for(let i=1;i<4;i++){
      const y = (h/4)*i;
      off.moveTo(0,y); off.lineTo(w,y);
    }
    off.stroke();

    // draw area under curve
    const vals = this.values;
    const len = vals.length;
    off.beginPath();
    for(let i=0;i<len;i++){
      const x = (i / Math.max(1,len-1)) * w;
      const y = h - (vals[i]/100) * h;
      if(i===0) off.moveTo(x,y); else off.lineTo(x,y);
    }
    off.lineTo(w,h); off.lineTo(0,h); off.closePath();
    // gradient fill
    const fillG = off.createLinearGradient(0,0,0,h);
    fillG.addColorStop(0,'rgba(106,226,201,0.12)');
    fillG.addColorStop(1,'rgba(110,168,255,0.02)');
    off.fillStyle = fillG;
    off.fill();

    // draw line
    off.beginPath();
    off.lineWidth = 2;
    off.strokeStyle = 'rgba(110,168,255,0.95)';
    for(let i=0;i<len;i++){
      const x = (i / Math.max(1,len-1)) * w;
      const y = h - (vals[i]/100) * h;
      if(i===0) off.moveTo(x,y); else off.lineTo(x,y);
    }
    off.stroke();

    // copy offscreen to onscreen with subtle glow
    c.clearRect(0,0,w,h);
    c.drawImage(this.canvas.offscreen, 0, 0, w, h);

    this.lastRender = ts;
    requestAnimationFrame(this.draw.bind(this));
  }
}

/* =========================
   RAM Widget
   ========================= */
class RAMWidget extends Widget {
  constructor(container){
    super(container);
    this.canvas = new CanvasPlot(container.querySelector('#ramCanvas'));
    this.values = new Array(240).fill(0);
    this.lastRender = 0;
    this.usedEl = this.container.querySelector('#ramUsed');
    this.freeEl = this.container.querySelector('#ramFree');
    this.totalEl = this.container.querySelector('#ramTotal');
    requestAnimationFrame(this.draw.bind(this));
  }

  update(frame){
    const perc = frame.ram.usedGB / frame.ram.totalGB * 100;
    this.values.push(perc);
    if(this.values.length>240) this.values.shift();
    this.usedEl.textContent = frame.ram.usedGB.toFixed(2) + ' GB';
    this.freeEl.textContent = (frame.ram.totalGB - frame.ram.usedGB).toFixed(2) + ' GB';
    this.totalEl.textContent = frame.ram.totalGB + ' GB';
  }

  draw(ts){
    const off = this.canvas.offscreenCtx;
    const c = this.canvas.ctx;
    const w = this.canvas.canvas.width / this.canvas.dpr;
    const h = this.canvas.canvas.height / this.canvas.dpr;

    off.clearRect(0,0,w,h);

    // gradient background
    const g = off.createLinearGradient(0,0,w,0);
    g.addColorStop(0, 'rgba(106,226,201,0.04)');
    g.addColorStop(1, 'rgba(110,168,255,0.02)');
    off.fillStyle = g;
    off.fillRect(0,0,w,h);

    // sparkline
    const vals = this.values;
    const len = vals.length;
    off.beginPath();
    for(let i=0;i<len;i++){
      const x = (i / Math.max(1,len-1)) * w;
      const y = h - (vals[i]/100) * h;
      if(i===0) off.moveTo(x,y); else off.lineTo(x,y);
    }
    off.strokeStyle = 'rgba(106,226,201,0.95)';
    off.lineWidth = 2;
    off.stroke();

    // overlay current fill
    const latest = vals[vals.length-1] || 0;
    off.fillStyle = 'rgba(106,226,201,0.06)';
    off.fillRect(0, h - (latest/100)*h, w * (latest/100), (latest/100)*h);

    c.clearRect(0,0,w,h);
    c.drawImage(this.canvas.offscreen,0,0,w,h);
    requestAnimationFrame(this.draw.bind(this));
  }
}

/* =========================
   Network Widget (dual-line)
   ========================= */
class NetworkWidget extends Widget {
  constructor(container){
    super(container);
    this.canvas = new CanvasPlot(container.querySelector('#netCanvas'));
    this.up = new Array(360).fill(0);
    this.down = new Array(360).fill(0);
    this.upEl = this.container.querySelector('#netUp');
    this.downEl = this.container.querySelector('#netDown');
    this.latEl = this.container.querySelector('#netLat');
    requestAnimationFrame(this.draw.bind(this));
  }

  update(frame){
    this.up.push(frame.net.up);
    this.down.push(frame.net.down);
    if(this.up.length>360) this.up.shift();
    if(this.down.length>360) this.down.shift();
    this.upEl.textContent = frame.net.up + ' Mbps';
    this.downEl.textContent = frame.net.down + ' Mbps';
    this.latEl.textContent = frame.net.lat + ' ms';
  }

  draw(ts){
    const off = this.canvas.offscreenCtx;
    const c = this.canvas.ctx;
    const w = this.canvas.canvas.width / this.canvas.dpr;
    const h = this.canvas.canvas.height / this.canvas.dpr;
    off.clearRect(0,0,w,h);

    // scale
    const maxVal = Math.max(...this.up.slice(-360), ...this.down.slice(-360), 200);

    // draw grid
    off.strokeStyle = 'rgba(255,255,255,0.03)';
    off.lineWidth = 1;
    off.beginPath();
    for(let i=1;i<3;i++){
      const y = (h/3)*i; off.moveTo(0,y); off.lineTo(w,y);
    }
    off.stroke();

    // down (thicker)
    off.beginPath();
    const downVals = this.down;
    for(let i=0;i<downVals.length;i++){
      const x = (i / Math.max(1,downVals.length-1)) * w;
      const y = h - (downVals[i]/maxVal) * h;
      if(i===0) off.moveTo(x,y); else off.lineTo(x,y);
    }
    off.strokeStyle = 'rgba(110,168,255,0.95)';
    off.lineWidth = 2.2;
    off.stroke();

    // up (dashed/finer)
    off.beginPath();
    const upVals = this.up;
    for(let i=0;i<upVals.length;i++){
      const x = (i / Math.max(1,upVals.length-1)) * w;
      const y = h - (upVals[i]/maxVal) * h;
      if(i===0) off.moveTo(x,y); else off.lineTo(x,y);
    }
    off.setLineDash([6,6]);
    off.strokeStyle = 'rgba(106,226,201,0.95)';
    off.lineWidth = 1.6;
    off.stroke();
    off.setLineDash([]);

    c.clearRect(0,0,w,h);
    c.drawImage(this.canvas.offscreen,0,0,w,h);
    requestAnimationFrame(this.draw.bind(this));
  }
}

/* =========================
   GPU Widget (meter)
   ========================= */
class GPUWidget extends Widget {
  constructor(container){
    super(container);
    this.canvas = new CanvasPlot(container.querySelector('#gpuCanvas'));
    this.tempEl = this.container.querySelector('#gpuTemp');
    this.vramEl = this.container.querySelector('#gpuVram');
    this.current = 0;
    requestAnimationFrame(this.draw.bind(this));
  }

  update(frame){
    this.target = frame.gpu.load;
    this.tempEl.textContent = frame.gpu.temp + '°C';
    this.vramEl.textContent = frame.gpu.vramGB + ' GB';
  }

  draw(ts){
    // ease current to target
    if(this.target === undefined) this.target = 0;
    this.current = lerp(this.current || 0, this.target, 0.08);
    const off = this.canvas.offscreenCtx;
    const c = this.canvas.ctx;
    const w = this.canvas.canvas.width / this.canvas.dpr;
    const h = this.canvas.canvas.height / this.canvas.dpr;
    off.clearRect(0,0,w,h);

    // background track
    off.fillStyle = 'rgba(255,255,255,0.02)';
    off.fillRect(0, h*0.35, w, h*0.3);
    // fill with gradient
    const fillW = (this.current/100) * w;
    const fillG = off.createLinearGradient(0,0,w,0);
    fillG.addColorStop(0, 'rgba(106,226,201,0.9)');
    fillG.addColorStop(1, 'rgba(110,168,255,0.9)');
    off.fillStyle = fillG;
    off.fillRect(0, h*0.35, fillW, h*0.3);
    // subtle indicator
    off.fillStyle = 'rgba(255,255,255,0.06)';
    off.fillRect(fillW-2, h*0.33, 4, h*0.34);

    // text
    off.fillStyle = 'rgba(255,255,255,0.95)';
    off.font = '600 18px ' + getComputedStyle(document.documentElement).getPropertyValue('--font-sans');
    off.fillText(Math.round(this.current) + '%', 12, 28);

    c.clearRect(0,0,w,h);
    c.drawImage(this.canvas.offscreen,0,0,w,h);
    requestAnimationFrame(this.draw.bind(this));
  }
}

/* =========================
   Disk Widget (sparklines)
   ========================= */
class DiskWidget extends Widget {
  constructor(container){
    super(container);
    this.canvas = new CanvasPlot(container.querySelector('#diskCanvas'));
    this.read = new Array(240).fill(0);
    this.write = new Array(240).fill(0);
    this.readEl = this.container.querySelector('#diskRead');
    this.writeEl = this.container.querySelector('#diskWrite');
    requestAnimationFrame(this.draw.bind(this));
  }

  update(frame){
    this.read.push(frame.disk.read);
    this.write.push(frame.disk.write);
    if(this.read.length>240) this.read.shift();
    if(this.write.length>240) this.write.shift();
    this.readEl.textContent = frame.disk.read + ' MB/s';
    this.writeEl.textContent = frame.disk.write + ' MB/s';
  }

  draw(ts){
    const off = this.canvas.offscreenCtx;
    const c = this.canvas.ctx;
    const w = this.canvas.canvas.width / this.canvas.dpr;
    const h = this.canvas.canvas.height / this.canvas.dpr;

    off.clearRect(0,0,w,h);
    // sparkline read
    const r = this.read, s = this.write;
    const maxVal = Math.max(...r.slice(-240), ...s.slice(-240), 100);

    // write fill under
    off.beginPath();
    for(let i=0;i<s.length;i++){
      const x = (i / Math.max(1,s.length-1)) * w;
      const y = h - (s[i]/maxVal) * h;
      if(i===0) off.moveTo(x,y); else off.lineTo(x,y);
    }
    off.lineTo(w,h); off.lineTo(0,h); off.closePath();
    off.fillStyle = 'rgba(255,122,122,0.06)';
    off.fill();

    // write line
    off.beginPath();
    for(let i=0;i<s.length;i++){
      const x = (i / Math.max(1,s.length-1)) * w;
      const y = h - (s[i]/maxVal) * h;
      if(i===0) off.moveTo(x,y); else off.lineTo(x,y);
    }
    off.strokeStyle = 'rgba(255,122,122,0.9)';
    off.lineWidth = 1.8;
    off.stroke();

    // read line
    off.beginPath();
    for(let i=0;i<r.length;i++){
      const x = (i / Math.max(1,r.length-1)) * w;
      const y = h - (r[i]/maxVal) * h;
      if(i===0) off.moveTo(x,y); else off.lineTo(x,y);
    }
    off.strokeStyle = 'rgba(106,226,201,0.95)';
    off.lineWidth = 1.6;
    off.stroke();

    c.clearRect(0,0,w,h);
    c.drawImage(this.canvas.offscreen,0,0,w,h);
    requestAnimationFrame(this.draw.bind(this));
  }
}

/* =========================
   Temperature Module
   ========================= */
class TempWidget extends Widget {
  constructor(container){
    super(container);
    this.root = container.querySelector('#tempBars');
    this.bars = {};
  }

  update(frame){
    const temps = frame.temps;
    // create bars if needed
    temps.forEach(t => {
      let row = this.bars[t.name];
      if(!row){
        row = document.createElement('div');
        row.className = 'temp-bar';
        row.innerHTML = `
          <div class="temp-meta">
            <div class="label" style="font-size:12px;color:var(--text-secondary)">${t.name}</div>
            <div class="value" style="font-weight:700">${Math.round(t.value)}°C</div>
          </div>
          <div class="temp-meter"><div class="temp-fill"></div></div>
        `;
        this.root.appendChild(row);
        this.bars[t.name] = row;
      }
      // update
      const fill = row.querySelector('.temp-fill');
      const valueEl = row.querySelector('.value');
      const pct = clamp((t.value / 120) * 100, 0, 100);
      fill.style.width = pct + '%';
      // color by threshold
      if(t.value < 60) fill.style.background = 'linear-gradient(90deg, rgba(106,226,201,0.95), rgba(110,168,255,0.95))';
      else if(t.value < 80) fill.style.background = 'linear-gradient(90deg, rgba(255,196,84,0.95), rgba(255,122,122,0.9))';
      else fill.style.background = 'linear-gradient(90deg, rgba(255,122,122,0.95), rgba(255,80,80,0.98))';
      valueEl.textContent = Math.round(t.value) + '°C';
    });
  }
}

/* =========================
   Process Table
   ========================= */
class ProcessTable extends Widget {
  constructor(container){
    super(container);
    this.tbody = container.querySelector('#processTable tbody');
    this.rows = {};
    this.order = [];
  }

  update(frame){
    const procs = frame.processes;
    // Sort by CPU desc to show movement
    procs.sort((a,b)=> parseFloat(b.cpu) - parseFloat(a.cpu));
    const newOrder = procs.map(p=>p.pid);
    // add new rows / update
    procs.forEach(p=>{
      let tr = this.rows[p.pid];
      if(!tr){
        tr = document.createElement('tr');
        tr.dataset.pid = p.pid;
        tr.innerHTML = `<td>${p.pid}</td><td>${p.name}</td><td>${p.cpu}%</td><td>${p.mem} GB</td><td>${p.state}</td>`;
        tr.style.transform = 'translateY(6px)';
        tr.style.opacity = '0';
        this.tbody.appendChild(tr);
        requestAnimationFrame(()=>{ tr.style.transform='none'; tr.style.opacity='1'; });
        this.rows[p.pid] = tr;
      } else {
        // update cells with subtle transitions
        const tds = tr.querySelectorAll('td');
        tds[2].textContent = p.cpu + '%';
        tds[3].textContent = p.mem + ' GB';
        tds[4].textContent = p.state;
      }
    });

    // remove rows not present
    Object.keys(this.rows).forEach(pid=>{
      if(!newOrder.includes(Number(pid))){
        const tr = this.rows[pid];
        tr.style.transform = 'translateY(8px) scale(.995)';
        tr.style.opacity = '0';
        setTimeout(()=>{ try{ tr.remove(); }catch(e){} }, 400);
        delete this.rows[pid];
      }
    });

    // reorder DOM to match sorted order
    procs.forEach(p=>{
      const tr = this.rows[p.pid];
      if(tr) this.tbody.appendChild(tr);
    });
  }
}

/* =========================
   Binary Visualizer
   ========================= */
class BinaryVisualizer extends Widget {
  constructor(container){
    super(container);
    this.canvas = new CanvasPlot(container.querySelector('#binaryCanvas'));
    this.last = null;
    requestAnimationFrame(this.draw.bind(this));
  }

  update(frame){
    this.grid = frame.binary;
  }

  draw(ts){
    const ctx = this.canvas.ctx;
    const w = this.canvas.canvas.width / this.canvas.dpr;
    const h = this.canvas.canvas.height / this.canvas.dpr;
    ctx.clearRect(0,0,w,h);
    if(!this.grid) { requestAnimationFrame(this.draw.bind(this)); return; }
    const cols = this.grid.cols, rows = this.grid.rows;
    const size = Math.min(w/cols, h/rows);
    const padX = (w - size*cols)/2;
    const padY = (h - size*rows)/2;
    for(let y=0;y<rows;y++){
      for(let x=0;x<cols;x++){
        const v = this.grid.data[y*cols + x];
        const gx = padX + x*size;
        const gy = padY + y*size;
        // background cell
        ctx.fillStyle = v ? 'rgba(106,226,201,0.95)' : 'rgba(255,255,255,0.02)';
        // subtle rounded square
        const r = Math.max(2, size*0.12);
        roundRect(ctx, gx+1, gy+1, size-2, size-2, r);
        ctx.fill();
        // inner glow for ones
        if(v){
          ctx.fillStyle = 'rgba(255,255,255,0.05)';
          roundRect(ctx, gx+1, gy+1, size-2, size-2, r);
          ctx.fill();
        }
      }
    }
    requestAnimationFrame(this.draw.bind(this));
  }
}

/* small rounded rectangle helper */
function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

/* =========================
   Event Timeline
   ========================= */
class EventTimeline extends Widget {
  constructor(container){
    super(container);
    this.list = container.querySelector('#eventLog');
    this.max = 120; // keep history reasonable
  }

  update(frame){
    const events = frame.events || [];
    events.forEach(ev=>{
      const li = document.createElement('li');
      const time = new Date(ev.ts).toLocaleTimeString();
      li.innerHTML = `<div style="display:flex;gap:10px;align-items:center">
        <div style="min-width:56px;font-weight:700;color:var(--text-secondary);font-size:12px">${time}</div>
        <div style="flex:1">
          <div style="font-weight:700;color:${ev.type==='ERR'? 'var(--danger)': ev.type==='WARN' ? 'var(--gold)': 'var(--text-primary)'}">${ev.type}</div>
          <div style="font-size:13px;color:var(--text-secondary);margin-top:4px">${ev.text}</div>
        </div></div>`;
      this.list.prepend(li);
      // trim
      while(this.list.children.length > this.max) this.list.removeChild(this.list.lastChild);
    });
  }
}

/* =========================
   Dashboard Controller
   ========================= */
class Dashboard {
  constructor(){
    this.data = new DataSource();
    // map containers to widget instances
    this.widgets = [];
    // find panels
    const map = {
      cpu: CPUWidget, ram: RAMWidget, net: NetworkWidget, gpu: GPUWidget,
      disk: DiskWidget, temp: TempWidget, process: ProcessTable,
      binary: BinaryVisualizer, events: EventTimeline
    };
    document.querySelectorAll('.panel').forEach(p=>{
      const key = p.dataset.widget;
      if(map[key]) this.widgets.push(new map[key](p));
    });

    // update loop control
    this.running = true;
    this.lastUpdateEl = document.getElementById('lastUpdate');
    // wire controls
    const pause = document.getElementById('pauseBtn');
    pause.addEventListener('click', ()=>{
      this.running = !this.running;
      pause.setAttribute('aria-pressed', String(!this.running));
      pause.classList.toggle('active');
    });
    document.getElementById('snapshotBtn').addEventListener('click', ()=> this.takeSnapshot());

    // kick off frame generator
    this.frameLoop();
  }

  takeSnapshot(){
    // subtle UI feedback
    const btn = document.getElementById('snapshotBtn');
    btn.animate([{transform:'scale(1)'},{transform:'scale(.96)'},{transform:'scale(1)'}],{duration:300});
    // capture small state summary to console for demo
    console.log('Snapshot:', new Date(), this.lastFrame);
  }

  frameLoop(){
    // generate synthetic frames every 300ms
    setInterval(()=> {
      if(!this.running) return;
      const frame = this.data.frame();
      this.lastFrame = frame;
      this.lastUpdateEl.textContent = new Date(frame.ts).toLocaleTimeString();
      // push to widgets
      this.widgets.forEach(w => {
        try{ w.update(frame); } catch(e){ console.error('Widget update error', e); }
      });
    }, 300);
  }
}

/* =========================
   Initialize
   ========================= */
window.addEventListener('DOMContentLoaded', ()=>{
  // instantiate dashboard
  window.dashboard = new Dashboard();
});
// const snapshotBtn = document.getElementById('snapshotBtn');

//         document.addEventListener('keydown', (e)=>{
//             if (['INPUT','TEXTAREA'].includes(document.activeElement?.tagName)) return;
//             if (e.code === 'Space') { e.preventDefault(); pauseBtn?.click(); }
//             if (e.key && e.key.toLowerCase() === 's') { snapshotBtn?.click(); }
//             if (e.key && e.key.toLowerCase() === 'r') {
//                 if (window.dashboard && window.dashboard.data) {
//                     window.dashboard.data = new DataSource();
//                     console.info('DataSource reset');
//                 }
//             }
//         });

//         document.addEventListener('visibilitychange', ()=>{
//             if (!window.dashboard) return;
//             const pause = document.getElementById('pauseBtn');
//             if (document.hidden) {
//                 wasRunning = window.dashboard.running;
//                 window.dashboard.running = false;
//                 pause?.setAttribute('aria-pressed', String(!window.dashboard.running));
//                 pause?.classList.toggle('active', !window.dashboard.running);
//             } else {
//                 window.dashboard.running = !!wasRunning;
//                 pause?.setAttribute('aria-pressed', String(!window.dashboard.running));
//                 pause?.classList.toggle('active', !window.dashboard.running);
//             }
//         });

//         window.addEventListener('beforeunload', ()=>{ if(window.dashboard) window.dashboard.running = false; });

//         // keep canvases in sync with layout changes
//         const panels = document.querySelectorAll('.panel');
//         if (typeof ResizeObserver !== 'undefined') {
//             const ro = new ResizeObserver(()=> {
//                 if (!window.dashboard) return;
//                 window.dashboard.widgets.forEach(w => { try{ w.canvas?.resize(); }catch(e){} });
//             });
//             panels.forEach(p => ro.observe(p));
//         }

//         // global error capture for debugging
//         window.addEventListener('error', e => console.error('Unhandled error:', e.error || e.message));
//         window.addEventListener('unhandledrejection', e => console.error('Unhandled rejection:', e.reason));
//     }

//     if (document.readyState === 'complete' || document.readyState === 'interactive') onReady();
//     else document.addEventListener('DOMContentLoaded', onReady);
// })();