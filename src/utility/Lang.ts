
namespace TinyWars.Utility {
    import ErrCode = Network.NetErrorCode;

    export namespace Lang {
        export const enum Language {
            Chinese,
            English,
        }
        export const enum BigType {
            B00, // 各种提示
            B01, // 常用短语
        }
        export const enum SubType {
            S00, S01, S02, S03, S04, S05, S06, S07, S08, S09,
            S10, S11, S12, S13, S14, S15, S16, S17, S18, S19,
            S20, S21, S22, S23, S24, S25, S26, S27, S28, S29,
            S30, S31, S32, S33, S34, S35, S36, S37, S38, S39,
        }
        export const enum FormatType {
            F000, F001, F002, F003, F004, F005,
        }
        export const enum RichType {
            R000, R001, R002, R003,
        }

        const LANG_DATA = new Map<BigType, Map<SubType, string[]>>([
            [BigType.B00, new Map([
                [SubType.S00, [
                    "登陆成功，祝您游戏愉快！",
                    "Logged in successfully!",
                ]],
                [SubType.S01, [
                    "账号不符合要求，请检查后重试",
                    "Invalid account.",
                ]],
                [SubType.S02, [
                    "昵称不符合要求，请检查后重试",
                    "Invalid nickname.",
                ]],
                [SubType.S03, [
                    "密码不符合要求，请检查后重试",
                    "Invalid password.",
                ]],
                [SubType.S04, [
                    "注册成功，正在自动登陆…",
                    "Register successfully! Now logging in...",
                ]],
                [SubType.S05, [
                    "您已成功退出登陆，欢迎再次进入游戏。",
                    "Logout successfully.",
                ]],
                [SubType.S06, [
                    "您的账号被异地登陆，您已自动下线。",
                    "Someone logged in with your account!",
                ]],
                [SubType.S07, [
                    "已成功连接服务器。",
                    "Connected to server successfully.",
                ]],
                [SubType.S08, [
                    "连接服务器失败，正在重新连接…",
                    "Failed to connect to server. Now reconnecting...",
                ]],
                [SubType.S09, [
                    "您的网络连接不稳定，请尝试改善",
                    "The network connection is not stable.",
                ]],
                [SubType.S10, [
                    "没有符合条件的地图，请更换条件再试",
                    "No maps found.",
                ]],
                [SubType.S11, [
                    "正在查找地图",
                    "Searching for maps...",
                ]],
                [SubType.S12, [
                    "已找到符合条件的地图",
                    "Maps found.",
                ]],
                [SubType.S13, [
                    "发生网络错误，请重新登陆。",
                    "Network went wrong. Please re-login.",
                ]],
                [SubType.S14, [
                    "发生网络错误，请稍后再试。",
                    "Network went wrong. Please try again later.",
                ]],
                [SubType.S15, [
                    "已成功创建战局，请等待其他玩家加入",
                    "The war is created successfully.",
                ]],
                [SubType.S16, [
                    "已成功退出房间",
                    "Quit successfully.",
                ]],
                [SubType.S17, [
                    "密码不正确，请检查后重试",
                    "Invalid password.",
                ]],
                [SubType.S18, [
                    "已成功加入房间。战局尚未开始，请继续耐心等候他人加入。",
                    "Joined successfully.",
                ]],
                [SubType.S19, [
                    "已成功加入房间。战局正式开始，请从“继续战斗”入口进入。",
                    "Joined successfully.",
                ]],
                [SubType.S20, [
                    `服务器维护中，请稍后登陆`,
                    `The server is under maintainance. Please wait and login later.`,
                ]],
                [SubType.S21, [
                    `正在读取战局数据，请稍候`,
                    `Downloading the war data. Please wait.`,
                ]],
                [SubType.S22, [
                    `恭喜您获得本局的胜利！\n即将回到大厅…`,
                    `Congratulations!`,
                ]],
                [SubType.S23, [
                    `很遗憾您已战败，请再接再厉！\n即将回到大厅…`,
                    `Good luck next war!`,
                ]],
            ])],
            [BigType.B01, new Map([
                [SubType.S00, [
                    "创建房间",
                    "Create Game",
                ]],
                [SubType.S01, [
                    "无",
                    "None",
                ]],
                [SubType.S02, [
                    "基本设置",
                    "Basic Settings",
                ]],
                [SubType.S03, [
                    "高级设置",
                    "Advanced Settings",
                ]],
                [SubType.S04, [
                    "红方",
                    "red",
                ]],
                [SubType.S05, [
                    "蓝方",
                    "blue",
                ]],
                [SubType.S06, [
                    "黄方",
                    "yellow",
                ]],
                [SubType.S07, [
                    "黑方",
                    "black",
                ]],
                [SubType.S08, [
                    "A队",
                    "A Team",
                ]],
                [SubType.S09, [
                    "B队",
                    "B Team",
                ]],
                [SubType.S10, [
                    "C队",
                    "C Team",
                ]],
                [SubType.S11, [
                    "D队",
                    "D Team",
                ]],
                [SubType.S12, [
                    "是",
                    "Yes",
                ]],
                [SubType.S13, [
                    "否",
                    "No",
                ]],
                [SubType.S14, [
                    "天",
                    "d",
                ]],
                [SubType.S15, [
                    "时",
                    "h",
                ]],
                [SubType.S16, [
                    "分",
                    "m",
                ]],
                [SubType.S17, [
                    "秒",
                    "s",
                ]],
                [SubType.S18, [
                    "行动次序",
                    "Force",
                ]],
                [SubType.S19, [
                    "队伍",
                    "Team",
                ]],
                [SubType.S20, [
                    "战争迷雾",
                    "Fog",
                ]],
                [SubType.S21, [
                    "回合显示",
                    "Time Limit",
                ]],
                [SubType.S22, [
                    "退出房间",
                    "Exit Game"
                ]],
                [SubType.S23, [
                    "加入房间",
                    "Join Game"
                ]],
                [SubType.S24, [
                    "继续战斗",
                    "Continue",
                ]],
                [SubType.S25, [
                    `连接已断开`,
                    `Disconnected`,
                ]],
                [SubType.S26, [
                    `确定`,
                    `Confirm`,
                ]],
                [SubType.S27, [
                    `倒计时`,
                    `Countdown`,
                ]],
                [SubType.S28, [
                    `即将超时`,
                    `Timeout soon`,
                ]],
                [SubType.S29, [
                    `读取中`,
                    `Now loading`,
                ]],
                [SubType.S30, [
                    `中立`,
                    `Neutral`,
                ]],
                [SubType.S31, [
                    `玩家`,
                    `Player`,
                ]],
                [SubType.S32, [
                    `金钱`,
                    `Fund`,
                ]],
                [SubType.S33, [
                    `能量`,
                    `Energy`,
                ]],
                [SubType.S34, [
                    `胜利`,
                    `Win`,
                ]],
                [SubType.S35, [
                    `失败`,
                    `Defeat`,
                ]],
            ])],
        ]);

        const FORMAT_DATA = new Map<FormatType, string[]>([
            [FormatType.F000, [
                "地图名称: %s",
                "Map name: %s",
            ]],
            [FormatType.F001, [
                "作者: %s",
                "Designer: %s",
            ]],
            [FormatType.F002, [
                "人数: %s",
                "Players: %s",
            ]],
            [FormatType.F003, [
                "全服评分: %s",
                "Rating: %s",
            ]],
            [FormatType.F004, [
                "全服游玩次数: %s",
                "Games played: %s",
            ]],
            [FormatType.F005, [
                "战争迷雾: %s",
                "Fog: %s",
            ]],
        ]);

        const NET_ERROR_TEXT = new Map<ErrCode, string[]>([
            [ErrCode.IllegalRequest, [
                "非法请求",
                "Illegal request.",
            ]],
            [ErrCode.Login_InvalidAccountOrPassword, [
                "账号或密码不正确，请检查后重试",
                "Invalid account and/or password.",
            ]],
            [ErrCode.Login_AlreadyLoggedIn, [
                "您已处于登陆状态，不可再次登陆",
                "You have logged in already.",
            ]],
            [ErrCode.Register_InvalidAccount, [
                "账号不符合要求，请检查后重试",
                "Invalid account.",
            ]],
            [ErrCode.Register_UsedAccount, [
                "该账号已被注册，请修改后再试",
                "The account has been registered.",
            ]],
            [ErrCode.Register_AlreadyLoggedIn, [
                "您已处于登陆状态，不可注册账号",
                "You have logged in already.",
            ]],
            [ErrCode.Register_InvalidPassword, [
                "密码不符合要求，请检查后重试",
                "Invalid password.",
            ]],
            [ErrCode.Register_InvalidNickname, [
                "昵称不符合要求，请检查后重试",
                "Invalid nickname.",
            ]],
            [ErrCode.Register_UsedNickname, [
                "该昵称已被使用，请修改后再试",
                "The nickname has been used.",
            ]],
            [ErrCode.CreateMultiCustomWar_TooManyJoinedWars, [
                "您已参与了许多未开始的战局，请退出部分后重试",
                "You have joined too many wars.",
            ]],
            [ErrCode.CreateMultiCustomWar_InvalidParams, [
                "部分设定不符合规则，请检查后重试",
                "Invalid settings.",
            ]],
            [ErrCode.ExitMultiCustomWar_WarInfoNotExist, [
                "战局不存在",
                "The game doesn't exist.",
            ]],
            [ErrCode.ExitMultiCustomWar_NotJoined, [
                "您并未参加该战局",
                "You haven't joined the game.",
            ]],
            [ErrCode.JoinMultiCustomWar_TooManyJoinedWars, [
                "您已参与了许多未开始的战局，请退出部分后重试",
                "You have joined too many wars.",
            ]],
            [ErrCode.JoinMultiCustomWar_InvalidParams, [
                "部分设定不符合规则，请检查后重试",
                "Invalid settings.",
            ]],
            [ErrCode.JoinMultiCustomWar_WarInfoNotExist, [
                "房间不存在",
                "The game doesn't exist.",
            ]],
            [ErrCode.JoinMultiCustomWar_AlreadyJoined, [
                "您已加入了该房间。",
                "You have already joined the game.",
            ]],
            [ErrCode.ServerDisconnect_ServerMaintainance, [
                `服务器维护中`,
                `The server is under maintainance.`,
            ]],
            [ErrCode.McrContinueWar_NoSuchWar, [
                `战局不存在`,
                `The game doesn't exist.`,
            ]],
            [ErrCode.McrContinueWar_DefeatedOrNotJoined, [
                `您未参与该战局，或已经被击败`,
                `You have not joined the game, or you have been defeated.`,
            ]],
        ]);

        const RICH_DATA = new Map<RichType, string[]>([
            [RichType.R000, [
                [
                    `本选项影响您在回合中的行动顺序。`,
                    ``,
                    `本游戏固定了每回合中的行动顺序为：`,
                    `1 红方`,
                    `2 蓝方`,
                    `3 黄方`,
                    `4 黑方`,
                    `其中，2人局不存在黄方和黑方，3人局不存在黑方。`,
                    `每个玩家只能选择其中一项，不能重复。`,
                    ``,
                    `默认为当前可用选项中最靠前的一项。`,
                ].join("\n"),

                `Untranslated...`,
            ]],

            [RichType.R001, [
                [
                    `本选项规定您所属的队伍。`,
                    ``,
                    `战局中，属于同一队伍的玩家共享视野，部队能够相互穿越，不能相互攻击/装载/用后勤车补给。`,
                    `此外，可以使用队友的建筑来维修/补给自己的部队（消耗自己的金钱），但不能占领队友的建筑。`,
                    ``,
                    `默认为当前未被其他玩家选用的队伍中最靠前的一项。`,
                ].join("\n"),

                `Untranslated...`,
            ]],

            [RichType.R002, [
                [
                    `本选项影响战局是明战或雾战。`,
                    ``,
                    `明战下，您可以观察到整个战场的情况。雾战下，您只能看到自己军队的视野内的战场情况。`,
                    `雾战难度相对较大。如果您是新手，建议先通过明战熟悉游戏系统，再尝试雾战模式。`,
                    ``,
                    `默认为“否”（即明战）。`,
                ].join("\n"),

                `Untranslated...`,
            ]],

            [RichType.R003, [
                [
                    `本选项影响所有玩家的每回合的时限。`,
                    ``,
                    `如果某个玩家的回合时间超出了本限制，则服务器将自动为该玩家执行投降操作。`,
                    `当战局满员，或某个玩家结束回合后，则服务器自动开始下个玩家回合的倒计时（无论该玩家是否在线）。`,
                    `因此，请仅在已约好对手的情况下才选择“15分”，以免造成不必要的败绩。`,
                    ``,
                    `默认为“3天”。`,
                ].join("\n"),

                `Untranslated`,
            ]],
        ]);

        let language = Language.Chinese;

        export function getText(bigType: BigType, subType: SubType): string {
            return LANG_DATA.get(bigType).get(subType)[language];
        }

        export function getFormatedText(formatType: FormatType, ...params: any[]): string {
            return Helpers.formatString(FORMAT_DATA.get(formatType)[language], ...params);
        }

        export function getNetErrorText(code: ErrCode): string {
            return NET_ERROR_TEXT.get(code)[language];
        }

        export function getRichText(richType: RichType): string {
            return RICH_DATA.get(richType)[language];
        }
    }
}
