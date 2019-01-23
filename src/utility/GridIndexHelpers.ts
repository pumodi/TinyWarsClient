
namespace TinyWars.Utility.GridIndexHelpers {
    import GridIndex    = Types.GridIndex;
    import MapSize      = Types.MapSize;
    import Direction    = Types.Direction;
    import Point        = Types.Point;

    const _ADJACENT_OFFSETS = [
        { offset: { x: -1, y:  0 }, direction: Direction.Left,  clockwiseOffset: { x:  1, y:  1 }, },
        { offset: { x:  1, y:  0 }, direction: Direction.Right, clockwiseOffset: { x: -1, y: -1 }, },
        { offset: { x:  0, y: -1 }, direction: Direction.Down,  clockwiseOffset: { x: -1, y:  1 }, },
        { offset: { x:  0, y:  1 }, direction: Direction.Up,    clockwiseOffset: { x:  1, y: -1 }, },
    ];

    export function createGridIndexByPoint(p: Point): GridIndex {
        const { width, height } = ConfigManager.getGridSize();
        return {
            x: Math.floor(p.x / width),
            y: Math.floor(p.y / height),
        };
    }

    export function createPointByGridIndex(g: GridIndex): Point {
        const { width, height } = ConfigManager.getGridSize();
        return {
            x: g.x * width,
            y: g.y * height,
        };
    }

    export function add(g1: GridIndex, g2: GridIndex): GridIndex {
        return {
            x: g1.x + g2.x,
            y: g1.y + g2.y,
        };
    }
    export function sub(g1: GridIndex, g2: GridIndex): GridIndex {
        return {
            x: g1.x - g2.x,
            y: g1.y - g2.y,
        };
    }
    export function scale(g: GridIndex, scale: number): GridIndex {
        return {
            x: g.x * scale,
            y: g.y * scale,
        };
    }
    export function clone(g: GridIndex): GridIndex {
        return {
            x: g.x,
            y: g.y,
        };
    }

    export function getDistance(g1: GridIndex, g2: GridIndex): number {
        return Math.abs(g1.x - g2.x) + Math.abs(g1.y - g2.y);
    }

    export function checkIsEqual(g1: GridIndex, g2: GridIndex): boolean {
        return (g1.x === g2.x) && (g1.y === g2.y);
    }

    export function checkIsInsideMap(g: GridIndex, mapSize: MapSize): boolean {
        const { x, y } = g;
        return (x >= 0) && (y >= 0) && (x < mapSize.width) && (y < mapSize.height);
    }

    export function getAdjacentGrids(g: GridIndex, mapSize: MapSize): GridIndex[] {
        const grids: GridIndex[] = [];
        for (const o of _ADJACENT_OFFSETS) {
            const adjacentGrid = add(g, o.offset);
            (checkIsInsideMap(adjacentGrid, mapSize)) && (grids.push(adjacentGrid));
        }
        return grids;
    }

    /**
     * If g1 is not adjacent to g2, undefined is returned.
     * Else, if index1 is at the right side of index2, then Direction.Right is returned, and so on.
    */
    export function getAdjacentDirection(g1: GridIndex, g2: GridIndex): Direction | undefined {
        if (getDistance(g1, g2) === 1) {
            const offset = sub(g1, g2);
            for (const o of _ADJACENT_OFFSETS) {
                if (checkIsEqual(offset, o.offset)) {
                    return o.direction;
                }
            }
        }
        return undefined;
    }

    export function getGridsWithinDistance(origin: GridIndex, minDistance: number, maxDistance: number, mapSize: MapSize, predicate?: (g: GridIndex) => boolean) {
        const grids: GridIndex[] = [];
        if ((minDistance == 0)                  &&
            (maxDistance >= minDistance)        &&
            (checkIsInsideMap(origin, mapSize)) &&
            ((!predicate) || (predicate(origin)))) {
            grids.push(origin);
        }

        for (let distance = minDistance; distance <= maxDistance; ++distance) {
            for (const offsetItem of _ADJACENT_OFFSETS) {
                const gridIndex = add(origin, sub(scale(offsetItem.offset, distance), offsetItem.clockwiseOffset));
                if ((checkIsInsideMap(gridIndex, mapSize)) &&
                    ((!predicate) || (predicate(gridIndex)))) {
                    grids.push(gridIndex);
                }
            }
        }

        return grids;
    }
}
