/* 界面文案三语字典：gene 的介绍页为三语共用本脚本，
   语言由页面的 <html lang> 决定。 */
/* 语言由 URL 路径决定，与 common.js 的判定保持一致；
   不读 <html lang>，因为它可能被语言偏好覆盖。 */
var GENE_LANG = (function () {
    var p = window.location.pathname;
    if (p.indexOf('/en/') === 0) return 'en';
    if (p.indexOf('/fr/') === 0) return 'fr';
    return 'zh';
})();
var GENE_TEXT = {
    zh: {
        welcome: "欢迎来到构建转基因抗虫棉实验。第一步：我们需要从相关细菌内获取基因和载体，请点击细胞进行获取。",
        gotBt: "已成功获取 Bt 抗虫基因，即将通过 PCR 技术完成扩增...",
        btAmp: "Bt 基因扩增成功！",
        gotTi: "已成功获取 Ti 质粒，即将通过 PCR 技术完成扩增...",
        tiAmp: "Ti 质粒扩增成功！",
        pcrDone: "两种 PCR 扩增完成，点击“下一步”开始构建重组质粒！",
        dragBt: "正在移动Bt基因，请将其精准拖入Ti质粒的T-DNA区域（橙色部分）。",
        insertOk: "完美！Bt基因已成功插入T-DNA。现在请向下滚动，选择完成重组质粒构建所需的酶。",
        insertBad: "位置错误！Bt基因必须插入到T-DNA片段中，才能在之后转移至植物基因组。",
        promoter: "启动子", terminator: "终止子", marker: "标记基因",
        ori: "复制原点", intron: "内含子", startCodon: "起始密码子",
        toolsOk: "工具选择完全正确！重组Ti质粒构建完成。现在可以进入转化阶段。",
        toolsMissing: "还差一点！你似乎漏掉了关键的工具：",
        toolsMissing2: "。请重新检查。",
        toolsExtra: "工具选多了！",
        toolsExtra2: "在这个过程中是不需要的，请取消勾选。",
        sep: "、",
        failPlant: "❌ 操作失败！重组Ti质粒无法直接进入植物细胞。必须先通过农杆菌进行转化。",
        okAgro: "✅ 成功！重组Ti质粒已进入农杆菌。现在利用农杆菌的侵染特性，将基因送入植物细胞。",
        agroSense: "农杆菌正在感应植物信号... 注意！只有 T-DNA（橙色部分）会脱离质粒进入植物。",
        transformDone: "✨ 转化完成！我们已获得含有重组Ti质粒的农杆菌！接下来将会发生什么？",
        molTitle: "分子水平检测", molPcr: "PCR技术 (DNA检测)", testing: "检测中...",
        molWb: "抗原-抗体杂交 (蛋白质检测)",
        molRunning: "正在进行分子水平检测，通过PCR确认基因存在，通过抗体检测确认杀虫蛋白已表达...",
        pcrPositive: "检测结果：阳性 (基因已整合)",
        wbPositive: "检测结果：阳性 (蛋白已表达)",
        molPass: "分子检测通过！最后进行个体水平的抗虫鉴定：将棉铃虫放入培养瓶。",
        resTitle: "抗性鉴定 (棉铃虫接种)", control: "对照组",
        inoculating: "接种中...", testGroup: "实验组(Bt)",
        leavesEaten: "叶片被大量啃食", larvaeDead: "幼虫死亡，叶片完好",
        expOk: "实验成功！抗虫棉表现出显著的抗性。你可以点击提交查看成绩了。",
        submit: "提交实验报告",
        step1: "第一步：提取目的基因与质粒。点击细菌内部的遗传物质进行提取。",
        step2: "第二步：构建基因表达载体。请将Bt基因拖入Ti质粒的橙色T-DNA区段，并选出构建所需的酶。",
        step3: "第三步：我们需要将重组Ti质粒导入受体细胞。请选择下一步最合适的受体细胞。请以拖拽的方式将抗虫基因导入植物细胞！",
        step4: "第四步：组织培养与筛选。棉花细胞正在通过脱分化形成愈伤组织，随后再分化成完整植株...",
        dediff: "正在脱分化...", callus: "愈伤组织形成中...", rediff: "正在再分化...",
        regenerated: "获得再生植株",
        regenDone: "植株已再生。现在点击“开始鉴定”按钮，验证转基因是否成功。",
        quizRight: "回答正确！T-DNA具有可转移并整合到受体细胞染色体DNA上的特性。",
        quizWrong: "回答错误。请回想一下，农杆菌转化法中真正进入植物细胞核的是哪一部分？",
        statTime: "⏱️ 实验总用时：", statDrag: "❌ 载体构建拖拽错误：",
        statSelect: "📝 载体组件选择错误：", statPath: "🔄 转化路径操作错误：", times: "次"
    },
    en: {
        welcome: "Welcome to the transgenic insect-resistant cotton experiment. Step one: we need a gene and a vector from the relevant bacteria — click the cells to collect them.",
        gotBt: "Bt insect-resistance gene obtained. It will now be amplified by PCR…",
        btAmp: "Bt gene amplified successfully!",
        gotTi: "Ti plasmid obtained. It will now be amplified by PCR…",
        tiAmp: "Ti plasmid amplified successfully!",
        pcrDone: "Both PCR amplifications are done — click “Next” to start building the recombinant plasmid!",
        dragBt: "Moving the Bt gene — drag it precisely into the T-DNA region of the Ti plasmid (the orange part).",
        insertOk: "Perfect! The Bt gene is now inserted into the T-DNA. Scroll down and select the enzymes needed to complete the recombinant plasmid.",
        insertBad: "Wrong position! The Bt gene must go into the T-DNA segment so it can later transfer into the plant genome.",
        promoter: "Promoter", terminator: "Terminator", marker: "Marker gene",
        ori: "Origin of replication", intron: "Intron", startCodon: "Start codon",
        toolsOk: "All tools selected correctly! The recombinant Ti plasmid is complete and we can move on to transformation.",
        toolsMissing: "Almost there! You seem to have missed key tools:",
        toolsMissing2: ". Please check again.",
        toolsExtra: "Too many tools selected!",
        toolsExtra2: "are not needed in this process — please uncheck them.",
        sep: ", ",
        failPlant: "❌ Failed! The recombinant Ti plasmid cannot enter a plant cell directly — it must first go through Agrobacterium transformation.",
        okAgro: "✅ Success! The recombinant Ti plasmid is inside Agrobacterium. Now use its infective nature to deliver the gene into the plant cell.",
        agroSense: "Agrobacterium is sensing plant signals… Note that only the T-DNA (the orange part) leaves the plasmid and enters the plant.",
        transformDone: "✨ Transformation complete! We now have Agrobacterium carrying the recombinant Ti plasmid. What happens next?",
        molTitle: "Molecular detection", molPcr: "PCR (DNA detection)", testing: "Testing…",
        molWb: "Antigen–antibody hybridisation (protein detection)",
        molRunning: "Running molecular detection — PCR confirms the gene is present and antibody testing confirms the insecticidal protein is expressed…",
        pcrPositive: "Result: positive (gene integrated)",
        wbPositive: "Result: positive (protein expressed)",
        molPass: "Molecular tests passed! Finally, the whole-plant assay: place cotton bollworms into the culture flasks.",
        resTitle: "Resistance assay (bollworm inoculation)", control: "Control group",
        inoculating: "Inoculating…", testGroup: "Test group (Bt)",
        leavesEaten: "Leaves heavily eaten", larvaeDead: "Larvae dead, leaves intact",
        expOk: "Experiment complete! The insect-resistant cotton shows clear resistance. Click submit to see your score.",
        submit: "Submit experiment report",
        step1: "Step one: extract the target gene and the plasmid. Click the genetic material inside the bacteria to extract it.",
        step2: "Step two: build the gene expression vector. Drag the Bt gene into the orange T-DNA segment of the Ti plasmid and select the enzymes needed.",
        step3: "Step three: introduce the recombinant Ti plasmid into a recipient cell. Choose the most suitable recipient cell, then drag the insect-resistance gene into the plant cell!",
        step4: "Step four: tissue culture and selection. The cotton cells are dedifferentiating into callus, then redifferentiating into whole plants…",
        dediff: "Dedifferentiating…", callus: "Callus forming…", rediff: "Redifferentiating…",
        regenerated: "Regenerated plant obtained",
        regenDone: "The plant has regenerated. Click “Start verification” to confirm the transformation succeeded.",
        quizRight: "Correct! The T-DNA can transfer into and integrate with the chromosomal DNA of the recipient cell.",
        quizWrong: "Not quite. Think back: which part actually enters the plant cell nucleus in Agrobacterium transformation?",
        statTime: "⏱️ Total experiment time: ", statDrag: "❌ Vector construction drag errors: ",
        statSelect: "📝 Vector component selection errors: ", statPath: "🔄 Transformation path errors: ", times: "times"
    },
    fr: {
        welcome: "Bienvenue dans l'expérience du coton transgénique résistant aux insectes. Première étape : nous devons obtenir un gène et un vecteur à partir des bactéries concernées — cliquez sur les cellules pour les prélever.",
        gotBt: "Gène Bt de résistance aux insectes obtenu. Il va maintenant être amplifié par PCR…",
        btAmp: "Gène Bt amplifié avec succès !",
        gotTi: "Plasmide Ti obtenu. Il va maintenant être amplifié par PCR…",
        tiAmp: "Plasmide Ti amplifié avec succès !",
        pcrDone: "Les deux amplifications PCR sont terminées — cliquez sur « Suivant » pour construire le plasmide recombinant !",
        dragBt: "Déplacement du gène Bt — faites-le glisser précisément dans la région T-DNA du plasmide Ti (la partie orange).",
        insertOk: "Parfait ! Le gène Bt est inséré dans le T-DNA. Faites défiler et sélectionnez les enzymes nécessaires pour compléter le plasmide recombinant.",
        insertBad: "Mauvaise position ! Le gène Bt doit être inséré dans le segment T-DNA pour pouvoir ensuite se transférer dans le génome de la plante.",
        promoter: "Promoteur", terminator: "Terminateur", marker: "Gène marqueur",
        ori: "Origine de réplication", intron: "Intron", startCodon: "Codon d'initiation",
        toolsOk: "Tous les outils sont correctement sélectionnés ! Le plasmide Ti recombinant est prêt et nous pouvons passer à la transformation.",
        toolsMissing: "Presque ! Il semble que vous ayez oublié des outils essentiels :",
        toolsMissing2: ". Vérifiez à nouveau.",
        toolsExtra: "Trop d'outils sélectionnés !",
        toolsExtra2: "ne sont pas nécessaires dans ce processus — veuillez les décocher.",
        sep: ", ",
        failPlant: "❌ Échec ! Le plasmide Ti recombinant ne peut pas entrer directement dans une cellule végétale — il doit d'abord passer par une transformation avec Agrobacterium.",
        okAgro: "✅ Réussi ! Le plasmide Ti recombinant est entré dans l'Agrobacterium. Utilisons maintenant son pouvoir infectieux pour transférer le gène dans la cellule végétale.",
        agroSense: "L'Agrobacterium perçoit les signaux de la plante… Attention : seul le T-DNA (la partie orange) quitte le plasmide pour entrer dans la plante.",
        transformDone: "✨ Transformation terminée ! Nous avons maintenant des Agrobacterium portant le plasmide Ti recombinant. Que se passe-t-il ensuite ?",
        molTitle: "Détection moléculaire", molPcr: "PCR (détection d'ADN)", testing: "Analyse en cours…",
        molWb: "Hybridation antigène-anticorps (détection de protéine)",
        molRunning: "Détection moléculaire en cours — la PCR confirme la présence du gène et le test d'anticorps confirme l'expression de la protéine insecticide…",
        pcrPositive: "Résultat : positif (gène intégré)",
        wbPositive: "Résultat : positif (protéine exprimée)",
        molPass: "Tests moléculaires réussis ! Enfin, l'évaluation sur plante entière : placez des vers de la capsule du coton dans les flacons de culture.",
        resTitle: "Évaluation de la résistance (inoculation de vers)", control: "Groupe témoin",
        inoculating: "Inoculation…", testGroup: "Groupe test (Bt)",
        leavesEaten: "Feuilles fortement rongées", larvaeDead: "Larves mortes, feuilles intactes",
        expOk: "Expérience réussie ! Le coton résistant montre une résistance nette. Cliquez sur envoyer pour voir votre score.",
        submit: "Envoyer le rapport d'expérience",
        step1: "Première étape : extraire le gène cible et le plasmide. Cliquez sur le matériel génétique à l'intérieur des bactéries pour le prélever.",
        step2: "Deuxième étape : construire le vecteur d'expression. Faites glisser le gène Bt dans le segment T-DNA orange du plasmide Ti et sélectionnez les enzymes nécessaires.",
        step3: "Troisième étape : introduire le plasmide Ti recombinant dans une cellule hôte. Choisissez la cellule hôte la plus adaptée, puis faites glisser le gène de résistance dans la cellule végétale !",
        step4: "Quatrième étape : culture de tissus et sélection. Les cellules de coton se dédifférencient en cal, puis se redifférencient en plantes entières…",
        dediff: "Dédifférenciation…", callus: "Formation du cal…", rediff: "Redifférenciation…",
        regenerated: "Plante régénérée obtenue",
        regenDone: "La plante est régénérée. Cliquez sur « Lancer la vérification » pour confirmer la réussite de la transformation.",
        quizRight: "Correct ! Le T-DNA peut se transférer et s'intégrer à l'ADN chromosomique de la cellule hôte.",
        quizWrong: "Pas tout à fait. Rappelez-vous : quelle partie entre réellement dans le noyau de la cellule végétale lors de la transformation par Agrobacterium ?",
        statTime: "⏱️ Temps total de l'expérience : ", statDrag: "❌ Erreurs de glisser-déposer (construction du vecteur) : ",
        statSelect: "📝 Erreurs de sélection des composants du vecteur : ", statPath: "🔄 Erreurs de parcours de transformation : ", times: "fois"
    }
};
function G(k) { return (GENE_TEXT[GENE_LANG] || GENE_TEXT.zh)[k]; }

let currentStep = 1;
let s2SelectedTools = new Set();
let s2SelectedComps = new Set();
let timeElapsed = 0;
let timerId = null;
let isTimerRunning = true;

let state = {
    1: { bt: false, ti: false },
    2: { inserted: false, validated: false, dragErrors: 0, selectErrors: 0 },
    3: { agroConverted: false, plantInfected: false, dragErrors: 0 },
    4: { done: false }
};

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
    typeWriter(G('welcome'));
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

    typeWriter(G('gotBt'));

    setTimeout(() => {
        typeWriter(G('btAmp'));
        checkS1();
    }, 2000);
}

function extractTi() {
    if (state[1].ti) return;
    const res = document.getElementById('ti-result');
    res.classList.remove('hidden');
    res.classList.add('extract-ti-anim');
    state[1].ti = true;

    typeWriter(G('gotTi'));

    setTimeout(() => {
        typeWriter(G('tiAmp'));
        checkS1();
    }, 2000);
}

function checkS1() {
    if (state[1].bt && state[1].ti) {
        setTimeout(() => {
            typeWriter(G('pcrDone'));
        }, 2000);
        document.getElementById('submit-btn').disabled = false;
    }
}


/* --- STAGE 2 --- */


function allowDrop(ev) {
    ev.preventDefault();
}

function onS2DragStart(ev) {
    ev.dataTransfer.setData("type", "bt-gene");
    typeWriter(G('dragBt'));
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
            typeWriter(G('insertOk'));
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
        typeWriter(G('insertBad'));
        setTimeout(() => guide.classList.remove('animate-bounce'), 500);
    }
}

function initS2Components() { const comps = [G('promoter'), G('terminator'), G('marker'), G('ori'), G('intron'), G('startCodon')]; const container = document.getElementById('comp-container'); container.innerHTML = ''; comps.forEach(c => { const btn = document.createElement('button'); btn.className = "component-btn"; btn.innerText = c; btn.onclick = () => { if (s2SelectedComps.has(c)) { s2SelectedComps.delete(c); btn.classList.remove('selected'); } else { s2SelectedComps.add(c); btn.classList.add('selected'); } }; container.appendChild(btn); }); }

function checkFinalS2() {
    const required = [G('promoter'), G('terminator'), G('marker'), G('ori')];
    const missing = required.filter(x => !s2SelectedComps.has(x));
    const extra = Array.from(s2SelectedComps).filter(x => !required.includes(x));

    const guide = document.getElementById('s2-guide');
    guide.classList.remove('hidden');

    if (missing.length === 0 && extra.length === 0) {
        typeWriter(G('toolsOk'));

        state[2].validated = true;
        const submitBtn = document.getElementById('submit-btn');
        if (submitBtn) submitBtn.disabled = false;

    } else if (missing.length > 0) {
        state[2].selectErrors++;
        typeWriter(G('toolsMissing') + missing.join(G('sep')) + G('toolsMissing2'));

        state[2].validated = false;
    } else if (extra.length > 0) {
        state[2].selectErrors++;
        typeWriter(G('toolsExtra') + extra.join(G('sep')) + G('toolsExtra2'));
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
        typeWriter(G('failPlant'));
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

        typeWriter(G('okAgro'));

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
    typeWriter(G('agroSense'));

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

            typeWriter(G('transformDone'));
            document.getElementById('submit-btn').disabled = false;
        };
    }, 1000);
};


/* --- STAGE 4 --- */
function runChecks() {
    const c1 = document.getElementById('check-1');
    const c2 = document.getElementById('check-2');
    c1.innerHTML = `
        <p class="text-xs font-bold mb-2">${G('molTitle')}</p>
        <div class="bg-slate-100 rounded p-2 mb-2">
            <p class="text-[10px]">${G('molPcr')}</p>
            <p id="pcr-status" class="text-[10px] text-blue-500 mt-1">${G('testing')}</p>
        </div>
        <div class="bg-slate-100 rounded p-2">
            <p class="text-[10px]">${G('molWb')}</p>
            <p id="wb-status" class="text-[10px] text-blue-500 mt-1">${G('testing')}</p>
        </div>
    `;
    typeWriter(G('molRunning'));

    setTimeout(() => {
        document.getElementById('pcr-status').innerText = G('pcrPositive');
        document.getElementById('pcr-status').classList.replace('text-blue-500', 'text-green-600');
    }, 1200);

    setTimeout(() => {
        document.getElementById('wb-status').innerText = G('wbPositive');
        document.getElementById('wb-status').classList.replace('text-blue-500', 'text-green-600');
        c1.classList.add('done');
        typeWriter(G('molPass'));
    }, 2000);

    setTimeout(() => {
        c2.innerHTML = `
            <p class="text-xs font-bold mb-2">${G('resTitle')}</p>
            <div class="flex justify-around items-center">
                <div class="flex flex-col items-center">
                    <p class="text-[10px] font-bold text-slate-500 mb-1">${G('control')}</p>
                    <div class="text-4xl">🍃</div>
                    <div id="worm-normal" class="text-2xl mt-1 transition-all">🐛</div>
                    <p id="normal-status" class="text-[10px] mt-1">${G('inoculating')}</p>
                </div>
                <div class="flex flex-col items-center">
                    <p class="text-[10px] font-bold text-blue-600 mb-1">${G('testGroup')}</p>
                    <div class="text-4xl">🌿</div>
                    <div id="worm-gm" class="text-2xl mt-1 transition-all">🐛</div>
                    <p id="gm-status" class="text-[10px] mt-1">${G('inoculating')}</p>
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
            document.getElementById('normal-status').innerText = G('leavesEaten');
            document.getElementById('normal-status').classList.add('text-red-500');
            wormGM.innerText = "💀";
            document.getElementById('gm-status').innerText = G('larvaeDead');
            document.getElementById('gm-status').classList.add('text-green-600');
            typeWriter(G('expOk'));
        }, 2000);

        setTimeout(() => {
            state[4].done = true;
            stopTimer();
            document.getElementById('submit-btn').disabled = false;
            document.getElementById('submit-btn').innerText = G('submit');
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
    if (n === 1) typeWriter(G('step1'));
    if (n === 2) typeWriter(G('step2'));
    if (n === 3) typeWriter(G('step3'));
    if (n === 4) {
        typeWriter(G('step4'));
        const leaf = document.getElementById('p4-leaf');
        const callus = document.getElementById('p4-callus');
        const plantlet = document.getElementById('p4-plantlet');
        const status = document.getElementById('p4-status');

        leaf.style.opacity = "1";
        status.innerText = G('dediff');
        setTimeout(() => {
            leaf.classList.add('hidden');
            callus.classList.remove('hidden');
            status.innerText = G('callus');
        }, 1200);
        setTimeout(() => {
            callus.style.transform = "scale(1.2)";
            status.innerText = G('rediff');
        }, 2200);
        setTimeout(() => {
            callus.classList.add('hidden');
            plantlet.classList.remove('hidden');
            plantlet.style.transform = "scale(0.7)";
            status.innerText = "${G('regenerated')}";
        }, 3200);
        setTimeout(() => {
            document.getElementById('p4-overlay').classList.add('hidden');
            document.getElementById('p4-start-test').classList.remove('hidden');
            typeWriter(G('regenDone'));
        }, 4200);
    }
}

function handleQuiz(btn, correct) {
    if (correct) {
        btn.classList.add('bg-green-100', 'border-green-500', 'text-green-700');
        typeWriter(G('quizRight'));
    } else {
        btn.classList.add('bg-red-100', 'border-red-500', 'text-red-700');
        typeWriter(G('quizWrong'));
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
            <p>${G('statTime')}<span class="text-blue-600 font-bold">${finalTime}</span></p>
            <p>${G('statDrag')}<span class="text-red-500">${state[2].dragErrors}</span> ${G('times')}</p>
            <p>${G('statSelect')}<span class="text-red-500">${state[2].selectErrors}</span> ${G('times')}</p>
            <p>${G('statPath')}<span class="text-orange-500">${state[3].dragErrors}</span> ${G('times')}</p>
        </div>
    `;

    document.getElementById('time-stats').innerHTML = statsHtml;
}