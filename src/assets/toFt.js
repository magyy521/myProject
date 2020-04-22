export const goUser = (userid) => {
    let action = {
        type: 29,
        id: userid
    };
    location.assign(
        `lizhifm://www.lizhi.fm?clientparams=18,${encodeURIComponent( 
    JSON.stringify(action) 
    )}`
    );
};