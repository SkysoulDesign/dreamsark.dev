<?php

namespace DreamsArk\Jobs;

use Symfony\Component\Finder\SplFileInfo;


class GetUniqueCharacters extends Job
{

    /**
     * @var array
     */
    public $words;

    /**
     * @var array
     */
    public $ignore;

    /**
     * @var string
     */
    public $inject;

    /**
     * @var int size of the document
     */
    public $docSize = 2048;

    /**
     * Create a new job instance.
     */
    public function __construct()
    {
        $this->words = [
            '中文翻译',
            '加载中',
            '奖励',
            '前往',
            '已完成',
            '每日任务',
            '邀请好友',
            '排行榜',
            '积分',
            '1st',
            '2st',
            '3rd',
            '4th',
            '5th',
            '6th',
            '7th',
            '8th',
            '9th',
            '10th',
            '总榜',
            '周榜',
            '日榜',
            '全球排名',
            '好友排名',
            'Fackbook',
            '靶心',
            '消灭X个怪物',
            '收集齐所有物品',
            '收集XX个 随机宝箱',
            '越过障碍物',
            '成功清除 XX个障碍物',
            '消灭他们！',
            '收藏家！',
            '收集XX个 随机宝箱',
            '跳高达人',
            '成功清除 XX个障碍物',
            '丛林之王',
            ' X星评价击败丛林之王的BOSS',
            '沙漠之恶',
            ' X星评价击败沙漠之恶的BOSS',
            '矿洞战争',
            ' X星评价击败矿洞战争的BOSS',
            '怪物猎人',
            '消灭 X 个猪',
            '我喜欢你的靴子',
            '消灭 X 个Ginos',
            '一起摇滚',
            '消灭 X 个摇滚',
            '完美赛跑',
            '在没有收到任何伤害的情况下完成比赛',
            '设置',
            '语言',
            '英语',
            '声音',
            '工作人员名单',
            '介绍',
            '点赞',
            '每日登录有礼',
            '第1-7天',
            '幸运奖励',
            '滚兄蛋弟的太阳镜',
            '体力商店',
            '视频广告',
            '网页广告',
            '访问社交APP奖励水晶',
            '体力不足，通过以下方式获得体力',
            '观看视频奖励水晶',
            '你的怪物已准备出发',
            '体力已满',
            '金币商店',
            '购买X 数量的金币',
            '一捧金币',
            '一袋金币',
            '一堆金币',
            '金币不足？来金币商店买些',
            '水晶商店',
            '水晶不足？来水晶商店买些',
            '一捧水晶',
            '一袋水晶',
            '一堆水晶',
            '购买中',
            '购买成功',
            '已购买',
            '购买失败',
            '购买更多',
            '解锁关卡',
            '需求星数',
            '购买',
            '锁定',
            '星星评级',
            '关卡1-9',
            '教程',
            '奖励关',
            '新手关',
            '解锁',
            '排行榜',
            '普通',
            '无尽关卡-云海',
            '无尽关卡-南方溪谷',
            '无尽关卡-赤色沙漠',
            '无尽关卡-失落的矿洞',
            '丛林之王',
            '沙漠之恶',
            '矿洞战争',
            '达成条件',
            '友情提示',
            '请在时间耗尽前完成比赛',
            '更多',
            '奖励',
            '推荐怪物',
            '剩余时间',
            '当前选择',
            '全面升级',
            '能力',
            '需要XX位好友',
            '立即升级',
            '升级',
            '下个等级',
            '选择以下方式为怪物升级',
            '怪物训练中，可选择立即完成',
            '攻击',
            '耐力',
            '生命',
            '主动技能',
            '被动技能',
            '升级中',
            '立即升级',
            '立即升级',
            '购买怪物',
            '邀请X位好友',
            '完成升级时间',
            '道具商店',
            '皮肤',
            '头部',
            '双手',
            '鞋子',
            '经典',
            '高级',
            '怪物',
            '   + XX 攻击力',
            '   + XX 生命值',
            '土耳其毡帽',
            '神秘的土耳其毡帽帽子有未知的起源。但是它看起来很酷!',
            '太阳镜',
            '这些太阳眼镜真的让你的怪物看起来更酷！',
            '海盗头盔',
            '来自远古的头盔，象征掠夺',
            '汤锅',
            '我想一定是谁从厨房里顺手拿了这个东西',
            '护目镜',
            '我想一定是谁从厨房里顺手拿了这个东西',
            '拳击手套',
            '强大的拳击手套，让你的敌人时刻保持警觉',
            '小飞鞋',
            '穿上后让你奔跑起来拥有光一样的速度',
            '安妮的外套',
            '滚兄蛋弟的外套',
            '兔美眉的外套',
            '波霸的外套',
            '雷吉的外套',
            '酷派蛋弟的外套',
            '巴嘎的外套',
            '鼻涕虫的外套',
            '团队接力',
            '当怪物生命值耗尽，你队伍中的第二只怪物将代替其继续比赛',
            '双倍金币',
            '完成比赛所获得的金币翻倍',
            '双倍经验',
            '完成比赛所获得的经验翻倍',
            '选择道具',
            '游戏开始!',
            '购买一个道具来获得优势',
            '跳过',
            '祝贺你',
            '获得',
            '发现宝箱',
            '开始',
            'X 连击',
            '完成',
            '失败',
            '太棒了!',
            '赞赞的!',
            '完美!',
            '漂亮!',
            '干的漂亮!',
            '霸气！',
            '完成!',
            '完成事件',
            '技能升级',
            '完成比赛',
            '完成挑战',
            '继续游戏',
            '重新开始',
            '返回菜单',
            '成就',
            '加速',
            '解锁技能 - XXX',
            '云海',
            '南方溪谷',
            '赤色沙漠',
            '失落的矿洞',
            '安妮',
            '滚兄蛋弟',
            '兔美眉',
            '波霸',
            '雷角号舰长雷吉',
            '酷派蛋弟',
            '巴嘎',
            '鼻涕虫',
            '作为一个新兴种族，安妮有着种族内不可思议的能力，她出生开始就一直被异世界来的宠物跟随，在这个种族的历史中，这样的宠物被称为式神。安妮的天真可爱受到各族的喜爱，在她的软磨硬泡下，才有了跑步比赛的资格。',
            '滚兄蛋弟是天空圣所臭名昭著的惹事生非者。',
            '滚兄是智囊，蛋弟是打手，他们狡猾与粗暴的名声响彻天空之城，大多数发掘者都不愿意和他们扯上关系，但是他们总是能受到雇佣，在赛跑比赛中以伤害参赛者使他们无法继续比赛来获得胜利。',
            '天空圣所的女神，出名飞毛腿，获得过两届年度赛跑的冠军。',
            '在挖掘者大赛开始举办后，凭借着靓丽的美貌与高超的奔跑技术成为了最受关注的跑者之一，她的座右铭是：我只是个跑步的，叔叔们我不约哟！',
            '波霸是一个婴儿元素怪物。它的魔术表演是深受天空圣所的各种族喜爱，它本以为可以愉快的过完一生，当它遇见雷吉舰长后，开始重新开始人生，而赛跑就是它改变人生中的第一步。',
            '最早发现闪光碎片并将闪光碎片发散至整个天空圣所的起源者，为了获得更多的利益，他将雷角号改装成大型综合商店，为各种参赛者出售跑步装备。',
            '雷角杂货店所提供的最著名的服务，莫过于风险极大的“雷角轮盘赌”。虽然只接受珍贵的闪光碎片作为筹码，但其提供的丰厚奖品仍诱惑着无数挖掘者排队将自己的劳动所得送上赌桌。',
            '陨石雨过后的，一群探险者在北谷入口处的一个树丛里发现了一个昏迷不醒的浑身硬梆梆的生物。他们将它运回镇里细心照料，这个神秘的家伙醒后失去了所有的记忆，连自己的名字叫什么都记不起来，只会一直酷派酷派的叫唤着，所以大家都叫他酷派。',
            '永曦镇中最奇怪的家伙，总喜欢拿头砸各种东西，久而久之，巴嘎发觉头上带着东西砸起来更加带感，正因为这种纯粹喜欢砸的性格，巴嘎走上了赛跑的舞台，很多赛跑者特别讨厌他，因为谁也不想在跑步中，被莫名其妙的一通乱砸。',
            '鼻涕虫的胆小是远近闻名的，起跑点周围的观众数量和发令枪的枪声足以吓得他不顾一切地疯狂向前蠕动。而且他越是感到害怕的时候，就越容易出“汗” ——汗液的粘度能直接将对方黏住且无法动弹 。',
            '作为一个新兴种族，安妮有着种族内不可思议的能力，她出生开始就一直被异世界来的宠物跟随，在这个种族的历史中，这样的宠物被称为式神。安妮的天真可爱受到各族的喜爱，在她的软磨硬泡下，才有了跑步比赛的资格。',
            '滚兄蛋弟是天空圣所臭名昭著的惹事生非者。',
            '滚兄是智囊，蛋弟是打手，他们狡猾与粗暴的名声响彻天空之城，大多数发掘者都不愿意和他们扯上关系，但是他们总是能受到雇佣，在赛跑比赛中以伤害参赛者使他们无法继续比赛来获得胜利。',
            '天空圣所的女神，出名飞毛腿，获得过两届年度赛跑的冠军。',
            '在挖掘者大赛开始举办后，凭借着靓丽的美貌与高超的奔跑技术成为了最受关注的跑者之一，她的座右铭是：我只是个跑步的，叔叔们我不约哟！',
            '波霸是一个婴儿元素怪物。它的魔术表演是深受天空圣所的各种族喜爱，它本以为可以愉快的过完一生，当它遇见雷吉舰长后，开始重新开始人生，而赛跑就是它改变人生中的第一步。',
            '最早发现闪光碎片并将闪光碎片发散至整个天空圣所的起源者，为了获得更多的利益，他将雷角号改装成大型综合商店，为各种参赛者出售跑步装备。',
            '雷角杂货店所提供的最著名的服务，莫过于风险极大的“雷角轮盘赌”。虽然只接受珍贵的闪光碎片作为筹码，但其提供的丰厚奖品仍诱惑着无数挖掘者排队将自己的劳动所得送上赌桌。',
            '陨石雨过后的，一群探险者在北谷入口处的一个树丛里发现了一个昏迷不醒的浑身硬梆梆的生物。他们将它运回镇里细心照料，这个神秘的家伙醒后失去了所有的记忆，连自己的名字叫什么都记不起来，只会一直酷派酷派的叫唤着，所以大家都叫他酷派。',
            '永曦镇中最奇怪的家伙，总喜欢拿头砸各种东西，久而久之，巴嘎发觉头上带着东西砸起来更加带感，正因为这种纯粹喜欢砸的性格，巴嘎走上了赛跑的舞台，很多赛跑者特别讨厌他，因为谁也不想在跑步中，被莫名其妙的一通乱砸。',
            '鼻涕虫的胆小是远近闻名的，起跑点周围的观众数量和发令枪的枪声足以吓得他不顾一切地疯狂向前蠕动。而且他越是感到害怕的时候，就越容易出“汗” ——汗液的粘度能直接将对方黏住且无法动弹 。',
            '闪电风暴',
            '海啸',
            '巨人之怒',
            '剑刃风暴',
            '熔岩爆裂',
            '狂暴之怒',
            '磁力风暴',
            '金手指',
            '安妮可以自动越过面前的障碍物，每X秒触发一次',
            '自动攻击相邻的敌人、障碍物，每X秒触发一次',
            '变换赛道提升 XX% ,冲刺速度提升XX%',
            '每X秒获得X个金币',
            '主动技能时间延长XX%',
            '能量恢复加速XX%',
            '鼻涕虫喜欢气球，打破气球可以获得XX金币',
            '被击中时，有XX%免疫任何的伤害',
            '击败敌人有XX %机会给你一个额外的硬币。',
            '闪电风暴环绕在安妮周围覆盖所有5条跑道',
            '释放两股波浪',
            '变身成为巨人，覆盖所有5条跑道',
            '释放大范围的剑刃风暴',
            '熔岩保留覆盖所有5条跑道，结束时造成更大伤害',
            '雷角在释放狂暴之怒时，可以影响2条跑道的敌人',
            '大范围吸引金币并直接获取',
            '鼻涕虫知道如何正确打开礼包，打开礼包将获得双倍道具',
            '金币',
            '水晶',
            '确认',
            '取消',
            '等级1-15',
            '开始游戏',
            '好友',
            '设置',
            '开始游戏',
            '每日任务',
            '成就',
            '挑战',
            '怪物',
            '升级',
            '普通',
            '计时',
            '困难',
            '技能',
            '装备',
            '在比赛开始',
            '松开',
            '加速',
            '触摸',
            '向左移动',
            '向左滑动',
            '向右移动',
            '向右滑动',
            '攻击',
            '小心!!',
            '欢迎体验怪物来了',
            '点击第一个事件来了解如何游戏',
            '恭喜你学会了基础的移动，请继续保持，先点击事件',
            '每关比赛开始前，都会有一个准备阶段',
            '前几集的教程会帮助你了解游戏的基础操作',
            '哦~~不，安妮的体力不足，让我们召唤新的怪物',
            '团队需要新的伙伴加入',
            '好了，让我们进入战斗引导，请选择战斗教程',
            '来，让我们了解怪物的主动技能，首先是闪电风暴',
            '现在你的怪物更强大了，让他们疾驰起来',
            '这是你可以招募新的怪物，升级怪物和购买装备的地方。',
            '向左滑动选择滚兄蛋弟',
            '怪物在这个里！请点击“免费”购买的标志。',
            '太棒了!现在我们有了新伙伴滚兄蛋弟!',
            '点击退出按钮，准备好开始新的比赛!',
            '太棒了!现在我们有了新伙伴滚兄蛋弟!',
            '点击退出按钮，准备好开始新的比赛!',
            '当你解锁了一个新的技能，你可以对怪物技能进行升级',
            '请帮你的怪物升级技能闪电风暴',
            '好棒，你获得了足够的经验进行升级',
            '点击怪物信息后，点击升级按钮进行升级',
            '好酷',
            '这是怪物管理界面',
            '让我们一起获得你的第一个怪物',
            '进入怪物管理，招募新的怪物',
            '关卡难度过高时，请尝试通过之前关卡进行升级',
            '尝试解锁或选择一个新的技能。',
            '当缺少金币时，可以使用水晶来换取金币',
            '提升你的攻击力，可以对你的敌人造成更多伤害。',
            '增加怪物的生命值，让他能承担更多的伤害。',
            '当前关卡可能太难，为什么不尝试你之前的关卡进行升级呐?',
            '请在时间耗尽前完成比赛',
            '获得本关的三星评价才能解锁计时模式',
            '更强大的敌人，更高的伤害和更快的速度。你能打败它吗？',
            '获得计时模式的三星评价才能解锁困难模式',
            '你没有选定需要的怪物',
            '完成上一关卡才能解锁'
        ];
        $this->ignore = ["，", ",", " ", "", '“', '”', '。', '？', '：', '！', '、', '—'];
        $this->inject = 'abcdefghijklmnopqrstuvwxyz()?!#$%/@=:;-.1234567890';

    }

    /**
     * Execute the job.
     */
    public function handle()
    {

        /**
         * Create Initial Canvas
         */
        $canvas = imagecreate($this->docSize, $this->docSize);
        $black = imagecolorallocate($canvas, 0, 0, 0);
        imagecolortransparent($canvas, $black);

        ini_set('default_charset', 'UTF-8');

        /** @var SplFileInfo[] $files */
        $files = \File::allFiles(base_path('MR'));

        $sprites = [];

        foreach ($files as $file) {

            list($id) = explode('.', $file->getFilename());
            list($width, $height) = getimagesize($file->getRealPath());

            $sprite = new \stdClass();
            $sprite->id = $id;
            $sprite->width = $width;
            $sprite->height = $height;
            $sprite->path = $file->getRealPath();

            array_set($sprites, $id, $sprite);

        }

        /**
         * Sort array numeric order
         */
        ksort($sprites);

        /**
         * Word List
         */
        $uniques = [];
        $injected = $this->split($this->inject);

        foreach ($this->words as $index => $word) {

            foreach ($this->split($word) as $char) {
                $char = trim(strtolower($char));
                if (!in_array($char, $uniques) && !in_array($char, $this->ignore) && !in_array($char, $injected))
                    $uniques[] = $char;
            }

        }

        /**
         * Push Injected Values
         */
        foreach ($injected as $item) {
            array_push($uniques, $item);
        }

        /**
         * Sort Alphabetical
         */
        sort($uniques, SORT_NATURAL);

        /**
         * Add All Characters to the Sprites Object
         */
        array_map(function ($sprite, $character) {

            $sprite->character = $character;
            $sprite->decimal = $this->getDecimal($character);

            return $sprite;

        }, $sprites, $uniques);

        /**
         * Generate X and Y
         * Generate Char
         */
        $y = 0;
        $x = 0;
        $numberOfRows = 0;
        $maxHeight = 0;
        $heightArray = [];

        foreach ($sprites as $sprite) {

            $maxHeight = $sprite->height > $maxHeight ? $sprite->height : $maxHeight;

            if ($sprite->id != 0) {

                $previous = $sprites[$sprite->id - 1];

                $x = $previous->width + $previous->x;

                if ($x + $sprite->width > $this->docSize) {
                    $x = 0;
                    $numberOfRows++;
                    array_push($heightArray, $maxHeight);
                }

                if ($numberOfRows > 0) {
                    $y = array_sum($heightArray);
                }

            }

            $sprite->x = $x;
            $sprite->y = $y;

            $sprite->char = "\nchar id=$sprite->decimal x=$sprite->x y=$sprite->y width=$sprite->width height=$sprite->height xoffset=0 yoffset=0 xadvance=$sprite->width page=0 chnl=0";

        }

        $count = count($sprites);
        $header = "info face='sprite.png' size=$this->docSize bold=0 italic=0 charset='' unicode=1 stretchH=100 smooth=1 aa=1 padding=0,0,0,0 spacing=1,1 outline=0 common lineHeight=32 base=25 scaleW=$this->docSize scaleH=$this->docSize pages=1 packed=0 alphaChnl=1 redChnl=0 greenChnl=0 blueChnl=0 \npage id=0 file='sprite.png' \nchars count=$count";
        $rows = [$header];

        foreach ($sprites as $sprite) {

            $image = imagecreatefrompng($sprite->path);

            imagecopy($canvas, $image, $sprite->x, $sprite->y, 0, 0, $sprite->width, $sprite->height);

            /**
             * Free Memory
             */
            imagedestroy($image);

            array_push($rows, $sprite->char);

        }

        /**
         * Save To Disk
         */
        imagepng($canvas, base_path('mrTest/sprite.png'));

        dd('hi');

//        dd($sprites);
//
//        $rows = [];
//        $width = 60;
//        $height = 60;
//        $offsetX = 0;
//        $offsetY = -15;
//        $documentSizeX = 2048;
//        $documentSizeY = 2048;
//
//        $xPosition = 0;
//        $yPosition = -1;
//
//        $marginX = 0;
//        $marginY = 0;
//
//        $numberOfColumns = (int)($documentSizeX / $width);
//        $numberOfPages = (int)round(count($uniques) / ($numberOfColumns * $numberOfColumns));
//
//        $count = count($uniques);
//
//
//        array_push($rows, $header);
//
//        $final = collect($uniques)->flatMap(function ($value, $id) {
//            return ["array-" . $id . "" => $value];
//        })->toArray();
//
//        ksort($final);
//
//        $column = 0;
//        $lines = 0;
//        $pages = -1;
//
//        foreach ($final as $index => $unique) {
//
//            $hex = mb_encode_numericentity($unique, array(0x0, 0xffff, 0, 0xffff), 'UTF-8', true);
//            $dec = hexdec($hex);
//
//            if ($column % $numberOfColumns == 0) {
//                $xPosition = 0;
//                $yPosition++;
//                $lines++;
//            } else
//                $xPosition++;
//
//            if ($column % ($numberOfColumns * $numberOfColumns) == 0) {
//                $pages++;
//            }
//
//            $column++;
//
//            $x = $xPosition * $width + $marginX;
//            $y = $yPosition * $width + $marginY;
//            $rows[] = "\nchar id=$dec x=$x y=$y width=$width height=$height xoffset=$offsetX yoffset=$offsetY xadvance=$width page=$pages chnl=0";
//
//        }

//        dd($rows);

//        echo ;
//dd('');
        $headers = [
            'Content-type'        => 'text/plain; charset=UTF-8',
            'Content-Disposition' => sprintf('attachment; filename="%s"', 'keywords.txt'),
            'Content-Length'      => sizeof(implode('', $uniques))
        ];

//        $keywords = ['id,word'];
//        foreach ($final as $index => $value) {
//            $keywords[] = str_replace("array-", "", $index) . ",$value";
//        }

//        dd($rows);
//
//        return response()->make(implode('', $uniques), 200, $headers);
//        return response()->make(implode("\n", $keywords), 200, $headers);

        return response()->make(implode(" ", $rows), 200, $headers);

    }

    /**
     * Split the string to characters
     *
     * @param $string
     * @return mixed
     */
    public function split($string)
    {
        return preg_split('/(?<!^)(?!$)/u', $string);
    }

    /**
     * Get The Decimal of a Number
     *
     * @param $char
     * @return number
     */
    public function getDecimal($char)
    {
        return hexdec(mb_encode_numericentity($char, array(0x0, 0xffff, 0, 0xffff), 'UTF-8', true));
    }

}