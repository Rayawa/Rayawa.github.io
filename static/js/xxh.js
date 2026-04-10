(function () {
  'use strict';

  var POOLS = {
    value: {
      baseValue: {
        select: 2,
        questions: [
          { q: { zh: '请对"事业，家庭，自我成长"进行排序（直接输入排序结果，如：家庭>事业>自我成长）', en: 'Rank "career, family, self-growth" (enter ranking, e.g., family>career>self-growth)', fr: 'Classez "carrière, famille, développement personnel" (entrez le classement, ex : famille>carrière>développement)' }, type: 'keyword' },
          { q: { zh: '是否想要孩子', en: 'Do you want children?', fr: 'Voulez-vous des enfants ?' }, type: 'fixed_2', options: [{ zh: '是', en: 'Yes', fr: 'Oui' }, { zh: '否', en: 'No', fr: 'Non' }] },
          { q: { zh: '对未来定居城市的规划（请简要回答，如南方小城市等）', en: 'Future city settlement plan (brief answer, e.g., small southern city)', fr: 'Projet de ville d\'installation (réponse brève, ex : petite ville du sud)' }, type: 'keyword' }
        ]
      },
      money: {
        select: 2,
        questions: [
          { q: { zh: '请选择你的消费理念', en: 'Choose your spending philosophy', fr: 'Choisissez votre philosophie de dépense' }, type: 'fixed_3', options: [{ zh: '节俭', en: 'Frugal', fr: 'Économe' }, { zh: '适度享受', en: 'Moderate enjoyment', fr: 'Plaisir modéré' }, { zh: '超前享受', en: 'Advance enjoyment', fr: 'Plaisir anticipé' }] },
          { q: { zh: '对储蓄与投资的态度', en: 'Attitude toward savings & investment', fr: 'Attitude envers l\'épargne et l\'investissement' }, type: 'fixed_2', options: [{ zh: '支持', en: 'Support', fr: 'Pour' }, { zh: '不支持', en: 'Oppose', fr: 'Contre' }] },
          { q: { zh: '请选择金钱的支配权方式', en: 'Choose your money management style', fr: 'Choisissez votre mode de gestion financière' }, type: 'fixed_3', options: [{ zh: 'AA', en: 'Split (AA)', fr: 'Partagé (AA)' }, { zh: '共同账户', en: 'Joint account', fr: 'Compte joint' }, { zh: '一方管理', en: 'One manages', fr: 'Un gère' }] }
        ]
      },
      boundary: {
        select: 2,
        questions: [
          { q: { zh: '请描述你与原生家庭的关系（请简要回答，如十分和睦等）', en: 'Describe your relationship with your family of origin (brief answer, e.g., very harmonious)', fr: 'Décrivez votre relation avec votre famille d\'origine (réponse brève, ex : très harmonieuse)' }, type: 'keyword' },
          { q: { zh: '是否介意对方有异性好友', en: 'Do you mind your partner having opposite-sex friends?', fr: 'Cela vous dérange que votre partenaire ait des amis du sexe opposé ?' }, type: 'fixed_2', options: [{ zh: '是', en: 'Yes', fr: 'Oui' }, { zh: '否', en: 'No', fr: 'Non' }] },
          { q: { zh: '请输入你独处与陪伴的需求比例（两个和为100的数字）', en: 'Enter your alone vs. together time ratio (two numbers summing to 100)', fr: 'Entrez votre ratio temps seul vs. ensemble (deux nombres totalisant 100)' }, type: 'num100' }
        ]
      },
      conflict: {
        select: 0,
        questions: [
          { q: { zh: '遇到矛盾时，你会选择哪种方式？', en: 'When facing conflict, which approach do you take?', fr: 'Face à un conflit, quelle approche adoptez-vous ?' }, type: 'fixed_3', options: [{ zh: '逃避冷战', en: 'Avoid & cold war', fr: 'Éviter & guerre froide' }, { zh: '指责抱怨', en: 'Blame & complain', fr: 'Blâmer & se plaindre' }, { zh: '就事论事解决问题', en: 'Focus on solving', fr: 'Résoudre objectivement' }] }
        ]
      }
    },
    life: {
      routine: {
        select: 2,
        questions: [
          { q: { zh: '你的作息类型', en: 'Your sleep schedule type', fr: 'Votre type de rythme de sommeil' }, type: 'fixed_3', options: [{ zh: '早睡早起', en: 'Early bird', fr: 'Lève-tôt' }, { zh: '熬夜党', en: 'Night owl', fr: 'Couche-tard' }, { zh: '任意固定作息', en: 'Fixed schedule', fr: 'Horaire fixe' }] },
          { q: { zh: '你的生活整洁度', en: 'Your tidiness level', fr: 'Votre niveau de propreté' }, type: 'fixed_2', options: [{ zh: '爱干净', en: 'Clean', fr: 'Très propre' }, { zh: '较随性', en: 'Casual', fr: 'Détendu' }] },
          { q: { zh: '你的饮食口味偏好（请简要回答，如喜欢甜食等）', en: 'Your food taste preference (brief answer, e.g., sweet tooth)', fr: 'Votre préférence alimentaire (réponse brève, ex : sucré)' }, type: 'keyword' }
        ]
      },
      hobby: {
        select: 0,
        questions: [
          { q: { zh: '你的休闲倾向', en: 'Your leisure preference', fr: 'Votre préférence de loisir' }, type: 'fixed_2', options: [{ zh: '宅家', en: 'Homebody', fr: 'Casanier' }, { zh: '外出', en: 'Outgoing', fr: 'Sortant' }] },
          { q: { zh: '社交平台好友数量', en: 'Number of social media friends', fr: 'Nombre d\'amis sur les réseaux sociaux' }, type: 'num_single' },
          { q: { zh: '常用社交平台数量', en: 'Number of social platforms used', fr: 'Nombre de plateformes sociales utilisées' }, type: 'num_single' },
          { q: { zh: '经常见面的朋友数量', en: 'Number of friends you meet regularly', fr: 'Nombre d\'amis vus régulièrement' }, type: 'num_single' },
          { q: { zh: '常参与的活动（请简要回答，如参加体育运动等）', en: 'Activities you often participate in (brief answer)', fr: 'Activités auxquelles vous participez souvent (réponse brève)' }, type: 'activity_keyword' }
        ]
      },
      emotion: {
        select: 0,
        questions: [
          { q: { zh: '面对挫折压力的情绪处理方式', en: 'How do you cope with stress and setbacks?', fr: 'Comment gérez-vous le stress et les revers ?' }, type: 'fixed_2', options: [{ zh: '自我消化', en: 'Self-digest', fr: 'Auto-digestion' }, { zh: '寻求朋友安慰', en: 'Seek friends\' comfort', fr: 'Chercher du réconfort' }] }
        ]
      }
    },
    add: {
      social: {
        select: 0,
        questions: [
          { q: { zh: '对彩礼的看法（请简要回答）', en: 'Views on bride price / dowry (brief answer)', fr: 'Avis sur la dot (réponse brève)' }, type: 'add_topic_keyword' },
          { q: { zh: '对职场内卷的看法（请简要回答）', en: 'Views on workplace rat race (brief answer)', fr: 'Avis sur l\'involution au travail (réponse brève)' }, type: 'add_topic_keyword' },
          { q: { zh: '对赡养老人的看法（请简要回答）', en: 'Views on elder care responsibility (brief answer)', fr: 'Avis sur la responsabilité des soins aux personnes âgées (réponse brève)' }, type: 'add_topic_keyword' }
        ]
      },
      evaluate: {
        select: 0,
        questions: [
          { q: { zh: '对对方的简短评价（可从性格、样貌、品行等角度回答）', en: 'Brief evaluation of your partner (personality, appearance, character, etc.)', fr: 'Brève évaluation de votre partenaire (personnalité, apparence, caractère, etc.)' }, type: 'add_evaluate_keyword' }
        ]
      }
    }
  };

  var KEYWORD_MATCH = {
    zh: {
      '南方': ['南方', '江南', '华南', '华东'],
      '北方': ['北方', '华北', '东北', '西北'],
      '城市': ['城市', '都市', '市区', '北京', '老家'],
      '乡村': ['乡村', '农村', '乡下', '田园'],
      '和睦': ['和睦', '融洽', '亲密', '和谐'],
      '矛盾': ['矛盾', '紧张', '疏远', '不和'],
      '事业': ['事业'],
      '家庭': ['家庭'],
      '自我成长': ['自我成长'],
      '辣': ['辣', '麻辣', '香辣', '川湘'],
      '甜': ['甜', '甜品', '甜口', '江浙'],
      '淡': ['淡', '清淡', '鲜', '粤菜'],
      '咸': ['咸', '重盐', '鲁菜'],
      '体育运动': ['体育运动', '篮球', '跑步', '健身', '羽毛球', '足球', '乒乓球', '排球', '游泳', '泰拳'],
      '文艺娱乐': ['文艺娱乐', '看电影', '追剧', '听歌', '阅读', '书法'],
      '手工创作': ['手工创作', '手作', 'DIY', '陶艺', '折纸'],
      '学术研究': ['学术研究', '学术讨论', '科研', '论文', '学习'],
      'cosplay': ['cosplay', '漫展', '二次元', 'cos'],
      '聚餐探店': ['聚餐探店', '吃饭', '探店', '美食', '聚餐'],
      '户外游玩': ['户外游玩', '爬山', '露营', '徒步', '旅行'],
      '支持': ['支持', '赞同', '认可', '应该'],
      '反对': ['反对', '抵制', '拒绝', '没必要'],
      '中立': ['中立', '随缘', '无所谓', '不表态'],
      '量力': ['量力', '适度', '看情况', '根据条件'],
      '无奈': ['无奈', '被迫', '没办法', '身不由己'],
      '必须': ['必须', '义务', '责任', '理所当然'],
      '共同': ['共同', '一起', '全家', '共同承担'],
      '温柔': ['温柔', '温和', '体贴', '暖心'],
      '开朗': ['开朗', '活泼', '外向', '阳光'],
      '沉稳': ['沉稳', '稳重', '内敛', '成熟'],
      '真诚': ['真诚', '诚恳', '实在', '坦率'],
      '帅气': ['帅气', '好看', '颜值高', '养眼'],
      '漂亮': ['漂亮', '美丽', '好看', '颜值高'],
      '善良': ['善良', '心软', '有爱心', '体贴']
    },
    en: {
      'south': ['south', 'southern', 'warm', 'warmer'],
      'north': ['north', 'northern', 'cold', 'colder'],
      'city': ['city', 'urban', 'metropolitan', 'downtown'],
      'countryside': ['countryside', 'rural', 'village', 'suburb'],
      'harmonious': ['harmonious', 'close', 'loving', 'warm'],
      'conflict': ['conflict', 'tense', 'distant', 'estranged'],
      'career': ['career', 'work', 'job'],
      'family': ['family', 'home'],
      'self-growth': ['self-growth', 'growth', 'self-improvement', 'personal development'],
      'spicy': ['spicy', 'hot', 'chili', 'sichuan'],
      'sweet': ['sweet', 'dessert', 'sugar', 'pastry'],
      'light': ['light', 'mild', 'fresh', 'subtle'],
      'salty': ['salty', 'savory', 'heavy'],
      'sports': ['sports', 'basketball', 'running', 'gym', 'football', 'swimming', 'badminton', 'soccer', 'fitness'],
      'entertainment': ['entertainment', 'movies', 'tv', 'music', 'reading', 'series'],
      'crafts': ['crafts', 'diy', 'pottery', 'handmade', 'origami'],
      'academic': ['academic', 'research', 'study', 'science', 'paper'],
      'cosplay': ['cosplay', 'anime', 'convention', 'manga'],
      'dining': ['dining', 'restaurant', 'food', 'eating', 'cooking'],
      'outdoor': ['outdoor', 'hiking', 'camping', 'travel', 'climbing', 'walking'],
      'support': ['support', 'agree', 'approve', 'should'],
      'oppose': ['oppose', 'against', 'reject', 'disagree'],
      'neutral': ['neutral', 'whatever', 'indifferent', 'depends'],
      'moderate': ['moderate', 'reasonable', 'balanced', 'case by case'],
      'helpless': ['helpless', 'forced', 'no choice', 'inevitable'],
      'must': ['must', 'obligation', 'duty', 'responsibility'],
      'shared': ['shared', 'together', 'joint', 'collective'],
      'gentle': ['gentle', 'tender', 'caring', 'warm'],
      'outgoing': ['outgoing', 'lively', 'extrovert', 'cheerful'],
      'steady': ['steady', 'calm', 'mature', 'composed'],
      'sincere': ['sincere', 'honest', 'genuine', 'frank'],
      'handsome': ['handsome', 'attractive', 'good-looking'],
      'beautiful': ['beautiful', 'pretty', 'gorgeous', 'good-looking'],
      'kind': ['kind', 'kind-hearted', 'caring', 'compassionate']
    },
    fr: {
      'sud': ['sud', 'méridional', 'chaud', 'climat chaud'],
      'nord': ['nord', 'septentrional', 'froid', 'climat froid'],
      'ville': ['ville', 'urbain', 'métropole', 'centre-ville'],
      'campagne': ['campagne', 'rural', 'village', 'banlieue'],
      'harmonieux': ['harmonieux', 'proche', 'affectueux', 'chaleureux'],
      'conflit': ['conflit', 'tendu', 'distant', 'froid'],
      'carrière': ['carrière', 'travail', 'emploi'],
      'famille': ['famille', 'foyer'],
      'développement': ['développement', 'croissance', 'amélioration', 'personnel'],
      'épicé': ['épicé', 'piquant', 'pimenté', 'sichuan'],
      'sucré': ['sucré', 'dessert', 'pâtisserie'],
      'léger': ['léger', 'doux', 'frais', 'subtil'],
      'salé': ['salé', 'savoureux', 'lourd'],
      'sport': ['sport', 'basketball', 'course', 'gym', 'football', 'natation', 'badminton', 'fitness'],
      'divertissement': ['divertissement', 'film', 'série', 'musique', 'lecture'],
      'artisanat': ['artisanat', 'diy', 'poterie', 'fait main'],
      'académique': ['académique', 'recherche', 'étude', 'science'],
      'cosplay': ['cosplay', 'anime', 'convention', 'manga'],
      'restaurant': ['restaurant', 'dîner', 'cuisine', 'gastronomie'],
      'plein air': ['plein air', 'randonnée', 'camping', 'voyage', 'escalade'],
      'soutien': ['soutien', 'accord', 'approbation', 'pour'],
      'opposé': ['opposé', 'contre', 'rejet', 'désaccord'],
      'neutre': ['neutre', 'peu importe', 'indifférent', 'ça dépend'],
      'modéré': ['modéré', 'raisonnable', 'équilibré', 'au cas par cas'],
      'impuissant': ['impuissant', 'forcé', 'pas le choix', 'inévitable'],
      'obligatoire': ['obligatoire', 'devoir', 'responsabilité', 'nécessaire'],
      'partagé': ['partagé', 'ensemble', 'commun', 'collectif'],
      'doux': ['doux', 'tendre', 'attentionné', 'chaleureux'],
      'extraverti': ['extraverti', 'vivant', 'ouvert', 'joyeux'],
      'stable': ['stable', 'calme', 'mature', 'posé'],
      'sincère': ['sincère', 'honnête', 'authentique', 'franc'],
      'beau': ['beau', 'séduisant', 'attirant'],
      'belle': ['belle', 'jolie', 'magnifique', 'attirante'],
      'gentil': ['gentil', 'bienveillant', 'compatissant', 'attentionné']
    }
  };

  var MODULE_GROUPS = {
    value: ['baseValue', 'money', 'boundary', 'conflict'],
    life: ['routine', 'hobby', 'emotion'],
    add: ['social', 'evaluate']
  };

  var MODULE_I18N_KEYS = {
    baseValue: 'modules.baseValue',
    money: 'modules.money',
    boundary: 'modules.boundary',
    conflict: 'modules.conflict',
    routine: 'modules.routine',
    hobby: 'modules.hobby',
    emotion: 'modules.emotion',
    social: 'modules.social',
    evaluate: 'modules.evaluate'
  };

  var SECTION_I18N_KEYS = {
    value: 'sections.value',
    life: 'sections.life',
    add: 'sections.add'
  };

  var state = {
    phase: 'landing',
    selected: null,
    round1: null,
    round2: null,
    currentRound: 0
  };

  function getLang() {
    return localStorage.getItem('rayawa_locale') || 'zh';
  }

  function t(key) {
    var lang = getLang();
    var i18n = window.SITE_I18N && window.SITE_I18N[lang];
    if (!i18n) return key;
    return key.split('.').reduce(function (o, k) { return o && o[k]; }, i18n) || key;
  }

  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
    }
    return a;
  }

  function extractKeyword(ans) {
    var lang = getLang();
    var dict = KEYWORD_MATCH[lang] || KEYWORD_MATCH.zh;
    ans = ans.trim();
    for (var coreKey in dict) {
      var words = dict[coreKey];
      for (var i = 0; i < words.length; i++) {
        if (ans.toLowerCase().indexOf(words[i].toLowerCase()) >= 0) {
          return coreKey;
        }
      }
    }
    return ans;
  }

  function selectAllQuestions() {
    var selected = {};
    var dims = ['value', 'life', 'add'];
    for (var d = 0; d < dims.length; d++) {
      var dim = dims[d];
      var mods = MODULE_GROUPS[dim];
      for (var m = 0; m < mods.length; m++) {
        var mod = mods[m];
        var pool = POOLS[dim][mod];
        var key = dim + '_' + mod;
        if (pool.select > 0 && pool.questions.length > pool.select) {
          selected[key] = shuffle(pool.questions).slice(0, pool.select);
        } else {
          selected[key] = pool.questions.slice();
        }
      }
    }
    return selected;
  }

  function getQuestionText(q) {
    var lang = getLang();
    return q.q[lang] || q.q.zh;
  }

  function getOptionText(opt) {
    var lang = getLang();
    return opt[lang] || opt.zh;
  }

  function renderLanding() {
    var app = document.getElementById('xxh-app');
    if (!app) return;
    var lang = getLang();
    var i18n = (window.SITE_I18N && window.SITE_I18N[lang]) || {};
    app.innerHTML =
      '<section class="xxh-landing">' +
        '<h1 class="lang-fade-target" data-i18n="heroTitle">' + (i18n.heroTitle || '') + '</h1>' +
        '<p class="lang-fade-target" data-i18n="heroDesc">' + (i18n.heroDesc || '') + '</p>' +
        '<p class="xxh-privacy lang-fade-target" data-i18n="privacyNote">' + (i18n.privacyNote || '') + '</p>' +
        '<button class="btn xxh-start-btn" id="xxh-start"><i class="fas fa-heart"></i> <span data-i18n="startBtn">' + (i18n.startBtn || '') + '</span></button>' +
      '</section>';
    document.getElementById('xxh-start').addEventListener('click', onStart);
  }

  function renderQuiz(roundNum) {
    var app = document.getElementById('xxh-app');
    if (!app) return;
    var lang = getLang();
    var i18n = (window.SITE_I18N && window.SITE_I18N[lang]) || {};
    var who = roundNum === 1 ? (i18n.personA || 'A') : (i18n.personB || 'B');
    var roundLabel = (i18n.roundLabel || 'Round {n}: {who}').replace('{n}', roundNum).replace('{who}', who);

    var totalQ = 0;
    for (var k in state.selected) {
      totalQ += state.selected[k].length;
    }

    var html = '<section class="xxh-quiz">';
    html += '<div class="xxh-quiz-header">';
    html += '<div class="xxh-round-label">' + roundLabel + '</div>';
    html += '<div class="xxh-progress-wrap"><div class="xxh-progress-bar" id="xxh-progress"></div></div>';
    html += '<div class="xxh-progress-text" id="xxh-progress-text">0/' + totalQ + '</div>';
    html += '</div>';

    var dims = ['value', 'life', 'add'];
    for (var d = 0; d < dims.length; d++) {
      var dim = dims[d];
      var sectionTitle = t(SECTION_I18N_KEYS[dim]);
      html += '<div class="xxh-section">';
      html += '<h2 class="xxh-section-title">' + sectionTitle + '</h2>';
      var mods = MODULE_GROUPS[dim];
      for (var m = 0; m < mods.length; m++) {
        var mod = mods[m];
        var key = dim + '_' + mod;
        var questions = state.selected[key];
        if (!questions || !questions.length) continue;
        var modTitle = t(MODULE_I18N_KEYS[mod]);
        html += '<div class="xxh-module">';
        html += '<h3 class="xxh-module-title">' + modTitle + '</h3>';
        for (var qi = 0; qi < questions.length; qi++) {
          var qKey = key + '_' + (qi + 1);
          html += renderQuestion(questions[qi], qKey, qi);
        }
        html += '</div>';
      }
      html += '</div>';
    }

    html += '<div class="xxh-submit-wrap">';
    html += '<button class="btn xxh-submit-btn" id="xxh-submit"><i class="fas fa-paper-plane"></i> <span data-i18n="submitBtn">' + (i18n.submitBtn || '') + '</span></button>';
    html += '</div>';
    html += '</section>';

    app.innerHTML = html;
    document.getElementById('xxh-submit').addEventListener('click', onSubmit);
    updateProgress();
    bindProgressListeners();
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  function renderQuestion(q, qKey, index) {
    var qText = getQuestionText(q);
    var html = '<div class="xxh-question" data-key="' + qKey + '" data-type="' + q.type + '">';
    html += '<p class="xxh-q-text">' + qText + '</p>';

    if (q.type === 'fixed_2' || q.type === 'fixed_3') {
      html += '<div class="xxh-options">';
      for (var i = 0; i < q.options.length; i++) {
        var optText = getOptionText(q.options[i]);
        html += '<label class="xxh-option">';
        html += '<input type="radio" name="' + qKey + '" value="' + i + '">';
        html += '<span class="xxh-option-label">' + optText + '</span>';
        html += '</label>';
      }
      html += '</div>';
    } else if (q.type === 'num100') {
      var lang = getLang();
      var i18n = (window.SITE_I18N && window.SITE_I18N[lang]) || {};
      var aloneLabel = i18n.aloneLabel || '独处';
      var togetherLabel = i18n.togetherLabel || '陪伴';
      html += '<div class="xxh-num100">';
      html += '<div class="xxh-num100-item">';
      html += '<label class="xxh-num100-label">' + aloneLabel + '</label>';
      html += '<input type="number" class="xxh-input xxh-num100-a" min="0" max="100" placeholder="0">';
      html += '<span class="xxh-num100-unit">%</span>';
      html += '</div>';
      html += '<span class="xxh-num100-sep">/</span>';
      html += '<div class="xxh-num100-item">';
      html += '<label class="xxh-num100-label">' + togetherLabel + '</label>';
      html += '<input type="number" class="xxh-input xxh-num100-b" min="0" max="100" placeholder="0">';
      html += '<span class="xxh-num100-unit">%</span>';
      html += '</div>';
      html += '</div>';
    } else if (q.type === 'num_single') {
      var ph = t('inputPlaceholder.numSingle') || '0';
      html += '<input type="number" class="xxh-input xxh-input-num" min="0" placeholder="' + ph + '">';
    } else {
      var ph2 = t('inputPlaceholder.keyword') || '...';
      html += '<input type="text" class="xxh-input" maxlength="50" placeholder="' + ph2 + '">';
    }

    html += '<div class="xxh-error" id="xxh-err-' + qKey + '"></div>';
    html += '</div>';
    return html;
  }

  function bindProgressListeners() {
    var quiz = document.querySelector('.xxh-quiz');
    if (!quiz) return;
    quiz.addEventListener('change', updateProgress);
    quiz.addEventListener('input', updateProgress);
  }

  function updateProgress() {
    var questions = document.querySelectorAll('.xxh-question');
    var total = questions.length;
    var answered = 0;
    questions.forEach(function (qEl) {
      if (isQuestionAnswered(qEl)) answered++;
    });
    var bar = document.getElementById('xxh-progress');
    var text = document.getElementById('xxh-progress-text');
    if (bar) bar.style.width = (total > 0 ? (answered / total * 100) : 0) + '%';
    if (text) text.textContent = answered + '/' + total;
  }

  function isQuestionAnswered(qEl) {
    var type = qEl.dataset.type;
    if (type === 'fixed_2' || type === 'fixed_3') {
      return !!qEl.querySelector('input[type="radio"]:checked');
    } else if (type === 'num100') {
      var a = qEl.querySelector('.xxh-num100-a');
      var b = qEl.querySelector('.xxh-num100-b');
      return a && b && a.value !== '' && b.value !== '';
    } else if (type === 'num_single') {
      var inp = qEl.querySelector('.xxh-input-num');
      return inp && inp.value !== '';
    } else {
      var inp2 = qEl.querySelector('.xxh-input');
      return inp2 && inp2.value.trim() !== '';
    }
  }

  function renderTransition() {
    var overlay = document.getElementById('xxh-transition');
    if (!overlay) return;
    var lang = getLang();
    var i18n = (window.SITE_I18N && window.SITE_I18N[lang]) || {};
    var who = i18n.personB || 'B';
    var msg = (i18n.transitionMsg || 'Round 1 complete! Please hand the device to {who}.').replace('{who}', who);
    overlay.innerHTML =
      '<div class="xxh-transition-content">' +
        '<i class="fas fa-user-shield xxh-transition-icon"></i>' +
        '<p class="xxh-transition-msg">' + msg + '</p>' +
        '<button class="btn xxh-ready-btn" id="xxh-ready"><i class="fas fa-play"></i> <span data-i18n="readyBtn">' + (i18n.readyBtn || '') + '</span></button>' +
      '</div>';
    overlay.style.display = 'flex';
    document.getElementById('xxh-ready').addEventListener('click', onReady);
  }

  function renderResults(totalScore, dimScore, detailScore) {
    var app = document.getElementById('xxh-app');
    if (!app) return;
    var lang = getLang();
    var i18n = (window.SITE_I18N && window.SITE_I18N[lang]) || {};

    var circumference = 2 * Math.PI * 54;
    var offset = circumference - (totalScore / 100) * circumference;

    var html = '<section class="xxh-results">';

    html += '<div class="xxh-result-hero">';
    html += '<h2 data-i18n="resultTitle">' + (i18n.resultTitle || '') + '</h2>';
    html += '<div class="xxh-score-circle">';
    html += '<svg viewBox="0 0 120 120">';
    html += '<circle cx="60" cy="60" r="54" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="8"/>';
    html += '<circle class="xxh-score-ring" cx="60" cy="60" r="54" fill="none" stroke="var(--primary)" stroke-width="8" stroke-linecap="round" stroke-dasharray="' + circumference + '" stroke-dashoffset="' + circumference + '" transform="rotate(-90 60 60)" data-target="' + offset + '"/>';
    html += '</svg>';
    html += '<div class="xxh-score-text"><span class="xxh-score-num" data-target="' + totalScore + '">0</span><span class="xxh-score-max">/100</span></div>';
    html += '</div>';
    html += '</div>';

    html += '<div class="xxh-dim-scores">';
    var dimKeys = [
      { key: 'value', label: i18n.dimValue || 'Values', max: 40, i18nKey: 'dimValue' },
      { key: 'life', label: i18n.dimLife || 'Lifestyle', max: 40, i18nKey: 'dimLife' },
      { key: 'add', label: i18n.dimAdd || 'Additional', max: 20, i18nKey: 'dimAdd' }
    ];
    for (var i = 0; i < dimKeys.length; i++) {
      var dk = dimKeys[i];
      var score = dimScore[dk.key] || 0;
      var pct = Math.round(score / dk.max * 100);
      var fullLabel = dk.max === 40 ? (i18n.full40 || '') : (i18n.full20 || '');
      html += '<div class="xxh-dim-card">';
      html += '<div class="xxh-dim-header"><span class="xxh-dim-label" data-i18n="' + dk.i18nKey + '">' + dk.label + '</span><span class="xxh-dim-score">' + score + ' <small>' + fullLabel + '</small></span></div>';
      html += '<div class="xxh-dim-bar"><div class="xxh-dim-fill" style="width:0%" data-target="' + pct + '%"></div></div>';
      html += '</div>';
    }
    html += '</div>';

    html += '<div class="xxh-detail-section">';
    html += '<h3 data-i18n="detailTitle">' + (i18n.detailTitle || '') + '</h3>';
    html += '<div class="xxh-detail-grid">';
    var dims = ['value', 'life', 'add'];
    for (var d = 0; d < dims.length; d++) {
      var dim = dims[d];
      var mods = MODULE_GROUPS[dim];
      for (var m = 0; m < mods.length; m++) {
        var mod = mods[m];
        var dKey = dim + '_' + mod;
        var dScore = detailScore[dKey] || 0;
        var modLabel = t(MODULE_I18N_KEYS[mod]);
        var maxVal = dim === 'add' ? 10 : (dim === 'life' ? (mods.length === 3 ? (m === 2 ? 13.34 : 13.33) : 10) : 10);
        html += '<div class="xxh-detail-item">';
        html += '<span class="xxh-detail-label">' + modLabel + '</span>';
        html += '<span class="xxh-detail-score">' + dScore + '<small>/' + maxVal + '</small></span>';
        html += '</div>';
      }
    }
    html += '</div>';
    html += '</div>';

    var suggestions = getSuggestions(dimScore.value || 0, dimScore.life || 0, totalScore);
    if (suggestions.length) {
      html += '<div class="xxh-suggestions">';
      html += '<h3 data-i18n="suggestions.title">' + (i18n.suggestions && i18n.suggestions.title || '') + '</h3>';
      for (var s = 0; s < suggestions.length; s++) {
        var sug = suggestions[s];
        html += '<div class="xxh-suggestion-card">';
        html += '<div class="xxh-suggestion-header">' + sug.icon + ' ' + sug.title + '</div>';
        html += '<ul class="xxh-suggestion-tips">';
        for (var ti = 0; ti < sug.tips.length; ti++) {
          html += '<li>' + sug.tips[ti] + '</li>';
        }
        html += '</ul>';
        html += '</div>';
      }
      html += '</div>';
    }

    html += '<div class="xxh-retry-wrap">';
    html += '<button class="btn xxh-retry-btn" id="xxh-retry"><i class="fas fa-redo"></i> <span data-i18n="retryBtn">' + (i18n.retryBtn || '') + '</span></button>';
    html += '</div>';

    html += '</section>';

    app.innerHTML = html;
    document.getElementById('xxh-retry').addEventListener('click', onRetry);
    animateResults();
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  function animateResults() {
    setTimeout(function () {
      var ring = document.querySelector('.xxh-score-ring');
      if (ring) ring.style.strokeDashoffset = ring.dataset.target;

      var numEl = document.querySelector('.xxh-score-num');
      if (numEl) {
        var target = parseFloat(numEl.dataset.target) || 0;
        animateNumber(numEl, 0, target, 1200);
      }

      var fills = document.querySelectorAll('.xxh-dim-fill');
      fills.forEach(function (fill) {
        setTimeout(function () { fill.style.width = fill.dataset.target; }, 200);
      });
    }, 100);
  }

  function animateNumber(el, from, to, duration) {
    var start = performance.now();
    function tick(now) {
      var elapsed = now - start;
      var progress = Math.min(elapsed / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = from + (to - from) * eased;
      el.textContent = Math.round(current * 10) / 10;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  function collectAnswers() {
    var answers = {};
    var questions = document.querySelectorAll('.xxh-question');
    questions.forEach(function (qEl) {
      var key = qEl.dataset.key;
      var type = qEl.dataset.type;
      var ans = null;

      if (type === 'fixed_2' || type === 'fixed_3') {
        var checked = qEl.querySelector('input[type="radio"]:checked');
        ans = checked ? parseInt(checked.value) : null;
      } else if (type === 'num100') {
        var aInp = qEl.querySelector('.xxh-num100-a');
        var bInp = qEl.querySelector('.xxh-num100-b');
        if (aInp && bInp) {
          var a = parseInt(aInp.value);
          var b = parseInt(bInp.value);
          if (!isNaN(a) && !isNaN(b) && a >= 0 && b >= 0 && a + b === 100) {
            ans = [a, b];
          }
        }
      } else if (type === 'num_single') {
        var nInp = qEl.querySelector('.xxh-input-num');
        if (nInp) {
          var n = parseInt(nInp.value);
          if (!isNaN(n) && n >= 0) ans = n;
        }
      } else if (type === 'keyword' || type === 'activity_keyword') {
        var tInp = qEl.querySelector('.xxh-input');
        if (tInp) {
          var text = tInp.value.trim();
          if (text) ans = extractKeyword(text);
        }
      } else if (type === 'add_topic_keyword' || type === 'add_evaluate_keyword') {
        var tInp2 = qEl.querySelector('.xxh-input');
        if (tInp2) {
          var text2 = tInp2.value.trim();
          if (text2 && text2.length <= 50) ans = extractKeyword(text2);
        }
      }

      answers[key] = { type: type, ans: ans };
    });
    return answers;
  }

  function validateAnswers() {
    var valid = true;
    var questions = document.querySelectorAll('.xxh-question');
    var lang = getLang();
    var i18n = (window.SITE_I18N && window.SITE_I18N[lang]) || {};

    questions.forEach(function (qEl) {
      var key = qEl.dataset.key;
      var type = qEl.dataset.type;
      var errEl = document.getElementById('xxh-err-' + key);
      var isValid = true;
      var msg = i18n.validationRequired || 'Please answer this question';

      if (type === 'fixed_2' || type === 'fixed_3') {
        isValid = !!qEl.querySelector('input[type="radio"]:checked');
      } else if (type === 'num100') {
        var aInp = qEl.querySelector('.xxh-num100-a');
        var bInp = qEl.querySelector('.xxh-num100-b');
        if (aInp && bInp) {
          var a = parseInt(aInp.value);
          var b = parseInt(bInp.value);
          isValid = !isNaN(a) && !isNaN(b) && a >= 0 && b >= 0 && a + b === 100;
          if (!isValid && aInp.value !== '' && bInp.value !== '') {
            msg = i18n.validationNum100 || 'Two numbers must be non-negative and sum to 100';
          }
        } else {
          isValid = false;
        }
      } else if (type === 'num_single') {
        var nInp = qEl.querySelector('.xxh-input-num');
        if (nInp) {
          var n = parseInt(nInp.value);
          isValid = !isNaN(n) && n >= 0;
          if (!isValid && nInp.value !== '') {
            msg = i18n.validationNumSingle || 'Please enter a non-negative integer';
          }
        } else {
          isValid = false;
        }
      } else {
        var tInp = qEl.querySelector('.xxh-input');
        if (tInp) {
          var text = tInp.value.trim();
          isValid = text.length > 0 && text.length <= 50;
          if (text.length > 50) {
            msg = i18n.validationTextLen || 'Please enter a brief answer (max 50 characters)';
          }
        } else {
          isValid = false;
        }
      }

      if (!isValid) {
        valid = false;
        qEl.classList.add('xxh-invalid');
        if (errEl) errEl.textContent = msg;
      } else {
        qEl.classList.remove('xxh-invalid');
        if (errEl) errEl.textContent = '';
      }
    });

    if (!valid) {
      var firstInvalid = document.querySelector('.xxh-invalid');
      if (firstInvalid) firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    return valid;
  }

  function calculateTotalScore(round1, round2) {
    var topWeight = { value: 40, life: 40, add: 20 };

    var weightConfig = {};
    for (var prefix in topWeight) {
      var total = topWeight[prefix];
      var mods = MODULE_GROUPS[prefix];
      var modWeight = total / mods.length;
      for (var i = 0; i < mods.length; i++) {
        if (i === mods.length - 1) {
          weightConfig[prefix + '_' + mods[i]] = Math.round((total - modWeight * (mods.length - 1)) * 100) / 100;
        } else {
          weightConfig[prefix + '_' + mods[i]] = Math.round(modWeight * 100) / 100;
        }
      }
    }

    function calFixed(a1, a2) { return a1 === a2 ? 1 : 0; }
    function calKeyword(a1, a2) { return a1 === a2 ? 1 : 0; }
    function calNum100(a1, a2) {
      if (!Array.isArray(a1) || !Array.isArray(a2)) return 0;
      var d1 = Math.abs(a1[0] - a2[0]), d2 = Math.abs(a1[1] - a2[1]);
      var s1 = d1 <= 10 ? 1 : (100 - d1) / 100;
      var s2 = d2 <= 10 ? 1 : (100 - d2) / 100;
      return (s1 + s2) / 2;
    }
    function calNumSingle(a1, a2) {
      if (typeof a1 !== 'number' || typeof a2 !== 'number') return 0;
      var maxNum = Math.max(a1, a2, 1);
      var bias = Math.abs(a1 - a2) / maxNum;
      return Math.max(0, Math.trunc(1 - bias));
    }
    function calActivity(a1, a2) { return a1 === a2 ? 1 : 0; }
    function calAddKeyword(a1, a2) { return a1 === a2 ? 1 : 0; }

    var totalScore = 0;
    var detailScore = {};

    for (var module in weightConfig) {
      var weight = weightConfig[module];
      var m1 = {}, m2 = {};
      for (var k in round1) { if (k.startsWith(module)) m1[k] = round1[k]; }
      for (var k2 in round2) { if (k2.startsWith(module)) m2[k2] = round2[k2]; }

      if (!Object.keys(m1).length || !Object.keys(m2).length) {
        detailScore[module] = Math.round(weight * 10) / 10;
        totalScore += weight;
        continue;
      }

      var moduleSimilar = 0;
      var qCount = 0;
      for (var qk in m1) {
        if (!(qk in m2)) continue;
        qCount++;
        var tp = m1[qk].type, a1 = m1[qk].ans, a2 = m2[qk].ans;
        var s;
        if (tp === 'fixed_2' || tp === 'fixed_3') s = calFixed(a1, a2);
        else if (tp === 'keyword') s = calKeyword(a1, a2);
        else if (tp === 'num100') s = calNum100(a1, a2);
        else if (tp === 'num_single') s = calNumSingle(a1, a2);
        else if (tp === 'activity_keyword') s = calActivity(a1, a2);
        else if (tp === 'add_topic_keyword' || tp === 'add_evaluate_keyword') s = calAddKeyword(a1, a2);
        else s = 1;
        moduleSimilar += s;
      }

      if (qCount > 0) {
        var avgS = moduleSimilar / qCount;
        var moduleScore = Math.round(avgS * weight * 10) / 10;
        detailScore[module] = moduleScore;
        totalScore += moduleScore;
      } else {
        detailScore[module] = Math.round(weight * 10) / 10;
        totalScore += weight;
      }
    }

    var dimScore = {};
    dimScore.value = Math.round(Object.keys(detailScore).filter(function (k) { return k.startsWith('value'); }).reduce(function (sum, k) { return sum + detailScore[k]; }, 0) * 10) / 10;
    dimScore.life = Math.round(Object.keys(detailScore).filter(function (k) { return k.startsWith('life'); }).reduce(function (sum, k) { return sum + detailScore[k]; }, 0) * 10) / 10;
    dimScore.add = Math.round(Object.keys(detailScore).filter(function (k) { return k.startsWith('add'); }).reduce(function (sum, k) { return sum + detailScore[k]; }, 0) * 10) / 10;

    totalScore = Math.round(totalScore * 10) / 10;

    return { total: totalScore, dim: dimScore, detail: detailScore };
  }

  function getSuggestions(valueScore, lifeScore, totalScore) {
    var lang = getLang();
    var i18n = (window.SITE_I18N && window.SITE_I18N[lang]) || {};
    var sug = i18n.suggestions || {};
    var result = [];

    if (valueScore < 24 && sug.valueLow) {
      result.push({ icon: sug.valueLow.icon || '🔴', title: sug.valueLow.title, tips: sug.valueLow.tips || [] });
    }
    if (lifeScore < 24 && sug.lifeLow) {
      result.push({ icon: sug.lifeLow.icon || '🟠', title: sug.lifeLow.title, tips: sug.lifeLow.tips || [] });
    }
    if (totalScore < 65 && sug.totalLow) {
      result.push({ icon: sug.totalLow.icon || '🟡', title: sug.totalLow.title, tips: sug.totalLow.tips || [] });
    }
    if (totalScore >= 85 && sug.totalHigh) {
      result.push({ icon: sug.totalHigh.icon || '🟢', title: sug.totalHigh.title, tips: sug.totalHigh.tips || [] });
    }
    if (valueScore >= 24 && lifeScore >= 24 && totalScore >= 65 && totalScore < 85 && sug.good) {
      result.push({ icon: sug.good.icon || '✅', title: sug.good.title, tips: sug.good.tips || [] });
    }

    return result;
  }

  function onStart() {
    state.phase = 'round1';
    state.currentRound = 1;
    state.selected = selectAllQuestions();
    state.round1 = null;
    state.round2 = null;
    renderQuiz(1);
  }

  function onSubmit() {
    if (!validateAnswers()) return;

    var answers = collectAnswers();
    if (state.currentRound === 1) {
      state.round1 = answers;
      state.phase = 'transition';
      renderTransition();
    } else {
      state.round2 = answers;
      state.phase = 'results';
      var overlay = document.getElementById('xxh-transition');
      if (overlay) overlay.style.display = 'none';
      var result = calculateTotalScore(state.round1, state.round2);
      renderResults(result.total, result.dim, result.detail);
    }
  }

  function onReady() {
    var overlay = document.getElementById('xxh-transition');
    if (overlay) overlay.style.display = 'none';
    state.phase = 'round2';
    state.currentRound = 2;
    renderQuiz(2);
  }

  function onRetry() {
    state.phase = 'landing';
    state.selected = null;
    state.round1 = null;
    state.round2 = null;
    state.currentRound = 0;
    renderLanding();
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  function initXXH() {
    renderLanding();

    var app = document.getElementById('xxh-app');
    if (app) {
      app.addEventListener('change', function (e) {
        if (e.target.type === 'radio') {
          var qEl = e.target.closest('.xxh-question');
          if (qEl) {
            qEl.classList.remove('xxh-invalid');
            var errEl = document.getElementById('xxh-err-' + qEl.dataset.key);
            if (errEl) errEl.textContent = '';
          }
        }
      });
      app.addEventListener('input', function (e) {
        var target = e.target;
        if (target.classList.contains('xxh-input')) {
          var qEl = target.closest('.xxh-question');
          if (qEl) {
            qEl.classList.remove('xxh-invalid');
            var errEl = document.getElementById('xxh-err-' + qEl.dataset.key);
            if (errEl) errEl.textContent = '';
          }
        }
        if (target.classList.contains('xxh-num100-a') || target.classList.contains('xxh-num100-b')) {
          var qElNum = target.closest('.xxh-question');
          if (!qElNum) return;
          var isA = target.classList.contains('xxh-num100-a');
          var other = qElNum.querySelector(isA ? '.xxh-num100-b' : '.xxh-num100-a');
          var val = parseInt(target.value);
          if (isNaN(val) || val < 0) {
            target.value = '';
            showFieldError(qElNum, i18nRealtime('validationNonNegative') || 'Please enter a non-negative number');
            return;
          }
          if (val > 100) {
            target.value = 100;
            val = 100;
          }
          if (other) other.value = 100 - val;
          clearFieldError(qElNum);
        }
        if (target.classList.contains('xxh-input-num')) {
          var qElSingle = target.closest('.xxh-question');
          if (!qElSingle) return;
          var raw = target.value;
          if (raw !== '') {
            var num = parseFloat(raw);
            if (isNaN(num) || num < 0) {
              target.value = raw.replace(/[^0-9]/g, '');
              if (target.value === '') {
                showFieldError(qElSingle, i18nRealtime('validationNumSingle') || 'Please enter a non-negative integer');
              } else {
                clearFieldError(qElSingle);
              }
            } else if (num !== Math.floor(num)) {
              target.value = Math.floor(num).toString();
              clearFieldError(qElSingle);
            } else {
              clearFieldError(qElSingle);
            }
          } else {
            clearFieldError(qElSingle);
          }
        }
      });
    }

    function i18nRealtime(key) {
      var lang = getLang();
      var i18n = (window.SITE_I18N && window.SITE_I18N[lang]) || {};
      return key.split('.').reduce(function (o, k) { return o && o[k]; }, i18n) || '';
    }

    function showFieldError(qEl, msg) {
      if (!qEl) return;
      qEl.classList.add('xxh-invalid');
      var errEl = document.getElementById('xxh-err-' + qEl.dataset.key);
      if (errEl) errEl.textContent = msg;
    }

    function clearFieldError(qEl) {
      if (!qEl) return;
      qEl.classList.remove('xxh-invalid');
      var errEl = document.getElementById('xxh-err-' + qEl.dataset.key);
      if (errEl) errEl.textContent = '';
    }

    window.addEventListener('localechange', function () {
      if (state.phase === 'landing') {
        renderLanding();
      }
    });

    window.addEventListener('beforeunload', function (e) {
      if (state.phase === 'round1' || state.phase === 'round2') {
        e.preventDefault();
      }
    });

    window.addEventListener('xxh-refresh-check', function (e) {
      if (state.phase === 'round1' || state.phase === 'round2') {
        var lang = getLang();
        var i18n = (window.SITE_I18N && window.SITE_I18N[lang]) || {};
        var msg = i18n.confirmRefresh || 'Current answers will be lost. Are you sure you want to refresh?';
        if (!window.confirm(msg)) {
          e.detail && e.detail.cancel && e.detail.cancel();
        }
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initXXH);
  } else {
    initXXH();
  }
})();
