import random
import sys
import time


# ============================================================
# 注意：本文件仅为原始参考版本，线上版本以 static/js/xxh.js 为准。
# 两者的验证规则和评分逻辑已统一，如需修改请同步更新两处。
# ============================================================


# 一、定义三大核心类问题池（价值观40%+生活方式40%+附加测试20%）
# 第一类：价值观维度（40%）- 原四大模块，3选2/固定1题
value_question_pool = {
    "底层价值观": [
        {"q": "请对“事业，家庭，自我成长”进行排序（直接输入排序结果，如：家庭>事业>自我成长）", "type": "keyword"},
        {"q": "是否想要孩子（请回答“是”或“否”）", "type": "fixed_2", "options": ["是", "否"]},
        {"q": "对未来定居城市的规划（请简要回答，如南方小城市等）", "type": "keyword"}
    ],
    "金钱观": [
        {"q": "请选择你的消费理念（节俭/适度享受/超前享受，三选一直接输入）", "type": "fixed_3", "options": ["节俭", "适度享受", "超前享受"]},
        {"q": "对储蓄与投资的态度（支持/不支持，二选一直接输入）", "type": "fixed_2", "options": ["支持", "不支持"]},
        {"q": "请选择金钱的支配权方式（AA/共同账户/一方管理，三选一直接输入）", "type": "fixed_3", "options": ["AA", "共同账户", "一方管理"]}
    ],
    "人际边界感": [
        {"q": "请描述你与原生家庭的关系（请简要回答，如十分和睦等）", "type": "keyword"},
        {"q": "是否介意对方有异性好友（请回答“是”或“否”）", "type": "fixed_2", "options": ["是", "否"]},
        {"q": "请输入你独处与陪伴的需求比例（两个和为100的数字，用空格分隔，如：40 60）", "type": "num100"}
    ],
    "冲突处理方式": [
        {"q": "遇到矛盾时，你会选择“逃避冷战”“指责抱怨”还是“就事论事解决问题”（三选一直接输入）", "type": "fixed_3", "options": ["逃避冷战", "指责抱怨", "就事论事解决问题"]}
    ]
}

# 第二类：生活方式维度（40%）- 原三大模块，按规则提问
life_question_pool = {
    "作息与生活习惯": [
        {"q": "你的作息类型（早睡早起/熬夜党/任意固定作息，三选一直接输入）", "type": "fixed_3", "options": ["早睡早起", "熬夜党", "任意固定作息"]},
        {"q": "你的生活整洁度（爱干净/较随性，二选一直接输入）", "type": "fixed_2", "options": ["爱干净", "较随性"]},
        {"q": "你的饮食口味偏好（请简要回答，如喜欢甜食等）", "type": "keyword"}
    ],
    "兴趣爱好和社交模式": [
        {"q": "你的休闲倾向（宅家/外出，二选一直接输入）", "type": "fixed_2", "options": ["宅家", "外出"]},
        {"q": "【社交-1】社交平台好友数量（请输入数字）", "type": "num_single"},
        {"q": "【社交-2】常用社交平台数量（请输入数字）", "type": "num_single"},
        {"q": "【社交-3】经常见面的朋友数量（请输入数字）", "type": "num_single"},
        {"q": "【社交-4】常参与的活动（请简要回答，如参见体育运动等）", "type": "activity_keyword"}
    ],
    "情绪模式": [
        {"q": "面对挫折压力的情绪处理方式（自我消化/寻求朋友安慰，二选一直接输入）", "type": "fixed_2", "options": ["自我消化", "寻求朋友安慰"]}
    ]
}

# 第三类：附加测试维度（20%）- 新增，含2个问题，纯文本输入+关键词提取
add_question_pool = {
    "社会议题评价": [
        {"q": "【社会议题评价1】对彩礼的看法（请简要回答，提取关键词如：适当等）", "type": "add_topic_keyword"},
        {"q": "【社会议题评价2】对职场内卷的看法（请简要回答，提取关键词如：抵制内卷等）", "type": "add_topic_keyword"},
        {"q": "【社会议题评价3】对赡养老人的看法（请简要回答，提取关键词如：必须赡养等）", "type": "add_topic_keyword"}
    ],
    "相互评价": [
        {"q": "【相互评价】对对方的简短评价（可从性格，样貌，品行等角度回答）", "type": "add_evaluate_keyword"}
    ]
}

# 全局关键字匹配库（）
KEYWORD_MATCH = {
    # 【价值观维度】
    "南方": ["南方", "江南", "华南", "华东"],
    "北方": ["北方", "华北", "东北", "西北"],
    "城市": ["城市", "都市", "市区","北京","老家"],
    "乡村": ["乡村", "农村", "乡下", "田园"],
    "和睦": ["和睦", "融洽", "亲密", "和谐"],
    "矛盾": ["矛盾", "紧张", "疏远", "不和"],
    "事业": ["事业"], "家庭": ["家庭"], "自我成长": ["自我成长"],
    # 【生活方式维度-饮食】
    "辣": ["辣", "麻辣", "香辣", "川湘"],
    "甜": ["甜", "甜品", "甜口", "江浙"],
    "淡": ["淡", "清淡", "鲜", "粤菜"],
    "咸": ["咸", "重盐", "鲁菜"],
    # 【生活方式维度-活动】
    "体育运动": ["体育运动", "篮球", "跑步", "健身", "羽毛球", "足球","乒乓球","排球","游泳","泰拳"],
    "文艺娱乐": ["文艺娱乐", "看电影", "追剧", "听歌", "阅读", "书法"],
    "手工创作": ["手工创作", "手作", "DIY", "陶艺", "折纸"],
    "学术研究": ["学术研究", "学术讨论", "科研", "论文", "学习"],
    "cosplay": ["cosplay", "漫展", "二次元", "cos"],
    "聚餐探店": ["聚餐探店", "吃饭", "探店", "美食", "聚餐"],
    "户外游玩": ["户外游玩", "爬山", "露营", "徒步", "旅行"],
    # 【附加测试维度-社会议题】（彩礼/内卷/赡养）
    "支持": ["支持", "赞同", "认可", "应该"],
    "反对": ["反对", "抵制", "拒绝", "没必要"],
    "中立": ["中立", "随缘", "无所谓", "不表态"],
    "量力": ["量力", "适度", "看情况", "根据条件"],
    "无奈": ["无奈", "被迫", "没办法", "身不由己"],
    "必须": ["必须", "义务", "责任", "理所当然"],
    "共同": ["共同", "一起", "全家", "共同承担"],
    # 【附加测试维度-相互评价】（性格/样貌/品行等）
    "温柔": ["温柔", "温和", "体贴", "暖心"],
    "开朗": ["开朗", "活泼", "外向", "阳光"],
    "沉稳": ["沉稳", "稳重", "内敛", "成熟"],
    "真诚": ["真诚", "诚恳", "实在", "坦率"],
    "帅气": ["帅气", "好看", "颜值高", "养眼"],
    "漂亮": ["漂亮", "美丽", "好看", "颜值高"],
    "善良": ["善良", "心软", "有爱心", "体贴"]
}

# 二、基础工具函数
def clear_screen():
    """跨平台清屏（Windows/macOS/Linux），保证两轮输入互不可见"""
    print('\n' * 100)
    sys.stdout.flush()
    time.sleep(0.1)


def extract_keyword(ans):
    """通用关键字提取函数（匹配KEYWORD_MATCH，无匹配返回原回答，适配所有关键词题型）"""
    ans = ans.strip()
    for core_key, match_list in KEYWORD_MATCH.items():
        for word in match_list:
            if word in ans:
                return core_key
    return ans

def check_fixed_input(ans, options):

    ans = ans.strip()
    if ans in options:
        return ans
    print(f"输入错误！请从{options}中选择一个输入！")
    return None

def check_num100_input(ans):

    try:
        num1, num2 = map(int, ans.strip().split())
        if num1 + num2 == 100 and num1 >= 0 and num2 >= 0:
            return num1, num2
        else:
            print("输入错误！两个数字必须为非负数且和为100，请重新输入！")
            return None
    except:
        print("输入错误！请输入两个用空格分隔的整数，如：40 60！")
        return None

def check_num_single_input(ans):

    try:
        num = int(ans.strip())
        if num >= 0:
            return num
        else:
            print("输入错误！请输入非负整数！")
            return None
    except:
        print("输入错误！请输入有效数字！")
        return None

def check_text_input(ans):

    ans = ans.strip()
    if ans and len(ans) <= 50:  # 限制长度，避免无意义输入
        return ans
    print("输入错误！请输入非空的简短评价（不超过50字）！")
    return None

# 三、感情增进建议输出函数
def print_relationship_suggestions(value_score, life_score, total_score):
    """
    根据分数输出对应的感情增进建议
    :param value_score: 价值观维度得分（满分40）
    :param life_score: 生活方式维度得分（满分40）
    :param total_score: 最终总契合度得分（满分100）
    """
    print("\n" + "="*80)
    print(" 专属感情增进建议（根据本次测试得分）")
    print("="*80)
    # 1. 价值观维度<24分：积极沟通机制
    if value_score < 24:
        print("🔴  价值观维度得分<24分，建议建立「积极沟通」机制：")
        print("   ▶ 「赞美具体化」原则：不要说 “你真好”，而是说 “你今天主动帮我收拾了书桌，我觉得特别温暖”。")
        print("      心理学研究表明，具体的赞美比空泛的夸奖更能让对方感受到被认可，从而激发更多正向行为。")
        print("   ▶ 「非暴力沟通」四步法：遇到矛盾时，按 “陈述事实→表达感受→说出需求→提出请求” 的逻辑沟通。")
        print("      比如：“你昨天没回我消息（事实），我有点担心（感受），我希望你忙的时候能告诉我一声（需求），下次可以吗（请求）”，而非 “你为什么总是不回我消息！”。")
        print("   ▶ 「深度聊天」时间：每周留 1 次 “无手机干扰” 的聊天时间，聊的不是 “今天吃什么”，而是 “最近的烦恼”“未来的小计划”“童年的回忆”，这种走心的交流能强化情感联结。")
        print("-"*70)
    # 2. 生活方式维度<24分：创造共同体验
    if life_score < 24:
        print("🟠  生活方式维度得分<24分，建议创造「共同体验」，积累正向回忆：")
        print("   ▶ 「新鲜感注入」：定期一起尝试新事物（比如学一项新技能、去一个没去过的地方、做一道新菜）。")
        print("      神经科学研究发现，共同经历新奇的事会促进大脑分泌多巴胺，让双方对彼此的好感度提升。")
        print("   ▶ 「合作式任务」：一起完成一个小目标（比如养一盆植物、拼一幅拼图、制定一次旅行计划），合作的过程会增强彼此的信任感和默契度。")
        print("   ▶ 「仪式感」的重要性：不用追求昂贵的礼物，比如记住对方的小喜好、纪念日一起做一顿饭、睡前说一句 “今天也很喜欢你”，稳定的小仪式能带来安全感。")
        print("-"*70)
    # 3. 总契合度<65分：尊重差异性，允许不完美
    if total_score < 65:
        print("🟡  得分<65分，你们需要尊重「差异性」，允许「不完美」：")
        print("   ▶ 「求同存异」：不必强迫对方和自己一样，比如你喜欢看书，对方喜欢打球，你可以陪他看一次球赛，他可以陪你逛一次书店，尊重差异反而能让关系更有弹性。")
        print("   ▶ 「接纳对方的不完美」：没有人是完美的，不要揪着对方的小缺点不放，而是关注他 / 她的优点，同时接受 “他 / 她就是这样一个人”。")
        print("   ▶ 「自我成长」是最好的促进：一段好的关系是 “两个人都在变好”，不要把所有精力放在对方身上，保持自己的兴趣和成长，反而会让对方更欣赏你。")
        print("-"*70)
    # 4. 总契合度≥85分：警惕伪契合信号
    if total_score >= 85:
        print("🟢  超高分（≥85分），温馨提示：「伪契合」信号要警惕：")
        print("   ▶ 初期「过度迎合」：对方一开始完全迁就你的喜好，没有自己的想法，这种契合往往是 “伪装” 的，长期会暴露矛盾。")
        print("   ▶ 只谈「开心的事」，回避「严肃的事」：如果对方一直回避聊未来、金钱、家庭等核心话题，可能是不想和你长期发展。")
        print("   ▶ 情感「单向输出」：只有你在主动付出、主动沟通，对方很少回应，这种关系无法形成正向循环。")
        print("-"*70)
    # 无未达标且未超高分：基础祝福
    if value_score >=24 and life_score >=24 and 65<=total_score<85:
        print("✅  各维度得分均衡，契合度良好！愿你们珍惜彼此，携手同行，让感情在理解与陪伴中稳步升温～")
    print("="*80)

# 四、答题核心函数（三轮维度+两轮互不可见+全程隐私保护
def get_answers(selected_qs, round_name):
    """
    获取单轮答题答案（适配三大维度）
    :param selected_qs: 抽好的问题集（价值观+生活方式+附加测试）
    :param round_name: 本轮名称（如“第一轮测试：第一个人”）
    :return: 本轮所有答案字典
    """
    clear_screen()
    print(f" 【{round_name}】答题隐私保护中，输入内容仅内存存储，完成后自动清屏")
    input("请按下回车键开始答题...")
    clear_screen()

    round_ans = {}
    # 第一类问题：价值观维度（前置提示+原规则答题）
    print("===== 价值观维度（占最终评分40%） =====")
    # 价值观-底层价值观（2题）
    for i, q_info in enumerate(selected_qs["value_底层价值观"], 1):
        q_key = f"value_底层价值观_{i}"
        round_ans[q_key] = {"q": q_info["q"], "type": q_info["type"], "ans": None}
        while round_ans[q_key]["ans"] is None:
            ans = input(f"{q_info['q']}：")
            if q_info["type"] == "fixed_2":
                round_ans[q_key]["ans"] = check_fixed_input(ans, q_info["options"])
            elif q_info["type"] == "keyword":
                round_ans[q_key]["ans"] = extract_keyword(ans)
            else:
                round_ans[q_key]["ans"] = ans.strip()
    # 价值观-金钱观（2题）
    for i, q_info in enumerate(selected_qs["value_金钱观"], 1):
        q_key = f"value_金钱观_{i}"
        round_ans[q_key] = {"q": q_info["q"], "type": q_info["type"], "ans": None}
        while round_ans[q_key]["ans"] is None:
            ans = input(f"{q_info['q']}：")
            if q_info["type"] in ["fixed_2", "fixed_3"]:
                round_ans[q_key]["ans"] = check_fixed_input(ans, q_info["options"])
            else:
                round_ans[q_key]["ans"] = ans.strip()
    # 价值观-人际边界感（2题）
    for i, q_info in enumerate(selected_qs["value_人际边界感"], 1):
        q_key = f"value_人际边界感_{i}"
        round_ans[q_key] = {"q": q_info["q"], "type": q_info["type"], "ans": None}
        while round_ans[q_key]["ans"] is None:
            ans = input(f"{q_info['q']}：")
            if q_info["type"] == "fixed_2":
                round_ans[q_key]["ans"] = check_fixed_input(ans, q_info["options"])
            elif q_info["type"] == "keyword":
                round_ans[q_key]["ans"] = extract_keyword(ans)
            elif q_info["type"] == "num100":
                round_ans[q_key]["ans"] = check_num100_input(ans)
            else:
                round_ans[q_key]["ans"] = ans.strip()
    # 价值观-冲突处理方式（1题）
    c_q = selected_qs["value_冲突处理方式"][0]
    q_key = "value_冲突处理方式"
    round_ans[q_key] = {"q": c_q["q"], "type": c_q["type"], "ans": None}
    while round_ans[q_key]["ans"] is None:
        ans = input(f"{c_q['q']}：")
        round_ans[q_key]["ans"] = check_fixed_input(ans, c_q["options"])

    # 第二类问题：生活方式维度（前置提示+原规则答题）
    print("\n===== 生活方式维度（占最终评分40%） =====")
    # 生活方式-作息与生活习惯（2题，随机）
    for i, q_info in enumerate(selected_qs["life_作息与生活习惯"], 1):
        q_key = f"life_作息与生活习惯_{i}"
        round_ans[q_key] = {"q": q_info["q"], "type": q_info["type"], "ans": None}
        while round_ans[q_key]["ans"] is None:
            ans = input(f"{q_info['q']}：")
            if q_info["type"] in ["fixed_2", "fixed_3"]:
                round_ans[q_key]["ans"] = check_fixed_input(ans, q_info["options"])
            elif q_info["type"] == "keyword":
                round_ans[q_key]["ans"] = extract_keyword(ans)
            else:
                round_ans[q_key]["ans"] = ans.strip()
    # 生活方式-兴趣爱好和社交模式（固定5题）
    for i, q_info in enumerate(selected_qs["life_兴趣爱好和社交模式"], 1):
        q_key = f"life_兴趣爱好和社交模式_{i}"
        round_ans[q_key] = {"q": q_info["q"], "type": q_info["type"], "ans": None}
        while round_ans[q_key]["ans"] is None:
            ans = input(f"{q_info['q']}：")
            if q_info["type"] == "fixed_2":
                round_ans[q_key]["ans"] = check_fixed_input(ans, q_info["options"])
            elif q_info["type"] == "num_single":
                round_ans[q_key]["ans"] = check_num_single_input(ans)
            elif q_info["type"] == "activity_keyword":
                round_ans[q_key]["ans"] = extract_keyword(ans)
            else:
                round_ans[q_key]["ans"] = ans.strip()
    # 生活方式-情绪模式（1题，固定）
    e_q = selected_qs["life_情绪模式"][0]
    q_key = "life_情绪模式"
    round_ans[q_key] = {"q": e_q["q"], "type": e_q["type"], "ans": None}
    while round_ans[q_key]["ans"] is None:
        ans = input(f"{e_q['q']}：")
        round_ans[q_key]["ans"] = check_fixed_input(ans, e_q["options"])

    # 第三类问题：附加测试维度（新增+前置提示，占20%）
    print("\n===== 附加测试维度（占最终评分20%） =====")
    # 附加测试-社会议题评价（固定3题：彩礼/内卷/赡养，纯文本+关键词提取）
    for i, q_info in enumerate(selected_qs["add_社会议题评价"], 1):
        q_key = f"add_社会议题评价_{i}"
        round_ans[q_key] = {"q": q_info["q"], "type": q_info["type"], "ans": None}
        while round_ans[q_key]["ans"] is None:
            ans = input(f"{q_info['q']}：")
            round_ans[q_key]["ans"] = extract_keyword(check_text_input(ans))  # 先校验非空，再提词
    # 附加测试-相互评价（固定1题，纯文本+关键词提取）
    a_q = selected_qs["add_相互评价"][0]
    q_key = "add_相互评价"
    round_ans[q_key] = {"q": a_q["q"], "type": a_q["type"], "ans": None}
    while round_ans[q_key]["ans"] is None:
        ans = input(f"{a_q['q']}：")
        round_ans[q_key]["ans"] = extract_keyword(check_text_input(ans))  # 先校验非空，再提词

    # 本轮答题完成，物理隔离提示+清屏（核心隐私保护）
    print("\n" + "="*60 + f" {round_name} 答题完成 " + "="*60)
    input("⚠️  请按下回车键并离开答题区域，下一位答题人准备就绪后再按回车键继续...")
    clear_screen()
    return round_ans

# 五、抽题函数（一次性抽好两轮共用的所有问题，避免题不匹配
def select_all_questions():
    """严格按需求抽题：价值观/生活方式按原规则，附加测试固定全题"""
    selected = {}
    # 价值观维度（40%）：3选2/固定1题
    selected["value_底层价值观"] = random.sample(value_question_pool["底层价值观"], 2)
    selected["value_金钱观"] = random.sample(value_question_pool["金钱观"], 2)
    selected["value_人际边界感"] = random.sample(value_question_pool["人际边界感"], 2)
    selected["value_冲突处理方式"] = value_question_pool["冲突处理方式"]
    # 生活方式维度（40%）：作息3选2，其余固定全题
    selected["life_作息与生活习惯"] = random.sample(life_question_pool["作息与生活习惯"], 2)
    selected["life_兴趣爱好和社交模式"] = life_question_pool["兴趣爱好和社交模式"]
    selected["life_情绪模式"] = life_question_pool["情绪模式"]
    # 附加测试维度（20%）：固定全题（3个社会议题+1个相互评价）
    selected["add_社会议题评价"] = add_question_pool["社会议题评价"]
    selected["add_相互评价"] = add_question_pool["相互评价"]
    return selected

#  六、评分核心函数三大维度4:4:2权重+汇总最终分
def calculate_total_score(round1, round2):

    # 核心权重：价值观维度40分 + 生活方式维度40分 + 附加测试维度20分

    # 1. 核心权重配置（三大维度+子模块，自动均分，可直接调整顶层权重）
    top_weight = {
        "value": 40,  # 价值观维度总分40
        "life": 40,   # 生活方式维度总分40
        "add": 20     # 附加测试维度总分20
    }
    # 各维度下的子模块列表（用于均分维度总分）
    modules = {
        "value": ["底层价值观", "金钱观", "人际边界感", "冲突处理方式"],
        "life": ["作息与生活习惯", "兴趣爱好和社交模式", "情绪模式"],
        "add": ["社会议题评价", "相互评价"]
    }
    # 生成子模块精准权重（按数量均分，保留2位小数，避免总分偏差）
    weight_config = {}
    for prefix, total in top_weight.items():
        sub_mods = modules[prefix]
        mod_weight = total / len(sub_mods)
        # 最后一个模块补全差值，确保维度内总分精准等于顶层权重
        for i, mod in enumerate(sub_mods):
            if i == len(sub_mods) - 1:
                current_weight = round(total - mod_weight * (len(sub_mods)-1), 2)
            else:
                current_weight = round(mod_weight, 2)
            weight_config[f"{prefix}_{mod}"] = current_weight

    total_score = 0
    detail_score = {}  # 存储所有子模块详细得分
    dim_score = {}     # 存储三大维度汇总得分

    # 2. 全题型差异化评分函数（保留原逻辑+适配附加测试关键词题）
    def cal_fixed(ans1, ans2):

        return 1 if ans1 == ans2 else 0

    def cal_keyword(ans1, ans2):

        return 1 if ans1 == ans2 else 0

    def cal_num100(ans1, ans2):

        if not (isinstance(ans1, tuple) and isinstance(ans2, tuple)):
            return 0
        d1, d2 = abs(ans1[0]-ans2[0]), abs(ans1[1]-ans2[1])
        s1 = 1 if d1 <=10 else (100-d1)/100
        s2 = 1 if d2 <=10 else (100-d2)/100
        return (s1 + s2) / 2

    def cal_num_single(ans1, ans2):

        if not (isinstance(ans1, int) and isinstance(ans2, int)):
            return 0
        max_num = max(ans1, ans2, 1)
        bias = abs(ans1 - ans2) / max_num
        return max(0, int(1 - bias))

    def cal_activity(ans1, ans2):

        return 1 if ans1 == ans2 else 0

    def cal_add_keyword(ans1, ans2):

        return 1 if ans1 == ans2 else 0

    # 3. 通用评分逻辑：遍历所有子模块计算得分
    for module, weight in weight_config.items():
        # 提取两轮该模块的所有问题
        m1 = {k: v for k, v in round1.items() if k.startswith(module)}
        m2 = {k: v for k, v in round2.items() if k.startswith(module)}
        if not m1 or not m2:
            detail_score[module] = round(weight, 1)
            total_score += weight
            continue
        # 逐题计算相似度（0~1）
        module_similar = 0
        for qk in m1.keys():
            if qk not in m2:
                continue
            t, a1, a2 = m1[qk]["type"], m1[qk]["ans"], m2[qk]["ans"]
            # 按题型匹配对应评分函数
            if t in ["fixed_2", "fixed_3"]:
                s = cal_fixed(a1, a2)
            elif t == "keyword":
                s = cal_keyword(a1, a2)
            elif t == "num100":
                s = cal_num100(a1, a2)
            elif t == "num_single":
                s = cal_num_single(a1, a2)
            elif t == "activity_keyword":
                s = cal_activity(a1, a2)
            elif t in ["add_topic_keyword", "add_evaluate_keyword"]:
                s = cal_add_keyword(a1, a2)
            else:
                s = 1  # 兜底，避免漏评
            module_similar += s
        # 计算模块最终得分（平均相似度 × 模块权重）
        avg_s = module_similar / len(m1)
        module_score = round(avg_s * weight, 1)
        detail_score[module] = module_score
        total_score += module_score

    # 4. 汇总三大维度的最终得分（便于展示和建议判定）
    dim_score["价值观维度"] = round(sum([v for k, v in detail_score.items() if k.startswith("value")]), 1)
    dim_score["生活方式维度"] = round(sum([v for k, v in detail_score.items() if k.startswith("life")]), 1)
    dim_score["附加测试维度"] = round(sum([v for k, v in detail_score.items() if k.startswith("add")]), 1)
    # 最终总分保留1位小数，避免浮点误差
    total_score = round(total_score, 1)
    return total_score, dim_score, detail_score

# ===================== 七、主程序入口（全程隐私保护+三大维度测试+结果展示+建议输出） =====================
def main():
    # 初始引导+规则说明
    print("❤️  情感契合度测试")
    print("💡  核心规则：")
    print("   1. 两轮答题全程互不可见，答案仅内存存储，无文件写入；")
    print("   2. 三大维度权重：价值观40% + 生活方式40% + 附加测试20%，满分100分；")
    input("\n请按下回车键开始测试...")
    clear_screen()

    # 1. 一次性抽好所有问题两轮共用。
    selected_questions = select_all_questions()

    # 2. 两轮答题
    round1_ans = get_answers(selected_questions, "第一轮测试：第一个人")
    round2_ans = get_answers(selected_questions, "第二轮测试：第二个人")

    # 3. 计算三大维度得分+最终总相似度
    total_s, dim_s, detail_s = calculate_total_score(round1_ans, round2_ans)

    # 4. 清屏后展示最终结果（清晰直观，分维度展示）
    clear_screen()
    print("="*70)
    print(f"🎉  情感契合度最终相似度分数：{total_s} 分（满分100分）")
    print("="*70)
    print(f"📊  三大核心维度得分（按权重分配）：")
    for dim, s in dim_s.items():
        weight = "40分" if "价值观" in dim or "生活方式" in dim else "20分"
        print(f"   {dim}：{s} 分（满分{weight}）")
    print("="*70)

    # 5. 展示各子模块详细得分（精准定位差异点）
    print(f"🔍  各子模块详细得分（可查看具体契合/差异点）：")
    # 分维度展示子模块，更清晰
    print("   —— 价值观维度（子模块总分40分）——")
    for k, v in detail_s.items():
        if k.startswith("value"):
            print(f"   {k.replace('value_', '')}：{v} 分")
    print("   —— 生活方式维度（子模块总分40分）——")
    for k, v in detail_s.items():
        if k.startswith("life"):
            print(f"   {k.replace('life_', '')}：{v} 分")
    print("   —— 附加测试维度（子模块总分20分）——")
    for k, v in detail_s.items():
        if k.startswith("add"):
            print(f"   {k.replace('add_', '')}：{v} 分")
    print("="*70)

    # 6. 新增：根据分数输出专属感情增进建议
    print_relationship_suggestions(
        value_score=dim_s["价值观维度"],
        life_score=dim_s["生活方式维度"],
        total_score=total_s
    )

if __name__ == "__main__":
    main()
