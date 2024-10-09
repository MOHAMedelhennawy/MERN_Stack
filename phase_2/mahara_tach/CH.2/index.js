(function(context, modname, definition) {

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = definition();
    } else {
        context[modname] = definition();
    }

})(this, 'shoppingPartCusMod', function() {
    const api = {
        name: 'Shopping',
        description: 'lorem lorem lorem'
    };

    return api;
});
