
namespace TinyWars.User {
    import Notify           = Utility.Notify;
    import Types            = Utility.Types;
    import Lang             = Utility.Lang;
    import ProtoTypes       = Utility.ProtoTypes;
    import NetMessage       = ProtoTypes.NetMessage;
    import IUserPublicInfo  = ProtoTypes.User.IUserPublicInfo;
    import IUserSettings    = ProtoTypes.User.IUserSettings;

    export namespace UserModel {
        let _isLoggedIn                 = false;
        let _selfUserId                 : number;
        let _selfAccount                : string;
        let _selfPassword               : string;
        let _selfSettings               : IUserSettings;
        const _userPublicInfoDict       = new Map<number, IUserPublicInfo>();
        const _userPublicInfoRequests   = new Map<number, ((info: NetMessage.MsgUserGetPublicInfo.IS | undefined | null) => void)[]>();

        export function init(): void {
            Notify.addEventListeners([
                { type: Notify.Type.NetworkDisconnected,    callback: _onNotifyNetworkDisconnected, },
                { type: Notify.Type.MsgUserLogout,          callback: _onMsgUserLogout, },
            ], UserModel);
        }

        export function updateOnLogin(data: NetMessage.MsgUserLogin.IS): void {
            const userPublicInfo = data.userPublicInfo;
            setIsLoggedIn(true);
            setSelfUserId(userPublicInfo.userId);
            setUserPublicInfo(userPublicInfo);
        }

        export function clearLoginInfo(): void {
            setIsLoggedIn(false);
            setSelfUserId(undefined);
            setSelfPassword(undefined);
        }

        function setIsLoggedIn(isLoggedIn: boolean): void {
            _isLoggedIn = isLoggedIn;
        }
        export function getIsLoggedIn(): boolean {
            return _isLoggedIn;
        }

        function setSelfUserId(userId: number): void {
            _selfUserId = userId;
        }
        export function getSelfUserId(): number {
            return _selfUserId;
        }

        export function setSelfAccount(account: string): void {
            _selfAccount = account;
        }
        export function getSelfAccount(): string {
            return _selfAccount;
        }

        export function setSelfPassword(password: string): void {
            _selfPassword = password;
        }
        export function getSelfPassword(): string {
            return _selfPassword;
        }

        async function getSelfPublicInfo(): Promise<IUserPublicInfo> {
            return await getUserPublicInfo(getSelfUserId());
        }
        export async function getIsSelfAdmin(): Promise<boolean> {
            const info      = await getSelfPublicInfo();
            const privilege = info ? info.userPrivilege : null;
            return privilege ? (!!privilege.isAdmin) : false;
        }
        export async function getIsSelfMapCommittee(): Promise<boolean> {
            const info      = await getSelfPublicInfo();
            const privilege = info ? info.userPrivilege : null;
            return privilege ? (!!privilege.isMapCommittee) : false;
        }
        export async function getSelfNickname(): Promise<string> {
            const info = await getSelfPublicInfo();
            return info ? info.nickname : undefined;
        }
        export async function getSelfDiscordId(): Promise<string> {
            const info = await getSelfPublicInfo();
            return info ? info.discordId : undefined;
        }
        export async function getSelfRankScore(): Promise<number> {
            const info = await getSelfPublicInfo();
            // TODO
            return 0;
        }

        export function getUserPublicInfo(userId: number): Promise<IUserPublicInfo | undefined | null> {
            if (userId == null) {
                return new Promise((resolve, reject) => resolve(null));
            }

            const localData = _userPublicInfoDict.get(userId);
            if (localData) {
                return new Promise(resolve => resolve(localData));
            }

            if (_userPublicInfoRequests.has(userId)) {
                return new Promise((resolve, reject) => {
                    _userPublicInfoRequests.get(userId).push(info => resolve(info.userPublicInfo));
                });
            }

            new Promise((resolve, reject) => {
                const callbackOnSucceed = (e: egret.Event): void => {
                    const data = e.data as NetMessage.MsgUserGetPublicInfo.IS;
                    if (data.userId === userId) {
                        Notify.removeEventListener(Notify.Type.MsgUserGetPublicInfo,        callbackOnSucceed);
                        Notify.removeEventListener(Notify.Type.MsgUserGetPublicInfoFailed,  callbackOnFailed);

                        for (const cb of _userPublicInfoRequests.get(userId)) {
                            cb(data);
                        }
                        _userPublicInfoRequests.delete(userId);

                        resolve();
                    }
                };
                const callbackOnFailed = (e: egret.Event): void => {
                    const data = e.data as NetMessage.MsgUserGetPublicInfo.IS;
                    if (data.userId === userId) {
                        Notify.removeEventListener(Notify.Type.MsgUserGetPublicInfo,        callbackOnSucceed);
                        Notify.removeEventListener(Notify.Type.MsgUserGetPublicInfoFailed,  callbackOnFailed);

                        for (const cb of _userPublicInfoRequests.get(userId)) {
                            cb(data);
                        }
                        _userPublicInfoRequests.delete(userId);

                        resolve();
                    }
                };

                Notify.addEventListener(Notify.Type.MsgUserGetPublicInfo,       callbackOnSucceed);
                Notify.addEventListener(Notify.Type.MsgUserGetPublicInfoFailed, callbackOnFailed);

                UserProxy.reqUserGetPublicInfo(userId);
            });

            return new Promise((resolve, reject) => {
                _userPublicInfoRequests.set(userId, [info => resolve(info.userPublicInfo)]);
            });
        }
        export function setUserPublicInfo(info: IUserPublicInfo): void {
            _userPublicInfoDict.set(info.userId, info);
        }

        export async function getUserNickname(userId: number): Promise<string> {
            const info = await getUserPublicInfo(userId);
            return info ? info.nickname : undefined;
        }
        export async function getRankScoreData(userId: number, warType: Types.WarType, playersCount: number): Promise<ProtoTypes.User.IDataForUserRankScore> {
            const info = await getUserPublicInfo(userId);
            return (info ? info.userRankScore.dataList || [] : []).find(v => (v.warType === warType) && (v.playersCount === playersCount));
        }
        export async function getUserWarStatisticsData(userId: number, warType: Types.WarType, playersCount: number): Promise<ProtoTypes.User.IDataForUserWarStatistics> {
            const info = await getUserPublicInfo(userId);
            return (info ? info.userWarStatistics.dataList || [] : []).find(v => (v.warType === warType) && (v.playersCount === playersCount));
        }

        export function setSelfSettings(userSettings: IUserSettings): void {
            const oldVersion = getSelfSettingsTextureVersion();
            _selfSettings = userSettings;

            if (oldVersion !== getSelfSettingsTextureVersion()) {
                Common.CommonModel.updateOnUnitAndTileTextureVersionChanged();
                Notify.dispatch(Notify.Type.UnitAndTileTextureVersionChanged);
            }
        }
        export function getSelfSettingsTextureVersion(): Types.UnitAndTileTextureVersion {
            return _selfSettings
                ? _selfSettings.unitAndTileTextureVersion || Types.UnitAndTileTextureVersion.V0
                : Types.UnitAndTileTextureVersion.V0;
        }
        export function getSelfSettingsIsSetPathMode(): boolean {
            return _selfSettings
                ? !!_selfSettings.isSetPathMode
                : false;
        }

        function _onNotifyNetworkDisconnected(e: egret.Event): void {
            setIsLoggedIn(false);
        }

        function _onMsgUserLogout(e: egret.Event): void {
            const data = e.data as NetMessage.MsgUserLogout.IS;
            if (data.reason === Types.LogoutType.SelfRequest) {
                Utility.FloatText.show(Lang.getText(Lang.Type.A0005));
            } else if (data.reason === Types.LogoutType.LoginCollision) {
                Utility.FloatText.show(Lang.getText(Lang.Type.A0006));
            } else if (data.reason === Types.LogoutType.NetworkFailure) {
                Utility.FloatText.show(Lang.getText(Lang.Type.A0013));
            }

            setIsLoggedIn(false);
        }
    }
}
