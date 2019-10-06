export const config = {
    urls: {
        'api': 'http://localhost:3000/'
    },
    menuList: [
        {
            ad_type: { value: 'rent', display: 'Accommodations ' },
            ad_category: []
        }, {
            ad_type: { value: 'lost-found', display: 'Lost-Found' },
            ad_category: [
                { value: 'electronics', display: 'Electronics' },
                { value: 'vehicles', display: 'Vehicles' },
                { value: 'books', display: 'Books' },
                { value: 'keys', display: 'Keys' }
            ]
        }, {
            ad_type: { value: 'buy', display: 'Buy' },
            ad_category: [
                { value: 'electronics', display: 'Electronics' },
                { value: 'households ', display: 'House Holds ' },
                { value: 'vehicles', display: 'Vehicles' },
                { value: 'books', display: 'Books' }
            ]
        }, {
            ad_type: { value: 'events', display: 'Events' },
            ad_category: []
        }, {
            ad_type: { value: 'misc', display: 'Misc' },
            ad_category: []
        }
    ]
}