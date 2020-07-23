module.exports = (req = {}) => {
    return Object.freeze({
        path: req.path,
        method: req.method,
        pathParams: req.params,
        queryParams: req.query,
        body: req.body
    });
}