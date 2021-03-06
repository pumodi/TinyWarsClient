
namespace TinyWars.MultiPlayerWar {
    export class McwBackgroundPanel extends GameUi.UiPanel {
        protected readonly _LAYER_TYPE   = Utility.Types.LayerType.Bottom;
        protected readonly _IS_EXCLUSIVE = true;

        private static _instance: McwBackgroundPanel;

        public static show(): void {
            if (!McwBackgroundPanel._instance) {
                McwBackgroundPanel._instance = new McwBackgroundPanel();
            }
            McwBackgroundPanel._instance.open();
        }

        public static hide(): void {
            if (McwBackgroundPanel._instance) {
                McwBackgroundPanel._instance.close();
            }
        }

        private constructor() {
            super();

            this._setAutoAdjustHeightEnabled();
            this.skinName = "resource/skins/multiCustomWar/McwBackgroundPanel.exml";
        }
    }
}
