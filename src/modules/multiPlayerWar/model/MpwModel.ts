
namespace TinyWars.MultiPlayerWar.MpwModel {
    import Types                = Utility.Types;
    import Logger               = Utility.Logger;
    import ProtoTypes           = Utility.ProtoTypes;
    import Lang                 = Utility.Lang;
    import FloatText            = Utility.FloatText;
    import CommonAlertPanel     = Common.CommonAlertPanel;
    import IMpwWarInfo          = ProtoTypes.MultiPlayerWar.IMpwWarInfo;
    import IMpwWatchInfo        = ProtoTypes.MultiPlayerWar.IMpwWatchInfo;
    import ActionContainer      = ProtoTypes.WarAction.IActionContainer;

    let _allWarInfoList         : IMpwWarInfo[] = [];
    let _unwatchedWarInfos      : IMpwWatchInfo[];
    let _watchOngoingWarInfos   : IMpwWatchInfo[];
    let _watchRequestedWarInfos : IMpwWatchInfo[];
    let _watchedWarInfos        : IMpwWatchInfo[];
    let _war                    : MpwWar;
    let _cachedActions          : ActionContainer[] = [];

    export function init(): void {
    }

    export function setAllMyWarInfoList(infoList: IMpwWarInfo[]): void {
        _allWarInfoList = infoList || [];
    }
    function getAllMyWarInfoList(): IMpwWarInfo[] {
        return _allWarInfoList;
    }
    export function getMyMcwWarInfoList(): IMpwWarInfo[] {
        return getAllMyWarInfoList().filter(v => v.settingsForMcw != null);
    }
    export function getMyRmwWarInfoList(): IMpwWarInfo[] {
        return getAllMyWarInfoList().filter(v => v.settingsForRmw != null);
    }

    export function checkIsRedForMyMcwWars(): boolean {
        const selfUserId = User.UserModel.getSelfUserId();
        return getMyMcwWarInfoList().some(warInfo => {
            return warInfo.playerInfoList.some(v => (v.playerIndex === warInfo.playerIndexInTurn) && (v.userId === selfUserId));
        });
    }
    export function checkIsRedForMyRmwWars(): boolean {
        const selfUserId = User.UserModel.getSelfUserId();
        return getMyRmwWarInfoList().some(warInfo => {
            return warInfo.playerInfoList.some(v => (v.playerIndex === warInfo.playerIndexInTurn) && (v.userId === selfUserId));
        });
    }

    export function setUnwatchedWarInfos(infos: IMpwWatchInfo[]): void {
        _unwatchedWarInfos = infos;
    }
    export function getUnwatchedWarInfos(): IMpwWatchInfo[] | null {
        return _unwatchedWarInfos;
    }

    export function setWatchOngoingWarInfos(infos: IMpwWatchInfo[]): void {
        _watchOngoingWarInfos = infos;
    }
    export function getWatchOngoingWarInfos(): IMpwWatchInfo[] | null {
        return _watchOngoingWarInfos;
    }

    export function setWatchRequestedWarInfos(infos: IMpwWatchInfo[]): void {
        _watchRequestedWarInfos = infos;
    }
    export function getWatchRequestedWarInfos(): IMpwWatchInfo[] | null {
        return _watchRequestedWarInfos;
    }

    export function setWatchedWarInfos(infos: IMpwWatchInfo[]): void {
        _watchedWarInfos = infos;
    }
    export function getWatchedWarInfos(): IMpwWatchInfo[] | null {
        return _watchedWarInfos;
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////
    // Functions for managing war.
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    export async function loadWar(data: ProtoTypes.WarSerialization.ISerialWar): Promise<MpwWar> {
        if (getWar()) {
            Logger.warn(`McwModel.loadWar() another war has been loaded already!`);
            unloadWar();
        }

        const war = data.settingsForMcw
            ? (await new MultiCustomWar.McwWar().init(data)).startRunning().startRunningView() as MpwWar
            : (await new RankMatchWar.RmwWar().init(data)).startRunning().startRunningView() as MpwWar;
        _setWar(war);
        _checkAndRequestBeginTurn(war);

        return war;
    }
    export function unloadWar(): void {
        const war = getWar();
        if (war) {
            war.stopRunning();
            _setWar(undefined);
            _cachedActions.length = 0;
        }
    }

    export function getWar(): MpwWar | undefined {
        return _war;
    }
    function _setWar(war: MpwWar): void {
        _war = war;
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////
    // Handlers for war actions that McwProxy receives.
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    export async function updateOnPlayerSyncWar(data: ProtoTypes.NetMessage.MsgMpwCommonSyncWar.IS): Promise<void> {
        const war = getWar();
        if ((war) && (war.getWarId() === data.warId)) {
            const status = data.status as Types.SyncWarStatus;
            if (status === Types.SyncWarStatus.Defeated) {
                war.setIsEnded(true);
                CommonAlertPanel.show({
                    title   : Lang.getText(Lang.Type.B0088),
                    content : Lang.getText(Lang.Type.A0023),
                    callback: () => {
                        if (war instanceof RankMatchWar.RmwWar) {
                            Utility.FlowManager.gotoRmrMyWarListPanel();
                        } else {
                            Utility.FlowManager.gotoMcrMyWarListPanel();
                        }
                    },
                });

            } else if (status === Types.SyncWarStatus.EndedOrNotExists) {
                war.setIsEnded(true);
                CommonAlertPanel.show({
                    title   : Lang.getText(Lang.Type.B0088),
                    content : Lang.getText(Lang.Type.A0035),
                    callback: () => {
                        if (war instanceof RankMatchWar.RmwWar) {
                            Utility.FlowManager.gotoRmrMyWarListPanel();
                        } else {
                            Utility.FlowManager.gotoMcrMyWarListPanel();
                        }
                    },
                });

            } else if (status === Types.SyncWarStatus.NoError) {
                const requestType = data.requestType as Types.SyncWarRequestType;
                if (requestType === Types.SyncWarRequestType.PlayerForce) {
                    war.setIsEnded(true);
                    await Utility.FlowManager.gotoMultiCustomWar(data.war),
                    FloatText.show(Lang.getText(Lang.Type.A0038));

                } else {
                    const cachedActionsCount = _cachedActions.length;
                    if (data.executedActionsCount !== war.getExecutedActionsCount() + cachedActionsCount) {
                        war.setIsEnded(true);
                        await Utility.FlowManager.gotoMultiCustomWar(data.war);
                        FloatText.show(Lang.getText(Lang.Type.A0036));

                    } else {
                        if (requestType === Types.SyncWarRequestType.PlayerRequest) {
                            FloatText.show(Lang.getText(Lang.Type.A0038));
                        } else {
                            // Nothing to do.
                        }
                        if (!war.getIsExecutingAction()) {
                            if (cachedActionsCount) {
                                MpwActionExecutor.checkAndRunFirstCachedAction(war, _cachedActions);
                            } else {
                                _checkAndRequestBeginTurn(war);
                            }
                        }
                    }
                }

            } else if (status === Types.SyncWarStatus.NotJoined) {
                // Something wrong!!
                war.setIsEnded(true);
                CommonAlertPanel.show({
                    title   : Lang.getText(Lang.Type.B0088),
                    content : Lang.getText(Lang.Type.A0037),
                    callback: () => Utility.FlowManager.gotoLobby(),
                });

            } else if (status === Types.SyncWarStatus.Synchronized) {
                const requestType = data.requestType as Types.SyncWarRequestType;
                if (requestType === Types.SyncWarRequestType.PlayerRequest) {
                    FloatText.show(Lang.getText(Lang.Type.A0038));
                } else {
                    // Nothing to do.
                }

            } else {
                // Something wrong!!
                war.setIsEnded(true);
                CommonAlertPanel.show({
                    title   : Lang.getText(Lang.Type.B0088),
                    content : Lang.getText(Lang.Type.A0037),
                    callback: () => Utility.FlowManager.gotoLobby(),
                });
            }
        }
    }

    export function updateByActionContainer(container: ActionContainer, warId: number): void {
        const war = getWar();
        if ((war) && (war.getWarId() === warId)) {
            if (container.actionId !== war.getExecutedActionsCount() + _cachedActions.length) {
                MpwProxy.reqMcwCommonSyncWar(war, Types.SyncWarRequestType.ReconnectionRequest);
            } else {
                _cachedActions.push(container);
                MpwActionExecutor.checkAndRunFirstCachedAction(war, _cachedActions);
            }
        }
    }

    function _checkAndRequestBeginTurn(war: MpwWar): void {
        const turnManager = war.getTurnManager();
        if ((turnManager.getPhaseCode() === Types.TurnPhaseCode.WaitBeginTurn)      &&
            (war.getPlayerIndexLoggedIn() ===  turnManager.getPlayerIndexInTurn())
        ) {
            (war.getActionPlanner() as MpwActionPlanner).setStateRequestingPlayerBeginTurn();
        }
    }
}
