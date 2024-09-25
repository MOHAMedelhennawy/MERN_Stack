// Helper to send response
export const sendResponse = (res, statuCode, data) => {
    res.statuCode = statuCode;
    res.write(JSON.stringify(data));
    res.end();
};
