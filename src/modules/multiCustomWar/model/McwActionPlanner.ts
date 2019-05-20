
namespace TinyWars.MultiCustomWar {
    import WarMapModel      = WarMap.WarMapModel;
    import Types            = Utility.Types;
    import Notify           = Utility.Notify;
    import GridIndexHelpers = Utility.GridIndexHelpers;
    import Logger           = Utility.Logger;
    import FloatText        = Utility.FloatText;
    import Lang             = Utility.Lang;
    import TurnPhaseCode    = Types.TurnPhaseCode;
    import UnitState        = Types.UnitState;
    import GridIndex        = Types.GridIndex;
    import State            = Types.ActionPlannerState;
    import MovableArea      = Types.MovableArea;
    import AttackableArea   = Types.AttackableArea;
    import MovePathNode     = Types.MovePathNode;
    import UnitActionType   = Types.UnitActionType;
    import UnitType         = Types.UnitType;

    type ChosenUnitForDrop = {
        unit        : McwUnit;
        destination : GridIndex;
    }

    export class McwActionPlanner {
        private _view               : McwActionPlannerView;
        private _war                : McwWar;
        private _unitMap            : McwUnitMap;
        private _tileMap            : McwTileMap;
        private _turnManager        : McwTurnManager;
        private _cursor             : McwCursor;
        private _mapSize            : Types.MapSize;
        private _playerIndexLoggedIn: number;

        private _state      : State;
        private _prevState  : State;

        private _focusUnitOnMap             : McwUnit;
        private _focusUnitLoaded            : McwUnit;
        private _choosingUnitForDrop        : McwUnit;
        private _chosenUnitsForDrop         : ChosenUnitForDrop[] = [];
        private _availableDropDestinations  : GridIndex[];
        private _movableArea                : MovableArea;
        private _attackableArea             : AttackableArea;
        private _attackableGridsAfterMove   : GridIndex[];
        private _movePath                   : MovePathNode[] = [];

        private _unitsForPreviewAttack  = new Map<number, McwUnit>();
        private _areaForPreviewAttack   : AttackableArea = [];
        private _unitForPreviewMove     : McwUnit;
        private _areaForPreviewMove     : MovableArea;

        private _notifyListeners: Notify.Listener[] = [
            { type: Notify.Type.McwCursorTapped,    callback: this._onNotifyMcwCursorTapped },
            { type: Notify.Type.McwCursorDragged,   callback: this._onNotifyMcwCursorDragged },
        ];

        public constructor() {
        }

        public async init(mapIndexKey: Types.MapIndexKey): Promise<McwActionPlanner> {
            const mapData = await WarMapModel.getMapData(mapIndexKey);
            this._setMapSize({ width: mapData.mapWidth, height: mapData.mapHeight });

            this._view = this._view || new McwActionPlannerView();
            this._view.init(this);

            return this;
        }

        public startRunning(war: McwWar): void {
            this._war                   = war;
            this._unitMap               = war.getUnitMap();
            this._tileMap               = war.getTileMap();
            this._turnManager           = war.getTurnManager();
            this._cursor                = war.getField().getCursor();
            this._playerIndexLoggedIn   = war.getPlayerIndexLoggedIn();

            this.setStateIdle();

            Notify.addEventListeners(this._notifyListeners, this);
        }
        public startRunningView(): void {
            this.getView().startRunningView();
        }
        public stopRunning(): void {
            Notify.removeEventListeners(this._notifyListeners, this);

            this.getView().stopRunningView();
        }

        ////////////////////////////////////////////////////////////////////////////////////////////////////
        // Callbacks.
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        private _onNotifyMcwCursorTapped(e: egret.Event): void {
            const gridIndex = this.getCursor().getGridIndex();
            const nextState = this._getNextStateOnTap(gridIndex);
            if ((nextState === this.getState())                                                 &&
                ((nextState === State.ExecutingAction) || (_checkIsStateRequesting(nextState)))
            ) {
                // Do noting.
            } else {
                if (nextState === State.Idle) {
                    this.setStateIdle();

                } else if (nextState === State.MakingMovePath) {
                    this._setStateMakingMovePathOnTap(gridIndex);

                } else if (nextState === State.ChoosingAction) {
                    this._setStateChoosingActionOnTap(gridIndex);

                } else if (nextState === State.ChoosingAttackTarget) {
                    this._setStateChoosingAttackTargetOnTap(gridIndex);

                } else if (nextState === State.ChoosingDropDestination) {
                    this._setStateChoosingDropDestinationOnTap(gridIndex);

                } else if (nextState === State.ChoosingFlareDestination) {
                    this._setStateChoosingFlareDestinationOnTap(gridIndex);

                } else if (nextState === State.ChoosingSiloDestination) {
                    this._setStateChoosingSiloDestinationOnTap(gridIndex);

                } else if (nextState === State.ChoosingProductionTarget) {
                    this._setStateChoosingProductionTargetOnTap(gridIndex);

                } else if (nextState === State.PreviewingAttackableArea) {
                    this._setStatePreviewingAttackableAreaOnTap(gridIndex);

                } else if (nextState === State.PreviewingMovableArea) {
                    this._setStatePreviewingMovableAreaOnTap(gridIndex);

                } else if (nextState === State.RequestingUnitAttack) {
                    this._setStateRequestingUnitAttack(gridIndex);

                } else {
                    Logger.error(`McwActionPlanner._onNotifyMcwCursorTapped() invalid nextState: ${nextState}`);
                }
            }
        }

        private _onNotifyMcwCursorDragged(e: egret.Event): void {
            const gridIndex = this.getCursor().getGridIndex();
            const nextState = this._getNextStateOnDrag(gridIndex);
            if ((nextState === this.getState())                                                 &&
                ((nextState === State.ExecutingAction) || (_checkIsStateRequesting(nextState)))
            ) {
                // Do noting.
            } else {
                if (nextState === State.Idle) {
                    this.setStateIdle();

                } else if (nextState === State.MakingMovePath) {
                    this._setStateMakingMovePathOnDrag(gridIndex);

                } else if (nextState === State.ChoosingAction) {
                    this._setStateChoosingActionOnDrag(gridIndex);

                } else if (nextState === State.ChoosingAttackTarget) {
                    this._setStateChoosingAttackTargetOnDrag(gridIndex);

                } else if (nextState === State.ChoosingDropDestination) {
                    this._setStateChoosingDropDestinationOnDrag(gridIndex);

                } else if (nextState === State.ChoosingFlareDestination) {
                    this._setStateChoosingFlareDestinationOnDrag(gridIndex);

                } else if (nextState === State.ChoosingSiloDestination) {
                    this._setStateChoosingSiloDestinationOnDrag(gridIndex);

                } else if (nextState === State.ChoosingProductionTarget) {
                    this._setStateChoosingProductionTargetOnDrag(gridIndex);

                } else if (nextState === State.PreviewingAttackableArea) {
                    this._setStatePreviewingAttackableAreaOnDrag(gridIndex);

                } else if (nextState === State.PreviewingMovableArea) {
                    this._setStatePreviewingMovableAreaOnDrag(gridIndex);

                } else {
                    Logger.error(`McwActionPlanner._onNotifyMcwCursorTapped() invalid nextState!`, nextState);
                }
            }
        }

        ////////////////////////////////////////////////////////////////////////////////////////////////////
        // Functions for setting common state.
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        public getState(): State {
            return this._state;
        }
        public getPreviousState(): State | undefined {
            return this._prevState;
        }
        private _setState(state: State): void {
            this._prevState = this._state;
            this._state     = state;
            Logger.log(`McwActionPlanner._setState() ${state}`);
            Notify.dispatch(Notify.Type.McwActionPlannerStateChanged);
        }

        public setStateIdle(): void {
            this._clearFocusUnitOnMap();
            this._clearFocusUnitLoaded();
            this._clearChoosingUnitForDrop();
            this._clearChosenUnitsForDrop();
            this._clearAvailableDropDestinations();
            this._clearDataForPreviewingAttackableArea();
            this._clearDataForPreviewingMovableArea();

            this._setState(State.Idle);
            this._updateView();
        }

        public setStateExecutingAction(): void {
            this._clearFocusUnitOnMap();
            this._clearFocusUnitLoaded();
            this._clearChoosingUnitForDrop();
            this._clearChosenUnitsForDrop();
            this._clearAvailableDropDestinations();
            this._clearDataForPreviewingAttackableArea();
            this._clearDataForPreviewingMovableArea();

            this._setState(State.ExecutingAction);
            this._updateView();
        }

        private _setStateMakingMovePathOnTap(gridIndex: GridIndex): void {
            const currState = this.getState();
            if (currState === State.Idle) {
                this._setFocusUnitOnMap(this._unitMap.getUnitOnMap(gridIndex));
                this._resetMovableArea();
                this._resetAttackableArea();
                this._resetMovePathAsShortest(gridIndex);

            } else if (currState === State.ExecutingAction) {
                Logger.error(`McwActionPlanner._setStateMakingMovePathOnTap() error 1, currState: ${currState}`);

            } else if (currState === State.MakingMovePath) {
                if (this.getFocusUnit().checkCanAttackTargetAfterMovePath(this.getMovePath(), gridIndex)) {
                    // Nothing to do.
                } else {
                    const existingUnit = this._unitMap.getUnitOnMap(gridIndex);
                    if ((existingUnit === this.getFocusUnitOnMap()) && (this.getFocusUnitLoaded())) {
                        // Nothing to do.
                    } else {
                        if ((!existingUnit) || (existingUnit.getPlayerIndex() !== this._playerIndexLoggedIn)) {
                            this._resetMovePathAsShortest(this.getAttackableArea()[gridIndex.x][gridIndex.y].movePathDestination);
                        } else {
                            this._setFocusUnitOnMap(existingUnit);
                            this._clearFocusUnitLoaded();
                            this._resetMovableArea();
                            this._resetAttackableArea();
                            this._resetMovePathAsShortest(gridIndex);
                        }
                    }
                }

            } else if (currState === State.ChoosingAction) {
                // Do nothing.

            } else if (currState === State.ChoosingAttackTarget) {
                Logger.error(`McwActionPlanner._setStateMakingMovePathOnTap() error 2, currState: ${currState}`);

            } else if (currState === State.ChoosingDropDestination) {
                Logger.error(`McwActionPlanner._setStateMakingMovePathOnTap() error 3, currState: ${currState}`);

            } else if (currState === State.ChoosingFlareDestination) {
                Logger.error(`McwActionPlanner._setStateMakingMovePathOnTap() error 4, currState: ${currState}`);

            } else if (currState === State.ChoosingSiloDestination) {
                Logger.error(`McwActionPlanner._setStateMakingMovePathOnTap() error 5, currState: ${currState}`);

            } else if (currState === State.ChoosingProductionTarget) {
                this._setFocusUnitOnMap(this._unitMap.getUnitOnMap(gridIndex));
                this._resetMovableArea();
                this._resetAttackableArea();
                this._resetMovePathAsShortest(gridIndex);

            } else if (currState === State.PreviewingAttackableArea) {
                this._setFocusUnitOnMap(this._unitMap.getUnitOnMap(gridIndex));
                this._resetMovableArea();
                this._resetAttackableArea();
                this._resetMovePathAsShortest(gridIndex);
                this._clearDataForPreviewingAttackableArea();

            } else if (currState === State.PreviewingMovableArea) {
                this._setFocusUnitOnMap(this._unitMap.getUnitOnMap(gridIndex));
                this._resetMovableArea();
                this._resetAttackableArea();
                this._resetMovePathAsShortest(gridIndex);
                this._clearDataForPreviewingMovableArea();

            } else {
                Logger.error(`McwActionPlanner._setStateMakingMovePathOnTap() error 6, currState: ${currState}`);
            }

            this._setState(State.MakingMovePath);
            this._updateView();
        }
        private _setStateMakingMovePathOnDrag(gridIndex: GridIndex): void {
            const currState = this.getState();
            if (currState === State.Idle) {
                Logger.error(`McwActionPlanner._setStateMakingMovePathOnDrag() error 1, currState: ${currState}`);

            } else if (currState === State.ExecutingAction) {
                Logger.error(`McwActionPlanner._setStateMakingMovePathOnDrag() error 2, currState: ${currState}`);

            } else if (currState === State.MakingMovePath) {
                const focusUnit = this.getFocusUnit();
                if (focusUnit.checkCanAttackTargetAfterMovePath(this.getMovePath(), gridIndex)) {
                    // Do nothing.
                } else {
                    const movableArea = this.getMovableArea();
                    if (checkAreaHasGrid(movableArea, gridIndex)) {
                        this._updateMovePathByDestination(gridIndex);
                    } else {
                        const attackableArea = this.getAttackableArea();
                        if (!checkAreaHasGrid(attackableArea, gridIndex)) {
                            // Do nothing.
                        } else {
                            const newPath = McwHelpers.createShortestMovePath(movableArea, attackableArea[gridIndex.x][gridIndex.y].movePathDestination);
                            if (focusUnit.checkCanAttackTargetAfterMovePath(newPath, gridIndex)) {
                                this._setMovePath(newPath);
                            } else {
                                // Do nothing.
                            }
                        }
                    }
                }

            } else if (currState === State.ChoosingAction) {
                Logger.error(`McwActionPlanner._setStateMakingMovePathOnDrag() error 3, currState: ${currState}`);

            } else if (currState === State.ChoosingAttackTarget) {
                Logger.error(`McwActionPlanner._setStateMakingMovePathOnDrag() error 4, currState: ${currState}`);

            } else if (currState === State.ChoosingDropDestination) {
                Logger.error(`McwActionPlanner._setStateMakingMovePathOnDrag() error 5, currState: ${currState}`);

            } else if (currState === State.ChoosingFlareDestination) {
                Logger.error(`McwActionPlanner._setStateMakingMovePathOnDrag() error 6, currState: ${currState}`);

            } else if (currState === State.ChoosingSiloDestination) {
                Logger.error(`McwActionPlanner._setStateMakingMovePathOnDrag() error 7, currState: ${currState}`);

            } else if (currState === State.ChoosingProductionTarget) {
                Logger.error(`McwActionPlanner._setStateMakingMovePathOnDrag() error 8, currState: ${currState}`);

            } else if (currState === State.PreviewingAttackableArea) {
                Logger.error(`McwActionPlanner._setStateMakingMovePathOnDrag() error 9, currState: ${currState}`);

            } else if (currState === State.PreviewingMovableArea) {
                Logger.error(`McwActionPlanner._setStateMakingMovePathOnDrag() error 10, currState: ${currState}`);

            } else {
                Logger.error(`McwActionPlanner._setStateMakingMovePathOnDrag() error 11, currState: ${currState}`);
            }

            this._setState(State.MakingMovePath);
            this._updateView();
        }
        private _setStateMakingMovePathOnChooseAction(unitForLaunch: McwUnit): void {
            const currState = this.getState();
            if (currState !== State.ChoosingAction) {
                Logger.error(`McwActionPlanner._setStateMakingMovePathOnChooseAction() error 1, currState: ${currState}`);
            } else {
                if (this.getFocusUnitLoaded()) {
                    Logger.error(`McwActionPlanner._setStateMakingMovePathOnChooseAction() error 2, currState: ${currState}`);
                } else {
                    this._setFocusUnitLoaded(unitForLaunch);
                    this._resetMovableArea();
                    this._resetAttackableArea();
                    this._resetMovePathAsShortest(unitForLaunch.getGridIndex());
                }
            }

            this._setState(State.MakingMovePath);
            this._updateView();
        }

        private _setStateChoosingActionOnTap(gridIndex: GridIndex): void {
            const currState = this.getState();
            if (currState === State.Idle) {
                Logger.error(`McwActionPlanner._setStateChoosingActionOnTap() error 1, currState: ${currState}`);

            } else if (currState === State.ExecutingAction) {
                Logger.error(`McwActionPlanner._setStateChoosingActionOnTap() error 2, currState: ${currState}`);

            } else if (currState === State.MakingMovePath) {
                if (checkAreaHasGrid(this.getMovableArea(), gridIndex)) {
                    this._updateMovePathByDestination(gridIndex);
                } else {
                    if (!this.getFocusUnitLoaded()) {
                        Logger.error(`McwActionPlanner._setStateChoosingActionOnTap() error 3, currState: ${currState}`);
                    } else {
                        this._clearFocusUnitLoaded();
                        this._resetMovableArea();
                        this._resetAttackableArea();
                        this._resetMovePathAsShortest(this.getFocusUnitOnMap().getGridIndex());
                    }
                }

            } else if (currState === State.ChoosingAction) {
                Logger.error(`McwActionPlanner._setStateChoosingActionOnTap() error 4, currState: ${currState}`);

            } else if (currState === State.ChoosingAttackTarget) {
                // Nothing to do.

            } else if (currState === State.ChoosingDropDestination) {
                if (this.getAvailableDropDestinations().some(g => GridIndexHelpers.checkIsEqual(g, gridIndex))) {
                    this._pushBackChosenUnitForDrop({
                        unit        : this.getChoosingUnitForDrop(),
                        destination : gridIndex,
                    });
                }
                this._clearChoosingUnitForDrop();
                this._clearAvailableDropDestinations();

            } else if (currState === State.ChoosingFlareDestination) {
                // Nothing to do.

            } else if (currState === State.ChoosingSiloDestination) {
                Logger.error(`McwActionPlanner._setStateChoosingActionOnTap() error 5, currState: ${currState}`);

            } else if (currState === State.ChoosingProductionTarget) {
                Logger.error(`McwActionPlanner._setStateChoosingActionOnTap() error 6, currState: ${currState}`);

            } else if (currState === State.PreviewingAttackableArea) {
                Logger.error(`McwActionPlanner._setStateChoosingActionOnTap() error 7, currState: ${currState}`);

            } else if (currState === State.PreviewingMovableArea) {
                Logger.error(`McwActionPlanner._setStateChoosingActionOnTap() error 8, currState: ${currState}`);

            } else {
                Logger.error(`McwActionPlanner._setStateChoosingActionOnTap() error 9, currState: ${currState}`);
            }

            this._setState(State.ChoosingAction);
            this._updateView();
        }
        private _setStateChoosingActionOnDrag(gridIndex: GridIndex): void {
            const currState = this.getState();
            if (currState !== State.ChoosingAction) {
                Logger.error(`McwActionPlanner._setStateChoosingActionOnDrag() error 1, currState: ${currState}`);
            } else {
                // Nothing to do.
            }

            this._setState(State.ChoosingAction);
            this._updateView();
        }

        private _setStateChoosingAttackTargetOnTap(gridIndex: GridIndex): void {
            const currState = this.getState();
            if (currState === State.Idle) {
                Logger.error(`McwActionPlanner._setStateChoosingAttackTargetOnTap() error 1, currState: ${currState}`);

            } else if (currState === State.ExecutingAction) {
                Logger.error(`McwActionPlanner._setStateChoosingAttackTargetOnTap() error 2, currState: ${currState}`);

            } else if (currState === State.MakingMovePath) {
                Logger.error(`McwActionPlanner._setStateChoosingAttackTargetOnTap() error 3, currState: ${currState}`);

            } else if (currState === State.ChoosingAction) {
                Logger.error(`McwActionPlanner._setStateChoosingAttackTargetOnTap() error 4, currState: ${currState}`);

            } else if (currState === State.ChoosingAttackTarget) {
                // Nothing to do.

            } else if (currState === State.ChoosingDropDestination) {
                Logger.error(`McwActionPlanner._setStateChoosingAttackTargetOnTap() error 5, currState: ${currState}`);

            } else if (currState === State.ChoosingFlareDestination) {
                Logger.error(`McwActionPlanner._setStateChoosingAttackTargetOnTap() error 6, currState: ${currState}`);

            } else if (currState === State.ChoosingSiloDestination) {
                Logger.error(`McwActionPlanner._setStateChoosingAttackTargetOnTap() error 7, currState: ${currState}`);

            } else if (currState === State.ChoosingProductionTarget) {
                Logger.error(`McwActionPlanner._setStateChoosingAttackTargetOnTap() error 8, currState: ${currState}`);

            } else if (currState === State.PreviewingAttackableArea) {
                Logger.error(`McwActionPlanner._setStateChoosingAttackTargetOnTap() error 9, currState: ${currState}`);

            } else if (currState === State.PreviewingMovableArea) {
                Logger.error(`McwActionPlanner._setStateChoosingAttackTargetOnTap() error 10, currState: ${currState}`);

            } else {
                Logger.error(`McwActionPlanner._setStateChoosingAttackTargetOnTap() error 11, currState: ${currState}`);
            }

            this._setState(State.ChoosingAttackTarget);
            this._updateView();
        }
        private _setStateChoosingAttackTargetOnDrag(gridIndex: GridIndex): void {
            const currState = this.getState();
            if (currState === State.Idle) {
                Logger.error(`McwActionPlanner._setStateChoosingAttackTargetOnDrag() error 1, currState: ${currState}`);

            } else if (currState === State.ExecutingAction) {
                Logger.error(`McwActionPlanner._setStateChoosingAttackTargetOnDrag() error 2, currState: ${currState}`);

            } else if (currState === State.MakingMovePath) {
                Logger.error(`McwActionPlanner._setStateChoosingAttackTargetOnDrag() error 3, currState: ${currState}`);

            } else if (currState === State.ChoosingAction) {
                Logger.error(`McwActionPlanner._setStateChoosingAttackTargetOnDrag() error 4, currState: ${currState}`);

            } else if (currState === State.ChoosingAttackTarget) {
                // Nothing to do.

            } else if (currState === State.ChoosingDropDestination) {
                Logger.error(`McwActionPlanner._setStateChoosingAttackTargetOnDrag() error 5, currState: ${currState}`);

            } else if (currState === State.ChoosingFlareDestination) {
                Logger.error(`McwActionPlanner._setStateChoosingAttackTargetOnDrag() error 6, currState: ${currState}`);

            } else if (currState === State.ChoosingSiloDestination) {
                Logger.error(`McwActionPlanner._setStateChoosingAttackTargetOnDrag() error 7, currState: ${currState}`);

            } else if (currState === State.ChoosingProductionTarget) {
                Logger.error(`McwActionPlanner._setStateChoosingAttackTargetOnDrag() error 8, currState: ${currState}`);

            } else if (currState === State.PreviewingAttackableArea) {
                Logger.error(`McwActionPlanner._setStateChoosingAttackTargetOnDrag() error 9, currState: ${currState}`);

            } else if (currState === State.PreviewingMovableArea) {
                Logger.error(`McwActionPlanner._setStateChoosingAttackTargetOnDrag() error 10, currState: ${currState}`);

            } else {
                Logger.error(`McwActionPlanner._setStateChoosingAttackTargetOnDrag() error 11, currState: ${currState}`);
            }

            this._setState(State.ChoosingAttackTarget);
            this._updateView();
        }
        private _setStateChoosingAttackTargetOnChooseAction(): void {
            const currState = this.getState();
            if (currState !== State.ChoosingAction) {
                Logger.error(`McwActionPlanner._setStateChoosingAttackTargetOnChooseAction() error 1, currState: ${currState}`);
            } else {
                this._setAttackableGridsAfterMove(this._createAttackableGridsAfterMove());
            }

            this._setState(State.ChoosingAttackTarget);
            this._updateView();
        }

        private _setStateChoosingDropDestinationOnTap(gridIndex: GridIndex): void {
            const currState = this.getState();
            if (currState === State.Idle) {
                Logger.error(`McwActionPlanner._setStateChoosingDropDestinationOnTap() error 1, currState: ${currState}`);

            } else if (currState === State.ExecutingAction) {
                Logger.error(`McwActionPlanner._setStateChoosingDropDestinationOnTap() error 2, currState: ${currState}`);

            } else if (currState === State.MakingMovePath) {
                Logger.error(`McwActionPlanner._setStateChoosingDropDestinationOnTap() error 3, currState: ${currState}`);

            } else if (currState === State.ChoosingAction) {
                const data = this._popBackChosenUnitForDrop();
                this._setChoosingUnitForDrop(data.unit);
                this._setAvailableDropDestinations(this._calculateAvailableDropDestination(data.unit, this._getChosenDropDestinations()));

            } else if (currState === State.ChoosingAttackTarget) {
                Logger.error(`McwActionPlanner._setStateChoosingDropDestinationOnTap() error 4, currState: ${currState}`);

            } else if (currState === State.ChoosingDropDestination) {
                Logger.error(`McwActionPlanner._setStateChoosingDropDestinationOnTap() error 5, currState: ${currState}`);

            } else if (currState === State.ChoosingFlareDestination) {
                Logger.error(`McwActionPlanner._setStateChoosingDropDestinationOnTap() error 6, currState: ${currState}`);

            } else if (currState === State.ChoosingSiloDestination) {
                Logger.error(`McwActionPlanner._setStateChoosingDropDestinationOnTap() error 7, currState: ${currState}`);

            } else if (currState === State.ChoosingProductionTarget) {
                Logger.error(`McwActionPlanner._setStateChoosingDropDestinationOnTap() error 8, currState: ${currState}`);

            } else if (currState === State.PreviewingAttackableArea) {
                Logger.error(`McwActionPlanner._setStateChoosingDropDestinationOnTap() error 9, currState: ${currState}`);

            } else if (currState === State.PreviewingMovableArea) {
                Logger.error(`McwActionPlanner._setStateChoosingDropDestinationOnTap() error 10, currState: ${currState}`);

            } else {
                Logger.error(`McwActionPlanner._setStateChoosingDropDestinationOnTap() error 11, currState: ${currState}`);
            }

            this._setState(State.ChoosingDropDestination);
            this._updateView();
        }
        private _setStateChoosingDropDestinationOnDrag(gridIndex: GridIndex): void {
            const currState = this.getState();
            if (currState === State.Idle) {
                Logger.error(`McwActionPlanner._setStateChoosingDropDestinationOnDrag() error 1, currState: ${currState}`);

            } else if (currState === State.ExecutingAction) {
                Logger.error(`McwActionPlanner._setStateChoosingDropDestinationOnDrag() error 2, currState: ${currState}`);

            } else if (currState === State.MakingMovePath) {
                Logger.error(`McwActionPlanner._setStateChoosingDropDestinationOnDrag() error 3, currState: ${currState}`);

            } else if (currState === State.ChoosingAction) {
                Logger.error(`McwActionPlanner._setStateChoosingDropDestinationOnDrag() error 4, currState: ${currState}`);

            } else if (currState === State.ChoosingAttackTarget) {
                Logger.error(`McwActionPlanner._setStateChoosingDropDestinationOnDrag() error 5, currState: ${currState}`);

            } else if (currState === State.ChoosingDropDestination) {
                // Nothing to do.

            } else if (currState === State.ChoosingFlareDestination) {
                Logger.error(`McwActionPlanner._setStateChoosingDropDestinationOnDrag() error 6, currState: ${currState}`);

            } else if (currState === State.ChoosingSiloDestination) {
                Logger.error(`McwActionPlanner._setStateChoosingDropDestinationOnDrag() error 7, currState: ${currState}`);

            } else if (currState === State.ChoosingProductionTarget) {
                Logger.error(`McwActionPlanner._setStateChoosingDropDestinationOnDrag() error 8, currState: ${currState}`);

            } else if (currState === State.PreviewingAttackableArea) {
                Logger.error(`McwActionPlanner._setStateChoosingDropDestinationOnDrag() error 9, currState: ${currState}`);

            } else if (currState === State.PreviewingMovableArea) {
                Logger.error(`McwActionPlanner._setStateChoosingDropDestinationOnDrag() error 10, currState: ${currState}`);

            } else {
                Logger.error(`McwActionPlanner._setStateChoosingDropDestinationOnDrag() error 11, currState: ${currState}`);
            }

            this._setState(State.ChoosingDropDestination);
            this._updateView();
        }
        private _setStateChoosingDropDestinationOnChooseAction(unitForDrop: McwUnit): void {
            const currState = this.getState();
            if (currState !== State.ChoosingAction) {
                Logger.error(`McwActionPlanner._setStateChoosingDropDestinationOnChooseAction() error 1, currState: ${currState}`);
            } else {
                this._setChoosingUnitForDrop(unitForDrop);
                this._setAvailableDropDestinations(this._calculateAvailableDropDestination(unitForDrop, this._getChosenDropDestinations()));
            }

            this._setState(State.ChoosingDropDestination);
            this._updateView();
        }

        private _setStateChoosingFlareDestinationOnTap(gridIndex: GridIndex): void {
            Logger.error(`McwActionPlanner._setStateChoosingFlareDestinationOnTap() error 1, currState: ${this.getState()}`);
        }
        private _setStateChoosingFlareDestinationOnDrag(gridIndex: GridIndex): void {
            const currState = this.getState();
            if (currState === State.Idle) {
                Logger.error(`McwActionPlanner._setStateChoosingFlareDestinationOnDrag() error 1, currState: ${currState}`);

            } else if (currState === State.ExecutingAction) {
                Logger.error(`McwActionPlanner._setStateChoosingFlareDestinationOnDrag() error 2, currState: ${currState}`);

            } else if (currState === State.MakingMovePath) {
                Logger.error(`McwActionPlanner._setStateChoosingFlareDestinationOnDrag() error 3, currState: ${currState}`);

            } else if (currState === State.ChoosingAction) {
                Logger.error(`McwActionPlanner._setStateChoosingFlareDestinationOnDrag() error 4, currState: ${currState}`);

            } else if (currState === State.ChoosingAttackTarget) {
                Logger.error(`McwActionPlanner._setStateChoosingFlareDestinationOnDrag() error 5, currState: ${currState}`);

            } else if (currState === State.ChoosingDropDestination) {
                Logger.error(`McwActionPlanner._setStateChoosingFlareDestinationOnDrag() error 6, currState: ${currState}`);

            } else if (currState === State.ChoosingFlareDestination) {
                // Nothing to do.

            } else if (currState === State.ChoosingSiloDestination) {
                Logger.error(`McwActionPlanner._setStateChoosingFlareDestinationOnDrag() error 7, currState: ${currState}`);

            } else if (currState === State.ChoosingProductionTarget) {
                Logger.error(`McwActionPlanner._setStateChoosingFlareDestinationOnDrag() error 8, currState: ${currState}`);

            } else if (currState === State.PreviewingAttackableArea) {
                Logger.error(`McwActionPlanner._setStateChoosingFlareDestinationOnDrag() error 9, currState: ${currState}`);

            } else if (currState === State.PreviewingMovableArea) {
                Logger.error(`McwActionPlanner._setStateChoosingFlareDestinationOnDrag() error 10, currState: ${currState}`);

            } else {
                Logger.error(`McwActionPlanner._setStateChoosingFlareDestinationOnDrag() error 11, currState: ${currState}`);
            }

            this._setState(State.ChoosingFlareDestination);
            this._updateView();
        }
        private _setStateChoosingFlareDestinationOnChooseAction(): void {
            const currState = this.getState();
            if (currState !== State.ChoosingAction) {
                Logger.error(`McwActionPlanner._setStateChoosingFlareDestinationOnChooseAction() error 1, currState: ${currState}`);
            } else {
                // Nothing to do.
            }

            this._setState(State.ChoosingFlareDestination);
            this._updateView();
        }

        private _setStateChoosingSiloDestinationOnTap(gridIndex: GridIndex): void {
            Logger.error(`McwActionPlanner._setStateChoosingSiloDestinationOnTap() error 1, currState: ${this.getState()}`);
        }
        private _setStateChoosingSiloDestinationOnDrag(gridIndex: GridIndex): void {
            const currState = this.getState();
            if (currState === State.Idle) {
                Logger.error(`McwActionPlanner._setStateChoosingSiloDestinationOnDrag() error 1, currState: ${currState}`);

            } else if (currState === State.ExecutingAction) {
                Logger.error(`McwActionPlanner._setStateChoosingSiloDestinationOnDrag() error 2, currState: ${currState}`);

            } else if (currState === State.MakingMovePath) {
                Logger.error(`McwActionPlanner._setStateChoosingSiloDestinationOnDrag() error 3, currState: ${currState}`);

            } else if (currState === State.ChoosingAction) {
                Logger.error(`McwActionPlanner._setStateChoosingSiloDestinationOnDrag() error 4, currState: ${currState}`);

            } else if (currState === State.ChoosingAttackTarget) {
                Logger.error(`McwActionPlanner._setStateChoosingSiloDestinationOnDrag() error 5, currState: ${currState}`);

            } else if (currState === State.ChoosingDropDestination) {
                Logger.error(`McwActionPlanner._setStateChoosingSiloDestinationOnDrag() error 6, currState: ${currState}`);

            } else if (currState === State.ChoosingFlareDestination) {
                Logger.error(`McwActionPlanner._setStateChoosingSiloDestinationOnDrag() error 7, currState: ${currState}`);

            } else if (currState === State.ChoosingSiloDestination) {
                // Nothing to do.

            } else if (currState === State.ChoosingProductionTarget) {
                Logger.error(`McwActionPlanner._setStateChoosingSiloDestinationOnDrag() error 8, currState: ${currState}`);

            } else if (currState === State.PreviewingAttackableArea) {
                Logger.error(`McwActionPlanner._setStateChoosingSiloDestinationOnDrag() error 9, currState: ${currState}`);

            } else if (currState === State.PreviewingMovableArea) {
                Logger.error(`McwActionPlanner._setStateChoosingSiloDestinationOnDrag() error 10, currState: ${currState}`);

            } else {
                Logger.error(`McwActionPlanner._setStateChoosingSiloDestinationOnDrag() error 11, currState: ${currState}`);
            }

            this._setState(State.ChoosingSiloDestination);
            this._updateView();
        }
        private _setStateChoosingSiloDestinationOnChooseAction(): void {
            const currState = this.getState();
            if (currState !== State.ChoosingAction) {
                Logger.error(`McwActionPlanner._setStateChoosingSiloDestinationOnChooseAction() error 1, currState: ${currState}`);
            } else {
                // Nothing to do.
            }

            this._setState(State.ChoosingSiloDestination);
            this._updateView();
        }

        private _setStateChoosingProductionTargetOnTap(gridIndex: GridIndex): void {
            this._clearFocusUnitOnMap();
            this._clearFocusUnitLoaded();
            this._clearChoosingUnitForDrop();
            this._clearChosenUnitsForDrop();
            this._clearAvailableDropDestinations();
            this._clearDataForPreviewingAttackableArea();
            this._clearDataForPreviewingMovableArea();

            this._setState(State.ChoosingProductionTarget);
            this._updateView();
            McwProduceUnitPanel.show(gridIndex);
        }
        private _setStateChoosingProductionTargetOnDrag(gridIndex: GridIndex): void {
            Logger.error(`McwActionPlanner._setStateChoosingProductionTargetOnDrag() error 1, currState: ${this.getState()}`);
        }

        private _setStatePreviewingAttackableAreaOnTap(gridIndex: GridIndex): void {
            this._clearFocusUnitOnMap();
            this._clearFocusUnitLoaded();
            this._clearChoosingUnitForDrop();
            this._clearChosenUnitsForDrop();
            this._clearAvailableDropDestinations();
            this._addUnitForPreviewAttackableArea(this._unitMap.getUnitOnMap(gridIndex));
            this._clearDataForPreviewingMovableArea();

            this._setState(State.PreviewingAttackableArea);
            this._updateView();
        }
        private _setStatePreviewingAttackableAreaOnDrag(gridIndex: GridIndex): void {
            // Nothing to do.
        }

        private _setStatePreviewingMovableAreaOnTap(gridIndex: GridIndex): void {
            this._clearFocusUnitOnMap();
            this._clearFocusUnitLoaded();
            this._clearChoosingUnitForDrop();
            this._clearChosenUnitsForDrop();
            this._clearAvailableDropDestinations();
            this._clearDataForPreviewingAttackableArea();
            this._setUnitForPreviewingMovableArea(this._unitMap.getUnitOnMap(gridIndex));

            this._setState(State.PreviewingMovableArea);
            this._updateView();
        }
        private _setStatePreviewingMovableAreaOnDrag(gridIndex: GridIndex): void {
            // Nothing to do.
        }

        ////////////////////////////////////////////////////////////////////////////////////////////////////
        // Functions for setting requesting state.
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        public setStateRequestingProduceUnitOnTile(gridIndex: GridIndex, unitType: UnitType): void {
            McwProxy.reqMcwProduceUnitOnTile(this._war, gridIndex, unitType);

            this._setState(State.RequestingProduceUnitOnTile);
            this._updateView();
        }

        private _setStateRequestingUnitProduceUnit(): void {
            FloatText.show(`Unit produce unit TODO!!!`);
        }

        private _setStateRequestingUnitBeLoaded(): void {
            const unit = this.getFocusUnitLoaded();
            McwProxy.reqMcwUnitBeLoaded(this._war, this.getMovePath(), unit ? unit.getUnitId() : undefined);

            this._setState(State.RequestingUnitBeLoaded);
            this._updateView();
        }

        private _setStateRequestingUnitJoin(): void {
            FloatText.show("Unit join TODO!!!");
        }

        private _setStateRequestingUnitWait(): void {
            const unit = this.getFocusUnitLoaded();
            McwProxy.reqMcwUnitWait(this._war, this.getMovePath(), unit ? unit.getUnitId() : undefined);

            this._setState(State.RequestingUnitWait);
            this._updateView();
        }

        private _setStateRequestingUnitAttack(targetGridIndex: GridIndex): void {
            const unit = this.getFocusUnitLoaded();
            McwProxy.reqMcwUnitAttack(this._war, this.getMovePath(), unit ? unit.getUnitId() : undefined, targetGridIndex);

            this._setState(State.RequestingUnitAttack);
            this._updateView();
        }

        private _setStateRequestingUnitBuildTile(): void {
            FloatText.show(`Unit build tile TODO!!!`);
        }

        private _setStateRequestingUnitCaptureTile(): void {
            const unit = this.getFocusUnitLoaded();
            McwProxy.reqMcwUnitCaptureTile(this._war, this.getMovePath(), unit ? unit.getUnitId() : undefined);

            this._setState(State.RequestingUnitCaptureTile);
            this._updateView();
        }

        private _setStateRequestingUnitDive(): void {
            FloatText.show(`Unit dive TODO!!!`);
        }

        private _setStateRequestingUnitSurface(): void {
            FloatText.show(`Unit surface TODO!!!`);
        }

        private _setStateRequestingUnitDrop(): void {
            FloatText.show(`Unit drop TODO!!!`);
        }

        private _setStateRequestingUnitLaunchFlare(): void {
            FloatText.show(`Unit launch flare TODO!!!`);
        }

        private _setStateRequestingUnitLaunchSilo(): void {
            FloatText.show(`Unit launch silo TODO!!!`);
        }

        private _setStateRequestingUnitSupply(): void {
            FloatText.show(`Unit supply TODO!!!`);
        }

        public setStateRequestingPlayerBeginTurn(): void {
            McwProxy.reqMcwPlayerBeginTurn(this._war);

            this._setState(State.RequestingPlayerBeginTurn);
            this._updateView();
        }

        public setStateRequestingPlayerEndTurn(): void {
            McwProxy.reqMcwPlayerEndTurn(this._war);

            this._setState(State.RequestingPlayerEndTurn);
            this._updateView();
        }

        public setStateRequestingPlayerSurrender(): void {
            McwProxy.reqMcwPlayerSurrender(this._war);

            this._setState(State.RequestingPlayerSurrender);
            this._updateView();
        }

        ////////////////////////////////////////////////////////////////////////////////////////////////////
        // Other functions.
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        public getView(): McwActionPlannerView {
            return this._view;
        }
        private _updateView(): void {
            this.getView().updateView();

            const currState = this.getState();
            if (currState === State.ChoosingAction) {
                McwUnitActionsPanel.show(this._getDataForUnitActionsPanel());
            } else {
                McwUnitActionsPanel.hide();
            }
        }

        public getCursor(): McwCursor {
            return this._cursor;
        }

        private _setMapSize(size: Types.MapSize): void {
            this._mapSize = size;
        }
        public getMapSize(): Types.MapSize {
            return this._mapSize;
        }

        public checkIsStateRequesting(): boolean {
            return _checkIsStateRequesting(this.getState());
        }

        public getFocusUnit(): McwUnit | undefined {
            return this.getFocusUnitLoaded() || this.getFocusUnitOnMap();
        }
        public getFocusUnitOnMap(): McwUnit | undefined {
            return this._focusUnitOnMap;
        }
        private _setFocusUnitOnMap(unit: McwUnit): void {
            this._focusUnitOnMap = unit;
        }
        private _clearFocusUnitOnMap(): void {
            delete this._focusUnitOnMap;
        }

        public getFocusUnitLoaded(): McwUnit | undefined {
            return this._focusUnitLoaded;
        }
        private _setFocusUnitLoaded(unit: McwUnit): void {
            this._focusUnitLoaded = unit;
        }
        private _clearFocusUnitLoaded(): void {
            delete this._focusUnitLoaded;
        }

        public getAvailableDropDestinations(): GridIndex[] | undefined {
            return this._availableDropDestinations;
        }
        private _setAvailableDropDestinations(destinations: GridIndex[]): void {
            this._availableDropDestinations = destinations;
        }
        private _clearAvailableDropDestinations(): void {
            delete this._availableDropDestinations;
        }

        public getChoosingUnitForDrop(): McwUnit | undefined {
            return this._choosingUnitForDrop;
        }
        private _setChoosingUnitForDrop(unit: McwUnit): void {
            this._choosingUnitForDrop = unit;
        }
        private _clearChoosingUnitForDrop(): void {
            delete this._choosingUnitForDrop;
        }

        public getChosenUnitsForDrop(): ChosenUnitForDrop[] {
            return this._chosenUnitsForDrop;
        }
        private _pushBackChosenUnitForDrop(data: ChosenUnitForDrop): void {
            this._chosenUnitsForDrop.push(data);
        }
        private _popBackChosenUnitForDrop(): ChosenUnitForDrop {
            return this._chosenUnitsForDrop.pop();
        }
        private _clearChosenUnitsForDrop(): void {
            this._chosenUnitsForDrop.length = 0;
        }
        private _getChosenDropDestinations(): GridIndex[] {
            const destinations: GridIndex[] = [];
            for (const data of this.getChosenUnitsForDrop()) {
                destinations.push(data.destination);
            }
            return destinations;
        }

        private _resetMovableArea(): void {
            const unit = this.getFocusUnit();
            this._movableArea = McwHelpers.createMovableArea(
                unit.getGridIndex(),
                unit.getFinalMoveRange(),
                gridIndex => this._getMoveCost(gridIndex, unit)
            );
        }
        public getMovableArea(): MovableArea {
            return this._movableArea;
        }

        private _resetAttackableArea(): void {
            const unit                  = this.getFocusUnit();
            const canAttakAfterMove     = unit.checkCanAttackAfterMove();
            const isLoaded              = unit.getLoaderUnitId() != null;
            const beginningGridIndex    = unit.getGridIndex();
            const hasAmmo               = (unit.getPrimaryWeaponCurrentAmmo() > 0) || (unit.checkHasSecondaryWeapon());
            const unitMap               = this._unitMap;
            this._attackableArea        = McwHelpers.createAttackableArea(
                this.getMovableArea(),
                this.getMapSize(),
                unit.getMinAttackRange(),
                unit.getMaxAttackRange(),
                (moveGridIndex: GridIndex, attackGridIndex: GridIndex): boolean => {
                    const existingUnit = unitMap.getUnitOnMap(moveGridIndex);
                    if ((!hasAmmo) || ((existingUnit) && (existingUnit !== unit))) {
                        return false;
                    } else {
                        const hasMoved = !GridIndexHelpers.checkIsEqual(moveGridIndex, beginningGridIndex);
                        return ((!isLoaded) || (hasMoved))
                            && ((canAttakAfterMove) || (!hasMoved))
                    }
                }
            );
        }
        public getAttackableArea(): AttackableArea {
            return this._attackableArea;
        }

        private _setAttackableGridsAfterMove(grids: GridIndex[]): void {
            this._attackableGridsAfterMove = grids;
        }
        public getAttackableGridsAfterMove(): GridIndex[] {
            return this._attackableGridsAfterMove;
        }
        public checkHasAttackableGridAfterMove(gridIndex: GridIndex): boolean {
            for (const grid of this.getAttackableGridsAfterMove()) {
                if (GridIndexHelpers.checkIsEqual(grid, gridIndex)) {
                    return true;
                }
            }
            return false;
        }
        private _createAttackableGridsAfterMove(): GridIndex[] {
            const unit = this.getFocusUnit();
            return GridIndexHelpers.getGridsWithinDistance(
                this.getMovePathDestination(),
                unit.getMinAttackRange(),
                unit.getMaxAttackRange(),
                this._mapSize,
                (gridIndex) => unit.checkCanAttackTargetAfterMovePath(this.getMovePath(), gridIndex)
            );
        }

        ////////////////////////////////////////////////////////////////////////////////////////////////////
        // Functions for move path.
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        private _resetMovePathAsShortest(destination: GridIndex): void {
            this._setMovePath(McwHelpers.createShortestMovePath(this.getMovableArea(), destination));
        }
        private _setMovePath(movePath: MovePathNode[]): void {
            this._movePath = movePath;
        }
        public getMovePath(): MovePathNode[] {
            return this._movePath;
        }
        public getMovePathDestination(): MovePathNode {
            const movePath = this.getMovePath();
            return movePath[movePath.length - 1];
        }
        private _updateMovePathByDestination(destination: GridIndex): void {
            const { x, y }      = destination;
            const movableArea   = this.getMovableArea();
            const currPath      = this.getMovePath();
            if ((movableArea[x]) && (movableArea[x][y]) && (!GridIndexHelpers.checkIsEqual(currPath[currPath.length - 1], destination))) {
                if ((!this._checkAndTruncateMovePath(destination)) && (!this._checkAndExtendMovePath(destination))) {
                    this._resetMovePathAsShortest(destination);
                }
            }
        }
        private _checkAndTruncateMovePath(destination: GridIndex): boolean {
            const path      = this.getMovePath();
            const length    = path.length;
            for (let i = 0; i < length; ++i) {
                if (GridIndexHelpers.checkIsEqual(path[i], destination)) {
                    path.length = i + 1;
                    return true;
                }
            }
            return false;
        }
        private _checkAndExtendMovePath(destination: GridIndex): boolean {
            const path      = this.getMovePath();
            const length    = path.length;
            const prevGrid  = path[length - 1];
            if (!GridIndexHelpers.checkIsAdjacent(prevGrid, destination)) {
                return false;
            } else {
                const focusUnit     = this.getFocusUnit();
                const totalMoveCost = this._getMoveCost(destination, focusUnit) + prevGrid.totalMoveCost;
                if (totalMoveCost > focusUnit.getFinalMoveRange()) {
                    return false;
                } else {
                    path.push({
                        x   : destination.x,
                        y   : destination.y,
                        totalMoveCost,
                    });
                    return true;
                }
            }
        }

        ////////////////////////////////////////////////////////////////////////////////////////////////////
        // Functions for previewing attackable area.
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        public getUnitsForPreviewingAttackableArea(): Map<number, McwUnit> {
            return this._unitsForPreviewAttack;
        }
        public getAreaForPreviewingAttack(): AttackableArea {
            return this._areaForPreviewAttack;
        }
        private _clearDataForPreviewingAttackableArea(): void {
            this._unitsForPreviewAttack.clear();
            this._areaForPreviewAttack.length = 0;
        }
        private _addUnitForPreviewAttackableArea(unit: McwUnit): void {
            const canAttakAfterMove     = unit.checkCanAttackAfterMove();
            const beginningGridIndex    = unit.getGridIndex();
            const hasAmmo               = (unit.getPrimaryWeaponCurrentAmmo() > 0) || (unit.checkHasSecondaryWeapon());
            const mapSize               = this.getMapSize();
            const unitMap               = this._unitMap;
            const newArea               = McwHelpers.createAttackableArea(
                McwHelpers.createMovableArea(
                    unit.getGridIndex(),
                    unit.getFinalMoveRange(),
                    gridIndex => this._getMoveCost(gridIndex, unit)
                ),
                mapSize,
                unit.getMinAttackRange(),
                unit.getMaxAttackRange(),
                (moveGridIndex, attackGridIndex) => {
                    const existingUnit = unitMap.getUnitOnMap(moveGridIndex);
                    return ((!existingUnit) || (existingUnit === unit))
                        && (hasAmmo)
                        && ((canAttakAfterMove) || (GridIndexHelpers.checkIsEqual(moveGridIndex, beginningGridIndex)));
                }
            );

            this._unitsForPreviewAttack.set(unit.getUnitId(), unit);
            if (!this._areaForPreviewAttack.length) {
                this._areaForPreviewAttack = newArea;
            } else {
                const { width, height } = mapSize;
                for (let x = 0; x < width; ++x) {
                    if (newArea[x]) {
                        if (!this._areaForPreviewAttack[x]) {
                            this._areaForPreviewAttack[x] = newArea[x];
                        } else {
                            for (let y = 0; y < height; ++y) {
                                this._areaForPreviewAttack[x][y] = this._areaForPreviewAttack[x][y] || newArea[x][y];
                            }
                        }
                    }
                }
            }
        }

        ////////////////////////////////////////////////////////////////////////////////////////////////////
        // Functions for previewing movable area.
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        public getUnitForPreviewingMovableArea(): McwUnit | undefined {
            return this._unitForPreviewMove;
        }
        public getAreaForPreviewingMove(): MovableArea {
            return this._areaForPreviewMove;
        }
        private _clearDataForPreviewingMovableArea(): void {
            delete this._unitForPreviewMove;
            delete this._areaForPreviewMove;
        }
        private _setUnitForPreviewingMovableArea(unit: McwUnit): void {
            this._unitForPreviewMove = unit;
            this._areaForPreviewMove = McwHelpers.createMovableArea(
                unit.getGridIndex(),
                unit.getFinalMoveRange(),
                gridIndex => this._getMoveCost(gridIndex, unit)
            );
        }

        ////////////////////////////////////////////////////////////////////////////////////////////////////
        // Functions for getting the next state when the player inputs.
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        private _getNextStateOnTap(gridIndex: GridIndex): State {
            const currState = this.getState();
            if ((this.checkIsStateRequesting()) || (currState === State.ExecutingAction)) {
                return currState;
            } else {
                switch (currState) {
                    case State.Idle                         : return this._getNextStateOnTapWhenIdle(gridIndex);
                    case State.MakingMovePath               : return this._getNextStateOnTapWhenMakingMovePath(gridIndex);
                    case State.ChoosingAction               : return this._getNextStateOnTapWhenChoosingAction(gridIndex);
                    case State.ChoosingAttackTarget         : return this._getNextStateOnTapWhenChoosingAttackTarget(gridIndex);
                    case State.ChoosingDropDestination      : return this._getNextStateOnTapWhenChoosingDropDestination(gridIndex);
                    case State.ChoosingFlareDestination     : return this._getNextStateOnTapWhenChoosingFlareDestination(gridIndex);
                    case State.ChoosingSiloDestination      : return this._getNextStateOnTapWhenChoosingSiloDestination(gridIndex);
                    case State.ChoosingProductionTarget     : return this._getNextStateOnTapWhenChoosingProductionTarget(gridIndex);
                    case State.PreviewingAttackableArea     : return this._getNextStateOnTapWhenPreviewingAttackableArea(gridIndex);
                    case State.PreviewingMovableArea        : return this._getNextStateOnTapWhenPreviewingMovableArea(gridIndex);
                    default:
                        Logger.error(`McwActionPlanner._getNextStateOnTap() invalid currState!`);
                        return State.Idle;
                }
            }
        }
        private _getNextStateOnTapWhenIdle(gridIndex: GridIndex): State {
            const turnManager       = this._turnManager;
            const unit              = this._unitMap.getUnitOnMap(gridIndex);
            const selfPlayerIndex   = this._playerIndexLoggedIn;
            const isSelfInTurn      = (turnManager.getPlayerIndexInTurn() === selfPlayerIndex) && (turnManager.getPhaseCode() === TurnPhaseCode.Main);
            if (!unit) {
                const tile = this._tileMap.getTile(gridIndex);
                if ((isSelfInTurn) && (tile.getPlayerIndex() === selfPlayerIndex) && (tile.checkIsUnitProducer())) {
                    return State.ChoosingProductionTarget;
                } else {
                    return State.Idle;
                }
            } else {
                if ((isSelfInTurn) && ((unit.getState() === UnitState.Idle) && (unit.getPlayerIndex() === selfPlayerIndex))) {
                    return State.MakingMovePath;
                } else {
                    if (unit.checkHasWeapon()) {
                        return State.PreviewingAttackableArea;
                    } else {
                        return State.PreviewingMovableArea;
                    }
                }
            }
        }
        private _getNextStateOnTapWhenMakingMovePath(gridIndex: GridIndex): State {
            const existingUnit      = this._unitMap.getUnitOnMap(gridIndex);
            const selfPlayerIndex   = this._playerIndexLoggedIn;
            if (checkAreaHasGrid(this.getMovableArea(), gridIndex)) {
                if (!existingUnit) {
                    return State.ChoosingAction;
                } else {
                    if (existingUnit.getPlayerIndex() !== selfPlayerIndex) {
                        if (existingUnit.checkHasWeapon()) {
                            return State.PreviewingAttackableArea;
                        } else {
                            return State.PreviewingMovableArea;
                        }
                    } else {
                        const focusUnit = this.getFocusUnit();
                        if ((focusUnit === this.getFocusUnitLoaded()) && (GridIndexHelpers.checkIsEqual(gridIndex, focusUnit.getGridIndex()))) {
                            return State.MakingMovePath;
                        } else {
                            if ((focusUnit === existingUnit) || (existingUnit.checkCanJoinUnit(focusUnit)) || (existingUnit.checkCanLoadUnit(focusUnit))) {
                                return State.ChoosingAction;
                            } else {
                                if (existingUnit.getState() === UnitState.Idle) {
                                    return State.MakingMovePath;
                                } else {
                                    return State.Idle;
                                }
                            }
                        }
                    }
                }
            } else {
                if (this._checkCanFocusUnitOnMapAttackTarget(gridIndex)) {
                    if (GridIndexHelpers.checkIsEqual(gridIndex, this.getCursor().getPreviousGridIndex())) {
                        return State.RequestingUnitAttack;
                    } else {
                        return State.MakingMovePath;
                    }
                } else {
                    if (!existingUnit) {
                        return State.Idle;
                    } else {
                        if ((existingUnit.getPlayerIndex() === selfPlayerIndex) && (existingUnit.getState() === UnitState.Idle)) {
                            return State.MakingMovePath;
                        } else {
                            if (existingUnit.checkHasWeapon()) {
                                return State.PreviewingAttackableArea;
                            } else {
                                return State.PreviewingMovableArea;
                            }
                        }
                    }
                }
            }
        }
        private _getNextStateOnTapWhenChoosingAction(gridIndex: GridIndex): State {
            if (this.getChosenUnitsForDrop().length) {
                return State.ChoosingDropDestination;
            } else {
                return State.MakingMovePath;
            }
        }
        private _getNextStateOnTapWhenChoosingAttackTarget(gridIndex: GridIndex): State {
            if (!this.checkHasAttackableGridAfterMove(gridIndex)) {
                return State.ChoosingAction;
            } else {
                if (GridIndexHelpers.checkIsEqual(this.getCursor().getPreviousGridIndex(), gridIndex)) {
                    return State.RequestingUnitAttack;
                } else {
                    return State.ChoosingAttackTarget;
                }
            }
        }
        private _getNextStateOnTapWhenChoosingDropDestination(gridIndex: GridIndex): State {
            if (this.getAvailableDropDestinations().every(g => !GridIndexHelpers.checkIsEqual(g, gridIndex))) {
                return State.ChoosingAction;
            } else {
                const chosenUnits               = [this.getChoosingUnitForDrop()];
                const chosenDropDestinations    = [gridIndex];
                for (const data of this.getChosenUnitsForDrop()) {
                    chosenUnits.push(data.unit);
                    chosenDropDestinations.push(data.destination);
                }

                const restLoadedUnits = this.getFocusUnitOnMap().getLoadedUnits().filter(unit => chosenUnits.every(u => u !== unit));
                for (const unit of restLoadedUnits) {
                    if (this._calculateAvailableDropDestination(unit, chosenDropDestinations).length) {
                        return State.ChoosingAction;
                    }
                }

                return State.RequestingUnitDrop;
            }
        }
        private _getNextStateOnTapWhenChoosingFlareDestination(gridIndex: GridIndex): State {
            // TODO
            return State.Idle;
        }
        private _getNextStateOnTapWhenChoosingSiloDestination(gridIndex: GridIndex): State {
            // TODO
            return State.Idle;
        }
        private _getNextStateOnTapWhenChoosingProductionTarget(gridIndex: GridIndex): State {
            if (GridIndexHelpers.checkIsEqual(this.getCursor().getPreviousGridIndex(), gridIndex)) {
                return State.Idle;
            } else {
                const turnManager       = this._turnManager;
                const unit              = this._unitMap.getUnitOnMap(gridIndex);
                const selfPlayerIndex   = this._playerIndexLoggedIn;
                const isSelfInTurn      = (turnManager.getPlayerIndexInTurn() === selfPlayerIndex) && (turnManager.getPhaseCode() === TurnPhaseCode.Main);
                if (!unit) {
                    const tile = this._tileMap.getTile(gridIndex);
                    if ((isSelfInTurn) && (tile.getPlayerIndex() === selfPlayerIndex) && (tile.checkIsUnitProducer())) {
                        return State.ChoosingProductionTarget;
                    } else {
                        return State.Idle;
                    }
                } else {
                    if ((isSelfInTurn) && ((unit.getState() === UnitState.Idle) && (unit.getPlayerIndex() === selfPlayerIndex))) {
                        return State.MakingMovePath;
                    } else {
                        if (unit.checkHasWeapon()) {
                            return State.PreviewingAttackableArea;
                        } else {
                            return State.PreviewingMovableArea;
                        }
                    }
                }
            }
        }
        private _getNextStateOnTapWhenPreviewingAttackableArea(gridIndex: GridIndex): State {
            const turnManager       = this._turnManager;
            const unit              = this._unitMap.getUnitOnMap(gridIndex);
            const selfPlayerIndex   = this._playerIndexLoggedIn;
            const isSelfInTurn      = (turnManager.getPlayerIndexInTurn() === selfPlayerIndex) && (turnManager.getPhaseCode() === TurnPhaseCode.Main);
            if (!unit) {
                const tile = this._tileMap.getTile(gridIndex);
                if ((isSelfInTurn) && (tile.getPlayerIndex() === selfPlayerIndex) && (tile.checkIsUnitProducer())) {
                    return State.ChoosingProductionTarget;
                } else {
                    return State.Idle;
                }
            } else {
                if ((isSelfInTurn) && ((unit.getState() === UnitState.Idle) && (unit.getPlayerIndex() === selfPlayerIndex))) {
                    return State.MakingMovePath;
                } else {
                    if (this.getUnitsForPreviewingAttackableArea().has(unit.getUnitId())) {
                        return State.PreviewingMovableArea;
                    } else {
                        if (unit.checkHasWeapon()) {
                            return State.PreviewingAttackableArea;
                        } else {
                            return State.PreviewingMovableArea;
                        }
                    }
                }
            }
        }
        private _getNextStateOnTapWhenPreviewingMovableArea(gridIndex: GridIndex): State {
            const turnManager       = this._turnManager;
            const unit              = this._unitMap.getUnitOnMap(gridIndex);
            const selfPlayerIndex   = this._playerIndexLoggedIn;
            const isSelfInTurn      = (turnManager.getPlayerIndexInTurn() === selfPlayerIndex) && (turnManager.getPhaseCode() === TurnPhaseCode.Main);
            if (!unit) {
                const tile = this._tileMap.getTile(gridIndex);
                if ((isSelfInTurn) && (tile.getPlayerIndex() === selfPlayerIndex) && (tile.checkIsUnitProducer())) {
                    return State.ChoosingProductionTarget;
                } else {
                    return State.Idle;
                }
            } else {
                if ((isSelfInTurn) && ((unit.getState() === UnitState.Idle) && (unit.getPlayerIndex() === selfPlayerIndex))) {
                    return State.MakingMovePath;
                } else {
                    if (this.getUnitForPreviewingMovableArea() !== unit) {
                        return State.PreviewingMovableArea;
                    } else {
                        if (unit.checkHasWeapon()) {
                            return State.PreviewingAttackableArea;
                        } else {
                            return State.Idle;
                        }
                    }
                }
            }
        }

        private _getNextStateOnDrag(gridIndex: GridIndex): State {
            const currState = this.getState();
            if (currState === State.ChoosingProductionTarget) {
                return State.Idle;
            } else {
                return currState;
            }
        }

        ////////////////////////////////////////////////////////////////////////////////////////////////////
        // Functions for generating actions for the focused unit.
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        private _getDataForUnitActionsPanel(): DataForUnitActionRenderer[] {
            let action = this._getActionUnitBeLoaded();
            if (action) {
                return [action];
            }
            action = this._getActionUnitJoin();
            if (action) {
                return [action];
            }

            const datas = new Array<DataForUnitActionRenderer>();
            action = this._getActionUnitAttack();       (action) && (datas.push(action));
            action = this._getActionUnitCapture();      (action) && (datas.push(action));
            action = this._getActionUnitDive();         (action) && (datas.push(action));
            action = this._getActionUnitSurface();      (action) && (datas.push(action));
            action = this._getActionUnitBuildTile();    (action) && (datas.push(action));
            action = this._getActionUnitSupply();       (action) && (datas.push(action));
            for (const act of this._getActionsUnitLaunchUnit()) { datas.push(act); }
            for (const act of this._getActionsUnitDropUnit())   { datas.push(act); }
            action = this._getActionUnitLaunchFlare();  (action) && (datas.push(action));
            action = this._getActionUnitLaunchSilo();   (action) && (datas.push(action));
            action = this._getActionUnitProduceUnit();  (action) && (datas.push(action));
            action = this._getActionUnitWait();         (action) && (datas.push(action));

            Logger.assert(datas.length, `McwActionPlanner._getDataForUntiActionsPanel() no actions available?!`);
            return datas;
        }

        private _getActionUnitBeLoaded(): DataForUnitActionRenderer | undefined {
            const destination   = this.getMovePathDestination();
            const focusUnit     = this.getFocusUnit();
            if (GridIndexHelpers.checkIsEqual(focusUnit.getGridIndex(), destination)) {
                return undefined;
            } else {
                const loader = this._unitMap.getUnitOnMap(destination);
                return (loader) && (loader.checkCanLoadUnit(focusUnit))
                    ? { actionType: UnitActionType.BeLoaded, callback: () => this._setStateRequestingUnitBeLoaded() }
                    : undefined;
            }
        }
        private _getActionUnitJoin(): DataForUnitActionRenderer | undefined {
            const destination   = this.getMovePathDestination();
            const focusUnit     = this.getFocusUnit();
            if (GridIndexHelpers.checkIsEqual(focusUnit.getGridIndex(), destination)) {
                return undefined;
            } else {
                const target = this._unitMap.getUnitOnMap(destination);
                return (target) && (target.checkCanJoinUnit(focusUnit))
                    ? { actionType: UnitActionType.Join, callback: () => this._setStateRequestingUnitJoin() }
                    : undefined;
            }
        }
        private _getActionUnitAttack(): DataForUnitActionRenderer | undefined {
            return this._createAttackableGridsAfterMove().length
                ? { actionType: UnitActionType.Attack, callback: () => this._setStateChoosingAttackTargetOnChooseAction() }
                : undefined;
        }
        private _getActionUnitCapture(): DataForUnitActionRenderer | undefined {
            return (this.getFocusUnit().checkCanCaptureTile(this._tileMap.getTile(this.getMovePathDestination())))
                ? { actionType: UnitActionType.Capture, callback: () => this._setStateRequestingUnitCaptureTile() }
                : undefined;
        }
        private _getActionUnitDive(): DataForUnitActionRenderer | undefined {
            return (this.getFocusUnit().checkCanDive())
                ? { actionType: UnitActionType.Dive, callback: () => this._setStateRequestingUnitDive() }
                : undefined;
        }
        private _getActionUnitSurface(): DataForUnitActionRenderer | undefined {
            return (this.getFocusUnit().checkCanSurface())
                ? { actionType: UnitActionType.Surface, callback: () => this._setStateRequestingUnitSurface() }
                : undefined;
        }
        private _getActionUnitBuildTile(): DataForUnitActionRenderer | undefined {
            return (this.getFocusUnit().checkCanBuildOnTile(this._tileMap.getTile(this.getMovePathDestination())))
                ? { actionType: UnitActionType.BuildTile, callback: () => this._setStateRequestingUnitBuildTile() }
                : undefined;
        }
        private _getActionUnitSupply(): DataForUnitActionRenderer | undefined {
            const focusUnit = this.getFocusUnit();
            if (focusUnit.checkIsAdjacentUnitSupplier()) {
                for (const gridIndex of GridIndexHelpers.getAdjacentGrids(this.getMovePathDestination(), this._mapSize)) {
                    const unit = this._unitMap.getUnitOnMap(gridIndex);
                    if ((unit) && (unit !== focusUnit) && (focusUnit.checkCanSupplyAdjacentUnit(unit))) {
                        return { actionType: UnitActionType.Supply, callback: () => this._setStateRequestingUnitSupply() };
                    }
                }
            }
            return undefined;
        }
        private _getActionsUnitLaunchUnit(): DataForUnitActionRenderer[] {
            const datas     = new Array<DataForUnitActionRenderer>();
            const focusUnit = this.getFocusUnit();
            if ((focusUnit !== this.getFocusUnitLoaded()) && (this.getMovePath().length === 1) && (focusUnit.checkCanLaunchLoadedUnit())) {
                const tile = this._tileMap.getTile(this.getMovePathDestination());
                for (const unit of focusUnit.getLoadedUnits()) {
                    if ((unit.getState() === UnitState.Idle) && (tile.getMoveCostByUnit(unit) != null)) {
                        datas.push({
                            actionType      : UnitActionType.LaunchUnit,
                            callback        : () => this._setStateMakingMovePathOnChooseAction(unit),
                            unitForLaunch   : unit,
                        });
                    }
                }
            }
            return datas;
        }
        private _getActionsUnitDropUnit(): DataForUnitActionRenderer[] {
            const focusUnit                 = this.getFocusUnit();
            const destination               = this.getMovePathDestination();
            const loadedUnits               = focusUnit.getLoadedUnits();
            const chosenUnits               = this.getChosenUnitsForDrop();
            const chosenDropDestinations    = this._getChosenDropDestinations();
            const actions                   = new Array<DataForUnitActionRenderer>();
            if ((loadedUnits.length > chosenUnits.length) && (focusUnit.checkCanDropLoadedUnit(this._tileMap.getTile(destination).getType()))) {
                for (const unit of loadedUnits) {
                    if ((chosenUnits.every(value => value.unit !== unit)) && (this._calculateAvailableDropDestination(unit, chosenDropDestinations).length)) {
                        actions.push({
                            actionType  : UnitActionType.DropUnit,
                            callback    : () => this._setStateChoosingDropDestinationOnChooseAction(unit),
                            unitForDrop : unit,
                        });
                    }
                }
            }
            return actions;
        }
        private _getActionUnitLaunchFlare(): DataForUnitActionRenderer | undefined {
            const ammo = this.getFocusUnit().getFlareCurrentAmmo();
            if ((!this._war.getFogMap().checkHasFogCurrently()) ||
                (this.getMovePath().length !== 1)               ||
                (!this.getFocusUnit().getFlareCurrentAmmo())
            ) {
                return undefined;
            } else {
                return { actionType: UnitActionType.LaunchFlare, callback: () => this._setStateChoosingFlareDestinationOnChooseAction() };
            }
        }
        private _getActionUnitLaunchSilo(): DataForUnitActionRenderer | undefined {
            return (this.getFocusUnit().checkCanLaunchSiloOnTile(this._tileMap.getTile(this.getMovePathDestination())))
                ? { actionType: UnitActionType.LaunchSilo, callback: () => this._setStateChoosingSiloDestinationOnChooseAction() }
                : undefined;
        }
        private _getActionUnitProduceUnit(): DataForUnitActionRenderer | undefined {
            const focusUnit         = this.getFocusUnit();
            const produceUnitType   = focusUnit.getProduceUnitType();
            if ((this.getFocusUnitLoaded()) || (this.getMovePath().length !== 1) || (produceUnitType == null)) {
                return undefined;
            } else {
                if (focusUnit.getCurrentProduceMaterial() < 1) {
                    return {
                        actionType      : UnitActionType.ProduceUnit,
                        callback        : () => FloatText.show(Lang.getText(Lang.Type.B0051)),
                        produceUnitType,
                    };
                } else if (focusUnit.getLoadedUnitsCount() >= focusUnit.getMaxLoadUnitsCount()) {
                    return {
                        actionType      : UnitActionType.ProduceUnit,
                        callback        : () => FloatText.show(Lang.getText(Lang.Type.B0052)),
                        produceUnitType,
                    }
                } else if (this._war.getPlayerLoggedIn().getFund() < focusUnit.getProduceUnitCost()) {
                    return {
                        actionType      : UnitActionType.ProduceUnit,
                        callback        : () => FloatText.show(Lang.getText(Lang.Type.B0053)),
                        produceUnitType,
                    }
                } else {
                    return {
                        actionType      : UnitActionType.ProduceUnit,
                        callback        : () => this._setStateRequestingUnitProduceUnit(),
                        produceUnitType,
                    }
                }
            }
        }
        private _getActionUnitWait(): DataForUnitActionRenderer | undefined {
            const existingUnit = this._unitMap.getUnitOnMap(this.getMovePathDestination());
            if ((existingUnit) && (existingUnit !== this.getFocusUnit())) {
                return undefined;
            } else {
                return { actionType: UnitActionType.Wait, callback: () => this._setStateRequestingUnitWait() };
            }
        }

        ////////////////////////////////////////////////////////////////////////////////////////////////////
        // Other functions.
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        private _getMoveCost(targetGridIndex: GridIndex, movingUnit: McwUnit): number | undefined {
            if (!GridIndexHelpers.checkIsInsideMap(targetGridIndex, this.getMapSize())) {
                return undefined;
            } else {
                const existingUnit = this._unitMap.getUnitOnMap(targetGridIndex);
                if ((existingUnit) && (existingUnit.getTeamIndex() !== movingUnit.getTeamIndex())) {
                    return undefined;
                } else {
                    return this._tileMap.getTile(targetGridIndex).getMoveCostByUnit(movingUnit);
                }
            }
        }

        private _checkCanFocusUnitOnMapAttackTarget(gridIndex: GridIndex): boolean {
            const attackableArea = this.getAttackableArea();
            if (!checkAreaHasGrid(attackableArea, gridIndex)) {
                return false;
            } else {
                const focusUnit = this.getFocusUnitOnMap();
                if (focusUnit.checkCanAttackTargetAfterMovePath(this.getMovePath(), gridIndex)) {
                    return true;
                } else {
                    return focusUnit.checkCanAttackTargetAfterMovePath(
                        McwHelpers.createShortestMovePath(this.getMovableArea(), attackableArea[gridIndex.x][gridIndex.y].movePathDestination),
                        gridIndex
                    );
                }
            }
        }

        private _calculateAvailableDropDestination(unitForDrop: McwUnit, chosenDropDestinations: GridIndex[]): GridIndex[] {
            const loader                = this.getFocusUnit();
            const loaderEndingGridIndex = this.getMovePathDestination();
            const tileMap               = this._tileMap;
            const unitMap               = this._unitMap;
            const destinations          = new Array<GridIndex>();
            if (tileMap.getTile(loaderEndingGridIndex).getMoveCostByUnit(unitForDrop) != null) {
                for (const gridIndex of GridIndexHelpers.getAdjacentGrids(loaderEndingGridIndex, this._mapSize)) {
                    const existingUnit = unitMap.getUnitOnMap(gridIndex);
                    if ((tileMap.getTile(gridIndex).getMoveCostByUnit(unitForDrop) != null)                 &&
                        (chosenDropDestinations.every(g => !GridIndexHelpers.checkIsEqual(g, gridIndex)))   &&
                        ((!existingUnit) || (existingUnit === loader))
                    ) {
                        destinations.push(gridIndex);
                    }
                }
            }
            return destinations;
        }
    }

    function checkAreaHasGrid(area: AttackableArea | MovableArea, gridIndex: GridIndex): boolean {
        const { x, y } = gridIndex;
        return (!!area[x]) && (!!area[x][y]);
    }

    function _checkIsStateRequesting(state: State): boolean {
        return (state === State.RequestingPlayerActivateSkill)
            || (state === State.RequestingPlayerBeginTurn)
            || (state === State.RequestingPlayerDestroyUnit)
            || (state === State.RequestingPlayerEndTurn)
            || (state === State.RequestingPlayerSurrender)
            || (state === State.RequestingPlayerVoteForDraw)
            || (state === State.RequestingProduceUnitOnTile)
            || (state === State.RequestingUnitAttack)
            || (state === State.RequestingUnitBeLoaded)
            || (state === State.RequestingUnitBuildTile)
            || (state === State.RequestingUnitCaptureTile)
            || (state === State.RequestingUnitDive)
            || (state === State.RequestingUnitDrop)
            || (state === State.RequestingUnitJoin)
            || (state === State.RequestingUnitLaunchFlare)
            || (state === State.RequestingUnitLaunchSilo)
            || (state === State.RequestingUnitProduceUnit)
            || (state === State.RequestingUnitSupply)
            || (state === State.RequestingUnitSurface)
            || (state === State.RequestingUnitWait);
    }
}
