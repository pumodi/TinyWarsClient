
namespace TinyWars.Utility.Lang {
    import ErrorCode    = Network.NetErrorCode;
    import LanguageType = Types.LanguageType;

    export const enum Type {
        A0000, A0001, A0002, A0003, A0004, A0005, A0006, A0007, A0008, A0009,
        A0010, A0011, A0012, A0013, A0014, A0015, A0016, A0017, A0018, A0019,
        A0020, A0021, A0022, A0023, A0024, A0025, A0026, A0027, A0028, A0029,
        A0030, A0031, A0032, A0033, A0034, A0035, A0036, A0037, A0038, A0039,
        A0040, A0041, A0042, A0043, A0044, A0045, A0046, A0047, A0048, A0049,
        A0050, A0051, A0052, A0053, A0054, A0055, A0056, A0057, A0058, A0059,
        A0060, A0061, A0062, A0063, A0064, A0065, A0066, A0067, A0068, A0069,
        A0070, A0071, A0072, A0073, A0074, A0075, A0076, A0077, A0078, A0079,
        A0080, A0081, A0082, A0083, A0084, A0085, A0086, A0087, A0088, A0089,
        A0090, A0091, A0092, A0093, A0094, A0095, A0096, A0097, A0098, A0099,

        A0100, A0101, A0102, A0103, A0104, A0105, A0106, A0107, A0108, A0109,
        A0110, A0111, A0112, A0113, A0114, A0115, A0116, A0117, A0118, A0119,
        A0120, A0121, A0122, A0123, A0124, A0125, A0126, A0127, A0128, A0129,
        A0130, A0131, A0132, A0133, A0134, A0135, A0136, A0137, A0138, A0139,
        A0140, A0141, A0142, A0143, A0144, A0145, A0146, A0147, A0148, A0149,
        A0150, A0151, A0152, A0153, A0154, A0155, A0156, A0157, A0158, A0159,
        A0160, A0161, A0162, A0163, A0164, A0165, A0166, A0167, A0168, A0169,
        A0170, A0171, A0172, A0173, A0174, A0175, A0176, A0177, A0178, A0179,
        A0180, A0181, A0182, A0183, A0184, A0185, A0186, A0187, A0188, A0189,
        A0190, A0191, A0192, A0193, A0194, A0195, A0196, A0197, A0198, A0199,

        B0000, B0001, B0002, B0003, B0004, B0005, B0006, B0007, B0008, B0009,
        B0010, B0011, B0012, B0013, B0014, B0015, B0016, B0017, B0018, B0019,
        B0020, B0021, B0022, B0023, B0024, B0025, B0026, B0027, B0028, B0029,
        B0030, B0031, B0032, B0033, B0034, B0035, B0036, B0037, B0038, B0039,
        B0040, B0041, B0042, B0043, B0044, B0045, B0046, B0047, B0048, B0049,
        B0050, B0051, B0052, B0053, B0054, B0055, B0056, B0057, B0058, B0059,
        B0060, B0061, B0062, B0063, B0064, B0065, B0066, B0067, B0068, B0069,
        B0070, B0071, B0072, B0073, B0074, B0075, B0076, B0077, B0078, B0079,
        B0080, B0081, B0082, B0083, B0084, B0085, B0086, B0087, B0088, B0089,
        B0090, B0091, B0092, B0093, B0094, B0095, B0096, B0097, B0098, B0099,

        B0100, B0101, B0102, B0103, B0104, B0105, B0106, B0107, B0108, B0109,
        B0110, B0111, B0112, B0113, B0114, B0115, B0116, B0117, B0118, B0119,
        B0120, B0121, B0122, B0123, B0124, B0125, B0126, B0127, B0128, B0129,
        B0130, B0131, B0132, B0133, B0134, B0135, B0136, B0137, B0138, B0139,
        B0140, B0141, B0142, B0143, B0144, B0145, B0146, B0147, B0148, B0149,
        B0150, B0151, B0152, B0153, B0154, B0155, B0156, B0157, B0158, B0159,
        B0160, B0161, B0162, B0163, B0164, B0165, B0166, B0167, B0168, B0169,
        B0170, B0171, B0172, B0173, B0174, B0175, B0176, B0177, B0178, B0179,
        B0180, B0181, B0182, B0183, B0184, B0185, B0186, B0187, B0188, B0189,
        B0190, B0191, B0192, B0193, B0194, B0195, B0196, B0197, B0198, B0199,

        B0200, B0201, B0202, B0203, B0204, B0205, B0206, B0207, B0208, B0209,
        B0210, B0211, B0212, B0213, B0214, B0215, B0216, B0217, B0218, B0219,
        B0220, B0221, B0222, B0223, B0224, B0225, B0226, B0227, B0228, B0229,
        B0230, B0231, B0232, B0233, B0234, B0235, B0236, B0237, B0238, B0239,
        B0240, B0241, B0242, B0243, B0244, B0245, B0246, B0247, B0248, B0249,
        B0250, B0251, B0252, B0253, B0254, B0255, B0256, B0257, B0258, B0259,
        B0260, B0261, B0262, B0263, B0264, B0265, B0266, B0267, B0268, B0269,
        B0270, B0271, B0272, B0273, B0274, B0275, B0276, B0277, B0278, B0279,
        B0280, B0281, B0282, B0283, B0284, B0285, B0286, B0287, B0288, B0289,
        B0290, B0291, B0292, B0293, B0294, B0295, B0296, B0297, B0298, B0299,

        B0300, B0301, B0302, B0303, B0304, B0305, B0306, B0307, B0308, B0309,
        B0310, B0311, B0312, B0313, B0314, B0315, B0316, B0317, B0318, B0319,
        B0320, B0321, B0322, B0323, B0324, B0325, B0326, B0327, B0328, B0329,
        B0330, B0331, B0332, B0333, B0334, B0335, B0336, B0337, B0338, B0339,
        B0340, B0341, B0342, B0343, B0344, B0345, B0346, B0347, B0348, B0349,
        B0350, B0351, B0352, B0353, B0354, B0355, B0356, B0357, B0358, B0359,
        B0360, B0361, B0362, B0363, B0364, B0365, B0366, B0367, B0368, B0369,
        B0370, B0371, B0372, B0373, B0374, B0375, B0376, B0377, B0378, B0379,
        B0380, B0381, B0382, B0383, B0384, B0385, B0386, B0387, B0388, B0389,
        B0390, B0391, B0392, B0393, B0394, B0395, B0396, B0397, B0398, B0399,

        B0400, B0401, B0402, B0403, B0404, B0405, B0406, B0407, B0408, B0409,
        B0410, B0411, B0412, B0413, B0414, B0415, B0416, B0417, B0418, B0419,
        B0420, B0421, B0422, B0423, B0424, B0425, B0426, B0427, B0428, B0429,
        B0430, B0431, B0432, B0433, B0434, B0435, B0436, B0437, B0438, B0439,
        B0440, B0441, B0442, B0443, B0444, B0445, B0446, B0447, B0448, B0449,
        B0450, B0451, B0452, B0453, B0454, B0455, B0456, B0457, B0458, B0459,
        B0460, B0461, B0462, B0463, B0464, B0465, B0466, B0467, B0468, B0469,
        B0470, B0471, B0472, B0473, B0474, B0475, B0476, B0477, B0478, B0479,
        B0480, B0481, B0482, B0483, B0484, B0485, B0486, B0487, B0488, B0489,
        B0490, B0491, B0492, B0493, B0494, B0495, B0496, B0497, B0498, B0499,

        B1000, B1001, B1002, B1003, B1004, B1005, B1006, B1007, B1008, B1009,
        B1010, B1011, B1012, B1013, B1014, B1015, B1016, B1017, B1018, B1019,
        B1020, B1021, B1022, B1023, B1024, B1025, B1026, B1027, B1028, B1029,
        B1030, B1031, B1032, B1033, B1034, B1035, B1036, B1037, B1038, B1039,
        B1200, B1201, B1202, B1203, B1204, B1205, B1206, B1207, B1208, B1209,
        B1210, B1211, B1212, B1213, B1214, B1215, B1216, B1217, B1218, B1219,
        B1220, B1221, B1222, B1223, B1224, B1225, B1226, B1227, B1228, B1229,
        B1230, B1231, B1232, B1233, B1234, B1235, B1236, B1237, B1238, B1239,

        F0000, F0001, F0002, F0003, F0004, F0005, F0006, F0007, F0008, F0009,
        F0010, F0011, F0012, F0013, F0014, F0015, F0016, F0017, F0018, F0019,
        F0020, F0021, F0022, F0023, F0024, F0025, F0026, F0027, F0028, F0029,
        F0030, F0031, F0032, F0033, F0034, F0035, F0036, F0037, F0038, F0039,
        F0040, F0041, F0042, F0043, F0044, F0045, F0046, F0047, F0048, F0049,
        F0050, F0051, F0052, F0053, F0054, F0055, F0056, F0057, F0058, F0059,
        F0060, F0061, F0062, F0063, F0064, F0065, F0066, F0067, F0068, F0069,
        F0070, F0071, F0072, F0073, F0074, F0075, F0076, F0077, F0078, F0079,
        F0080, F0081, F0082, F0083, F0084, F0085, F0086, F0087, F0088, F0089,
        F0090, F0091, F0092, F0093, F0094, F0095, F0096, F0097, F0098, F0099,
    }
    export const enum RichType {
        R0000, R0001, R0002, R0003, R0004, R0005, R0006, R0007, R0008, R0009,
    }

    const _LANG_DATA = {
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        // Long strings.
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        [Type.A0000]: [
            "登陆成功，祝您游戏愉快！",
            "Logged in successfully!",
        ],
        [Type.A0001]: [
            "账号不符合要求，请检查后重试",
            "Invalid account.",
        ],
        [Type.A0002]: [
            "昵称不符合要求，请检查后重试",
            "Invalid nickname.",
        ],
        [Type.A0003]: [
            "密码不符合要求，请检查后重试",
            "Invalid password.",
        ],
        [Type.A0004]: [
            "注册成功，正在自动登陆…",
            "Register successfully! Now logging in...",
        ],
        [Type.A0005]: [
            "您已成功退出登陆，欢迎再次进入游戏。",
            "Logout successfully.",
        ],
        [Type.A0006]: [
            "您的账号被异地登陆，您已自动下线。",
            "Someone logged in with your account!",
        ],
        [Type.A0007]: [
            "已成功连接服务器。",
            "Connected to server successfully.",
        ],
        [Type.A0008]: [
            "连接服务器失败，正在重新连接…",
            "Failed to connect to server. Now reconnecting...",
        ],
        [Type.A0009]: [
            "您的网络连接不稳定，请尝试改善",
            "The network connection is not stable.",
        ],
        [Type.A0010]: [
            "没有符合条件的地图，请更换条件再试",
            "No maps found.",
        ],
        [Type.A0011]: [
            "正在查找地图",
            "Searching for maps...",
        ],
        [Type.A0012]: [
            "已找到符合条件的地图",
            "Maps found.",
        ],
        [Type.A0013]: [
            "发生网络错误，请重新登陆。",
            "Network went wrong. Please re-login.",
        ],
        [Type.A0014]: [
            "发生网络错误，请稍后再试。亦可尝试刷新浏览器。",
            "Network went wrong. Please try again later or refresh the browser.",
        ],
        [Type.A0015]: [
            "已成功创建战局，请等待其他玩家加入",
            "The war is created successfully.",
        ],
        [Type.A0016]: [
            "已成功退出房间",
            "Quit successfully.",
        ],
        [Type.A0017]: [
            "密码不正确，请检查后重试",
            "Invalid password.",
        ],
        [Type.A0018]: [
            "已成功加入房间。",
            "Joined successfully.",
        ],
        [Type.A0019]: [
            "该房间已被销毁。",
            "The room has been destroyed.",
        ],
        [Type.A0020]: [
            `服务器维护中，请稍后登陆`,
            `The server is under maintenance. Please wait and login later.`,
        ],
        [Type.A0021]: [
            `正在读取战局数据，请稍候`,
            `Downloading the war data. Please wait.`,
        ],
        [Type.A0022]: [
            `恭喜您获得本局的胜利！\n即将回到大厅…`,
            `Congratulations!`,
        ],
        [Type.A0023]: [
            `很遗憾您已战败，请再接再厉！\n即将回到大厅…`,
            `Good luck next war!`,
        ],
        [Type.A0024]: [
            `您确定要结束回合吗？`,
            `Are you sure to end your turn?`,
        ],
        [Type.A0025]: [
            `您确定要返回大厅吗？`,
            `Are you sure to go to the lobby?`,
        ],
        [Type.A0026]: [
            `您确定要投降吗？`,
            `Are you sure to resign?`,
        ],
        [Type.A0027]: [
            `请先选中您想要删除的部队，再进行此操作`,
            `Please select the unit you want to delete with the cursor before doing this.`,
        ],
        [Type.A0028]: [
            `您只能删除您自己的未行动的部队`,
            `You can delete your own idle units only.`,
        ],
        [Type.A0029]: [
            `是否确定要删除此部队？`,
            `Are you sure to delete the selected unit?`,
        ],
        [Type.A0030]: [
            `所有玩家都已同意和局，战局结束！\n即将回到大厅...`,
            `The game ends in draw!`,
        ],
        [Type.A0031]: [
            `您确定要求和吗？`,
            `Are you sure to request a drawn game?`,
        ],
        [Type.A0032]: [
            `您确定要同意和局吗？`,
            `Are you sure to agree the request from your opponent for a drawn game?`,
        ],
        [Type.A0033]: [
            `您确定要拒绝和局吗？`,
            `Are you sure to decline the request from your opponent for a drawn game?`,
        ],
        [Type.A0034]: [
            `已有玩家求和，请先决定是否同意（通过菜单选项操作）`,
            `There is a request for a drawn game. Please decide whether to agree it before ending your turn.`,
        ],
        [Type.A0035]: [
            `战局已结束，即将回到大厅…`,
            `The war is ended. Going back to the lobby...`,
        ],
        [Type.A0036]: [
            `检测到战局数据错误，已自动与服务器成功同步`,
            `The war is synchronized successfully.`,
        ],
        [Type.A0037]: [
            `发生未知错误，正在返回大厅...`,
            `Something wrong happened! Going back to the lobby...`,
        ],
        [Type.A0038]: [
            `战局数据已同步`,
            `The war is synchronized successfully.`,
        ],
        [Type.A0039]: [
            `数据加载中，请稍后重试`,
            `Now loading, please wait and retry.`,
        ],
        [Type.A0040]: [
            `数据加载中，请稍候...`,
            `Now loading, please wait...`,
        ],
        [Type.A0041]: [
            `回放已播放完毕`,
            `The replay is completed.`,
        ],
        [Type.A0042]: [
            `已处于战局初始状态，无法切换到上一回合`,
            `Can't rewind because it's the beginning of the replay.`,
        ],
        [Type.A0043]: [
            `已处于战局结束状态，无法切换到下一回合`,
            `Can't forward because it's the end of the replay.`,
        ],
        [Type.A0044]: [
            `当前正在回放玩家动作，请待其结束后重试`,
            `Now replaying an action. Please wait until it ends.`,
        ],
        [Type.A0045]: [
            `已成功切换回合`,
            `Turn switched.`,
        ],
        [Type.A0046]: [
            `请求中，请稍候`,
            `Now requesting, please wait...`,
        ],
        [Type.A0047]: [
            `昵称已更改`,
            `Your nickname is changed successfully`,
        ],
        [Type.A0048]: [
            `Discord ID 不正确，请检查后重试`,
            `Invalid discord ID.`,
        ],
        [Type.A0049]: [
            `Discord ID 已更改`,
            `Your discord ID is changed successfully`,
        ],
        [Type.A0050]: [
            `您尚未选择任何CO。`,
            `You have chosen no CO.`,
        ],
        [Type.A0051]: [
            `是否确定要创建战局？`,
            `Are you sure to create the game?`,
        ],
        [Type.A0052]: [
            `是否确定要加入战局？`,
            `Are you sure to join the game?`,
        ],
        [Type.A0053]: [
            `该功能正在开发中，敬请期待`,
            `This feature is under development...`,
        ],
        [Type.A0054]: [
            `您确定要发动CO POWER吗？`,
            `Are you sure to activate the CO POWER?`,
        ],
        [Type.A0055]: [
            `当前有其他操作可选。您确定要直接待机吗？`,
            `Another action is available. Are you sure to make the unit wait?`,
        ],
        [Type.A0056]: [
            `未知错误，请拖动截图发给作者，谢谢`,
            `Error! Please make a screenshot and send it to the game maker`,
        ],
        [Type.A0057]: [
            `禁用此项会清空您当前选择的CO（您可以重新选择一个）。确定要禁用吗？`,
            `You have chosen a CO that is banned by your current selection. Are you sure to continue the ban?`,
        ],
        [Type.A0058]: [
            `您确定要发动SUPER POWER吗？`,
            `Are you sure to activate the SUPER POWER?`,
        ],
        [Type.A0059]: [
            `已成功修改地图可用性`,
            `The availability has been changed successfully.`,
        ],
        [Type.A0060]: [
            `已发出观战请求，对方同意后即可观战`,
            `Requested. You can watch the game when accepted.`,
        ],
        [Type.A0061]: [
            `请求已处理`,
            `Handled.`,
        ],
        [Type.A0062]: [
            `已删除指定观战者`,
            `The selected watcher is removed`,
        ],
        [Type.A0063]: [
            `注:任意条件均可留空,等同于忽略该查找条件`,
            `Tips: You can leave any of the filters blank. Those filters will be ignored.`,
        ],
        [Type.A0064]: [
            `双击玩家名称，可以查看其详细信息`,
            `Touch a name to see the player's profile.`,
        ],
        [Type.A0065]: [
            `本页设置对局内所有玩家都生效`,
            `The settings affect all players in the game.`,
        ],
        [Type.A0066]: [
            `注意:\n昵称可使用任意字符，长度不小于4位`,
            `Note:\n You can use any character for the nickname, \n and the nickname should consist of at least 4 characters.`,
        ],
        [Type.A0067]: [
            `输入正确的Discord ID，并加入以下游戏频道（可点击链接复制）\n 即可实时收到游戏相关消息，如回合轮转等。`,
            `By entering your correct discord ID \n and joining the following discord server (the link can be copied)\n you can receive tinywars-related information, including turn notification.`,
        ],
        [Type.A0068]: [
            `可点击以下各个文字以更改设置`,
            `Touch texts below to change the settings.`,
        ],
        [Type.A0069]: [
            `请为参赛玩家设置至少两个队伍`,
            `Please set at least two teams for players.`,
        ],
        [Type.A0070]: [
            `您选择的存档位置非空，其内容将被覆盖。确定要继续创建战局吗？`,
            `The save slot is not empty and will be overwritten. Are you sure to create the game?`,
        ],
        [Type.A0071]: [
            `您的存档将被覆盖。确定要存档吗？`,
            `Your save slot will be overwritten. Are you sure to continue?`,
        ],
        [Type.A0072]: [
            `您当前的进度将会丢失。确定要读档吗？`,
            `Your current progress will be lost. Are you sure to continue?`,
        ],
        [Type.A0073]: [
            `已成功存档`,
            `Game saved successfully.`,
        ],
        [Type.A0074]: [
            `确定要重新载入所有地图吗？`,
            `Are you sure to reload all maps?`,
        ],
        [Type.A0075]: [
            `地图重载成功`,
            `Successfully reloaded all maps.`,
        ],
        [Type.A0076]: [
            `您无法删除最后一个部队`,
            `You can't delete your last unit.`,
        ],
        [Type.A0077]: [
            `您没有可用于建造部队的建筑。`,
            `You don't have any buildings that can produce units.`,
        ],
        [Type.A0078]: [
            `加载中，请稍候`,
            `Now loading`,
        ],
        [Type.A0079]: [
            [
                `确定要把其他地图合并到当前选中的目标地图吗？`,
                `注：`,
                `1.合并后，原地图将不再可用，但相关战局/回放仍可正常运作`,
                `2.其统计数据（如胜负场数）将被累计到目标地图中`,
                `3.若有多个图可以合并，请重复操作几次`,
            ].join("\n"),
            [
                `Untranslated...`,
                `确定要把其他地图合并到当前选中的目标地图吗？`,
                `注：`,
                `1.合并后，原地图将不再可用，但相关战局/回放仍可正常运作`,
                `2.其统计数据（如胜负场数）将被累计到目标地图中`,
                `3.若有多个图可以合并，请重复操作几次`,
            ].join("\n"),
        ],
        [Type.A0080]: [
            [
                `确定要删除此地图吗？`,
                `删除后，此地图将不再可用，但相关战局/回放仍可正常运作。`,
            ].join("\n"),
            [
                `Untranslated...`,
                `确定要删除此地图吗？`,
                `删除后，此地图将不再可用，但相关战局/回放仍可正常运作。`,
            ].join("\n"),
        ],
        [Type.A0081]: [
            `已成功删除地图`,
            `The map has been deleted successfully`,
        ],
        [Type.A0082]: [
            `确定要保存此地图吗？`,
            `Are you sure to save the map?`,
        ],
        [Type.A0083]: [
            `此地图存在问题，暂不能提审`,
            `This map is not playable.`,
        ],
        [Type.A0084]: [
            `您已提审过其他地图。若提审此地图，则其他地图将被自动撤销提审。确定要继续吗？`,
            `You have submitted some other maps for review. If you submit this map, the submitted maps will not be reviewed. Are you sure to continue?`,
        ],
        [Type.A0085]: [
            `已成功保存地图`,
            `The map has been saved.`,
        ],
        [Type.A0086]: [
            `注：若新的宽高小于当前宽高，则超出的图块会被裁剪掉（以左上角为原点）`,
            `Warning: If width/height is set lower than the current value, right & bottom map area exceeding the limit will be deleted.`,
        ],
        [Type.A0087]: [
            `您输入的宽高不合法，请检查`,
            `The W/H is not valid.`,
        ],
        [Type.A0088]: [
            `注：偏移后超出范围的图块会被裁剪（以左上角为原点）`,
            `Warning: Data that out of range will be dismissed! The origin point is at the upper left corner.`,
        ],
        [Type.A0089]: [
            `您确定要填充整个地图吗？`,
            `Are you sure to fill the map?`,
        ],
        [Type.A0090]: [
            `您确定要让过审此地图吗？`,
            `Are you sure to accept the map?`,
        ],
        [Type.A0091]: [
            `您确定要拒审此地图吗？`,
            `Are you sure to reject the map?`,
        ],
        [Type.A0092]: [
            `您已成功过审该地图。`,
            `You have accepted the map successfully.`,
        ],
        [Type.A0093]: [
            `您已成功拒审该地图。`,
            `You have rejected the map successfully.`,
        ],
        [Type.A0094]: [
            `请输入拒审理由`,
            `Please write down the reason for the rejection`,
        ],
        [Type.A0095]: [
            `您确定要导入此地图吗？`,
            `Are you sure to import this map?`,
        ],
        [Type.A0096]: [
            `至少需要保留一个预设规则`,
            `There must be at least one preset rule.`,
        ],
        [Type.A0097]: [
            `确定要删除这个预设规则吗？`,
            `Are you sure to delete this preset rule?`,
        ],
        [Type.A0098]: [
            `输入的值无效，请重试`,
            `Invalid value. Please retry.`,
        ],
        [Type.A0099]: [
            `无法创建更多的预设规则`,
            `You can't create more rules. `,
        ],
        [Type.A0100]: [
            `此地图没有预设规则`,
            `This map has no preset rules.`,
        ],
        [Type.A0101]: [
            `此选项已被预设规则锁定，无法修改`,
            `This setting is locked because a preset rule is chosen.`,
        ],
        [Type.A0102]: [
            `这是一局自定义规则的游戏，请确保您已经理解了所有的规则设定。\n确定要加入这局游戏吗？`,
            `Please make sure that you have recognized all the custom rules before joining this game.\nAre you sure to continue?`,
        ],
        [Type.A0103]: [
            `有玩家正在进行操作，请等待该操作结束后重试`,
            `A player is taking a move. Please retry when the move ends`,
        ],
        [Type.A0104]: [
            `模拟战已成功创建。您可以通过单人模式进入该战局。`,
            `The simulation war is created successfully.`,
        ],
        [Type.A0105]: [
            `请输入您对此地图的评价以及改进建议，可留空`,
            `Please leave your comment here if any.`,
        ],
        [Type.A0106]: [
            `已成功评分`,
            `Rated successfully.`,
        ],
        [Type.A0107]: [
            `已成功创建模拟战。您想现在就开始游玩吗？`,
            `The simulation war has been created successfully. Do you want to play it now?`,
        ],
        [Type.A0108]: [
            `开启作弊模式后，您可以随意修改战局上的各种数据。开启作弊模式后，将无法再取消。\n确定要开启吗？`,
            `You can modify most of the game data if cheating is enabled. However, you can't disable it after enabling it.\nAre you sure to continue?`,
        ],
        [Type.A0109]: [
            `请先把CO搭载到部队上`,
            `Please board your CO first.`,
        ],
        [Type.A0110]: [
            `您确定要让AI来控制这个势力吗？`,
            `Are you sure to make the A.I. to take control of the force?`,
        ],
        [Type.A0111]: [
            `您确定要自行控制这个势力吗？`,
            `Are you sure to take control of the force?`,
        ],
        [Type.A0112]: [
            `有棋子正在移动中，请稍候再试`,
            `A unit is moving. Please retry later.`,
        ],
        [Type.A0113]: [
            `您确定要切换该部队的行动状态吗？`,
            `Are you sure to switch the unit's action state?`,
        ],
        [Type.A0114]: [
            `您确定要切换该部队的下潜状态吗？`,
            `Are you sure to switch the unit's diving state?`,
        ],
        [Type.A0115]: [
            `请联系babygogogo以解决问题`,
            `Please refer to babygogogo.`,
        ],
        [Type.A0116]: [
            `战局已开始，并已进入您的回合。要现在就进入战局吗？`,
            `The war has started and it's your turn now. Do you want to play it now?`,
        ],
        [Type.A0117]: [
            `注：清空后，所有地形都会被设置为平原，所有部队都会被删除！`,
            `Caution: All tiles will be set as plain and all units will be deleted!`,
        ],
        [Type.A0118]: [
            `设计者名称不合法`,
            `Invalid MapDesigner.`,
        ],
        [Type.A0119]: [
            `地图名称不合法`,
            `Invalid MapName.`,
        ],
        [Type.A0120]: [
            `地图英文名称不合法`,
            `Invalid English MapName.`,
        ],
        [Type.A0121]: [
            `请确保至少有两名玩家，且没有跳过势力颜色`,
            `Invalid forces.`,
        ],
        [Type.A0122]: [
            `部队数据不合法`,
            `Invalid units.`,
        ],
        [Type.A0123]: [
            `地形数据不合法`,
            `Invalid tiles.`,
        ],
        [Type.A0124]: [
            `预设规则未设置或不合法`,
            `Preset rules are not set or invalid.`,
        ],
        [Type.A0125]: [
            `要现在就进入战局吗？`,
            `Do you want to play it now?`,
        ],
        [Type.A0126]: [
            `您确定要退出此房间吗？`,
            `Are you sure to exit the room?`,
        ],
        [Type.A0127]: [
            `您已被请出此房间。`,
            `You have been removed from the room.`,
        ],
        [Type.A0128]: [
            `请先取消您的准备状态`,
            `Please cancel the "ready" state first.`,
        ],
        [Type.A0129]: [
            `您确定要使用自定义规则吗？`,
            `Are you sure to use a custom rule?`,
        ],
        [Type.A0130]: [
            `您必须保留"无CO"选项。`,
            `The 'No CO' option must be available.`,
        ],
        [Type.A0131]: [
            `请尽量同时提供中英文名，以英文逗号分隔`,
            `Please write down a Chinese Name and an English name if possible. Use a , as a separator.`,
        ],
        [Type.A0132]: [
            `请设定您愿意同时进行的排位赛的数量上限（设置为0等同于您不参加排位赛；明战和雾战需要分别设定）。`,
            `Please set the maximum number of qualifying matches you are willing to play at the same time. Setting it to 0 is equivalent to not participating in qualifying matches.` +
            `\nNote: You need to set the numbers with fog on/off separately.`,
        ],
        [Type.A0133]: [
            `正在等待对战各方禁用CO。`,
            `Waiting for the COs to be banned from all sides.`,
        ],
        [Type.A0134]: [
            `正在等待对战各方选择CO和势力颜色并进入准备状态。`,
            `Waiting for all the players to be ready for the game.`,
        ],
        [Type.A0135]: [
            `您尚未禁用任何CO。`,
            `You have not banned any COs.`,
        ],
        [Type.A0136]: [
            `您已选择不禁用任何CO。`,
            `You have chosen not to ban any COs.`,
        ],
        [Type.A0137]: [
            `进入准备状态后，您将无法再次修改CO和势力颜色设定。确定要继续吗？`,
            `You can't change your CO and color settings after being ready. Are you sure to continue?`,
        ],
        [Type.A0138]: [
            `确定要禁用这些CO吗？`,
            `Are you sure to ban these COs?`,
        ],
        [Type.A0139]: [
            `确定要不禁用任何CO吗？`,
            `Are you sure to ban no CO?`,
        ],
        [Type.A0140]: [
            `确定要删除当前存档吗？（注：其他存档不受影响；您可以继续游玩当前游戏并存档）`,
            `Are you sure to clear the current save slot?`,
        ],
        [Type.A0141]: [
            `已成功删除存档。`,
            `The save slot has been cleared.`,
        ],
        [Type.A0142]: [
            `此地图已被修改，需要先保存吗？`,
            `The map has been modified. Do you want to save the map?`,
        ],
        [Type.A0143]: [
            `此地图已被修改，确定不保存直接退出吗？`,
            `The map has been modified. Are you sure to exit anyway?`,
        ],
        [Type.A0144]: [
            `请输入存档备注以便于区分，可留空`,
            `Please input a comment for the save slot.`,
        ],
        [Type.A0145]: [
            `房间已满员`,
            `The room is full of players.`,
        ],
        [Type.A0146]: [
            `战局数据不合法，请检查后重试`,
            `The war data is invalid. Please check and retry.`,
        ],
        [Type.A0147]: [
            `新密码与确认密码不相同，请检查后重试`,
            `The new password is different from the confirm password.`,
        ],
        [Type.A0148]: [
            `已成功修改密码。`,
            `Your password has been changed successfully.`
        ],
        [Type.A0149]: [
            `您确定要删除此房间吗？`,
            `Are you sure to delete this room?.`
        ],
        [Type.A0150]: [
            `正在加载图片\n请耐心等候`,
            `Now loading\nPlease wait...`,
        ],
        [Type.A0151]: [
            `已成功修改地图标签`,
            `The map tag has been updated successfully.`,
        ],

        ////////////////////////////////////////////////////////////////////////////////////////////////////
        // Short strings.
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        [Type.B0000]: [
            "创建房间",
            "Create Room",
        ],
        [Type.B0001]: [
            "无",
            "None",
        ],
        [Type.B0002]: [
            "基本设置",
            "Basic Settings",
        ],
        [Type.B0003]: [
            "高级设置",
            "Advanced Settings",
        ],
        [Type.B0004]: [
            "红",
            "Red",
        ],
        [Type.B0005]: [
            "蓝",
            "Blue",
        ],
        [Type.B0006]: [
            "黄",
            "Yellow",
        ],
        [Type.B0007]: [
            "黑",
            "Black",
        ],
        [Type.B0008]: [
            "A队",
            "Team A",
        ],
        [Type.B0009]: [
            "B队",
            "Team B",
        ],
        [Type.B0010]: [
            "C队",
            "Team C",
        ],
        [Type.B0011]: [
            "D队",
            "Team D",
        ],
        [Type.B0012]: [
            "是",
            "Yes",
        ],
        [Type.B0013]: [
            "否",
            "No",
        ],
        [Type.B0014]: [
            "天",
            "d",
        ],
        [Type.B0015]: [
            "时",
            "h",
        ],
        [Type.B0016]: [
            "分",
            "m",
        ],
        [Type.B0017]: [
            "秒",
            "s",
        ],
        [Type.B0018]: [
            "行动次序",
            "Force",
        ],
        [Type.B0019]: [
            "队伍",
            "Team",
        ],
        [Type.B0020]: [
            "战争迷雾",
            "Fog",
        ],
        [Type.B0021]: [
            "回合显示",
            "Time Limit",
        ],
        [Type.B0022]: [
            "退出房间",
            "Exit Game"
        ],
        [Type.B0023]: [
            "加入房间",
            "Join Room"
        ],
        [Type.B0024]: [
            "继续战斗",
            "Continue",
        ],
        [Type.B0025]: [
            `连接已断开`,
            `Disconnected`,
        ],
        [Type.B0026]: [
            `确定`,
            `Confirm`,
        ],
        [Type.B0027]: [
            `倒计时`,
            `Countdown`,
        ],
        [Type.B0028]: [
            `即将超时`,
            `Timeout soon`,
        ],
        [Type.B0029]: [
            `读取中`,
            `Now loading`,
        ],
        [Type.B0030]: [
            `中立`,
            `Neutral`,
        ],
        [Type.B0031]: [
            `玩家`,
            `Player`,
        ],
        [Type.B0032]: [
            `金钱`,
            `Fund`,
        ],
        [Type.B0033]: [
            `能量`,
            `Energy`,
        ],
        [Type.B0034]: [
            `胜利`,
            `Win`,
        ],
        [Type.B0035]: [
            `失败`,
            `Defeat`,
        ],
        [Type.B0036]: [
            `结束回合`,
            `End Turn`,
        ],
        [Type.B0037]: [
            `装载`,
            `load`,
        ],
        [Type.B0038]: [
            `合流`,
            `Join`,
        ],
        [Type.B0039]: [
            `攻击`,
            `Attack`,
        ],
        [Type.B0040]: [
            `占领`,
            `Capture`,
        ],
        [Type.B0041]: [
            `下潜`,
            `Dive`,
        ],
        [Type.B0042]: [
            `上浮`,
            `Surface`,
        ],
        [Type.B0043]: [
            `建造`,
            `Build`,
        ],
        [Type.B0044]: [
            `补给`,
            `Supply`,
        ],
        [Type.B0045]: [
            `发射`,
            `Launch`,
        ],
        [Type.B0046]: [
            `卸载`,
            `Drop`,
        ],
        [Type.B0047]: [
            `照明`,
            `Flare`,
        ],
        [Type.B0048]: [
            `发射导弹`,
            `Silo`,
        ],
        [Type.B0049]: [
            `制造`,
            `Produce`,
        ],
        [Type.B0050]: [
            `待机`,
            `Wait`,
        ],
        [Type.B0051]: [
            `生产材料已耗尽`,
            `No material`,
        ],
        [Type.B0052]: [
            `没有空闲的装载位置`,
            `No empty load slot`,
        ],
        [Type.B0053]: [
            `资金不足`,
            `Insufficient fund`,
        ],
        [Type.B0054]: [
            `返回大厅`,
            `Go to lobby`,
        ],
        [Type.B0055]: [
            `投降`,
            `Resign`,
        ],
        [Type.B0056]: [
            `已战败`,
            `Defeat`
        ],
        [Type.B0057]: [
            `日`,
            `Day`,
        ],
        [Type.B0058]: [
            `月`,
            `Month`,
        ],
        [Type.B0059]: [
            `年`,
            `Year`,
        ],
        [Type.B0060]: [
            `排位积分`,
            `RankScore`,
        ],
        [Type.B0061]: [
            `列兵`,
            `Lv.0`,
        ],
        [Type.B0062]: [
            `上等兵`,
            `Lv.1`,
        ],
        [Type.B0063]: [
            `下士`,
            `Lv.2`,
        ],
        [Type.B0064]: [
            `中士`,
            `Lv.3`,
        ],
        [Type.B0065]: [
            `上士`,
            `Lv.4`,
        ],
        [Type.B0066]: [
            `军士长`,
            `Lv.5`,
        ],
        [Type.B0067]: [
            `少尉`,
            `Lv.6`,
        ],
        [Type.B0068]: [
            `中尉`,
            `Lv.7`,
        ],
        [Type.B0069]: [
            `上尉`,
            `Lv.8`,
        ],
        [Type.B0070]: [
            `少校`,
            `Lv.9`,
        ],
        [Type.B0071]: [
            `中校`,
            `Lv.10`,
        ],
        [Type.B0072]: [
            `上校`,
            `Lv.11`,
        ],
        [Type.B0073]: [
            `大校`,
            `Lv.12`,
        ],
        [Type.B0074]: [
            `少将`,
            `Lv.13`,
        ],
        [Type.B0075]: [
            `中将`,
            `Lv.14`,
        ],
        [Type.B0076]: [
            `上将`,
            `Lv.15`,
        ],
        [Type.B0077]: [
            `攻`,
            `Deal`,
        ],
        [Type.B0078]: [
            `反`,
            `Take`,
        ],
        [Type.B0079]: [
            `费用`,
            `Cost`,
        ],
        [Type.B0080]: [
            `高级`,
            `Advanced`,
        ],
        [Type.B0081]: [
            `删除部队`,
            `Delete`,
        ],
        [Type.B0082]: [
            `和局`,
            `Drawn Game`,
        ],
        [Type.B0083]: [
            `求和`,
            `Request Draw`,
        ],
        [Type.B0084]: [
            `同意和局`,
            `Agree Draw`,
        ],
        [Type.B0085]: [
            `拒绝和局`,
            `Decline Draw`,
        ],
        [Type.B0086]: [
            `回合中`,
            `In Turn`,
        ],
        [Type.B0087]: [
            `战局已结束`,
            `Game Ended`,
        ],
        [Type.B0088]: [
            `提示`,
            `Message`,
        ],
        [Type.B0089]: [
            `刷新战局`,
            `Refresh`,
        ],
        [Type.B0090]: [
            `行动数`,
            `Actions`,
        ],
        [Type.B0091]: [
            `回合数`,
            `Turns`,
        ],
        [Type.B0092]: [
            `观看回放`,
            `Replays`,
        ],
        [Type.B0093]: [
            `回放已结束`,
            `The replay is completed.`,
        ],
        [Type.B0094]: [
            `开始回合`,
            `Begin turn`,
        ],
        [Type.B0095]: [
            `生产`,
            `Produce`,
        ],
        [Type.B0096]: [
            `提议和局`,
            `Propose a draw`,
        ],
        [Type.B0097]: [
            `发起攻击`,
            `Launch an attack`,
        ],
        [Type.B0098]: [
            `装载部队`,
            `Load a unit`,
        ],
        [Type.B0099]: [
            `建造建筑`,
            `Build a building`,
        ],
        [Type.B0100]: [
            `占领建筑`,
            `Capture a building`,
        ],
        [Type.B0101]: [
            `部队下潜`,
            `Unit dive`,
        ],
        [Type.B0102]: [
            `卸载部队`,
            `Drop unit(s)`,
        ],
        [Type.B0103]: [
            `部队合流`,
            `Join units`,
        ],
        [Type.B0104]: [
            `发射照明弹`,
            `Launch a flare`,
        ],
        [Type.B0105]: [
            `发射导弹`,
            `Launch a silo`,
        ],
        [Type.B0106]: [
            `生产舰载机`,
            `Produce a seaplane`,
        ],
        [Type.B0107]: [
            `补给部队`,
            `Supply unit(s)`,
        ],
        [Type.B0108]: [
            `部队上浮`,
            `Unit surface`,
        ],
        [Type.B0109]: [
            `部队移动`,
            `Unit move`,
        ],
        [Type.B0110]: [
            `发生未知错误`,
            `Something errors`,
        ],
        [Type.B0111]: [
            `中立玩家`,
            `Neutral`,
        ],
        [Type.B0112]: [
            `步兵`,
            `Inf`,
        ],
        [Type.B0113]: [
            `反坦克兵`,
            `Mech`,
        ],
        [Type.B0114]: [
            `履带`,
            `Tank`,
        ],
        [Type.B0115]: [
            `轮胎A`,
            `TireA`,
        ],
        [Type.B0116]: [
            `轮胎B`,
            `TireB`,
        ],
        [Type.B0117]: [
            `飞行`,
            `Air`,
        ],
        [Type.B0118]: [
            `航行`,
            `Ship`,
        ],
        [Type.B0119]: [
            `运输`,
            `Trans`,
        ],
        [Type.B0120]: [
            `全部`,
            `All`,
        ],
        [Type.B0121]: [
            `陆军`,
            `Ground`,
        ],
        [Type.B0122]: [
            `海军`,
            `Naval`,
        ],
        [Type.B0123]: [
            `空军`,
            `Air`,
        ],
        [Type.B0124]: [
            `陆军&海军`,
            `Ground & Naval`,
        ],
        [Type.B0125]: [
            `陆军&空军`,
            `Ground & Air`,
        ],
        [Type.B0126]: [
            `近战`,
            `Direct`,
        ],
        [Type.B0127]: [
            `远程`,
            `Indirect`,
        ],
        [Type.B0128]: [
            `步行`,
            `Foot`,
        ],
        [Type.B0129]: [
            `步兵系`,
            `Inf`,
        ],
        [Type.B0130]: [
            `车辆系`,
            `Vehicle`,
        ],
        [Type.B0131]: [
            `近战机械`,
            `DirectMachine`,
        ],
        [Type.B0132]: [
            `运输系`,
            `Transport`,
        ],
        [Type.B0133]: [
            `大型船只`,
            `LargeNaval`,
        ],
        [Type.B0134]: [
            `直升机`,
            `Copter`,
        ],
        [Type.B0135]: [
            `坦克`,
            `Tank`,
        ],
        [Type.B0136]: [
            `空军除舰载机`,
            `AirExceptSeaplane`,
        ],
        [Type.B0137]: [
            `多人对战`,
            `Multi Player`,
        ],
        [Type.B0138]: [
            `单人模式`,
            `Single Player`,
        ],
        [Type.B0139]: [
            `CO搭乘`,
            `CO Board`,
        ],
        [Type.B0140]: [
            `CO信息`,
            `CO Info`,
        ],
        [Type.B0141]: [
            `无限`,
            `Infinity`,
        ],
        [Type.B0142]: [
            `发动COP`,
            `Power`,
        ],
        [Type.B0143]: [
            `帮助`,
            `Help`,
        ],
        [Type.B0144]: [
            `发动SCOP`,
            `SCOP`,
        ],
        [Type.B0145]: [
            `选择CO`,
            `Choose CO`,
        ],
        [Type.B0146]: [
            `返回`,
            `Back`,
        ],
        [Type.B0147]: [
            `CO系统规则`,
            `CO Rules`,
        ],
        [Type.B0148]: [
            `切换语言`,
            `Change Language`,
        ],
        [Type.B0149]: [
            `更改昵称`,
            `Change Nickname`,
        ],
        [Type.B0150]: [
            `更改Discord ID`,
            `Change Discord ID`,
        ],
        [Type.B0151]: [
            `查看在线玩家`,
            `Online Players`,
        ],
        [Type.B0152]: [
            `部队列表`,
            `Units`,
        ],
        [Type.B0153]: [
            `寻找建筑`,
            `Building`,
        ],
        [Type.B0154]: [
            `取消`,
            `Cancel`,
        ],
        [Type.B0155]: [
            `菜单`,
            `Menu`,
        ],
        [Type.B0156]: [
            `资金`,
            `Fund`,
        ],
        [Type.B0157]: [
            `收入`,
            `Income`,
        ],
        [Type.B0158]: [
            `建筑数`,
            `Buildings`,
        ],
        [Type.B0159]: [
            `能量`,
            `Energy`,
        ],
        [Type.B0160]: [
            `部队数`,
            `Units`,
        ],
        [Type.B0161]: [
            `部队价值`,
            `Units Value`,
        ],
        [Type.B0162]: [
            `姓名`,
            `Name`,
        ],
        [Type.B0163]: [
            `设计者`,
            `Designer`,
        ],
        [Type.B0164]: [
            `搭载费用`,
            `Boarding Cost`,
        ],
        [Type.B0165]: [
            `Zone范围`,
            `Zone Radius`,
        ],
        [Type.B0166]: [
            `Zone扩张能量值`,
            `ZoneExpandingEnergy`,
        ],
        [Type.B0167]: [
            `能量消耗`,
            `Energy Cost`,
        ],
        [Type.B0168]: [
            `势力`,
            `Force`,
        ],
        [Type.B0169]: [
            `我的履历`,
            `Profile`,
        ],
        [Type.B0170]: [
            `账号`,
            `Account`,
        ],
        [Type.B0171]: [
            `密码`,
            `Password`,
        ],
        [Type.B0172]: [
            `记住密码`,
            `Remember Password`,
        ],
        [Type.B0173]: [
            `登录`,
            `Login`,
        ],
        [Type.B0174]: [
            `注册`,
            `Register`,
        ],
        [Type.B0175]: [
            `昵称`,
            `Nickname`,
        ],
        [Type.B0176]: [
            `显示地形动画`,
            `Show Tile Animation`,
        ],
        [Type.B0177]: [
            `停止地形动画`,
            `Stop Tile Animation`,
        ],
        [Type.B0178]: [
            `初始资金`,
            `Initial Fund`,
        ],
        [Type.B0179]: [
            `收入倍率`,
            `Income Multiplier`,
        ],
        [Type.B0180]: [
            `初始能量`,
            `Initial Energy`,
        ],
        [Type.B0181]: [
            `能量增速`,
            `Energy Growth Multiplier`,
        ],
        [Type.B0182]: [
            `移动力加成`,
            `Movement Bonus`,
        ],
        [Type.B0183]: [
            `攻击力加成`,
            `Offense Bonus`,
        ],
        [Type.B0184]: [
            `视野加成`,
            `Vision Bonus`,
        ],
        [Type.B0185]: [
            `房间名称`,
            `Game Name`,
        ],
        [Type.B0186]: [
            `房间密码`,
            `Game Password`,
        ],
        [Type.B0187]: [
            `附言`,
            `Comment`,
        ],
        [Type.B0188]: [
            `回合限时`,
            `Boot Timer`,
        ],
        [Type.B0189]: [
            `幸运下限`,
            `Min Luck`,
        ],
        [Type.B0190]: [
            `幸运上限`,
            `Max Luck`,
        ],
        [Type.B0191]: [
            `回合`,
            `Turn`,
        ],
        [Type.B0192]: [
            `管理地图`,
            `Map Management`,
        ],
        [Type.B0193]: [
            `可用性`,
            `Availability`,
        ],
        [Type.B0194]: [
            `注册时间`,
            `Registration`,
        ],
        [Type.B0195]: [
            `上次登陆时间`,
            `Last Login`,
        ],
        [Type.B0196]: [
            `在线总时长`,
            `Online Time`,
        ],
        [Type.B0197]: [
            `登陆次数`,
            `Login Times`,
        ],
        [Type.B0198]: [
            `明战排位积分`,
            `Std Rank Score`,
        ],
        [Type.B0199]: [
            `雾战排位积分`,
            `FoW Rank Score`,
        ],
        [Type.B0200]: [
            `多人自由对战`,
            `MP Custom Games`,
        ],
        [Type.B0201]: [
            `历史战绩`,
            `History`,
        ],
        [Type.B0202]: [
            `3人局`,
            `3P`,
        ],
        [Type.B0203]: [
            `4人局`,
            `4P`,
        ],
        [Type.B0204]: [
            `关闭`,
            `Close`,
        ],
        [Type.B0205]: [
            `多人游戏`,
            `Multi Player`,
        ],
        [Type.B0206]: [
            `观战`,
            `Watch`,
        ],
        [Type.B0207]: [
            `发起请求`,
            `Make Request`,
        ],
        [Type.B0208]: [
            `处理请求`,
            `Handle Request`,
        ],
        [Type.B0209]: [
            `暂无请求`,
            `No Requests`,
        ],
        [Type.B0210]: [
            `暂无战局`,
            `No Wars`,
        ],
        [Type.B0211]: [
            `无`,
            `No`,
        ],
        [Type.B0212]: [
            `已请求`,
            `Requested`,
        ],
        [Type.B0213]: [
            `正在观战`,
            `Watching`,
        ],
        [Type.B0214]: [
            `同意`,
            `Accept`,
        ],
        [Type.B0215]: [
            `拒绝`,
            `Decline`,
        ],
        [Type.B0216]: [
            `自己`,
            `Self`,
        ],
        [Type.B0217]: [
            `对手`,
            `Opponent`,
        ],
        [Type.B0218]: [
            `已观战他人`,
            `Watching Others`,
        ],
        [Type.B0219]: [
            `删除观战者`,
            `Delete Watcher`,
        ],
        [Type.B0220]: [
            `删除`,
            `Delete`,
        ],
        [Type.B0221]: [
            `保留`,
            `Keep`,
        ],
        [Type.B0222]: [
            `继续观战`,
            `Continue`,
        ],
        [Type.B0223]: [
            `战局信息`,
            `War Info`,
        ],
        [Type.B0224]: [
            `玩家信息`,
            `Player Info`,
        ],
        [Type.B0225]: [
            `地图名称`,
            `Map name`,
        ],
        [Type.B0226]: [
            `战局ID`,
            `War ID`,
        ],
        [Type.B0227]: [
            `选择地图`,
            `Select Map`,
        ],
        [Type.B0228]: [
            `查找`,
            `Search`,
        ],
        [Type.B0229]: [
            `玩家数量`,
            `Players`,
        ],
        [Type.B0230]: [
            `更换`,
            `Change`,
        ],
        [Type.B0231]: [
            `我的回合`,
            `My Turn`,
        ],
        [Type.B0232]: [
            `玩家`,
            `Players`,
        ],
        [Type.B0233]: [
            `全部显示`,
            `Show All`,
        ],
        [Type.B0234]: [
            `查找回放`,
            `Search Replay`,
        ],
        [Type.B0235]: [
            `回放ID`,
            `Replay ID`,
        ],
        [Type.B0236]: [
            `在线玩家列表`,
            `Online Players List`,
        ],
        [Type.B0237]: [
            `当前在线人数`,
            `Online Players`
        ],
        [Type.B0238]: [
            `可用CO`,
            `Available COs`,
        ],
        [Type.B0239]: [
            `最大`,
            `Max.`,
        ],
        [Type.B0240]: [
            `指挥官信息`,
            `CO Info`,
        ],
        [Type.B0241]: [
            `暂无回放`,
            `No Replays`,
        ],
        [Type.B0242]: [
            `新昵称`,
            `New nickname`,
        ],
        [Type.B0243]: [
            `新ID`,
            `New ID`,
        ],
        [Type.B0244]: [
            `切换玩家`,
            `Next Player`,
        ],
        [Type.B0245]: [
            `房间设定总览`,
            `Overview Room Settings`,
        ],
        [Type.B0246]: [
            `进入战局`,
            `Enter Game`,
        ],
        [Type.B0247]: [
            `上个回合`,
            `Prev. Turn`,
        ],
        [Type.B0248]: [
            `下个回合`,
            `Next Turn`,
        ],
        [Type.B0249]: [
            `开始回放`,
            `Start Replays`,
        ],
        [Type.B0250]: [
            `暂停回放`,
            `Pause Replays`,
        ],
        [Type.B0251]: [
            `作者`,
            `Designer`,
        ],
        [Type.B0252]: [
            `游玩次数`,
            `Games Played`,
        ],
        [Type.B0253]: [
            `评分`,
            `Rating`,
        ],
        [Type.B0254]: [
            `自由战斗`,
            `Free Battle`,
        ],
        [Type.B0255]: [
            `存档编号`,
            `Save Slot`,
        ],
        [Type.B0256]: [
            `电脑`,
            `COM`,
        ],
        [Type.B0257]: [
            `War Room`,
            `War Room`,
        ],
        [Type.B0258]: [
            `选择`,
            `Select`,
        ],
        [Type.B0259]: [
            `选择存档位置`,
            `Select Save Slot`,
        ],
        [Type.B0260]: [
            `存档`,
            `Save Game`,
        ],
        [Type.B0261]: [
            `读档`,
            `Load Game`,
        ],
        [Type.B0262]: [
            `重载所有地图`,
            `Reload Maps`,
        ],
        [Type.B0267]: [
            `详细信息`,
            `Detailed Info`,
        ],
        [Type.B0268]: [
            `合并地图`,
            `Merge Maps`,
        ],
        [Type.B0269]: [
            `无可合并的地图`,
            `No Maps`,
        ],
        [Type.B0270]: [
            `删除地图`,
            `Delete Map`,
        ],
        [Type.B0271]: [
            `地图编辑器`,
            `Map Editor`,
        ],
        [Type.B0272]: [
            `地图列表`,
            `Map List`,
        ],
        [Type.B0273]: [
            `未提审`,
            `Not Reviewed`,
        ],
        [Type.B0274]: [
            `审核中`,
            `Reviewing`,
        ],
        [Type.B0275]: [
            `被拒审`,
            `Rejected`,
        ],
        [Type.B0276]: [
            `已过审`,
            `Accepted`,
        ],
        [Type.B0277]: [
            `未命名`,
            `Unnamed`,
        ],
        [Type.B0278]: [
            `无数据`,
            `No Data`,
        ],
        [Type.B0279]: [
            `新地图`,
            `New Map`,
        ],
        [Type.B0280]: [
            `模式`,
            `Mode`,
        ],
        [Type.B0281]: [
            `绘制部队`,
            `Draw Unit`,
        ],
        [Type.B0282]: [
            `绘制地形基底`,
            `Draw Tile Base`,
        ],
        [Type.B0283]: [
            `绘制地形物体`,
            `Draw Tile Object`,
        ],
        [Type.B0284]: [
            `删除部队`,
            `Del Unit`,
        ],
        [Type.B0285]: [
            `删除地形物体`,
            `Del Tile Object`,
        ],
        [Type.B0286]: [
            `预览`,
            `Preview`,
        ],
        [Type.B0287]: [
            `保存地图`,
            `Save Map`,
        ],
        [Type.B0288]: [
            `读取地图`,
            `Load Map`,
        ],
        [Type.B0289]: [
            `提审`,
            `Submit for review`,
        ],
        [Type.B0290]: [
            `调整大小`,
            `Resize`,
        ],
        [Type.B0291]: [
            `当前宽高`,
            `Current W/H`,
        ],
        [Type.B0292]: [
            `新的宽高`,
            `New W/H`,
        ],
        [Type.B0293]: [
            `地图偏移`,
            `Map Offset`,
        ],
        [Type.B0294]: [
            `全图填充`,
            `Fill Map`,
        ],
        [Type.B0295]: [
            `审核地图`,
            `Review Maps`,
        ],
        [Type.B0296]: [
            `过审`,
            `Accept`,
        ],
        [Type.B0297]: [
            `拒审`,
            `Reject`,
        ],
        [Type.B0298]: [
            `地图信息`,
            `Map Info`,
        ],
        [Type.B0299]: [
            `地图英文名称`,
            `Map English Name`,
        ],
        [Type.B0300]: [
            `地图尺寸`,
            `Map Size`,
        ],
        [Type.B0301]: [
            `可见性`,
            `Visibility`,
        ],
        [Type.B0302]: [
            `地形基底`,
            `Tile Bases`,
        ],
        [Type.B0303]: [
            `地形物体`,
            `Tile Objects`,
        ],
        [Type.B0304]: [
            `部队`,
            `Units`,
        ],
        [Type.B0305]: [
            `拒审理由`,
            `Reason for Rejection`,
        ],
        [Type.B0306]: [
            `对称性`,
            `Symmetry`,
        ],
        [Type.B0307]: [
            `自动绘制地形`,
            `Auto Draw Tile`,
        ],
        [Type.B0308]: [
            `上下对称`,
            `U to D`,
        ],
        [Type.B0309]: [
            `左右对称`,
            `L to R`,
        ],
        [Type.B0310]: [
            `旋转对称`,
            `Rotational`,
        ],
        [Type.B0311]: [
            `左上右下对称`,
            `UL to DR`,
        ],
        [Type.B0312]: [
            `右上左下对称`,
            `UR to DL`,
        ],
        [Type.B0313]: [
            `导入`,
            `Import`,
        ],
        [Type.B0314]: [
            `预设规则`,
            `Preset Rules`,
        ],
        [Type.B0315]: [
            `规则名称`,
            `Rule Name`,
        ],
        [Type.B0316]: [
            `规则英文名`,
            `Rule English Name`,
        ],
        [Type.B0317]: [
            `修改`,
            `Modify`,
        ],
        [Type.B0318]: [
            `规则`,
            `Rule`,
        ],
        [Type.B0319]: [
            `值域`,
            `Range`,
        ],
        [Type.B0320]: [
            `新增`,
            `Add`,
        ],
        [Type.B0321]: [
            `自定义`,
            `Custom`,
        ],
        [Type.B0322]: [
            `无`,
            `Empty`,
        ],
        [Type.B0323]: [
            `只能使用数字`,
            `Digits only`,
        ],
        [Type.B0324]: [
            `暂无预览`,
            `No Preview`,
        ],
        [Type.B0325]: [
            `模拟战`,
            `Simulation`,
        ],
        [Type.B0326]: [
            `评审意见`,
            `Comments`,
        ],
        [Type.B0327]: [
            `服务器状态`,
            `Server Status`,
        ],
        [Type.B0328]: [
            `账号总数`,
            `Accounts`,
        ],
        [Type.B0329]: [
            `在线总时长`,
            `Online Time`,
        ],
        [Type.B0330]: [
            `新增账号数`,
            `New Accounts`,
        ],
        [Type.B0331]: [
            `活跃账号数`,
            `Active Accounts`,
        ],
        [Type.B0332]: [
            `无可用选项`,
            `No available options`,
        ],
        [Type.B0333]: [
            `建筑统计`,
            `Buildings`,
        ],
        [Type.B0334]: [
            `基础伤害表`,
            `Base Damage Chart`,
        ],
        [Type.B0335]: [
            `攻击(主)`,
            `ATK(main)`,
        ],
        [Type.B0336]: [
            `攻击(副)`,
            `ATK(sub)`,
        ],
        [Type.B0337]: [
            `受击(主)`,
            `DEF(main)`,
        ],
        [Type.B0338]: [
            `受击(副)`,
            `DEF(sub)`,
        ],
        [Type.B0339]: [
            `HP`,
            `HP`,
        ],
        [Type.B0340]: [
            `移动力`,
            `Movement`,
        ],
        [Type.B0341]: [
            `造价`,
            `Production Cost`,
        ],
        [Type.B0342]: [
            `燃料`,
            `Fuel`,
        ],
        [Type.B0343]: [
            `燃料消耗量`,
            `Fuel Consumption`,
        ],
        [Type.B0344]: [
            `耗尽燃料时自毁`,
            `Explodes without fuel`,
        ],
        [Type.B0345]: [
            `攻击距离`,
            `Attack Range`,
        ],
        [Type.B0346]: [
            `移动后攻击`,
            `Run & hit`,
        ],
        [Type.B0347]: [
            `建筑材料`,
            `Build Material`,
        ],
        [Type.B0348]: [
            `生产材料`,
            `Production Material`,
        ],
        [Type.B0349]: [
            `照明弹`,
            `Flare Ammo`,
        ],
        [Type.B0350]: [
            `主武器弹药`,
            `Primary Weapon Ammo`,
        ],
        [Type.B0351]: [
            `移动基础消耗表`,
            `Base Move Cost Chart`,
        ],
        [Type.B0352]: [
            `防御加成`,
            `Defense Bonus`,
        ],
        [Type.B0353]: [
            `资金收入`,
            `Income`,
        ],
        [Type.B0354]: [
            `视野范围`,
            `Vision Range`,
        ],
        [Type.B0355]: [
            `对全体玩家生效`,
            `For all players`,
        ],
        [Type.B0356]: [
            `雾战中隐蔽部队`,
            `Hide units in FoW`,
        ],
        [Type.B0357]: [
            `被占领即失败`,
            `Defeat if captured`,
        ],
        [Type.B0358]: [
            `生产部队`,
            `Produce Unit`,
        ],
        [Type.B0359]: [
            `全局攻防加成`,
            `Global ATK/DEF Bonus`,
        ],
        [Type.B0360]: [
            `部队维修量`,
            `Repair Amount`,
        ],
        [Type.B0361]: [
            `占领点数`,
            `Capture Point`,
        ],
        [Type.B0362]: [
            `建筑点数`,
            `Build Point`,
        ],
        [Type.B0363]: [
            `我的评分`,
            `My Rating`,
        ],
        [Type.B0364]: [
            `全服评分`,
            `Global Rating`,
        ],
        [Type.B0365]: [
            `评分`,
            `Set Rating`,
        ],
        [Type.B0366]: [
            `开启作弊模式`,
            `Cheating`,
        ],
        [Type.B0367]: [
            `状态`,
            `Status`,
        ],
        [Type.B0368]: [
            `已行动`,
            `Waiting`,
        ],
        [Type.B0369]: [
            `空闲`,
            `Idle`,
        ],
        [Type.B0370]: [
            `晋升等级`,
            `Promotion`,
        ],
        [Type.B0371]: [
            `下潜中`,
            `Diving`,
        ],
        [Type.B0372]: [
            `最近`,
            `Recent`,
        ],
        [Type.B0373]: [
            `公共(英语)`,
            `Public(EN)`,
        ],
        [Type.B0374]: [
            `系统频道`,
            `System`,
        ],
        [Type.B0375]: [
            `字数太多`,
            `Too many characters`,
        ],
        [Type.B0376]: [
            `频道`,
            `Channel`,
        ],
        [Type.B0377]: [
            `组队`,
            `Team`,
        ],
        [Type.B0378]: [
            `私聊`,
            `Private`,
        ],
        [Type.B0379]: [
            `全局`,
            `Global`,
        ],
        [Type.B0380]: [
            `聊天列表`,
            `Chat List`,
        ],
        [Type.B0381]: [
            `暂无消息`,
            `No Message`,
        ],
        [Type.B0382]: [
            `发送`,
            `Send`,
        ],
        [Type.B0383]: [
            `聊天`,
            `Chat`
        ],
        [Type.B0384]: [
            `公共(中文)`,
            `Public(CN)`,
        ],
        [Type.B0385]: [
            `使用原版贴图`,
            `Origin Texture`,
        ],
        [Type.B0386]: [
            `使用新版贴图`,
            `New Texture`,
        ],
        [Type.B0387]: [
            `常规`,
            `Regular`,
        ],
        [Type.B0388]: [
            `增量`,
            `Incremental`,
        ],
        [Type.B0389]: [
            `初始时间`,
            `Initial Time`,
        ],
        [Type.B0390]: [
            `增量时间`,
            `Incremental Time`,
        ],
        [Type.B0391]: [
            `清空`,
            `Clear`,
        ],
        [Type.B0392]: [
            `游戏已开始`,
            `Game Started`,
        ],
        [Type.B0393]: [
            `玩家昵称`,
            `User Nickname`,
        ],
        [Type.B0394]: [
            `CO名称`,
            `CO Name`,
        ],
        [Type.B0395]: [
            `玩家列表`,
            `Players List`,
        ],
        [Type.B0396]: [
            `超时告负`,
            `Boot`,
        ],
        [Type.B0397]: [
            `势力颜色`,
            `Color`,
        ],
        [Type.B0398]: [
            `房间信息`,
            `Room Info`,
        ],
        [Type.B0399]: [
            `修改规则`,
            `Modify Rules`,
        ],
        [Type.B0400]: [
            `删除房间`,
            `Delete Room`,
        ],
        [Type.B0401]: [
            `开战`,
            `Start Game`,
        ],
        [Type.B0402]: [
            `准备就绪`,
            `Ready`,
        ],
        [Type.B0403]: [
            `可用CO数量`,
            `Available COs Num`,
        ],
        [Type.B0404]: [
            `排位赛`,
            `Ranking Match`,
        ],
        [Type.B0405]: [
            `房间`,
            `Room`,
        ],
        [Type.B0406]: [
            `规则可用性`,
            `Rule Availability`,
        ],
        [Type.B0407]: [
            `玩家规则列表`,
            `Player Rule List`,
        ],
        [Type.B0408]: [
            `排位赛(雾战)`,
            `Ranking Match FoW`,
        ],
        [Type.B0409]: [
            `单人自由对战`,
            `SP Custom Games`,
        ],
        [Type.B0410]: [
            `我的房间`,
            `My Rooms`,
        ],
        [Type.B0411]: [
            `踢出`,
            `Kick Off`,
        ],
        [Type.B0412]: [
            `数量`,
            `Number`,
        ],
        [Type.B0413]: [
            `设定战局数量`,
            `Set Games Num`,
        ],
        [Type.B0414]: [
            `房间状态`,
            `Room Status`,
        ],
        [Type.B0415]: [
            `排位明战`,
            `Rank Std`,
        ],
        [Type.B0416]: [
            `排位雾战`,
            `Rank FoW`,
        ],
        [Type.B0417]: [
            `自由明战`,
            `Custom Std`,
        ],
        [Type.B0418]: [
            `自由雾战`,
            `Custom FoW`,
        ],
        [Type.B0419]: [
            `地图编辑器`,
            `Map Editor`,
        ],
        [Type.B0420]: [
            `删除存档`,
            `Delete War`,
        ],
        [Type.B0421]: [
            `已搭载CO`,
            `CO on board`,
        ],
        [Type.B0422]: [
            `战斗`,
            `Fight`,
        ],
        [Type.B0423]: [
            `信息`,
            `Info`,
        ],
        [Type.B0424]: [
            `控制者`,
            `Controller`,
        ],
        [Type.B0425]: [
            `CO`,
            `CO`,
        ],
        [Type.B0426]: [
            `修改密码`,
            `Change Password`,
        ],
        [Type.B0427]: [
            `旧密码`,
            `Old Password`,
        ],
        [Type.B0428]: [
            `新密码`,
            `New Password`,
        ],
        [Type.B0429]: [
            `确认密码`,
            `Confirm Password`,
        ],
        [Type.B0430]: [
            `SetPath模式`,
            `Set Path Mode`,
        ],
        [Type.B0431]: [
            `已启用`,
            `Enabled`,
        ],
        [Type.B0432]: [
            `已禁用`,
            `Disabled`,
        ],
        [Type.B0433]: [
            `启用`,
            `Enable`,
        ],
        [Type.B0434]: [
            `禁用`,
            `Disable`,
        ],
        [Type.B0435]: [
            `未上榜`,
            `No Rank`,
        ],
        [Type.B0436]: [
            `排位积分排名`,
            `Rank List`,
        ],
        [Type.B0437]: [
            `标准`,
            `Standard`,
        ],
        [Type.B0438]: [
            `雾战`,
            `Fog of War`,
        ],
        [Type.B0439]: [
            `能否下潜`,
            `Can Dive`,
        ],
        [Type.B0440]: [
            `部队属性表`,
            `Units Info`,
        ],
        [Type.B0441]: [
            `标准图池`,
            `Standard Maps`,
        ],
        [Type.B0442]: [
            `雾战图池`,
            `Fog Maps`,
        ],
        [Type.B0443]: [
            `多人房间`,
            `MP Room`,
        ],
        [Type.B0444]: [
            `设置标签`,
            `Set Tags`,
        ],
        [Type.B0445]: [
            `地图标签`,
            `Map Tags`,
        ],
        [Type.B0446]: [
            `忽略`,
            `Ignored`,
        ],
        [Type.B0447]: [
            `查找地图`,
            `Search Maps`,
        ],
        [Type.B0448]: [
            `需要密码`,
            `Password required`,
        ],
        [Type.B0449]: [
            `输入密码`,
            `Input Password`,
        ],

        ////////////////////////////////////////////////////////////////////////////////////////////////////
        [Type.B1000]: [
            `平原`,
            `Plain`,
        ],
        [Type.B1001]: [
            `河流`,
            `River`,
        ],
        [Type.B1002]: [
            `海洋`,
            `Sea`,
        ],
        [Type.B1003]: [
            `沙滩`,
            `Beach`,
        ],
        [Type.B1004]: [
            `道路`,
            `Road`,
        ],
        [Type.B1005]: [
            `桥梁`,
            `BridgeOnPlain`,
        ],
        [Type.B1006]: [
            `桥梁`,
            `BridgeOnRiver`,
        ],
        [Type.B1007]: [
            `桥梁`,
            `BridgeOnBeach`,
        ],
        [Type.B1008]: [
            `桥梁`,
            `BridgeOnSea`,
        ],
        [Type.B1009]: [
            `森林`,
            `Wood`,
        ],
        [Type.B1010]: [
            `高山`,
            `Mountain`,
        ],
        [Type.B1011]: [
            `荒野`,
            `Wasteland`,
        ],
        [Type.B1012]: [
            `废墟`,
            `Ruins`,
        ],
        [Type.B1013]: [
            `火堆`,
            `Fire`,
        ],
        [Type.B1014]: [
            `巨浪`,
            `Rough`,
        ],
        [Type.B1015]: [
            `迷雾`,
            `MistOnSea`,
        ],
        [Type.B1016]: [
            `礁石`,
            `Reef`,
        ],
        [Type.B1017]: [
            `等离子`,
            `Plasma`,
        ],
        [Type.B1018]: [
            `超级等离子`,
            `GreenPlasma`,
        ],
        [Type.B1019]: [
            `陨石`,
            `Meteor`,
        ],
        [Type.B1020]: [
            `导弹井`,
            `Silo`,
        ],
        [Type.B1021]: [
            `空导弹井`,
            `EmptySilo`,
        ],
        [Type.B1022]: [
            `指挥部`,
            `Headquarters`,
        ],
        [Type.B1023]: [
            `城市`,
            `City`,
        ],
        [Type.B1024]: [
            `指挥塔`,
            `CommandTower`,
        ],
        [Type.B1025]: [
            `雷达`,
            `Radar`,
        ],
        [Type.B1026]: [
            `工厂`,
            `Factory`,
        ],
        [Type.B1027]: [
            `机场`,
            `Airport`,
        ],
        [Type.B1028]: [
            `海港`,
            `Seaport`,
        ],
        [Type.B1029]: [
            `临时机场`,
            `TempAirport`,
        ],
        [Type.B1030]: [
            `临时海港`,
            `TempSeaport`,
        ],
        [Type.B1031]: [
            `迷雾`,
            `MistOnPlain`,
        ],
        [Type.B1032]: [
            `迷雾`,
            `MistOnRiver`,
        ],
        [Type.B1033]: [
            `迷雾`,
            `MistOnBeach`,
        ],

        [Type.B1200]: [
            `步兵`,
            `Infantry`,
        ],
        [Type.B1201]: [
            `反坦克兵`,
            `Mech`,
        ],
        [Type.B1202]: [
            `摩托兵`,
            `Bike`,
        ],
        [Type.B1203]: [
            `侦察车`,
            `Recon`,
        ],
        [Type.B1204]: [
            `照明车`,
            `Flare`,
        ],
        [Type.B1205]: [
            `防空车`,
            `AntiAir`,
        ],
        [Type.B1206]: [
            `轻型坦克`,
            `Tank`,
        ],
        [Type.B1207]: [
            `中型坦克`,
            `MediumTank`,
        ],
        [Type.B1208]: [
            `弩级坦克`,
            `WarTank`,
        ],
        [Type.B1209]: [
            `自走炮`,
            `Artillery`,
        ],
        [Type.B1210]: [
            `反坦克炮`,
            `AntiTank`,
        ],
        [Type.B1211]: [
            `火箭炮`,
            `Rockets`,
        ],
        [Type.B1212]: [
            `防空导弹车`,
            `Missiles`,
        ],
        [Type.B1213]: [
            `工程车`,
            `Rig`,
        ],
        [Type.B1214]: [
            `战斗机`,
            `Fighter`,
        ],
        [Type.B1215]: [
            `轰炸机`,
            `Bomber`,
        ],
        [Type.B1216]: [
            `攻击机`,
            `Duster`,
        ],
        [Type.B1217]: [
            `武装直升机`,
            `BattleCopter`,
        ],
        [Type.B1218]: [
            `运输直升机`,
            `TransportCopter`,
        ],
        [Type.B1219]: [
            `舰载机`,
            `Seaplane`,
        ],
        [Type.B1220]: [
            `战列舰`,
            `Battleship`,
        ],
        [Type.B1221]: [
            `航母`,
            `Carrier`,
        ],
        [Type.B1222]: [
            `潜艇`,
            `Submarine`,
        ],
        [Type.B1223]: [
            `驱逐舰`,
            `Cruiser`,
        ],
        [Type.B1224]: [
            `登陆舰`,
            `Lander`,
        ],
        [Type.B1225]: [
            `炮舰`,
            `Gunboat`,
        ],

        ////////////////////////////////////////////////////////////////////////////////////////////////////
        // Format strings.
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        [Type.F0000]: [
            "地图名称: %s",
            "Map name: %s",
        ],
        [Type.F0001]: [
            "作者: %s",
            "Designer: %s",
        ],
        [Type.F0002]: [
            "人数: %s",
            "Players: %s",
        ],
        [Type.F0003]: [
            "全服评分: %s",
            "Rating: %s",
        ],
        [Type.F0004]: [
            "全服游玩次数: %s",
            "Games played: %s",
        ],
        [Type.F0005]: [
            "战争迷雾: %s",
            "Fog: %s",
        ],
        [Type.F0006]: [
            `%d个部队尚未行动。`,
            `%d unit(s) have taken no action yet.`
        ],
        [Type.F0007]: [
            `%d个建筑尚未生产部队。`,
            `%d building(s) have built nothing yet.`
        ],
        [Type.F0008]: [
            `玩家[%s]已投降！`,
            `Player [%s] has resigned!`,
        ],
        [Type.F0009]: [
            `%s 的履历`,
            `%s's Profile`,
        ],
        [Type.F0010]: [
            `%d胜`,
            `Win: %d`,
        ],
        [Type.F0011]: [
            `%d负`,
            `Lose: %d`,
        ],
        [Type.F0012]: [
            `%d平`,
            `Draw: %d`,
        ],
        [Type.F0013]: [
            `玩家[%s]已战败！`,
            `Player [%s] is defeated!`,
        ],
        [Type.F0014]: [
            `玩家[%s]的最后一个部队耗尽燃料而坠毁，因而战败！`,
            `Player [%s] is defeated!`,
        ],
        [Type.F0015]: [
            `玩家[%s]的所有部队均被消灭，因而战败！`,
            `Player [%s] is defeated!`,
        ],
        [Type.F0016]: [
            `玩家[%s]的指挥部被占领，因而战败！`,
            `Player [%s] is defeated!`,
        ],
        [Type.F0017]: [
            `玩家[%s]已拒绝和局！`,
            `Player [%s] declines to end the game in draw!`,
        ],
        [Type.F0018]: [
            `玩家[%s]已同意和局！`,
            `Player [%s] agrees to end the game in draw!`,
        ],
        [Type.F0019]: [
            `玩家[%s]求和！`,
            `Player [%s] requests to end the game in draw!`,
        ],
        [Type.F0020]: [
            `最多%d字，可留空`,
            `%d characters for maximum, optional`,
        ],
        [Type.F0021]: [
            `最多%d位数字，可留空`,
            `%d digits for maximum, optional`,
        ],
        [Type.F0022]: [
            `%s (p%d) 回合正式开始！！`,
            `It's %s (p%d)'s turn!!`,
        ],
        [Type.F0023]: [
            `地图的总格子数必须小于%d，否则不能提审`,
            `The number of the tiles must be less than %d, or the map can't be submitted for review.`,
        ],
        [Type.F0024]: [
            `修改时间: %s`,
            `Modify Time: %s`,
        ],
        [Type.F0025]: [
            `要和玩家"%s"私聊吗？`,
            `Do you want to make a private chat with %s?`,
        ],
        [Type.F0026]: [
            `数据加载中，请%s秒后重试`,
            `Now loading, please wait %ds and retry.`,
        ],
        [Type.F0027]: [
            `"%s"上的一局多人对战已经正式开始！`,
            `A game on "%s" has started!`
        ],
        [Type.F0028]: [
            `玩家[%s]因超时而告负！`,
            `Player [%s] has ran out of time!`,
        ],
        [Type.F0029]: [
            `您确定要踢掉玩家"%s"吗？`,
            `Are you sure to kick off the player '%s'?`,
        ],
        [Type.F0030]: [
            `%s (p%d) 回合结束。`,
            `%s (p%d) has ended the turn!!`,
        ],
        [Type.F0031]: [
            `您最多只能禁用%d名CO。`,
            `You can only ban up to %d COs.`,
        ],
        [Type.F0032]: [
            `请把名称长度控制在%d个字符以内。`,
            `Please limit the length of the name to %d characters.`
        ],
        [Type.F0033]: [
            `启用SetPath模式后，在指定部队移动路线时，您需要连续点击两次目标格子才能呼出操作菜单。这会增加操作量，但同时也便于指定移动路线，这在雾战中尤其有用。\n您确定要启用吗？\n（当前状态：%s）`,
            `While the Set Path mode is enabled, you have to double click (or touch) a tile in order to make the unit action panel appear when you are moving units. This mode can be useful especially in FoW.\nAre you sure to enable it? \n(Current status: %s)`,
        ],
        [Type.F0034]: [
            `服务器内部错误，请通知作者，错误码: %d`,
            `Server internal error, code: %d`,
        ],
    };

    const NET_ERROR_TEXT: { [netErrorCode: number]: string[] } = {
        [ErrorCode.NoError]: [
            "",
            "",
        ],
        [ErrorCode.InternalError]: [
            "服务器内部错误，请通知作者",
            "Server internal errors.",
        ],
        [ErrorCode.IllegalRequest]: [
            "非法请求",
            "Illegal request.",
        ],
        [ErrorCode.User0000]: [
            `登录失败，可能是服务器内部错误。请尝试刷新游戏，并通知作者。`,
            `Failed to login. Please refresh the game.`,
        ],
        [ErrorCode.User0001]: [
            "账号或密码不正确，请检查后重试",
            "Invalid account and/or password.",
        ],
        [ErrorCode.User0002]: [
            "您已处于登陆状态，不可再次登陆",
            "You have logged in already.",
        ],
        [ErrorCode.Register_InvalidAccount]: [
            "账号不符合要求，请检查后重试",
            "Invalid account.",
        ],
        [ErrorCode.Register_UsedAccount]: [
            "该账号已被注册，请修改后再试",
            "The account has been registered.",
        ],
        [ErrorCode.Register_AlreadyLoggedIn]: [
            "您已处于登陆状态，不可注册账号",
            "You have logged in already.",
        ],
        [ErrorCode.Register_InvalidPassword]: [
            "密码不符合要求，请检查后重试",
            "Invalid password.",
        ],
        [ErrorCode.Register_InvalidNickname]: [
            "昵称不符合要求，请检查后重试",
            "Invalid nickname.",
        ],
        [ErrorCode.Register_UsedNickname]: [
            "该昵称已被使用，请修改后再试",
            "The nickname has been used.",
        ],
        [ErrorCode.MmMergeMap_SameSrcAndDst]: [
            "",
            "",
        ],
        [ErrorCode.MmMergeMap_NoSrcStatisticsData]: [
            "",
            "",
        ],
        [ErrorCode.MmMergeMap_NoDstStatisticsData]: [
            "",
            "",
        ],
        [ErrorCode.Mcr0000]: [
            "您已参与了许多未开始的战局，请退出部分后重试",
            "You have joined too many wars.",
        ],
        [ErrorCode.CreateMultiCustomWar_TooManyCreatedRooms]: [
            "您已创建了许多未开始的房间，请退出部分后重试",
            "You have created too many rooms simultaneously.",
        ],
        [ErrorCode.CreateMultiCustomWar_InvalidParams]: [
            "部分设定不符合规则，请检查后重试",
            "Invalid settings.",
        ],
        [ErrorCode.ExitMultiCustomWar_WarInfoNotExist]: [
            "战局不存在",
            "The game doesn't exist.",
        ],
        [ErrorCode.ExitMultiCustomWar_NotJoined]: [
            "您并未参加该战局",
            "You haven't joined the game.",
        ],
        [ErrorCode.JoinMultiCustomWar_TooManyJoinedWars]: [
            "您已参与了许多未开始的战局，请退出部分后重试",
            "You have joined too many wars.",
        ],
        [ErrorCode.JoinMultiCustomWar_InvalidParams]: [
            "部分设定不符合规则，请检查后重试",
            "Invalid settings.",
        ],
        [ErrorCode.JoinMultiCustomWar_WarInfoNotExist]: [
            "房间不存在",
            "The game doesn't exist.",
        ],
        [ErrorCode.JoinMultiCustomWar_AlreadyJoined]: [
            "您已加入了该房间。",
            "You have already joined the game.",
        ],
        [ErrorCode.GetMapDynamicInfo_NoSuchMap]: [
            "地图不存在，获取dynamic info失败。",
            "The map doesn't exist thus fail to get its dynamic info.",
        ],
        [ErrorCode.GetMapRawData_NoSuchMap]: [
            "地图不存在，获取raw data失败。",
            "The map doesn't exist thus fail to get its raw data.",
        ],
        [ErrorCode.GetUserPublicInfo_NoSuchUser]: [
            "用户不存在，获取user public info失败。",
            "The user doesn't exist thus fail to get its public info.",
        ],
        [ErrorCode.McrContinueWar_NoSuchWar]: [
            `战局不存在`,
            `The game doesn't exist.`,
        ],
        [ErrorCode.McrContinueWar_DefeatedOrNotJoined]: [
            `您未参与该战局，或已经被击败`,
            `You have not joined the game, or you have been defeated.`,
        ],
        [ErrorCode.McwBeginTurn_NoSuchWar]: [
            `战局不存在`,
            `The game doesn't exist.`,
        ],
        [ErrorCode.McwBeginTurn_InvalidActionId]: [
            `战局数据不同步，请刷新`,
            `The local data is out of synchronization. Please refresh.`,
        ],
        [ErrorCode.McwBeginTurn_NotInTurn]: [
            `当前无法开始您的回合`,
            `Unable to begin turn.`,
        ],
        [ErrorCode.McwEndTurn_NoSuchWar]: [
            `战局不存在`,
            `The game doesn't exist.`,
        ],
        [ErrorCode.McwEndTurn_InvalidActionId]: [
            `战局数据不同步，请刷新`,
            `The local data is out of synchronization. Please refresh.`,
        ],
        [ErrorCode.McwEndTurn_NotInTurn]: [
            `当前无法结束您的回合`,
            `Unable to end turn.`,
        ],
        [ErrorCode.McwEndTurn_NotVotedForDraw]: [
            `您尚未完成关于和局的投票`,
            `You haven't voted for the draw of game.`,
        ],
        [ErrorCode.McwWatchRequestWatcher_TargetPlayerLost]: [
            `该玩家已战败，无法观战`,
            `The target player has been defeated in the game.`
        ],
        [ErrorCode.McwWatchRequestWatcher_AlreadyRequested]: [
            `已请求观战该玩家`,
            `You have already requested to watch the player.`,
        ],
        [ErrorCode.McwWatchRequestWatcher_AlreadyAccepted]: [
            `观战请求已被接受`,
            `The request has already been accepted.`,
        ],
        [ErrorCode.ServerDisconnect_ServerMaintenance]: [
            `服务器维护中`,
            `The server is under maintenance.`,
        ],
    };

    const RICH_DATA = {
        [RichType.R0000]: [
            [
                `本选项影响您在回合中的行动顺序，以及您所属的队伍（由地图规则设定）`,
                ``,
                `战局中，属于同一队伍的玩家共享视野，部队能够相互穿越，不能相互攻击/装载/用后勤车补给。`,
                `此外，可以使用队友的建筑来维修/补给自己的部队（消耗自己的金钱），但不能占领队友的建筑。`,
                ``,
                `预览地图时，各个势力的颜色与行动顺序的对应关系如下（您可以在创建/加入房间时选择您想要的颜色）：`,
                `红=1，蓝=2，黄=3，黑=4`,
                ``,
                `默认为当前可用选项中的第一项。`,
            ].join("\n"),

            [
                `This option determines your turn order and your team. `,
                ``,
                `In the game players in the same team share the vision. Their troops will not block and attack each other. It is not possible to supply your allies' troops with Rigs or load into allies' transports. `,
                `You may use allies' properties to repair (use your own funds) and supply your troops and you cannot capture allies' properties`,
                ``,
                `When previewing the map, the colors of the forces correspond to the order of action as follows (you can choose the color you want when creating/adding rooms)`,
                `Red = 1, Blue = 2, Yellow = 3, Black = 4`,
                ``,
                `By default you will be given the first choice among the available ones.`,
            ].join("\n"),
        ],

        [RichType.R0001]: [
            [
                `本选项影响您部队和建筑的外观（颜色）。`,
            ].join("\n"),

            [
                `This option determines the color of your troops and properties.`,
            ].join("\n"),
        ],

        [RichType.R0002]: [
            [
                `本选项影响战局是明战或雾战。`,
                ``,
                `明战下，您可以观察到整个战场的情况。雾战下，您只能看到自己军队的视野内的战场情况。`,
                `雾战难度相对较大。如果您是新手，建议先通过明战熟悉游戏系统，再尝试雾战模式。`,
                ``,
                `默认为“否”（即明战）。`,
            ].join("\n"),

            [
                `This option determines whether this game is FOW or not. `,
                ``,
                `When FOW is off you have the view of the whole battlefield. When FOW is on you can only see the battlefield within the vision of your troops. `,
                `FOW is relatively difficult and it is recommended that new players should start from no FOW to learn the basics of the game before advancing to FOW mode. `,
                ``,
                `By default this option is disabled (no FOW). `,
            ].join("\n"),
        ],

        [RichType.R0003]: [
            [
                `本选项影响所有玩家的每回合的时限。`,
                ``,
                `如果某个玩家的回合时间超出了限制，则服务器将自动为该玩家执行投降操作。`,
                `当战局正式开始，或某个玩家结束回合后，则服务器自动开始下个玩家回合的倒计时（无论该玩家是否在线）。`,
                `当前有“常规”和“增量”两种计时模式可选。`,
                ``,
                `常规计时：每回合的可用时间是固定不变的。`,
                ``,
                `增量计时：玩家每回合可用的时间将受到前面回合所消耗的时间的影响。此模式有两个参数，分别为“初始时间”和“增量时间”。`,
                `第一回合，玩家拥有的时间就是“初始时间”。`,
                `第二及后续所有回合，玩家拥有的时间=上一个回合的剩余时间+（上回合结束时的剩余部队数*增量时间）。`,
                ``,
                `默认为“常规计时-3天”。`,
            ].join("\n"),

            [
                `This option determines the boot timer, aka time available for each turn. `,
                ``,
                `If a player hits the boot timer, the player will resign automatically. `,
                `When the game starts, or a player ends his turn, the timer of the first (or the next) player will start to countdown, no matter that player is online or not. `,
                `Currently, there are two timing modes available: regular and incremental.`,
                ``,
                `Regular timing: the available time for each round is fixed.`,
                ``,
                `Incremental timing: The time available for each round will be affected by the time consumed in the previous round. This mode has two parameters, namely "Initial Time" and "Incremental Time".`,
                `For the first round, the time the player has is "Initial Time".`,
                `For the second round and all subsequent rounds, the time the player has equals the remaining time of the previous round plus (the number of troops remaining in the previous round multiplies the "increment time").`,
                ``,
                `By default this option is selected as "regular timer with 3 days per round". `,
            ].join("\n"),
        ],

        [RichType.R0004]: [
            [
                `CO能够搭乘到部队中，并改变临近区域的部队的战斗能力。此外，部分CO能通过战斗积累能量，并以此释放强大的power，从而进一步制造优势。`,
                `CO详细规则如下：`,
                `- CO需要搭乘到部队中才能发挥作用，包括日常能力和power（如果有的话）。power又分为COP和SCOP两种`,
                `- 同一势力，CO无法同时搭乘到两个或以上的部队中`,
                `- CO只能在工厂、机场、海港、大本营进行搭乘，其中工厂可搭乘陆军，机场可搭乘空军，海港可搭乘海军，大本营可搭乘任意类型部队`,
                `- CO搭乘前，目标部队必须是未行动的状态，且正处在可搭乘的地形上；搭乘后部队可以再次行动`,
                `- 若自己回合内，CO所在部队被摧毁（无论是自毁还是被击毁），则当回合内无法再搭乘`,
                `- 搭乘需要花费资金，数量为目标部队原价的特定百分比值（各个CO的比例可能不同）`,
                `- 搭乘瞬间，目标部队立刻升到满级，且CO日常能力立刻生效`,
                `- CO的日常能力，通常情况下只对CO所在部队的特定距离（即CO zone，下称COZ）内的部队生效；若有例外，以CO技能描述为准`,
                `- 若CO所在部队被装载，则COZ消失，直到该部队被卸载到地图上`,
                `- 只有部分CO有能量和COP/SCOP，具体以CO描述为准`,
                `- 处于我方COZ内的我方部队对任意敌方部队发起攻击，造成伤害时会累积我方能量，每打掉1HP则增加1能量，与部队价值无关；自身受伤时不积累能量`,
                `- 处于我方COZ内的敌方部队对任意我方部队发起攻击，我方部队反击造成对方受伤时会累积我方能量，累积规则同上`,
                `- 部分CO可以扩张COZ，以"zone扩张能量值"列表决定；能量每达到列表中的一个值，则COZ+1。也就是说，如果该列表为空，则COZ无法扩张；如果列表有三个数值，则COZ最多可以扩张三次`,
                `- 有能量的CO，其能量最大值是SCOP所需能量及"zone扩张能量值"中的最大值`,
                `- COP/SCOP（如果有的话）需要消耗相应的能量才能发动；发动后，直到我方下回合开始之前，我方能量无法累积`,
                `- 若能量足够，CO所在部队可以在未行动时发动COP/SCOP；发动COP/SCOP需要消耗该部队的行动机会，也就是说不能发动后再攻击（但是允许移动后发COP/SCOP）`,
                `- COP/SCOP持续一回合，直到我方下回合开始时消失；其效果对全地图所有部队都生效（即使在视野外），具体以CO技能描述为准`,
                `- COP/SCOP生效期间，日常能力失效`,
                `- 即使发动过COP/SCOP，能量累积速度也不变`,
                `- 若CO所在部队被击毁，则能量清零；若该CO正在发动COP/SCOP，则该COP/SCOP效果立刻消失`,
            ].join("\n\n"),

            [
                `COs can board onto the troops and provide buffs for troops around. Besides, some COs can charge CO power metre in the battle and use CO power to achieve a bigger advantage. `,
                `The detailed rules of COs are listed below: `,
                `01. COs needs to board onto the troops to use their d2d abilities and powers. Powers may include cop and sp. `,
                `02. There can be only 1 CO for each side. `,
                `03. COs can board onto troops from bases, airports, ports and HQs. Bases are for land forces. Airports are for air forces. Ports are for navies while COs can board onto any troops from HQs. `,
                `04. COs can only board onto troops ready to move. Troops can move again after that. `,
                `05. If unit with CO on board is destroyed in your turn(i.e. killed by counter attack & crash after using up fuels), COs cannot board onto another unit in that turn. `,
                `06. It takes funds for CO to board onto troops, which equals to a modifier(CO specific) multiplied by the cost of the full HP unit. `,
                `07. Upon the boarding of CO the unit got veteran status and CO's d2d takes effect at once. `,
                `08. In usual cases CO's d2d works only on troops within the CO zone. `,
                `09. If units with CO on board are loaded the CO zone will not appear until it is unloaded again. `,
                `10. Only certain COs got cop and scop. `,
                `11. CO power metre is charged when units within CO zone deal damage to enemy units. 1 HP damage is converted to 1 unit of metre charge. `,
                `12. CO metre can also be charged by counterattack if target enemy units are in the COZ. The rule is the same as above. `,
                `13. Some COs can expand their CO zone, which is showed in the coz expansion chart. COZ expands by 1 tile for reaching a number in the chart. The coz cannot be expanded if the chart is "--". The coz can be expanded for 3 times if there are 3 numbers in the chart (a/b/c). `,
                `14. The maximum amount of metre of a CO is the larger number of SCOP cost and the largest COZ expansion cost. `,
                `15. COP/SCOP takes corresponding amount of power to activate. The power metre cannot be charged when cop/scop is active. `,
                `16. To activate COP/SCOP the unit with CO on board should be ready to move. You may use power after moving, but it is not possible to do so after attacking. `,
                `17. COP/SCOP lasts a turn, which means it ends at the beginning of your next turn. It works on all units in the map. `,
                `18. When COP/SCOP is active d2d does not work. `,
                `19. After using COP/SCOP the power metre charges at the same rate. `,
                `20. If units with CO on board are destroyed the power metre is reset to 0. If a COP/SCOP is active the COP/SCOP will also end.`,
            ].join("\n\n"),
        ],

        [RichType.R0005]: [
            [
                `1.账号和密码都只能使用数字、字母、下划线，长度不小于6位`,
                `2.昵称可使用任意字符，长度不小于4位`,
                `3.注册后，账号不可修改，密码和昵称可修改`,
            ].join("\n"),

            [
                `1 Usernames and passwords should only consist of numbers, english characters and "_". It should not be shorter than 6 characters. `,
                `2 You can use any characters for nickname. The length should be no shorter than 4 characters. `,
                `3 After the registry you cannot change your username, but the password and nickname can be changed.`,
            ].join("\n"),
        ],

        [RichType.R0006]: [
            [
                `模拟战是一种辅助您进行战局规划/地图测试的工具。`,
                `该工具允许您把当前所见到的战局信息原样复制到单人战局中。您可以在该单人战局中随意操作，还可以无限制地存档、读档，直到您找到最好的走法为止。`,
                `在该模式下，游戏规则仍然正常生效。换言之，您可以结束回合，或者做其他任何常规操作，游戏会为您正常结算相关数据。`,
                ``,
                `另：上帝模式开发中，敬请期待！`,
            ].join("\n"),
            [
                `Simulation (or Move Planner) is a tool to plan game moves and test maps.`,
                `It enables you to copy the game screen to a single player game. You may move any unit and save/load for unlimited times till you're satisfied with the move.`,
                `In this mode the game rule works normally. For example, you may end your turn and the fund will be added as usual.`,
                ``,
                `Sandbox Mode (where you can set unit HP for a better planning purpose) is now under development, and it may be online SOOOON.`,
            ].join("\n"),
        ],

        [RichType.R0007]: [
            [
                `感谢您游玩Tiny Wars!`,
                `请点击/触摸右方的滚动列表以开始游戏。`,
                ``,
                `QQ群: 368142455`,
                `Discord: https://discord.gg/jdtRpY9`,
                ``,
                `GitHub: https://github.com/Babygogogo/TinyWarsClient`,
            ].join("\n"),
            [
                `Thank you for playing Tiny Wars!`,
                `To start, touch the scroll list to the right.`,
                ``,
                `Discord: https://discord.gg/jdtRpY9`,
                `QQ group: 368142455`,
                ``,
                `GitHub: https://github.com/Babygogogo/TinyWarsClient`,
            ].join("\n"),
        ],
    };

    let _languageType = LanguageType.Chinese;
    export function init(): void {
        setLanguageType(LocalStorage.getLanguageType());
    }

    export function getLanguageType(): LanguageType {
        return _languageType;
    }
    export function setLanguageType(language: LanguageType): void {
        _languageType = language;
    }

    export function getText(t: Type): string {
        return getTextWithLanguage(t, _languageType);
    }
    export function getTextWithLanguage(t: Type, language: LanguageType): string {
        return _LANG_DATA[t][language];
    }

    export function getFormattedText(t: Type, ...params: any[]): string {
        return Helpers.formatString(getText(t), ...params);
    }

    export function getNetErrorText(code: ErrorCode): string {
        const texts = NET_ERROR_TEXT[code];
        if (texts) {
            return texts[_languageType];
        } else {
            return getFormattedText(Type.F0034, code);
        }
    }

    export function getRichText(richType: RichType): string {
        return RICH_DATA[richType][_languageType];
    }

    export function getPlayerForceName(playerIndex: number): string {
        return `P${playerIndex}`;
    }

    export function getPlayerTeamName(teamIndex: number): string {
        switch (teamIndex) {
            case 1  : return getText(Type.B0008);
            case 2  : return getText(Type.B0009);
            case 3  : return getText(Type.B0010);
            case 4  : return getText(Type.B0011);
            default : return undefined;
        }
    }

    export function getTileName(tileType: Types.TileType): string {
        switch (tileType) {
            case Types.TileType.Plain           : return getText(Type.B1000);
            case Types.TileType.River           : return getText(Type.B1001);
            case Types.TileType.Sea             : return getText(Type.B1002);
            case Types.TileType.Beach           : return getText(Type.B1003);
            case Types.TileType.Road            : return getText(Type.B1004);
            case Types.TileType.BridgeOnPlain   : return getText(Type.B1005);
            case Types.TileType.BridgeOnRiver   : return getText(Type.B1006);
            case Types.TileType.BridgeOnBeach   : return getText(Type.B1007);
            case Types.TileType.BridgeOnSea     : return getText(Type.B1008);
            case Types.TileType.Wood            : return getText(Type.B1009);
            case Types.TileType.Mountain        : return getText(Type.B1010);
            case Types.TileType.Wasteland       : return getText(Type.B1011);
            case Types.TileType.Ruins           : return getText(Type.B1012);
            case Types.TileType.Fire            : return getText(Type.B1013);
            case Types.TileType.Rough           : return getText(Type.B1014);
            case Types.TileType.MistOnSea       : return getText(Type.B1015);
            case Types.TileType.Reef            : return getText(Type.B1016);
            case Types.TileType.Plasma          : return getText(Type.B1017);
            case Types.TileType.GreenPlasma     : return getText(Type.B1018);
            case Types.TileType.Meteor          : return getText(Type.B1019);
            case Types.TileType.Silo            : return getText(Type.B1020);
            case Types.TileType.EmptySilo       : return getText(Type.B1021);
            case Types.TileType.Headquarters    : return getText(Type.B1022);
            case Types.TileType.City            : return getText(Type.B1023);
            case Types.TileType.CommandTower    : return getText(Type.B1024);
            case Types.TileType.Radar           : return getText(Type.B1025);
            case Types.TileType.Factory         : return getText(Type.B1026);
            case Types.TileType.Airport         : return getText(Type.B1027);
            case Types.TileType.Seaport         : return getText(Type.B1028);
            case Types.TileType.TempAirport     : return getText(Type.B1029);
            case Types.TileType.TempSeaport     : return getText(Type.B1030);
            case Types.TileType.MistOnPlain     : return getText(Type.B1031);
            case Types.TileType.MistOnRiver     : return getText(Type.B1032);
            case Types.TileType.MistOnBeach     : return getText(Type.B1033);
            default                             : return undefined;
        }
    }

    export function getUnitName(unitType: Types.UnitType): string {
        switch (unitType) {
            case Types.UnitType.Infantry        : return getText(Type.B1200);
            case Types.UnitType.Mech            : return getText(Type.B1201);
            case Types.UnitType.Bike            : return getText(Type.B1202);
            case Types.UnitType.Recon           : return getText(Type.B1203);
            case Types.UnitType.Flare           : return getText(Type.B1204);
            case Types.UnitType.AntiAir         : return getText(Type.B1205);
            case Types.UnitType.Tank            : return getText(Type.B1206);
            case Types.UnitType.MediumTank      : return getText(Type.B1207);
            case Types.UnitType.WarTank         : return getText(Type.B1208);
            case Types.UnitType.Artillery       : return getText(Type.B1209);
            case Types.UnitType.AntiTank        : return getText(Type.B1210);
            case Types.UnitType.Rockets         : return getText(Type.B1211);
            case Types.UnitType.Missiles        : return getText(Type.B1212);
            case Types.UnitType.Rig             : return getText(Type.B1213);
            case Types.UnitType.Fighter         : return getText(Type.B1214);
            case Types.UnitType.Bomber          : return getText(Type.B1215);
            case Types.UnitType.Duster          : return getText(Type.B1216);
            case Types.UnitType.BattleCopter    : return getText(Type.B1217);
            case Types.UnitType.TransportCopter : return getText(Type.B1218);
            case Types.UnitType.Seaplane        : return getText(Type.B1219);
            case Types.UnitType.Battleship      : return getText(Type.B1220);
            case Types.UnitType.Carrier         : return getText(Type.B1221);
            case Types.UnitType.Submarine       : return getText(Type.B1222);
            case Types.UnitType.Cruiser         : return getText(Type.B1223);
            case Types.UnitType.Lander          : return getText(Type.B1224);
            case Types.UnitType.Gunboat         : return getText(Type.B1225);
            default                             : return undefined;
        }
    }

    export function getUnitActionName(actionType: Types.UnitActionType): string {
        switch (actionType) {
            case Types.UnitActionType.BeLoaded          : return getText(Type.B0037);
            case Types.UnitActionType.Join              : return getText(Type.B0038);
            case Types.UnitActionType.UseCoPower        : return getText(Type.B0142);
            case Types.UnitActionType.UseCoSuperPower   : return getText(Type.B0144);
            case Types.UnitActionType.Attack            : return getText(Type.B0039);
            case Types.UnitActionType.Capture           : return getText(Type.B0040);
            case Types.UnitActionType.Dive              : return getText(Type.B0041);
            case Types.UnitActionType.Surface           : return getText(Type.B0042);
            case Types.UnitActionType.BuildTile         : return getText(Type.B0043);
            case Types.UnitActionType.Supply            : return getText(Type.B0044);
            case Types.UnitActionType.LaunchUnit        : return getText(Type.B0045);
            case Types.UnitActionType.DropUnit          : return getText(Type.B0046);
            case Types.UnitActionType.LaunchFlare       : return getText(Type.B0047);
            case Types.UnitActionType.LaunchSilo        : return getText(Type.B0048);
            case Types.UnitActionType.LoadCo            : return getText(Type.B0139);
            case Types.UnitActionType.ProduceUnit       : return getText(Type.B0049);
            case Types.UnitActionType.Wait              : return getText(Type.B0050);
            default                                     : return undefined;
        }
    }

    export function getRankName(playerRank: number): string {
        switch (playerRank) {
            case 0  : return getText(Type.B0061);
            case 1  : return getText(Type.B0062);
            case 2  : return getText(Type.B0063);
            case 3  : return getText(Type.B0064);
            case 4  : return getText(Type.B0065);
            case 5  : return getText(Type.B0066);
            case 6  : return getText(Type.B0067);
            case 7  : return getText(Type.B0068);
            case 8  : return getText(Type.B0069);
            case 9  : return getText(Type.B0070);
            case 10 : return getText(Type.B0071);
            case 11 : return getText(Type.B0072);
            case 12 : return getText(Type.B0073);
            case 13 : return getText(Type.B0074);
            case 14 : return getText(Type.B0075);
            case 15 : return getText(Type.B0076);
            default : return undefined;
        }
    }

    export function getMoveTypeName(t: Types.MoveType): string {
        switch (t) {
            case Types.MoveType.Air         : return getText(Type.B0117);
            case Types.MoveType.Infantry    : return getText(Type.B0112);
            case Types.MoveType.Mech        : return getText(Type.B0113);
            case Types.MoveType.Ship        : return getText(Type.B0118);
            case Types.MoveType.Tank        : return getText(Type.B0114);
            case Types.MoveType.TireA       : return getText(Type.B0115);
            case Types.MoveType.TireB       : return getText(Type.B0116);
            case Types.MoveType.Transport   : return getText(Type.B0119);
            default                         : return undefined;
        }
    }

    export function getUnitCategoryName(t: Types.UnitCategory): string {
        switch (t) {
            case Types.UnitCategory.All                 : return getText(Type.B0120);
            case Types.UnitCategory.Ground              : return getText(Type.B0121);
            case Types.UnitCategory.Naval               : return getText(Type.B0122);
            case Types.UnitCategory.Air                 : return getText(Type.B0123);
            case Types.UnitCategory.GroundOrNaval       : return getText(Type.B0124);
            case Types.UnitCategory.GroundOrAir         : return getText(Type.B0125);
            case Types.UnitCategory.Direct              : return getText(Type.B0126);
            case Types.UnitCategory.Indirect            : return getText(Type.B0127);
            case Types.UnitCategory.Foot                : return getText(Type.B0128);
            case Types.UnitCategory.Infantry            : return getText(Type.B0129);
            case Types.UnitCategory.Vehicle             : return getText(Type.B0130);
            case Types.UnitCategory.DirectMachine       : return getText(Type.B0131);
            case Types.UnitCategory.Transport           : return getText(Type.B0132);
            case Types.UnitCategory.LargeNaval          : return getText(Type.B0133);
            case Types.UnitCategory.Copter              : return getText(Type.B0134);
            case Types.UnitCategory.Tank                : return getText(Type.B0135);
            case Types.UnitCategory.AirExceptSeaplane   : return getText(Type.B0136);
            default                                     : return null;
        }
    }

    export function getWarTypeName(type: Types.WarType): string {
        switch (type) {
            case Types.WarType.McwStd   : return getText(Type.B0417);
            case Types.WarType.McwFog   : return getText(Type.B0418);
            case Types.WarType.Me       : return getText(Type.B0419);
            case Types.WarType.RmwStd   : return getText(Type.B0415);
            case Types.WarType.RmwFog   : return getText(Type.B0416);
            case Types.WarType.Scw      : return getText(Type.B0254);
            case Types.WarType.Wrw      : return getText(Type.B0257);
            default                     : return null;
        }
    }

    export function getMapReviewStatusText(status: Types.MapReviewStatus): string {
        switch (status) {
            case Types.MapReviewStatus.None         : return getText(Type.B0273);
            case Types.MapReviewStatus.Reviewing    : return getText(Type.B0274);
            case Types.MapReviewStatus.Rejected     : return getText(Type.B0275);
            case Types.MapReviewStatus.Accepted     : return getText(Type.B0276);
            default                                 : return null;
        }
    }

    export function getMapInvalidationDesc(type: Types.CustomMapInvalidationType): string {
        switch (type) {
            case Types.CustomMapInvalidationType.InvalidMapDesigner     : return Lang.getText(Lang.Type.A0118);
            case Types.CustomMapInvalidationType.InvalidMapName         : return Lang.getText(Lang.Type.A0119);
            case Types.CustomMapInvalidationType.InvalidPlayersCount    : return Lang.getText(Lang.Type.A0121);
            case Types.CustomMapInvalidationType.InvalidTiles           : return Lang.getText(Lang.Type.A0123);
            case Types.CustomMapInvalidationType.InvalidUnits           : return Lang.getText(Lang.Type.A0122);
            case Types.CustomMapInvalidationType.InvalidWarRuleList     : return Lang.getText(Lang.Type.A0124);
            default                                                     : return "";
        }
    }

    export function getMapEditorDrawerModeText(mode: Types.MapEditorDrawerMode): string {
        switch (mode) {
            case Types.MapEditorDrawerMode.Preview          : return getText(Type.B0286);
            case Types.MapEditorDrawerMode.DrawUnit         : return getText(Type.B0281);
            case Types.MapEditorDrawerMode.DrawTileBase     : return getText(Type.B0282);
            case Types.MapEditorDrawerMode.DrawTileObject   : return getText(Type.B0283);
            case Types.MapEditorDrawerMode.DeleteUnit       : return getText(Type.B0284);
            case Types.MapEditorDrawerMode.DeleteTileObject : return getText(Type.B0285);
            default                                         : return null;
        }
    }

    export function getUnitActionStateText(state: Types.UnitActionState): string {
        switch (state) {
            case Types.UnitActionState.Acted    : return getText(Type.B0368);
            case Types.UnitActionState.Idle     : return getText(Type.B0369);
            default                             : return null;
        }
    }

    export function getChatChannelName(channel: Types.ChatChannel): string {
        switch (channel) {
            case Types.ChatChannel.System   : return getText(Type.B0374);
            case Types.ChatChannel.PublicEn : return getText(Type.B0373);
            case Types.ChatChannel.PublicCn : return getText(Type.B0384);
            default                         : return null;
        }
    }

    export function getUnitAndTileSkinName(skinId: number): string {
        switch (skinId) {
            case 0  : return "";
            case 1  : return getText(Type.B0004);
            case 2  : return getText(Type.B0005);
            case 3  : return getText(Type.B0006);
            case 4  : return getText(Type.B0007);
            default : return null;
        }
    }

    export function getWarRuleNameInLanguage(warRule: ProtoTypes.WarRule.IWarRule): string | undefined {
        if (warRule.ruleId == null) {
            return getText(Type.B0321);
        } else {
            const list = warRule.ruleNameList;
            return getLanguageType() === LanguageType.Chinese
                ? list[0]
                : list[1] || list[0];
        }
    }

    export function getNameInCurrentLanguage(nameList: string[] | null | undefined): string | undefined {
        if (!nameList) {
            return undefined;
        } else {
            return getLanguageType() === LanguageType.Chinese
                ? nameList[0]
                : nameList[1] || nameList[0];
        }
    }

    export function getBootTimerTypeName(type: Types.BootTimerType): string {
        switch (type) {
            case Types.BootTimerType.Regular    : return getText(Type.B0387);
            case Types.BootTimerType.Incremental: return getText(Type.B0388);
            default                             : return null;
        }
    }
    export function getBootTimerDesc(params: number[]): string {
        params          = params || [];
        const timerType = params[0] as Types.BootTimerType;
        if (timerType === Types.BootTimerType.Regular) {
            return `${getText(Type.B0387)} ${Helpers.getTimeDurationText2(params[1])}`;
        } else if (timerType === Types.BootTimerType.Incremental) {
            return `${getText(Type.B0388)} ${Helpers.getTimeDurationText2(params[1])} + ${Helpers.getTimeDurationText2(params[2])}`;
        } else {
            return null;
        }
    }
    export async function getGameStartDesc(data: ProtoTypes.NetMessage.MsgMpwCommonBroadcastGameStart.IS): Promise<string> {
        const playerList: string[] = [];
        let playerIndex = 1;
        for (const playerInfo of data.playerInfoList) {
            playerList.push(`P${playerIndex}: ${await User.UserModel.getUserNickname(playerInfo.userId)}`);
            ++playerIndex;
        }
        return [
            getFormattedText(Type.F0027, await WarMap.WarMapModel.getMapNameInCurrentLanguage(data.mapId)),
            ...playerList,
            getText(Type.A0125)
        ].join("\n");
    }
}
