module.exports = {
    rootRequest: rootRequest
}

async function rootRequest(req, res, next) {
    console.log("req.query:: " + JSON.stringify(req.query, null, 2));
    return res
        .status(200)
        .json({
            status: 200,
            message: "API Completada",
            respuesta: true,
        });
}