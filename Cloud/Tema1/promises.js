const utils = require('./utlis');
const endpoint = "http://localhost:3001/getWeatherInfo?location=Iasi";
const promises_number = 50;

async function send_requests(promises_number) {
    const promises = [];
    let i=0 ;
    while(i < promises_number)
    {
        promises.push(utils.getData(endpoint));
        i++;
    }
    try 
    {
        await Promise.all(promises);
    }
    catch (err) {
        console.error(err);
    }
}
(async function start_requests(endpoint) {
    const now = Date.now();
    for (let i = 0; i < 50 / promises_number; ++i) {
        const now = Date.now();
        try 
        {
            await send_requests(promises_number);
        }
        catch (err) 
        {
            console.error(err);
        }
    }
    console.log(`${Date.now() - now} ms`);
})(endpoint);
