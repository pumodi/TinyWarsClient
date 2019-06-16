
namespace TinyWars.Replay {
    import Types            = Utility.Types;
    import Helpers          = Utility.Helpers;
    import Logger           = Utility.Logger;
    // import Visibility       = Utility.VisibilityHelpers;
    import GridIndexHelpers = Utility.GridIndexHelpers;
    import MapModel         = WarMap.WarMapModel;

    export class ReplayUnitMap {
        private _war            : ReplayWar;
        private _configVersion  : number;
        private _nextUnitId     : number;
        private _map            : (ReplayUnit | undefined)[][];
        private _mapSize        : Types.MapSize;
        private _loadedUnits    : Map<number, ReplayUnit>;

        private _view   : ReplayUnitMapView;

        ////////////////////////////////////////////////////////////////////////////////////////////////////
        // Initializers and serializers.
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        public constructor() {
        }

        public async init(configVersion: number, mapIndexKey: Types.MapIndexKey, data?: Types.SerializedMcwUnitMap): Promise<ReplayUnitMap> {
            this._configVersion = configVersion;
            if (data) {
                await this._initWithSerializedData(configVersion, mapIndexKey, data)
            } else {
                await this._initWithoutSerializedData(configVersion, mapIndexKey);
            }

            this._view = this._view || new ReplayUnitMapView();
            this._view.init(this);

            return this;
        }
        private async _initWithSerializedData(configVersion: number, mapIndexKey: Types.MapIndexKey, data: Types.SerializedMcwUnitMap): Promise<ReplayUnitMap> {
            const { mapWidth, mapHeight }   = await MapModel.getMapData(mapIndexKey);
            const unitDatas                 = data.units;
            const map                       = Helpers.createEmptyMap<ReplayUnit>(mapWidth);
            const loadedUnits               = new Map<number, ReplayUnit>();
            if (unitDatas) {
                for (const unitData of unitDatas) {
                    const unit = new ReplayUnit().init(unitData, configVersion);
                    if (unit.getLoaderUnitId() == null) {
                        map[unit.getGridX()][unit.getGridY()] = unit;
                    } else {
                        loadedUnits.set(unit.getUnitId(), unit);
                    }
                }
            }

            this._map           = map;
            this._loadedUnits   = loadedUnits;
            this._setMapSize(mapWidth, mapHeight);
            this.setNextUnitId(data.nextUnitId!);

            return this;
        }
        private async _initWithoutSerializedData(configVersion: number, mapIndexKey: Types.MapIndexKey): Promise<ReplayUnitMap> {
            const { mapWidth, mapHeight, units: unitViewIds } = await MapModel.getMapData(mapIndexKey);
            const map       = Helpers.createEmptyMap<ReplayUnit>(mapWidth);
            let nextUnitId  = 0;
            for (let x = 0; x < mapWidth; ++x) {
                for (let y = 0; y < mapHeight; ++y) {
                    const viewId = unitViewIds[x + y * mapWidth];
                    if (viewId !== 0) {
                        map[x][y] = new ReplayUnit().init({
                            gridX   : x,
                            gridY   : y,
                            viewId  : viewId,
                            unitId  : nextUnitId,
                        }, configVersion);
                        ++nextUnitId;
                    }
                }
            }

            this._map           = map;
            this._loadedUnits   = new Map<number, ReplayUnit>();
            this._setMapSize(mapWidth, mapHeight);
            this.setNextUnitId(nextUnitId);

            return this;
        }

        public startRunning(war: ReplayWar): void {
            this._setWar(war);
            this.forEachUnitOnMap(unit => unit.startRunning(war));
            this.forEachUnitLoaded(unit => unit.startRunning(war));
        }
        public startRunningView(): void {
            this.getView().startRunning();
            this.forEachUnitOnMap(unit => unit.startRunningView());
            this.forEachUnitLoaded(unit => unit.startRunningView());
        }
        public stopRunning(): void {
            this.getView().stopRunning();
        }

        public serialize(): Types.SerializedMcwUnitMap {
            const units: Types.SerializedMcwUnit[] = [];
            this.forEachUnitOnMap(unit => units.push(unit.serialize()));
            this.forEachUnitLoaded(unit => units.push(unit.serialize()));

            return {
                units       : units,
                nextUnitId  : this.getNextUnitId(),
            };
        }
        public serializeForPlayer(playerIndex: number): Types.SerializedMcwUnitMap {
            const war = this.getWar();
            const units: Types.SerializedMcwUnit[] = [];
            this.forEachUnitOnMap(unit => {
                units.push(unit.serialize());

                for (const loadedUnit of this.getUnitsLoadedByLoader(unit, true)) {
                    units.push(loadedUnit.serialize());
                }
            });

            return {
                units       : units.length ? units : undefined,
                nextUnitId  : this.getNextUnitId(),
            };
        }

        ////////////////////////////////////////////////////////////////////////////////////////////////////
        // Other public functions.
        ////////////////////////////////////////////////////////////////////////////////////////////////////
        public getView(): ReplayUnitMapView {
            return this._view;
        }

        private _setWar(war: ReplayWar): void {
            this._war = war;
        }
        public getWar(): ReplayWar {
            return this._war;
        }

        public getConfigVersion(): number {
            return this._configVersion;
        }

        private _setMapSize(width: number, height: number): void {
            this._mapSize = { width: width, height: height };
        }
        public getMapSize(): Types.MapSize {
            return this._mapSize;
        }

        public getNextUnitId(): number {
            return this._nextUnitId;
        }
        public setNextUnitId(id: number): void {
            this._nextUnitId = id;
        }

        public getUnit(gridIndex: Types.GridIndex, unitId: number | undefined | null): ReplayUnit | undefined {
            return unitId != null
                ? this.getUnitLoadedById(unitId)
                : this.getUnitOnMap(gridIndex);
        }

        public getUnitOnMap(gridIndex: Types.GridIndex): ReplayUnit | undefined {
            return this._map[gridIndex.x][gridIndex.y];
        }
        public getUnitLoadedById(unitId: number): ReplayUnit | undefined {
            return this._loadedUnits.get(unitId);
        }
        public getUnitsLoadedByLoader(loader: ReplayUnit, isRecursive: boolean): ReplayUnit[] {
            const units: ReplayUnit[] = [];
            this.forEachUnitLoaded((unit: ReplayUnit) => {
                if (unit.getLoaderUnitId() === loader.getUnitId()) {
                    units.push(unit);
                    (isRecursive) && (units.push(...this.getUnitsLoadedByLoader(unit, isRecursive)));
                }
            });
            return units;
        }

        public swapUnit(gridIndex1: Types.GridIndex, gridIndex2: Types.GridIndex): void {
            if (!GridIndexHelpers.checkIsEqual(gridIndex1, gridIndex2)) {
                const {x: x1, y: y1}    = gridIndex1;
                const {x: x2, y: y2}    = gridIndex2;
                const map               = this._map;
                [map[x1][y1], map[x2][y2]] = [map[x2][y2], map[x1][y1]];
            }
        }

        public setUnitLoaded(gridIndex: Types.GridIndex): void {
            const { x, y }  = gridIndex;
            const unit      = this._map[x][y]!;
            this._map[x][y] = undefined;
            this._loadedUnits.set(unit.getUnitId(), unit);
        }
        public setUnitUnloaded(unitId: number, gridIndex: Types.GridIndex): void {
            this._map[gridIndex.x][gridIndex.y] = this._loadedUnits.get(unitId);
            this._loadedUnits.delete(unitId);
        }

        public addUnitOnMap(unit: ReplayUnit): void {
            const x = unit.getGridX();
            const y = unit.getGridY();
            this._map[x][y] = unit;
            this.getView().addUnit(unit.getView(), true);
        }
        public removeUnitOnMap(gridIndex: Types.GridIndex, removeView: boolean): void {
            const unit = this.getUnitOnMap(gridIndex);
            this._map[gridIndex.x][gridIndex.y] = undefined;
            (removeView) && (this.getView().removeUnit(unit.getView()));
        }

        public addUnitLoaded(unit: ReplayUnit): void {
            this._loadedUnits.set(unit.getUnitId(), unit);
            this.getView().addUnit(unit.getView(), true);
        }
        public removeUnitLoaded(unitId: number): void {
            const unit = this._loadedUnits.get(unitId);
            this._loadedUnits.delete(unitId);
            this.getView().removeUnit(unit.getView());
        }
        public removeUnitsLoadedForPlayer(playerIndex: number): void {
            const units = this._loadedUnits;
            for (const [unitId, unit] of units) {
                if (unit.getPlayerIndex() === playerIndex) {
                    units.delete(unitId);
                    this.getView().removeUnit(unit.getView());
                }
            }
        }

        public forEachUnit(func: (unit: ReplayUnit) => any): void {
            this.forEachUnitOnMap(func);
            this.forEachUnitLoaded(func);
        }
        public forEachUnitOnMap(func: (unit: ReplayUnit) => any): void {
            for (const column of this._map) {
                for (const unit of column) {
                    (unit) && (func(unit));
                }
            }
        }
        public forEachUnitLoaded(func: (unit: ReplayUnit) => any): void {
            for (const [, unit] of this._loadedUnits) {
                func(unit);
            }
        }

        public countUnitsOnMapForPlayer(playerIndex: number): number {
            let count = 0;
            this.forEachUnitOnMap(unit => {
                (unit.getPlayerIndex() === playerIndex) && (++count);
            });
            return count;
        }

        public checkHasUnit(playerIndex: number): boolean {
            for (const column of this._map) {
                for (const unit of column) {
                    if ((unit) && (unit.getPlayerIndex() === playerIndex)) {
                        return true;
                    }
                }
            }
            return false;
        }
    }
}