
namespace TemplateMap {
    import Types        = Utility.Types;
    import Helpers      = Utility.Helpers;
    import ProtoTypes   = Network.Proto;

    export namespace TemplateMapModel {
        const allMapInfos: { [fileName: string]: ProtoTypes.IMapInfo } = {};
        let newestMapInfos: ProtoTypes.IS_GetNewestMapInfos;

        export function init(): void {
        }

        export async function getMapData(keys: Types.MapIndexKeys): Promise<Types.TemplateMap | undefined> {
            return new Promise<any>((resolve, reject) => {
                const url = Helpers.formatString("resource/assets/map/%s_%s_%s%d.json", keys.mapName, keys.designer, keys.version < 10 ? "0" : "", keys.version);
                RES.getResByUrl(
                    url,
                    (data: Types.TemplateMap, u: string) => {
                        if (u === url) {
                            resolve(data);
                        }
                    },
                    undefined,
                    RES.ResourceItem.TYPE_JSON
                );
            });
        }

        export function setNewestMapInfos(infos: ProtoTypes.IS_GetNewestMapInfos): void {
            newestMapInfos = infos;
            for (const info of infos.mapInfos) {
                allMapInfos[Helpers.getMapFileName(info as Types.MapIndexKeys)] = info;
            }
        }
        export function getNewestMapInfos(): ProtoTypes.IS_GetNewestMapInfos {
            return newestMapInfos;
        }

        export function getMapInfo(keys: Types.MapIndexKeys): ProtoTypes.IMapInfo | undefined {
            return allMapInfos[Helpers.getMapFileName(keys)];
        }
    }
}
