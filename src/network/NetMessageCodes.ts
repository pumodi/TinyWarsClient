
namespace TinyWars.Network {
    export enum Codes {
        actionCode = 0,
        C_Heartbeat = 1,
        S_Heartbeat = 2,
        C_Register = 3,
        S_Register = 4,
        C_Login = 5,
        S_Login = 6,
        C_Logout = 7,
        S_Logout = 8,
        S_Error = 10,
        C_GetNewestMapInfos = 11,
        S_GetNewestMapInfos = 12,
        S_NewestConfigVersion = 14,
        C_McrCreateWar = 101,
        S_McrCreateWar = 102,
        C_McrExitWar = 103,
        S_McrExitWar = 104,
        C_McrGetJoinedWaitingInfos = 105,
        S_McrGetJoinedWaitingInfos = 106,
        C_McrGetUnjoinedWaitingInfos = 107,
        S_McrGetUnjoinedWaitingInfos = 108,
        C_McrJoinWar = 109,
        S_McrJoinWar = 110,
    }
}
