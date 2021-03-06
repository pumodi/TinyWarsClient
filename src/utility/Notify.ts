
namespace TinyWars.Utility.Notify {
    import GridIndex    = Types.GridIndex;
    import TouchPoints  = Types.TouchPoints;

    ////////////////////////////////////////////////////////////////////////////////
    // Notify types.
    ////////////////////////////////////////////////////////////////////////////////
    export const enum Type {
        NetworkConnected,
        NetworkDisconnected,

        TimeTick,
        TileAnimationTick,
        UnitAnimationTick,
        GridAnimationTick,
        UnitAndTileTextureVersionChanged,

        MouseWheel,
        GlobalTouchBegin,
        GlobalTouchMove,
        ZoomableContentsMoved,

        ConfigLoaded,
        TileModelUpdated,
        LanguageChanged,

        ChatPanelOpened,
        ChatPanelClosed,

        McrCreateAvailableCoIdListChanged,
        RmrMyRoomAdded,
        RmrMyRoomDeleted,

        BroadcastOngoingMessagesChanged,

        ////////////////////////////////////////////////////////////////////////////////////////////////////
        RwNextActionIdChanged,
        BwTurnIndexChanged,
        BwTurnPhaseCodeChanged,
        BwPlayerIndexInTurnChanged,

        BwPlayerFundChanged,
        BwCoEnergyChanged,
        BwCoUsingSkillTypeChanged,
        BwCoIdChanged,

        BwCursorTapped,
        BwCursorDragged,
        BwCursorDragEnded,
        BwCursorGridIndexChanged,

        BwFieldZoomed,
        BwFieldDragged,

        BwActionPlannerStateChanged,

        McwWarMenuPanelOpened,
        McwWarMenuPanelClosed,
        McwProduceUnitPanelOpened,
        McwProduceUnitPanelClosed,
        BwCoListPanelOpened,
        BwCoListPanelClosed,

        BwUnitBeDestroyed,
        BwUnitBeAttacked,
        BwUnitBeSupplied,
        BwUnitBeRepaired,

        BwTileBeDestroyed,
        BwTileBeAttacked,

        BwSiloExploded,

        ScrCreateWarSaveSlotChanged,
        ScrCreateWarPlayerInfoListChanged,

        ReplayAutoReplayChanged,

        ////////////////////////////////////////////////////////////////////////////////////////////////////
        MeDrawerModeChanged,
        MeUnitChanged,
        MeTileChanged,

        ////////////////////////////////////////////////////////////////////////////////////////////////////
        MsgCommonHeartbeat,
        MsgCommonLatestConfigVersion,
        MsgCommonGetServerStatus,
        MsgCommonGetRankList,

        MsgBroadcastGetMessageList,
        MsgBroadcastAddMessage,
        MsgBroadcastDeleteMessage,
        MsgBroadcastDoBroadcast,

        MsgUserLogin,
        MsgUserRegister,
        MsgUserLogout,

        MsgMapGetRawData,
        MsgMapGetRawDataFailed,
        MsgMapGetEnabledBriefDataList,
        MsgMapGetEnabledRawDataList,
        MsgMapGetBriefData,
        MsgMapGetBriefDataFailed,

        MsgChatGetAllMessages,
        MsgChatAddMessage,
        MsgChatUpdateReadProgress,
        MsgChatGetAllReadProgressList,

        MsgUserGetPublicInfo,
        MsgUserGetPublicInfoFailed,
        MsgUserSetNickname,
        MsgUserSetNicknameFailed,
        MsgUserSetDiscordId,
        MsgUserSetDiscordIdFailed,
        MsgUserGetOnlineUsers,
        MsgUserSetPrivilege,
        MsgUserSetPassword,
        MsgUserGetSettings,
        MsgUserSetSettings,

        MsgMeGetDataList,
        MsgMeGetData,
        MsgMeSubmitMap,

        MsgMmSetMapAvailability,
        MsgMmReloadAllMaps,
        MsgMmDeleteMap,
        MsgMmGetReviewingMaps,
        MsgMmReviewMap,
        MsgMmSetMapTag,

        ////////////////////////////////////////////////////////////////////////////////////////////////////
        MsgMcrCreateRoom,
        MsgMcrGetRoomInfo,
        MsgMcrGetRoomInfoFailed,
        MsgMcrGetJoinedRoomInfoList,
        MsgMcrGetJoinableRoomInfoList,
        MsgMcrExitRoom,
        MsgMcrSetWarRule,
        MsgMcrJoinRoom,
        MsgMcrDeleteRoom,
        MsgMcrDeletePlayer,
        MsgMcrSetReady,
        MsgMcrSetSelfSettings,
        MsgMcrStartWar,

        MsgRmrGetMaxConcurrentCount,
        MsgRmrSetMaxConcurrentCount,
        MsgRmrGetRoomPublicInfo,
        MsgRmrGetRoomPublicInfoFailed,
        MsgRmrGetMyRoomPublicInfoList,
        MsgRmrSetBannedCoIdList,
        MsgRmrSetSelfSettings,
        MsgRmrDeleteRoom,

        MsgReplayGetInfoList,
        MsgReplayGetData,
        MsgReplayGetDataFailed,
        MsgReplaySetRating,

        ////////////////////////////////////////////////////////////////////////////////////////////////////
        MsgMpwCommonGetMyWarInfoList,
        MsgMpwCommonContinueWarFailed,
        MsgMpwCommonContinueWar,
        MsgMpwCommonSyncWar,
        MsgMpwCommonHandleBoot,

        MsgMpwWatchGetUnwatchedWarInfos,
        MsgMpwWatchGetOngoingWarInfos,
        MsgMpwWatchGetRequestedWarInfos,
        MsgMpwWatchGetWatchedWarInfos,
        MsgMpwWatchMakeRequest,
        MsgMpwWatchHandleRequest,
        MsgMpwWatchDeleteWatcher,
        MsgMpwWatchContinueWar,
        MsgMpwWatchContinueWarFailed,

        MsgMpwActionPlayerBeginTurn,
        MsgMpwActionPlayerDeleteUnit,
        MsgMpwActionPlayerEndTurn,
        MsgMpwActionPlayerProduceUnit,
        MsgMpwActionPlayerSurrender,
        MsgMpwActionPlayerVoteForDraw,
        MsgMpwActionUnitAttackUnit,
        MsgMpwActionUnitAttackTile,
        MsgMpwActionUnitBeLoaded,
        MsgMpwActionUnitBuildTile,
        MsgMpwActionUnitCaptureTile,
        MsgMpwActionUnitDive,
        MsgMpwActionUnitDropUnit,
        MsgMpwActionUnitJoinUnit,
        MsgMpwActionUnitLaunchFlare,
        MsgMpwActionUnitLaunchSilo,
        MsgMpwActionUnitLoadCo,
        MsgMpwActionUnitProduceUnit,
        MsgMpwActionUnitSupplyUnit,
        MsgMpwActionUnitSurface,
        MsgMpwActionUnitUseCoSkill,
        MsgMpwActionUnitWait,

        ////////////////////////////////////////////////////////////////////////////////////////////////////
        MsgScrCreateWar,
        MsgScrGetSaveInfoList,
        MsgScrContinueWarFailed,
        MsgScrContinueWar,
        MsgScrSaveWar,
        MsgScrCreateCustomWar,
        MsgScrDeleteWar,
    }

    ////////////////////////////////////////////////////////////////////////////////
    // Notify datas.
    ////////////////////////////////////////////////////////////////////////////////
    export namespace Data {
        export type ConfigLoaded                = number;
        export type McwPlayerIndexInTurnChanged = number;
        export type McwPlayerFundChanged        = MultiPlayerWar.MpwPlayer;
        export type McwPlayerEnergyChanged      = MultiPlayerWar.MpwPlayer;
        export type BwCursorTapped              = { current: GridIndex, tappedOn: GridIndex };
        export type BwCursorDragged             = { current: GridIndex, draggedTo: GridIndex };
        export type BwFieldZoomed               = { previous: TouchPoints, current: TouchPoints };
        export type BwFieldDragged              = { previous: Types.Point, current: Types.Point };
        export type MeUnitChanged               = { gridIndex: GridIndex };
        export type MeTileChanged               = { gridIndex: GridIndex };
    }

    ////////////////////////////////////////////////////////////////////////////////
    // Dispatcher functions.
    ////////////////////////////////////////////////////////////////////////////////
    const _DISPATCHER = new egret.EventDispatcher();

    export type Listener = {
        type        : Type,
        callback    : (e: egret.Event) => void,
        thisObject? : any,
        useCapture? : boolean,
        priority?   : number;
    };

    export function dispatch(t: Type, data?: any): void {
        _DISPATCHER.dispatchEventWith(getTypeName(t), false, data);
    }

    export function addEventListener(type: Type, callback: (e: egret.Event) => void, thisObject?: any, useCapture?: boolean, priority?: number): void {
        _DISPATCHER.addEventListener(getTypeName(type), callback, thisObject, useCapture, priority);
    }
    export function addEventListeners(listeners: Listener[], thisObject?: any, useCapture?: boolean, priority?: number): void {
        for (const l of listeners) {
            addEventListener(
                l.type,
                l.callback,
                l.thisObject != null ? l.thisObject : thisObject,
                l.useCapture != null ? l.useCapture : useCapture,
                l.priority   != null ? l.priority   : priority
            );
        }
    }

    export function removeEventListener(type: Type, callback: (e: egret.Event) => void, thisObject?: any, useCapture?: boolean): void {
        _DISPATCHER.removeEventListener(getTypeName(type), callback, thisObject, useCapture);
    }
    export function removeEventListeners(listeners: Listener[], thisObject?: any, useCapture?: boolean): void {
        for (const l of listeners) {
            removeEventListener(
                l.type,
                l.callback,
                l.thisObject != null ? l.thisObject : thisObject,
                l.useCapture != null ? l.useCapture : useCapture
            );
        }
    }

    function getTypeName(t: Type): string {
        return "Notify" + t;
    }
}
