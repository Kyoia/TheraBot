import { AxiosInstance } from 'axios';

import { debug } from '../debug';

export interface IWormholeType {
    comment_public: string;
    identifier: string;
    mass_regeneration: number;
    max_jump_mass: number;
    max_stable_mass: number;
    max_stable_time: number;
    possible_static: boolean;
    signature_level: number;
    source: string;
    target_system_class: string;
    type_id: number;
    wandering_only: boolean;
}

export interface IWormholeData {
    id: number;
    created_at: string;
    created_by_id: number;
    created_by_name: string;
    updated_at: string;
    updated_by_id: number;
    updated_by_name: string;
    completed_at: string;
    completed_by_id: number;
    completed_by_name: string;
    completed: boolean;
    wh_exits_outward: boolean;
    wh_type: string;
    max_ship_size: string;
    expires_at: string;
    remaining_hours: number;
    signature_type: string;
    out_system_id: number;
    out_system_name: string;
    out_signature: string;
    in_system_id: number;
    in_system_class: string;
    in_system_name: string;
    in_region_id: number;
    in_region_name: string;
    in_signature: string;
    comment: string;
}

export interface IWormholeDataExtended {
    wormholeData: IWormholeData;
    wormholeDetail: IWormholeType;
}

export class EveScoutService {

    private axiosInstance: AxiosInstance;
    private debug = debug.extend('EveScoutService');

    public constructor(axiosInstance: AxiosInstance) {
        this.axiosInstance = axiosInstance;
    }

    public async getWH(secondAttempt = false): Promise<IWormholeData[] | undefined> {
        this.debug('getWH');
        // eslint-disable-next-line unicorn/no-useless-undefined
        const response = await this.axiosInstance.get<IWormholeData[]>('https://api.eve-scout.com/v2/public/signatures').catch(() => undefined);

        if (!response) {
            if (!secondAttempt) {
                return this.getWH(true);
            }

            return;
        }

        this.debug(`${response.data.length} wormholes`);
        return ;
    }

    public async getWHType(identifier: string,secondAttempt = false): Promise<IWormholeType | undefined> {
        this.debug('getWHType');
        // eslint-disable-next-line unicorn/no-useless-undefined
        const response = await this.axiosInstance.get<IWormholeType>('https://api.eve-scout.com/v2/public/wormholetypes?identifier='+identifier).catch(() => undefined);

        if (!response) {
            if (!secondAttempt) {
                return this.getWHType(identifier,true);
            }

            return;
        }

        this.debug(`${response.data}`);
        return response.data;
    }
}
