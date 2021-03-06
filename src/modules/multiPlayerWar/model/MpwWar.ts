
namespace TinyWars.MultiPlayerWar {
    export abstract class MpwWar extends BaseWar.BwWar {
        private _isEnded = false;

        public abstract getSettingsBootTimerParams(): number[];

        protected _getViewClass(): new () => McwWarView {
            return McwWarView;
        }
        protected _getFieldClass(): new () => MpwField {
            return MpwField;
        }
        protected _getPlayerManagerClass(): new () => MpwPlayerManager {
            return MpwPlayerManager;
        }
        protected _getTurnManagerClass(): new () => MpwTurnManager {
            return MpwTurnManager;
        }

        ////////////////////////////////////////////////////////////////////////////////////////////////////
        // The other functions.
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        public getBootRestTime(): number | null {
            const player = this.getPlayerInTurn();
            if (player.getPlayerIndex() === 0) {
                return null;
            } else {
                return (this.getEnterTurnTime() + player.getRestTimeToBoot() - Time.TimeModel.getServerTimestamp()) || null;
            }
        }

        public setIsEnded(ended: boolean): void {
            this._isEnded = ended;
        }
        public getIsEnded(): boolean {
            return this._isEnded;
        }

        public checkIsBoot(): boolean {
            if (this.getIsEnded()) {
                return false;
            } else {
                const player = this.getPlayerInTurn();
                return (player.getIsAlive())
                    && (!player.checkIsNeutral())
                    && (Time.TimeModel.getServerTimestamp() > this.getEnterTurnTime() + player.getRestTimeToBoot());
            }
        }

        public getPlayerIndexLoggedIn(): number | undefined {
            return (this.getPlayerManager() as MpwPlayerManager).getPlayerIndexLoggedIn();
        }
        public getPlayerLoggedIn(): MpwPlayer {
            return (this.getPlayerManager() as MpwPlayerManager).getPlayerLoggedIn();
        }
    }
}
