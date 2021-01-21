
namespace TinyWars.MapEditor {
    import ProtoTypes               = Utility.ProtoTypes;
    import Helpers                  = Utility.Helpers;
    import Lang                     = Utility.Lang;
    import Notify                   = Utility.Notify;
    import Types                    = Utility.Types;
    import Logger                   = Utility.Logger;
    import IWarEventFullData        = ProtoTypes.Map.IWarEventFullData;
    import IMapRawData              = ProtoTypes.Map.IMapRawData;
    import ColorValue               = Types.ColorValue;
    import WarEventDescType         = Types.WarEventDescType;

    type OpenDataForWeConditionSelectPanel = {
        war         : BaseWar.BwWar;
        conditionId : number;
    }
    export class WeConditionSelectPanel extends GameUi.UiPanel {
        protected readonly _LAYER_TYPE   = Utility.Types.LayerType.Hud0;
        protected readonly _IS_EXCLUSIVE = false;

        private static _instance: WeConditionSelectPanel;

        private _listCondition  : GameUi.UiScrollList;

        public static show(openData: OpenDataForWeConditionSelectPanel): void {
            if (!WeConditionSelectPanel._instance) {
                WeConditionSelectPanel._instance = new WeConditionSelectPanel();
            }
            WeConditionSelectPanel._instance.open(openData);
        }
        public static hide(): void {
            if (WeConditionSelectPanel._instance) {
                WeConditionSelectPanel._instance.close();
            }
        }

        public constructor() {
            super();

            this._setIsTouchMaskEnabled();
            this._setIsCloseOnTouchedMask();
            this._setIsAutoAdjustHeight();
            this.skinName = "resource/skins/warEvent/WeConditionSelectPanel.exml";
        }

        protected _onOpened(): void {
            this._listCondition.setItemRenderer(ConditionRenderer);

            this._updateView();
        }
        protected _onClosed(): void {
        }

        ////////////////////////////////////////////////////////////////////////////////
        // View functions.
        ////////////////////////////////////////////////////////////////////////////////
        private _updateView(): void {
            this._updateListCondition();
        }

        private _updateListCondition(): void {
            // TODO
        }
    }

    type DataForConditionRenderer = {
        conditionId     : number;
        conditionType   : number;
    }
    class ConditionRenderer extends GameUi.UiListItemRenderer {
        private _labelName  : GameUi.UiLabel;

        protected _onOpened(): void {
            this._setUiListenerArray([
                { ui: this, callback: this._onTouchedSelf },
            ]);
            this._setNotifyListenerArray([
                { type: Notify.Type.LanguageChanged,    callback: this._onNotifyLanguageChanged },
            ]);
            this._updateComponentsForLanguage();
        }

        private _onTouchedSelf(e: egret.TouchEvent): void {
            const data = this.data as DataForConditionRenderer;
            if (data) {
                // TODO
            }
        }

        private _onNotifyLanguageChanged(e: egret.Event): void {
            this._updateComponentsForLanguage();
        }

        protected dataChanged(): void {
            super.dataChanged();

            this._updateLabelName();
        }

        private _updateComponentsForLanguage(): void {
            this._updateLabelName();
        }

        private _updateLabelName(): void {
            const data = this.data as DataForConditionRenderer;
            if (data) {
                // TODO
            }
        }
    }
}