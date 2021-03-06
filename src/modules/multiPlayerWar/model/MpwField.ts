
namespace TinyWars.MultiPlayerWar {
    export class MpwField extends BaseWar.BwField {
        protected _getFogMapClass(): new () => BaseWar.BwFogMap {
            return MpwFogMap;
        }
        protected _getTileMapClass(): new () => BaseWar.BwTileMap {
            return MpwTileMap;
        }
        protected _getUnitMapClass(): new () => BaseWar.BwUnitMap {
            return MpwUnitMap;
        }
        protected _getCursorClass(): new () => BaseWar.BwCursor {
            return MpwCursor;
        }
        protected _getActionPlannerClass(): new () => BaseWar.BwActionPlanner {
            return MpwActionPlanner;
        }
        protected _getGridVisionEffectClass(): new () => BaseWar.BwGridVisionEffect {
            return MpwGridVisionEffect;
        }
        protected _getViewClass(): new () => BaseWar.BwFieldView {
            return McwFieldView;
        }
    }
}
