export const AppReducer = (state, action) => {
    switch(action.type) {
        case 'UPDATE_GOLD_RESERVES':
            return {
                ...state,
                GoldReserve: action.payload
            }
        case 'UPDATE_BITCOIN_RESERVES':
            return {
                ...state,
                BitcoinReserve: action.payload
            }

        case 'UPDATE_MISC_RESERVES':
            return {
                ...state,
                MiscReserve: action.payload
            }

        case 'UPDATE_OTHER_NATURA_RELEASED':
            return {
                ...state,
                otherNaturaReleased: action.payload
            }
        
        case 'UPDATE_NATURA_PRICE':
            return {
                ...state,
                NaturaPrice: action.payload
            }

        case 'UPDATE_COLLECTIONS':
            return {
                ...state,
                Collections: action.payload
            }
        case 'UPDATE_STAKING_REWARDS':
            return {
                ...state,
                stakingRewardsClaimed: action.payload
            }
            case 'UPDATE_INCENTIVE_PROGRAM_RELEASED':
                return {
                    ...state,
                    incentiveProgramReleased: action.payload
                }
                case 'UPDATE_R&D_RELEASED':
                    return {
                        ...state,
                        rAndDRealeased: action.payload
                    }
                    case 'UPDATE_RESERVE_NATURA_RELEASED':
                        return {
                            ...state,
                            reserveNaturaReleased: action.payload
                        }
                        case 'UPDATE_TEAM_NATURA_RELEASED':
                            return {
                                ...state,
                                teamNaturaReleased: action.payload
                            }    
        default:
            return state;
    };
}
