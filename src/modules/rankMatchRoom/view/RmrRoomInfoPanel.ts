
namespace TinyWars.RankMatchRoom {
    import Lang         = Utility.Lang;
    import Notify       = Utility.Notify;
    import FloatText    = Utility.FloatText;
    import ProtoTypes   = Utility.ProtoTypes;
    import NetMessage   = ProtoTypes.NetMessage;

    export class RmrRoomInfoPanel extends GameUi.UiPanel {
        protected readonly _LAYER_TYPE   = Utility.Types.LayerType.Scene;
        protected readonly _IS_EXCLUSIVE = true;

        private static _instance: RmrRoomInfoPanel;

        private _tabSettings    : TinyWars.GameUi.UiTab;
        private _labelMenuTitle : TinyWars.GameUi.UiLabel;
        private _btnBack        : TinyWars.GameUi.UiButton;

        private _roomId     : number;

        public static show(roomId: number): void {
            if (!RmrRoomInfoPanel._instance) {
                RmrRoomInfoPanel._instance = new RmrRoomInfoPanel();
            }
            RmrRoomInfoPanel._instance._roomId = roomId;
            RmrRoomInfoPanel._instance.open();
        }
        public static hide(): void {
            if (RmrRoomInfoPanel._instance) {
                RmrRoomInfoPanel._instance.close();
            }
        }

        public constructor() {
            super();

            this._setAutoAdjustHeightEnabled(true);
            this.skinName = "resource/skins/rankMatchRoom/RmrRoomInfoPanel.exml";
        }

        protected _onFirstOpened(): void {
            this._uiListeners = [
                { ui: this._btnBack,        callback: this._onTouchedBtnBack },
            ];
            this._notifyListeners = [
                { type: Notify.Type.LanguageChanged,    callback: this._onNotifyLanguageChanged },
                { type: Notify.Type.MsgRmrDeleteRoom,   callback: this._onMsgRmrDeleteRoom },
            ];
            this._tabSettings.setBarItemRenderer(TabItemRenderer);

            this._btnBack.setTextColor(0x00FF00);
        }

        protected async _onOpened(): Promise<void> {
            this._updateComponentsForLanguage();

            const roomId = this._roomId;
            if ((await RmrModel.getRoomInfo(roomId)) == null) {
                this.close();
                RmrMyRoomListPanel.show();
            } else {
                this._tabSettings.bindData([
                    {
                        tabItemData : { name: Lang.getText(Lang.Type.B0002) },
                        pageClass   : RmrRoomBasicSettingsPage,
                        pageData    : {
                            roomId
                        } as OpenParamForRoomBasicSettingsPage,
                    },
                    {
                        tabItemData: { name: Lang.getText(Lang.Type.B0003) },
                        pageClass  : RmrRoomAdvancedSettingsPage,
                        pageData    : {
                            roomId
                        } as OpenParamForRoomAdvancedSettingsPage,
                    },
                ]);
            }
        }

        protected _onClosed(): void {
            this._tabSettings.clear();
        }

        ////////////////////////////////////////////////////////////////////////////////
        // Event callbacks.
        ////////////////////////////////////////////////////////////////////////////////
        private _onTouchedBtnBack(e: egret.TouchEvent): void {
            this.close();
            RmrMyRoomListPanel.show();
        }

        private _onNotifyLanguageChanged(e: egret.Event): void {
            this._updateComponentsForLanguage();
        }

        private _onMsgRmrDeleteRoom(e: egret.Event): void {
            const data = e.data as NetMessage.MsgRmrDeleteRoom.IS;
            if (data.roomId === this._roomId) {
                FloatText.show(Lang.getText(Lang.Type.A0019));
                this.close();
                RmrMyRoomListPanel.show();
            }
        }

        ////////////////////////////////////////////////////////////////////////////////
        // View functions.
        ////////////////////////////////////////////////////////////////////////////////
        private _updateComponentsForLanguage(): void {
            this._labelMenuTitle.text   = Lang.getText(Lang.Type.B0398);
            this._btnBack.label         = Lang.getText(Lang.Type.B0146);
        }
    }

    type DataForTabItemRenderer = {
        name: string;
    }

    class TabItemRenderer extends eui.ItemRenderer {
        private _labelName: GameUi.UiLabel;

        protected dataChanged(): void {
            const data = (this.data as GameUi.DataForUiTab).tabItemData as DataForTabItemRenderer;
            this._labelName.text = data.name;
        }
    }
}
