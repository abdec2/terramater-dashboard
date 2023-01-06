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
        default:
            return state;
    };
}