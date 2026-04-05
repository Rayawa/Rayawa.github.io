let currentStep = 1;
let s2SelectedTools = new Set();
let timeElapsed = 0;
let timerId = null;
let isTimerRunning = true;

function showToast(text) {
    const toast = document.getElementById('toast-msg');
    toast.innerText = text;
    toast.style.opacity = "1";
    setTimeout(() => toast.style.opacity = "0", 3000);
}

let typingTimer = null;
function typeWriter(text, speed = 20) {
    const textBox = document.getElementById('hint-text');
    const icon = document.getElementById('hint-svg');
    if (!textBox || !icon) return;

    clearTimeout(typingTimer);
    textBox.innerHTML = "";

    icon.classList.add('gemini-loading');

    let i = 0;
    function typing() {
        if (i < text.length) {
            textBox.innerHTML += text.charAt(i);
            i++;
            typingTimer = setTimeout(typing, speed);
        } else {
            icon.classList.remove('gemini-loading');
        }
    }
    typing();
}

function clearHint() {
    const textBox = document.getElementById('hint-text');
    const icon = document.getElementById('hint-svg');
    clearTimeout(typingTimer);
    textBox.innerHTML = "";
    icon.classList.remove('spin');
}

window.onload = () => {
    // 启动计时器
    timerId = setInterval(() => {
        if (!isTimerRunning) return;
        timeElapsed++;
        const m = Math.floor(timeElapsed / 60);
        const s = timeElapsed % 60;
        document.getElementById('display-time').innerText = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    }, 1000);

    // 初始页面引导
    typeWriter("欢迎来到构建转基因抗虫棉实验。第一步：我们需要从相关细菌内获取基因和载体，请点击细胞进行获取。");
};

function stopTimer() {
    isTimerRunning = false;
    clearInterval(timerId);
}

/* --- STAGE 1 --- */
function extractBt() {
    if (state[1].bt) return;
    const res = document.getElementById('bt-result');
    res.classList.remove('hidden');
    res.classList.add('extract-bt-anim');
    state[1].bt = true;
    typeWriter("已成功获取 Bt 抗虫基因，即将通过 PCR 技术完成扩增...");
    
    // 模拟等待 2 秒
    setTimeout(()=>{
        typeWriter("Bt 基因扩增成功！");
        checkS1();
    }, 2000);
    checkS1();
}

function extractTi() {
    if (state[1].ti) return;
    const res = document.getElementById('ti-result');
    res.classList.remove('hidden');
    res.classList.add('extract-ti-anim');
    state[1].ti = true;
    typeWriter("已成功获取 Ti 质粒，即将通过 PCR 技术完成扩增...");
    
    setTimeout(()=>{
        typeWriter("Ti 质粒扩增成功！");
        checkS1();
    }, 2000);
    checkS1();
}

function checkS1(){
    if(state[1].bt && state[1].ti){
        setTimeout(() => {
        typeWriter("两种 PCR 扩增完成，点击“下一步”开始构建重组质粒！");
        }, 2000);
        document.getElementById('submit-btn').disabled = false;
    }
}


/* --- STAGE 2 --- */
const s2SelectedComps = new Set();
let state = {
    1: { bt: false, ti: false },
    2: {
        inserted: false,
        validated: false,
        dragErrors: 0,    // 第二阶段：拖拽错误次数
        selectErrors: 0   // 第二阶段：组件选择错误次数
    },
    3: {
        agroConverted: false,
        plantInfected: false,
        dragErrors: 0     // 第三阶段：拖拽错误次数
    },
    4: { done: false }
};

function allowDrop(ev) {
    ev.preventDefault();
}

function onS2DragStart(ev) {
    ev.dataTransfer.setData("type", "bt-gene");
    typeWriter("正在移动Bt基因，请将其精准拖入Ti质粒的T-DNA区域（橙色部分）。");
}

function handleS2Insertion(ev) {
    ev.preventDefault();
    const dataType = ev.dataTransfer.getData("type");
    if (dataType === "bt-gene") {
        state[2].inserted = true;
        const btGene = document.getElementById('bt-green-gene');
        if (btGene) btGene.classList.add('invisible');

        const tdnaCore = document.getElementById('tdna-core');
        if (!tdnaCore) return;

        const svgns = "http://www.w3.org/2000/svg";
        const svgElement = tdnaCore.ownerSVGElement;

        if (document.getElementById('bt-inserted-segment')) return;

        const originalDashArray = tdnaCore.getAttribute('stroke-dasharray').split(' ');
        const originalSolidLength = parseFloat(originalDashArray[0]);
        const originalDashOffset = parseFloat(tdnaCore.getAttribute('stroke-dashoffset'));

        const greenPercent = 0.4;
        const greenSolidLength = originalSolidLength * greenPercent;
        const greenDashOffset = originalDashOffset - (originalSolidLength - greenSolidLength) / 2;

        const btSegment = document.createElementNS(svgns, "circle");
        btSegment.setAttribute("cx", tdnaCore.getAttribute("cx"));
        btSegment.setAttribute("cy", tdnaCore.getAttribute("cy"));
        btSegment.setAttribute("r", tdnaCore.getAttribute("r"));
        btSegment.setAttribute("fill", "none");
        btSegment.setAttribute("stroke", "#22c55e");
        btSegment.setAttribute("stroke-width", "20");
        btSegment.setAttribute("stroke-dasharray", `${greenSolidLength} ${originalSolidLength * 5}`);
        btSegment.setAttribute("stroke-dashoffset", greenDashOffset.toString());
        btSegment.setAttribute("id", "bt-inserted-segment");
        btSegment.classList.add('animate-pulse');

        svgElement.appendChild(btSegment);

        const guide = document.getElementById('s2-guide');
        if (guide) {
            guide.classList.remove('hidden', 'text-red-600');
            guide.classList.add('text-green-600', 'font-bold');
            typeWriter("完美！Bt基因已成功插入T-DNA。现在请向下滚动，选择完成重组质粒构建所需的酶。");
        }

        setTimeout(() => {
            if (typeof initS2Components === 'function') {
                initS2Components();
            }
            const phase2 = document.getElementById('s2-phase-2');
            if (phase2) {
                phase2.classList.remove('hidden');
                phase2.scrollIntoView({ behavior: 'smooth' });
            }
        }, 1000);
    }
}

function handleS2WrongDrop(ev) {
    ev.preventDefault();
    const dataType = ev.dataTransfer.getData("type");
    if (dataType === "bt-gene") {
        state[2].dragErrors++;
        const guide = document.getElementById('s2-guide');
        guide.classList.remove('hidden', 'text-green-600');
        guide.classList.add('text-red-600', 'font-bold', 'animate-bounce');
        typeWriter("位置错误！Bt基因必须插入到T-DNA片段中，才能在之后转移至植物基因组。");
        setTimeout(() => guide.classList.remove('animate-bounce'), 500);
    }
}

function initS2Components() {
    const comps = ["启动子", "终止子", "标记基因", "复制原点", "内含子", "起始密码子"];
    const container = document.getElementById('comp-container');
    container.innerHTML = '';
    comps.forEach(c => {
        const btn = document.createElement('button');
        btn.className = "component-btn";
        btn.innerText = c;
        btn.onclick = () => {
            if (s2SelectedComps.has(c)) {
                s2SelectedComps.delete(c);
                btn.classList.remove('selected');
            } else {
                s2SelectedComps.add(c);
                btn.classList.add('selected');
            }
        };
        container.appendChild(btn);
    });
}


function checkFinalS2() {
    const required = ["启动子", "终止子", "标记基因", "复制原点"];
    const missing = required.filter(x => !s2SelectedComps.has(x));
    const extra = Array.from(s2SelectedComps).filter(x => !required.includes(x));

    const guide = document.getElementById('s2-guide');
    guide.classList.remove('hidden');

    if (missing.length === 0 && extra.length === 0) {
        typeWriter("工具选择完全正确！重组Ti质粒构建完成。现在可以进入转化阶段。");

        state[2].validated = true;
        const submitBtn = document.getElementById('submit-btn');
        if (submitBtn) submitBtn.disabled = false;

    } else if (missing.length > 0) {
        state[2].selectErrors++;
        typeWriter(`还差一点！你似乎漏掉了关键的工具：${missing.join('、')}。请重新检查。`);

        state[2].validated = false;
    } else if (extra.length > 0) {
        state[2].selectErrors++;
        typeWriter(`工具选多了！${extra.join('、')}在这个过程中是不需要的，请取消勾选。`);
        state[2].validated = false;
    }
}

/* --- STAGE 3 --- */
function onS3Drag(ev) {
    ev.dataTransfer.setData("type", "full-plasmid");
}

function onS3Drop(ev, target) {
    ev.preventDefault();
    const type = ev.dataTransfer.getData("type");

    // 错误处理：直接选植物
    if (target === 'plant') {
        state[3].dragErrors++;
        typeWriter("❌ 操作失败！重组Ti质粒无法直接进入植物细胞。必须先通过农杆菌进行转化。");
        // 视觉抖动提示
        document.getElementById('target-plant').classList.add('animate-shake');
        setTimeout(() => document.getElementById('target-plant').classList.remove('animate-shake'), 500);
        return;
    }

    // 正确处理：选择农杆菌
    if (target === 'agro') {
        document.getElementById('source-plasmid-container').classList.add('invisible');
        document.getElementById('agro-plasmid-inner').classList.remove('hidden');
        document.getElementById('target-agro').classList.replace('border-dashed', 'border-solid');
        document.getElementById('target-agro').classList.add('bg-emerald-100');

        typeWriter("✅ 成功！重组Ti质粒已进入农杆菌。现在利用农杆菌的侵染特性，将基因送入植物细胞。");

        setTimeout(() => {
            document.getElementById('btn-infect').classList.remove('hidden');
        }, 800);
    }
}

function startInfection() {
    document.getElementById('btn-infect').classList.add('hidden');
    const tdna = document.getElementById('flying-tdna');
    const agroInner = document.getElementById('agro-plasmid-inner');

    agroInner.classList.add('animate-pulse');
    typeWriter("农杆菌正在感应植物信号... 注意！只有 T-DNA（橙色部分）会脱离质粒进入植物。");

    setTimeout(() => {
        tdna.classList.remove('hidden');

        tdna.animate([
            { left: '-120px', opacity: 1, transform: 'scale(1.2)' },
            { left: '40px', opacity: 1, transform: 'scale(0.8)' }
        ], {
            duration: 2000,
            easing: 'ease-in-out',
            fill: 'forwards'
        }).onfinish = () => {
            // 4. 最终状态：橙色整合进染色体
            tdna.style.display = 'none';
            const chr = document.getElementById('chromosome');

            chr.classList.replace('bg-slate-200', 'bg-orange-500');
            chr.classList.add('shadow-[0_0_10px_#f59e0b]');

            typeWriter("✨ 转化完成！我们已获得含有重组Ti质粒的农杆菌！接下来将会发生什么？");
            document.getElementById('submit-btn').disabled = false;
        };
    }, 1000);
};


/* --- STAGE 4 --- */
function runChecks() {
    const c1 = document.getElementById('check-1');
    const c2 = document.getElementById('check-2');
    c1.innerHTML = `
        <p class="text-xs font-bold mb-2">分子水平检测</p>
        <div class="bg-slate-100 rounded p-2 mb-2">
            <p class="text-[10px]">PCR技术 (DNA检测)</p>
            <p id="pcr-status" class="text-[10px] text-blue-500 mt-1">检测中...</p>
        </div>
        <div class="bg-slate-100 rounded p-2">
            <p class="text-[10px]">抗原-抗体杂交 (蛋白质检测)</p>
            <p id="wb-status" class="text-[10px] text-blue-500 mt-1">检测中...</p>
        </div>
    `;
    typeWriter("正在进行分子水平检测，通过PCR确认基因存在，通过抗体检测确认杀虫蛋白已表达...");

    setTimeout(() => {
        document.getElementById('pcr-status').innerText = "检测结果：阳性 (基因已整合)";
        document.getElementById('pcr-status').classList.replace('text-blue-500', 'text-green-600');
    }, 1200);

    setTimeout(() => {
        document.getElementById('wb-status').innerText = "检测结果：阳性 (蛋白已表达)";
        document.getElementById('wb-status').classList.replace('text-blue-500', 'text-green-600');
        c1.classList.add('done');
        typeWriter("分子检测通过！最后进行个体水平的抗虫鉴定：将棉铃虫放入培养瓶。");
    }, 2000);

    setTimeout(() => {
        c2.innerHTML = `
            <p class="text-xs font-bold mb-2">抗性鉴定 (棉铃虫接种)</p>
            <div class="flex justify-around items-center">
                <div class="flex flex-col items-center">
                    <p class="text-[10px] font-bold text-slate-500 mb-1">对照组</p>
                    <div class="text-4xl">🍃</div>
                    <div id="worm-normal" class="text-2xl mt-1 transition-all">🐛</div>
                    <p id="normal-status" class="text-[10px] mt-1">接种中...</p>
                </div>
                <div class="flex flex-col items-center">
                    <p class="text-[10px] font-bold text-blue-600 mb-1">实验组(Bt)</p>
                    <div class="text-4xl">🌿</div>
                    <div id="worm-gm" class="text-2xl mt-1 transition-all">🐛</div>
                    <p id="gm-status" class="text-[10px] mt-1">接种中...</p>
                </div>
            </div>
        `;
        c2.classList.add('done');
        const wormNormal = document.getElementById('worm-normal');
        const wormGM = document.getElementById('worm-gm');

        let step = 0;
        const interval = setInterval(() => {
            step += 3;
            const wiggle = Math.sin(step / 5) * 3;
            wormNormal.style.transform = `translateY(-${step}px) translateX(${wiggle}px)`;
            wormGM.style.transform = `translateY(-${step}px) translateX(${wiggle}px)`;
        }, 100);

        setTimeout(() => {
            clearInterval(interval);
            document.getElementById('normal-status').innerText = "叶片被大量啃食";
            document.getElementById('normal-status').classList.add('text-red-500');
            wormGM.innerText = "💀";
            document.getElementById('gm-status').innerText = "幼虫死亡，叶片完好";
            document.getElementById('gm-status').classList.add('text-green-600');
            typeWriter("实验成功！抗虫棉表现出显著的抗性。你可以点击提交查看成绩了。");
        }, 2000);

        setTimeout(() => {
            state[4].done = true;
            stopTimer();
            document.getElementById('submit-btn').disabled = false;
            document.getElementById('submit-btn').innerText = "提交实验报告";
        }, 2800);
    }, 3200);
}

function nextStage() {
    if (currentStep === 1) jumpTo(2);
    else if (currentStep === 2) jumpTo(3);
    else if (currentStep === 3) jumpTo(4);
    else if (currentStep === 4) document.getElementById('quiz-modal').classList.remove('hidden');
}

function jumpTo(n) {
    clearHint();
    currentStep = n;
    document.querySelectorAll('.stage-content').forEach(s => s.classList.add('hidden'));
    document.getElementById('stage-' + n).classList.remove('hidden');
    document.querySelectorAll('.flow-step').forEach(s => s.classList.remove('active'));
    document.getElementById('nav-' + n).classList.add('active');
    document.getElementById('submit-btn').disabled = true;

    // 阶段切换引导
    if (n === 1) typeWriter("第一步：提取目的基因与质粒。点击细菌内部的遗传物质进行提取。");
    if (n === 2) typeWriter("第二步：构建基因表达载体。请将Bt基因拖入Ti质粒的橙色T-DNA区段，并选出构建所需的酶。");
    if (n === 3) typeWriter("第三步：我们需要将重组Ti质粒导入受体细胞。请选择下一步最合适的受体细胞。请以拖拽的方式将抗虫基因导入植物细胞！");
    if (n === 4) {
        typeWriter("第四步：组织培养与筛选。棉花细胞正在通过脱分化形成愈伤组织，随后再分化成完整植株...");
        const leaf = document.getElementById('p4-leaf');
        const callus = document.getElementById('p4-callus');
        const plantlet = document.getElementById('p4-plantlet');
        const status = document.getElementById('p4-status');

        leaf.style.opacity = "1";
        status.innerText = "正在脱分化...";
        setTimeout(() => {
            leaf.classList.add('hidden');
            callus.classList.remove('hidden');
            status.innerText = "愈伤组织形成中...";
        }, 1200);
        setTimeout(() => {
            callus.style.transform = "scale(1.2)";
            status.innerText = "正在再分化...";
        }, 2200);
        setTimeout(() => {
            callus.classList.add('hidden');
            plantlet.classList.remove('hidden');
            plantlet.style.transform = "scale(0.7)";
            status.innerText = "获得再生植株";
        }, 3200);
        setTimeout(() => {
            document.getElementById('p4-overlay').classList.add('hidden');
            document.getElementById('p4-start-test').classList.remove('hidden');
            typeWriter("植株已再生。现在点击“开始鉴定”按钮，验证转基因是否成功。");
        }, 4200);
    }
}

function handleQuiz(btn, correct) {
    if (correct) {
        btn.classList.add('bg-green-100', 'border-green-500', 'text-green-700');
        typeWriter("回答正确！T-DNA具有可转移并整合到受体细胞染色体DNA上的特性。");
    } else {
        btn.classList.add('bg-red-100', 'border-red-500', 'text-red-700');
        typeWriter("回答错误。请回想一下，农杆菌转化法中真正进入植物细胞核的是哪一部分？");
    }
}

function finishAll() {
    document.getElementById('quiz-modal').classList.add('hidden');
    document.getElementById('final-modal').classList.remove('hidden');
    
    // 获取计时
    const finalTime = document.getElementById('display-time').innerText;
    
    // 渲染最终得分报告
    const statsHtml = `
        <div class="space-y-2 text-sm text-slate-600 border-t border-b py-4 my-4">
            <p>⏱️ 实验总用时：<span class="text-blue-600 font-bold">${finalTime}</span></p>
            <p>❌ 载体构建拖拽错误：<span class="text-red-500">${state[2].dragErrors}</span> 次</p>
            <p>📝 载体组件选择错误：<span class="text-red-500">${state[2].selectErrors}</span> 次</p>
            <p>🔄 转化路径操作错误：<span class="text-orange-500">${state[3].dragErrors}</span> 次</p>
        </div>
    `;
    
    document.getElementById('time-stats').innerHTML = statsHtml;
}