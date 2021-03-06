
namespace TinyWars.MapEditor {
    export class MeBackgroundPanel extends GameUi.UiPanel {
        protected readonly _LAYER_TYPE   = Utility.Types.LayerType.Bottom;
        protected readonly _IS_EXCLUSIVE = true;

        private static _instance: MeBackgroundPanel;

        public static show(): void {
            if (!MeBackgroundPanel._instance) {
                MeBackgroundPanel._instance = new MeBackgroundPanel();
            }
            MeBackgroundPanel._instance.open();
        }

        public static hide(): void {
            if (MeBackgroundPanel._instance) {
                MeBackgroundPanel._instance.close();
            }
        }

        private constructor() {
            super();

            this._setAutoAdjustHeightEnabled();
            this.skinName = "resource/skins/mapEditor/MeBackgroundPanel.exml";
        }
    }
}
