import React from 'react'

// export class GlobalService {
//     static loginPopup: any = false;
// }

const GlobalContext = React.createContext({
    count: 0,
    update: (data: any) => { }
})

export default GlobalContext